import * as XLSX from 'xlsx';
import type { Lead } from '@/types/types';

export function exportLeadsToExcel(leads: Lead[], filename: string = 'leads.xlsx') {
  // Prepare data for Excel
  const data = leads.map((lead) => ({
    'Lead ID': lead.id,
    'Company Name': lead.company_name || '',
    'Contact Name': lead.contact_name || '',
    'Email': lead.email || '',
    'Phone': lead.phone || '',
    'City': lead.city || '',
    'State': lead.state || '',
    'Location': lead.location || '',
    'Category': lead.category || '',
    'Requirement Details': lead.requirement_details || '',
    'Budget': lead.budget || '',
    'Authority': lead.authority || '',
    'Need': lead.need || '',
    'Timing': lead.timing || '',
    'BANT Score': lead.bant_score || 0,
    'Status': lead.status || '',
    'Assigned Vendor': lead.assigned_vendor?.company_name || 'Unassigned',
    'Created At': new Date(lead.created_at).toLocaleString(),
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Set column widths
  const columnWidths = [
    { wch: 15 }, // Lead ID
    { wch: 20 }, // Company Name
    { wch: 20 }, // Contact Name
    { wch: 25 }, // Email
    { wch: 15 }, // Phone
    { wch: 15 }, // City
    { wch: 15 }, // State
    { wch: 20 }, // Location
    { wch: 15 }, // Category
    { wch: 40 }, // Requirement Details
    { wch: 15 }, // Budget
    { wch: 15 }, // Authority
    { wch: 15 }, // Need
    { wch: 15 }, // Timing
    { wch: 12 }, // BANT Score
    { wch: 15 }, // Status
    { wch: 20 }, // Assigned Vendor
    { wch: 20 }, // Created At
  ];
  worksheet['!cols'] = columnWidths;

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, filename);
}
