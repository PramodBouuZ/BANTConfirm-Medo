import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { requirement_details, budget, authority, need, timing } = await req.json();

    // Call Gemini API for BANT qualification
    const geminiResponse = await fetch(
      'https://api-integrations.appmedo.com/app-8n1wxpg9ygap/api-pLVzJnE6NKDL/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are a B2B sales qualification expert. Analyze the following business requirement and provide a BANT (Budget, Authority, Need, Timing) qualification score and analysis.

Requirement Details: ${requirement_details}
Budget: ${budget || 'Not specified'}
Authority: ${authority || 'Not specified'}
Need: ${need || 'Not specified'}
Timing: ${timing || 'Not specified'}

Please provide:
1. A BANT score from 0-100 (where 100 is highly qualified)
2. Analysis for each BANT component
3. Recommended vendor categories (software, telecom, or both)

Respond in JSON format:
{
  "bant_score": <number>,
  "analysis": {
    "budget": "<analysis>",
    "authority": "<analysis>",
    "need": "<analysis>",
    "timing": "<analysis>"
  },
  "recommended_categories": ["<category>"]
}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiResponse.ok) {
      throw new Error('Gemini API request failed');
    }

    const reader = geminiResponse.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = JSON.parse(line.slice(6));
              if (jsonData.candidates?.[0]?.content?.parts?.[0]?.text) {
                fullResponse += jsonData.candidates[0].content.parts[0].text;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    }

    // Extract JSON from response
    const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
    let result;
    
    if (jsonMatch) {
      result = JSON.parse(jsonMatch[0]);
    } else {
      // Fallback if AI doesn't return proper JSON
      result = {
        bant_score: 50,
        analysis: {
          budget: 'Budget information needs clarification',
          authority: 'Decision-making authority needs verification',
          need: 'Business need identified',
          timing: 'Timeline needs to be defined',
        },
        recommended_categories: ['software', 'telecom'],
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in gemini-bant-qualification:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
