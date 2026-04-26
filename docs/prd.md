# BantConfirm Requirements Document

## 1. Application Overview

### 1.1 Application Name
BantConfirm\n
### 1.2 Application Description
BantConfirm is a production-ready B2B AI marketplace platform designed for Software, IT Hardware, Telecom, Cloud & Enterprise Services. The platform focuses on BANT-qualified leads (Budget, Authority, Need, Timing) and enables users to post requirements, vendors to receive verified leads, admins to control the entire system, and lead posters to earn commissions.

### 1.3 Application Type
Web-based B2B marketplace platform with multi-role dashboards (User, Vendor, Admin)\n
---

## 2. Core Features

### 2.1 User Roles
- **Users**: Post requirements, track lead status, receive vendor responses
- **Vendors**: Receive assigned leads, manage lead status, add remarks
- **Admin**: Full control over leads, products, vendors, blogs, categories, website settings, and user management

### 2.2 Main Functionalities

#### 2.2.1 Marketplace Features
- Product browsing and search
- Category filtering (Software, Telecom, IT Hardware, All)
- **Product detail pages with complete information including:**
  - Multiple product images with gallery view
  - Full product description\n  - Complete feature list
  - Pricing information
  - Vendor name and details
  - Similar product suggestions section
- Book Now and Consult Expert actions
- Verified vendor network display
- Live market data dashboard
- **Clean URL structure: /products/[product-name] for SEO optimization**

#### 2.2.2 Latest Product Promotional Banner
- **Admin-managed promotional banner for highlighting latest products**
- **Banner displays above the main marketplace section on homepage**
- **Admin can enable/disable banner visibility**
- **Banner fields managed via Admin Panel:**
  - Banner title\n  - Banner description
  - Featured product selection (dropdown from product catalog)
  - Banner background image upload (PNG/JPEG)
  - Call-to-action button text (default: View Product)
  - Banner status (Active/Inactive)
- **Banner design features:**
  - Large colorful gradient background with glassmorphism effect
  - Product image display with gradient overlay
  - Prominent CTA button with ShoppingCart icon
  - Sparkles icon for promotional emphasis
  - Smooth fade-in animation on page load
  - Clickable banner that navigates to featured product detail page
- **Banner updates in real-time when admin makes changes**

#### 2.2.3 Authentication & User Registration
- **Multiple login and signup options:**
  - Email and password authentication
  - Google OAuth login and signup (OSS Google login method)
- **User registration flow:**
  - After successful account creation (via email or Google), users must complete profile information
  - Required fields: Full Name, Mobile Number, Email Address, Location (City, State)\n  - Optional field: Company Name
  - Profile completion form displayed immediately after first-time signup
  - Users cannot access full platform features until profile is completed
- **User data management:**
  - All user profile data saved in Supabase database
  - Admin can view and manage all registered users in Admin Panel
  - User profile data accessible in Admin Panel under Users Management section

#### 2.2.4 Lead Management (Critical)
- Requirement posting form capturing:
  - User Details: Full Name, Mobile Number, Email Address, Location (City, State), Company Name (optional)
  - Requirement Details: Exact requirement (full text), Category (software/telecom/IT hardware), Budget, Authority, Need, Timing, AI BANT Score
- Lead assignment to one or multiple vendors via dropdown
- Lead status management: New, Assigned, In Progress, Closed, Rejected
- Internal admin remarks\n- Lead history tracking\n- Excel export functionality (.xlsx format) for all leads
- Filters: By status, category, date, location\n- Real-time lead notifications\n
#### 2.2.5 Vendor Management
- Add vendors manually\n- Vendor approval workflow (Approve/Reject)
- Vendor profile management
- Logo upload (PNG/JPEG) and display
- Enable/disable vendor status
- Lead access control\n- View assigned leads per vendor
- Performance tracking
- Vendor logos displayed on homepage in horizontal scrolling marquee style

#### 2.2.6 Product & Service Management
- Add/edit products and services
- Enable/disable visibility
- Fields:\n  - Product/Service Name
  - Category
  - Short description
  - Full description
  - Feature list (dynamic add/remove)
  - Price and pricing unit
  - Vendor mapping
  - Similar product suggestions
  - Status\n- Multiple image upload (PNG, JPEG)\n- Image preview, delete, and reorder
- Images stored in Supabase Storage\n\n#### 2.2.7 Category Management
- Add/edit categories
- Enable/disable categories\n- Categories used across: Products, Services, Blogs, Leads
\n#### 2.2.8 Blog System
- Create and edit blogs
- SEO field management
- Category assignment
- Homepage display control
\n#### 2.2.9 Website Settings (Real-time)
- Upload website logo (PNG)\n- Upload favicon (PNG)
- Manage social media icons and links: Facebook, LinkedIn, Instagram, Twitter\n- WhatsApp number\n- Footer content management
- Notification settings
- **Promotional banner management (Latest Product Banner)**
- All updates reflect on frontend in real time

#### 2.2.10 AI Features
- AI BANT qualification during requirement posting
- AI Business Consultant chatbot
- Smart category and vendor matching
- Google Gemini API integration (gemini-3-flash-preview model)
\n#### 2.2.11 Notification System
- Real-time notifications for Admin, Vendors, and Users
- Event triggers: New lead created, Lead assigned to vendor, Lead status updated, Vendor response, Blog published, New user registration
\n---

## 3. Page Structure

### 3.1 Public Pages
- `/` - Home page with Latest Product Promotional Banner
- `/products` - Marketplace listing\n- **`/products/[product-name]` - Product detail page with complete information:**
  - Multiple product images in gallery format
  - Full product description\n  - Complete feature list with icons
  - Pricing details
  - Vendor name and information
  - Similar products suggestion section
  - Book Now and Consult Expert buttons
- **`/products/[product-name]/[city]` - City-specific product landing pages**
- **`/products/[product-name]/[state]` - State-specific product landing pages**
- **`/[city]` - City landing pages showcasing all products available in that city**
- **`/[state]` - State landing pages showcasing all products available in that state**
- `/blog` - Blog listing\n- `/blog/[slug]` - Blog details
- `/post-requirement` - Lead submission form
- `/contact` - Contact Us page with support email, address, and contact form
- `/faq` - FAQ page with relevant content
- **`/about` - About Us page with Mission and Vision section**
\n### 3.2 Authentication Pages
- `/login` - User login with email/password and Google OAuth options
- `/register` - User registration with email/password and Google OAuth options
- `/complete-profile` - Profile completion form for new users (Name, Mobile Number, Email, Location, Company Name)
- `/admin/login` - Secure admin login\n\n### 3.3 User Dashboard
- `/user/dashboard` - User dashboard with posted requirements and status
- `/user/profile` - User profile management page
\n### 3.4 Vendor Dashboard
- `/vendor/dashboard` - Vendor dashboard with assigned leads and performance stats
\n### 3.5 Admin Panel
- `/admin` - Admin dashboard with metrics: Total leads, New leads, Assigned leads, Vendors count, Products count, Users count, Recent activity list
- `/admin/leads` - Leads Hub with full lead management
- `/admin/products` - Product & Service Catalog management
- `/admin/blogs` - Blog Manager
- `/admin/categories` - Category management
- `/admin/vendors` - Vendor management
- `/admin/users` - Users Management (view and manage all registered users)
- `/admin/settings` - Website settings\n- **`/admin/promotional-banner` - Latest Product Promotional Banner management**
- **`/admin/seo` - SEO Management page for product, city, and state-wise optimization**
- `/admin/logout` - Logout\n
---

## 4. UI/UX Requirements

### 4.1 Design Style
- Glassmorphism UI effects
- Extreme rounded corners
- Smooth CSS animations
- Horizontal marquee animations for hero text and vendor logos
- **Colorful gradient backgrounds and accent colors throughout the website**
- **Vibrant color palette with primary colors: Blue (#3B82F6), Purple (#8B5CF6), Green (#10B981), Orange (#F59E0B)**
- **Secondary colors: Pink (#EC4899), Teal (#14B8A6), Indigo (#6366F1)**
- **Icons integrated across all sections using Lucide-React icon library**
\n### 4.2 Header\n- Logo (left aligned)\n- Navigation menu with icons: Services (Briefcase icon), Features (Sparkles icon), About (Info icon), Dashboard (LayoutDashboard icon)
- Login/Logout button with User icon
- Yellow Post Enquiry button with PlusCircle icon (prominent CTA)

### 4.3 Authentication Pages UI
\n#### 4.3.1 Login Page
- **Page title: Welcome Back with gradient text effect**
- **Login form with colorful input fields:**
  - Email Address (input with Mail icon)
  - Password (input with Lock icon)
  - Remember Me checkbox
  - Forgot Password link
- **Login button with LogIn icon (prominent gradient button)**
- **Divider with OR text**
- **Google Login button with Google icon (white background with Google brand colors)**
- **Sign Up link: Don't have an account? Sign Up**
- **Colorful gradient background with glassmorphism card**

#### 4.3.2 Register Page
- **Page title: Create Account with gradient text effect**
- **Registration form with colorful input fields:**
  - Email Address (input with Mail icon)
  - Password (input with Lock icon)
  - Confirm Password (input with Lock icon)
  - Terms and Conditions checkbox
- **Sign Up button with UserPlus icon (prominent gradient button)**
- **Divider with OR text**
- **Google Sign Up button with Google icon (white background with Google brand colors)**
- **Login link: Already have an account? Log In**
- **Colorful gradient background with glassmorphism card**

#### 4.3.3 Complete Profile Page
- **Page title: Complete Your Profile with gradient text effect and User icon**
- **Profile completion form with colorful input fields:**\n  - Full Name (input with User icon, required)
  - Mobile Number (input with Phone icon, required)
  - Email Address (input with Mail icon, pre-filled and disabled)
  - City (input with MapPin icon, required)
  - State (dropdown with Map icon, required)
  - Company Name (input with Building icon, optional)
- **Save Profile button with Save icon (prominent gradient button)**
- **Skip for Now button (secondary button, but profile must be completed to access full features)**
- **Progress indicator showing profile completion percentage**
- **Colorful gradient background with glassmorphism card**

### 4.4 Hero Section
- Large bold headline with gradient text effect
- Sub-headline text\n- Two CTA buttons with icons: Explore Solutions (Search icon), Post My Requirement (FileText icon)
- Horizontal marquee animation for hero text
- Colorful gradient background with animated particles

### 4.5 Latest Product Promotional Banner
- **Positioned directly below Hero Section and above Promotional Strip**
- **Full-width banner with colorful gradient background**
- **Banner layout:**
  - Left side: Featured product image with gradient overlay and rounded corners
  - Right side: Banner content section\n    - Banner title with gradient text effect and Sparkles icon
    - Banner description text\n    - Product name with Tag icon
    - View Product CTA button with ShoppingCart icon (prominent, colorful gradient)
- **Glassmorphism card effect with extreme rounded corners**
- **Smooth fade-in animation on page load**
- **Hover effect on entire banner with scale transformation**
- **Clickable banner navigates to featured product detail page**
- **Banner only displays when admin sets status to Active**
- **Responsive design: Stacks vertically on mobile devices**
\n### 4.6 Promotional Strip
- Admin-editable promotional message
- Default: Post your unused leads and get up to 10% commission
- Gift icon displayed alongside text
- Gradient background with animation
\n### 4.7 Marketplace Dashboard Section
- Verified sellers count display with BadgeCheck icon
- Requirement volume metrics with TrendingUp icon
- Live activity indicator with Activity icon
- Trend graph visualization with colorful gradient fills
- Each metric card with distinct gradient background

### 4.8 Product Cards
- Product image with gradient overlay
- Key features list with CheckCircle icons
- Pricing information with DollarSign icon
- Book Now button with ShoppingCart icon
- Consult Expert button with MessageCircle icon
- Colorful border and shadow effects
- **Clickable cards that navigate to product detail page**

### 4.9 Product Detail Page
- **Image Gallery Section:**
  - Multiple product images with thumbnail navigation
  - Main image display with zoom functionality
  - Image carousel with smooth transitions
  - Gallery icon for image count indicator
- **Product Information Section:**
  - Product name with gradient text effect
  - Category badge with Tag icon
  - Full product description with rich formatting
  - Complete feature list with CheckCircle icons
  - Pricing card with DollarSign icon and pricing unit
- **Vendor Information Section:**
  - Vendor name with Store icon
  - Vendor logo display
  - Contact vendor button with Phone icon
- **Action Buttons:**
  - Book Now button with ShoppingCart icon (prominent CTA)
  - Consult Expert button with MessageCircle icon\n- **Similar Products Section:**
  - Horizontal scrollable product cards
  - Product suggestions based on category
  - Each card with image, name, price, and quick view option
  - ArrowRight icon for navigation
- **Colorful gradient backgrounds and smooth animations throughout**

### 4.10 Why BantConfirm Section
- Four feature cards with gradient backgrounds:\n  - AI-Qualified Requirements (Brain icon, Blue-Purple gradient)
  - Verified Vendor Network (Shield icon, Green-Teal gradient)
  - Enterprise Licensing (Award icon, Orange-Pink gradient)
  - IT Infrastructure Support (Server icon, Indigo-Purple gradient)
- Each card with icon, title, description, and hover animation
\n### 4.11 Vendor Logo Section
- Horizontal scrolling marquee\n- Admin-managed vendor logos\n- Colorful gradient background\n- Star icons between logos

### 4.12 Footer
- Three columns with section icons: Product (Package icon), Company (Building icon), Support (Headphones icon)
- Product: Features, Marketplace, Pricing, Security
- Company: About Us, Careers, Blog, Press Kit
- Support: Contact Us, Help Center, API Reference, Vendor Community
- Social media icons with colorful hover effects
- Admin-editable content\n- Gradient background\n
### 4.13 Contact Us Page
- **Contact Information Section:**
  - Email: support@bantconfirm.com with Mail icon
  - Address: Noida, Uttar Pradesh (201301) with MapPin icon
  - Colorful gradient card design
- **Contact Form Section:**
  - Fields: Full Name, Email Address, Phone Number, Subject, Message
  - Submit button with Send icon\n  - Form validation and success/error messages
  - Colorful input borders and focus states
- **Page Layout:**
  - Two-column layout (Contact info on left, Form on right)
  - Responsive design for mobile devices
  - Gradient background with glassmorphism effects

### 4.14 FAQ Page
- **FAQ Section with relevant content:**
  - Question: What is BantConfirm?
    Answer: BantConfirm is a B2B AI marketplace platform that connects businesses with verified vendors for Software, IT Hardware, Telecom, Cloud & Enterprise Services. We focus on BANT-qualified leads to ensure high-quality business connections.
  - Question: How does the lead qualification process work?
    Answer: Our AI-powered system evaluates leads based on BANT criteria (Budget, Authority, Need, Timing) to ensure vendors receive only qualified and relevant business opportunities.
  - Question: How can I post a requirement?
    Answer: Simply click the Post Enquiry button, fill in your requirement details, and our system will match you with the most suitable verified vendors in our network.
  - Question: Is there a fee for posting requirements?
    Answer: Posting requirements is free for users. We also offer a commission program where you can earn up to 10% by sharing unused leads.\n  - Question: How do I become a vendor on BantConfirm?
    Answer: Contact our team through the Contact Us page or email us at support@bantconfirm.com. Our admin team will review your application and guide you through the onboarding process.
  - Question: What categories of products and services are available?
    Answer: We cover Software, IT Hardware, Telecom, Cloud Services, and Enterprise Solutions. Our marketplace is continuously expanding with new vendors and offerings.
  - Question: How do I track my posted requirements?
    Answer: Once you register and post a requirement, you can track its status in real-time through your User Dashboard. You will receive notifications for vendor responses and status updates.
  - Question: Are the vendors on BantConfirm verified?
    Answer: Yes, all vendors go through a verification and approval process by our admin team to ensure quality and reliability.
- **Page Layout:**
  - Accordion-style FAQ items with ChevronDown icons
  - Each question expandable/collapsible
  - Colorful gradient backgrounds for each FAQ card
  - Search functionality to filter FAQs\n  - Gradient page background with glassmorphism effects
\n### 4.15 About Us Page
- **Hero Section:**
  - Large headline: About BantConfirm with gradient text effect
  - Sub-headline describing the platform purpose
  - Colorful gradient background with animated particles
  - Building icon displayed prominently
- **Mission Section:**
  - Section title: Our Mission with Target icon
  - Mission statement: To revolutionize B2B marketplace connections by leveraging AI-powered BANT qualification, ensuring businesses connect with verified vendors for Software, IT Hardware, Telecom, Cloud & Enterprise Services. We aim to eliminate unqualified leads and create a trusted ecosystem where every connection drives real business value.
  - Relevant image placeholder with gradient overlay
  - Colorful gradient card design with glassmorphism effects
- **Vision Section:**
  - Section title: Our Vision with Eye icon
  - Vision statement: To become the global standard for B2B marketplace platforms, where every business requirement is intelligently matched with the right vendor, creating a seamless, transparent, and efficient procurement experience. We envision a future where AI-driven insights empower businesses to make faster, smarter decisions.\n  - Relevant image placeholder with gradient overlay
  - Colorful gradient card design with glassmorphism effects
- **Values Section (Optional):**
  - Three value cards with icons and descriptions:\n    - Innovation (Lightbulb icon): Continuously evolving with cutting-edge AI technology
    - Trust (Shield icon): Building a verified and reliable vendor network
    - Efficiency (Zap icon): Streamlining B2B connections for faster results
  - Each card with distinct gradient background and hover animation
- **Page Layout:**
  - Vertical scrolling layout with alternating left-right image-text sections
  - Responsive design for mobile devices
  - Gradient backgrounds and smooth animations throughout
  - All sections with colorful icons from Lucide-React
\n### 4.16 Admin Panel UI
- Left sidebar navigation with colorful icons for each tab:\n  - Dashboard (LayoutDashboard icon, Blue)\n  - Leads Hub (Users icon, Purple)
  - Product Catalog (Package icon, Green)
  - Blog Manager (FileText icon, Orange)
  - Categories (FolderTree icon, Pink)
  - Vendors (Store icon, Teal)
  - Users Management (UserCog icon, Blue)
  - Settings (Settings icon, Indigo)
  - **Promotional Banner (Megaphone icon, Orange)**
  - **SEO Management (Search icon, Blue)**
  - Logout (LogOut icon, Red)
- Table-based admin UI with alternating row colors
- Working forms with colorful input borders and focus states
- Status badges with color coding: New (Blue), Assigned (Purple), In Progress (Orange), Closed (Green), Rejected (Red)
- Action buttons with icons: Edit (Pencil icon), Delete (Trash icon), View (Eye icon), Download (Download icon)
- No placeholder UI or static content
- All tabs must route to valid pages and load content\n
### 4.17 Admin Users Management Page (New)
- **Page title: Users Management with UserCog icon**
- **Users table with columns:**
  - User ID
  - Full Name\n  - Email Address
  - Mobile Number
  - Location (City, State)
  - Company Name\n  - Registration Date
  - Registration Method (Email/Google)
  - Account Status (Active/Inactive)
  - Actions (View/Edit/Delete)
- **Filter options with Filter icon:**
  - By registration method (Email/Google)
  - By location (City/State)
  - By registration date range
  - By account status\n- **Search functionality with Search icon**
- **Export users to Excel with Download icon**
- **User detail view modal with complete profile information**
- **Edit user profile functionality**
- **Enable/disable user account with ToggleLeft/ToggleRight icons**
- **Colorful gradient card design with table layout**

### 4.18 Admin Promotional Banner Management Page
- **Page title: Latest Product Promotional Banner with Megaphone icon**
- **Banner preview section showing live banner appearance**
- **Banner management form with colorful input fields:**
  - Banner Title (text input with Heading icon)
  - Banner Description (textarea with FileText icon)
  - Featured Product (dropdown selector from product catalog with Package icon)
  - Banner Background Image (image upload with Upload icon, PNG/JPEG)
  - CTA Button Text (text input with MousePointer icon, default: View Product)
  - Banner Status (toggle switch with ToggleLeft/ToggleRight icons: Active/Inactive)
- **Action buttons:**
  - Save Changes button with Save icon (prominent gradient button)\n  - Preview Banner button with Eye icon\n  - Reset Form button with RotateCcw icon
- **Banner image preview with delete and replace options**
- **Real-time preview updates as admin edits fields**
- **Success/error message display with CheckCircle/XCircle icons**
- **Colorful gradient card design with glassmorphism effects**
\n### 4.19 Admin SEO Management Page
- **Page title: SEO Management with Search icon**
- **Three main sections with tabs:**
  - Product SEO (Package icon)\n  - City SEO (MapPin icon)
  - State SEO (Map icon)
\n#### 4.19.1 Product SEO Section
- **Product selection dropdown with search functionality**
- **SEO fields for each product:**
  - Meta Title (text input with Heading icon, max 60 characters)
  - Meta Description (textarea with FileText icon, max 160 characters)
  - Focus Keywords (tag input with Tag icon, comma-separated)
  - Canonical URL (text input with Link icon, auto-generated from product name)
  - OpenGraph Title (text input with Share2 icon)\n  - OpenGraph Description (textarea with FileText icon)\n  - OpenGraph Image (image upload with Image icon)\n  - Twitter Card Title (text input with Twitter icon)
  - Twitter Card Description (textarea with FileText icon)
  - Schema Markup (JSON-LD structured data, auto-generated with manual override option)
- **SEO Score Indicator with color-coded badge (Poor/Fair/Good/Excellent)**\n- **Preview section showing how product appears in Google search results**
- **Save SEO Settings button with Save icon**
\n#### 4.19.2 City SEO Section
- **City management table with columns:**
  - City Name
  - State\n  - Active Products Count
  - SEO Status (Optimized/Not Optimized)
  - Actions (Edit/View)\n- **Add New City button with PlusCircle icon**
- **City SEO form fields:**
  - City Name (text input with MapPin icon)
  - State (dropdown selector with Map icon)
  - Meta Title (text input with Heading icon, includes city name)
  - Meta Description (textarea with FileText icon, includes city-specific content)
  - Focus Keywords (tag input with Tag icon, includes city + product combinations)
  - Page Heading (text input with Type icon)\n  - Page Description (rich text editor with FileText icon)
  - Featured Products (multi-select dropdown with Package icon)
  - Schema Markup (LocalBusiness schema, auto-generated)\n- **City landing page preview with Eye icon**
- **Save City SEO button with Save icon**

#### 4.19.3 State SEO Section
- **State management table with columns:**
  - State Name
  - Total Cities\n  - Active Products Count
  - SEO Status (Optimized/Not Optimized)
  - Actions (Edit/View)\n- **Add New State button with PlusCircle icon**
- **State SEO form fields:**
  - State Name (text input with Map icon)
  - Meta Title (text input with Heading icon, includes state name)
  - Meta Description (textarea with FileText icon, includes state-specific content)
  - Focus Keywords (tag input with Tag icon, includes state + product combinations)\n  - Page Heading (text input with Type icon)
  - Page Description (rich text editor with FileText icon)
  - Featured Products (multi-select dropdown with Package icon)
  - Featured Cities (multi-select dropdown with MapPin icon)
  - Schema Markup (Organization schema, auto-generated)
- **State landing page preview with Eye icon**
- **Save State SEO button with Save icon**

#### 4.19.4 SEO Management Features
- **Bulk SEO optimization tool with Zap icon**
- **SEO audit report generation with FileText icon**
- **Keyword research suggestions with Lightbulb icon**
- **Competitor analysis tool with TrendingUp icon**
- **Sitemap generation and submission with Globe icon**
- **Robots.txt editor with FileCode icon**
- **Google Search Console integration status with CheckCircle icon**
- **SEO performance metrics dashboard with BarChart icon**
\n### 4.20 City Landing Page UI
- **Hero Section:**
  - City-specific headline with gradient text effect
  - Sub-headline highlighting available products and services
  - MapPin icon displayed prominently
  - Colorful gradient background\n- **Products Available in [City Name] Section:**
  - Grid layout of product cards
  - Each card with product image, name, price, and View Details button
  - Filter by category with Filter icon
  - Sort by price/popularity with ArrowUpDown icon
- **Why Choose BantConfirm in [City Name] Section:**
  - Three benefit cards with icons and descriptions
  - Local vendor network emphasis
  - Fast delivery and support
  - Verified sellers in the city
- **Featured Vendors in [City Name] Section:**
  - Vendor logo carousel\n  - Vendor count display
- **Call-to-Action Section:**
  - Post Requirement button with PlusCircle icon
  - Contact Us button with Phone icon
- **Breadcrumb navigation: Home > [State Name] > [City Name]**
\n### 4.21 State Landing Page UI
- **Hero Section:**
  - State-specific headline with gradient text effect
  - Sub-headline highlighting coverage and services
  - Map icon displayed prominently
  - Colorful gradient background
- **Products Available in [State Name] Section:**
  - Grid layout of product cards
  - Each card with product image, name, price, and View Details button
  - Filter by category and city with Filter icon
  - Sort by price/popularity with ArrowUpDown icon
- **Cities We Serve in [State Name] Section:**
  - Grid of city cards with city name and product count
  - Each card clickable and navigates to city landing page
  - MapPin icon for each city
- **Why Choose BantConfirm in [State Name] Section:**
  - Three benefit cards with icons and descriptions
  - State-wide vendor network\n  - Regional expertise\n  - Comprehensive coverage
- **Featured Vendors in [State Name] Section:**
  - Vendor logo carousel
  - Vendor count display
- **Call-to-Action Section:**
  - Post Requirement button with PlusCircle icon\n  - Contact Us button with Phone icon
- **Breadcrumb navigation: Home > [State Name]**

### 4.22 Responsive Design
- Desktop and mobile responsive layouts
- Touch-friendly interactions for mobile\n\n### 4.23 Icon Usage Guidelines
- All buttons must include relevant icons from Lucide-React
- All navigation items must have icons\n- All feature cards must have large colorful icons
- All status indicators must have icons
- All form fields should have prefix icons where appropriate
- All metric cards must have icons
\n---

## 5. Technical Requirements

### 5.1 Frontend Stack
- Next.js (App Router)\n- Tailwind CSS with custom color palette configuration
- Lucide-React icons (comprehensive icon integration)
- Recharts for data visualization with colorful gradients
\n### 5.2 Backend Stack
- Supabase Authentication (Email/Password and Google OAuth)
- Supabase PostgreSQL database
- Supabase Storage for images
- Supabase Realtime for notifications
- Row Level Security (RLS) policies:\n  - Admin has full access\n  - Vendors only see assigned leads
  - Users only see their own leads and profile data

### 5.3 Authentication Implementation
- **Email/Password Authentication:**
  - User registration with email verification
  - Secure password hashing\n  - Password reset functionality
- **Google OAuth Authentication:**
  - OSS Google login method implementation
  - Automatic user profile creation upon first Google login
  - Profile completion redirect for new Google users
- **Profile Completion Flow:**
  - Mandatory profile completion after first-time signup
  - Profile data validation and storage in Supabase
  - Redirect to dashboard after profile completion
\n### 5.4 AI Integration
- Google Gemini API\n- Model: gemini-3-flash-preview
- Use cases: BANT qualification, vendor matching\n\n### 5.5 Deployment
- Vercel platform\n- Production-ready configuration
\n### 5.6 SEO Requirements (Enhanced)
\n#### 5.6.1 Product-wise SEO
- **Clean URL structure with product names: /products/[product-name]**
- **URL slug generation from product name (lowercase, hyphen-separated)**
- **Dynamic meta title and description per product**
- **Product-specific focus keywords**
- **OpenGraph tags with product image, name, description, and pricing**
- **Twitter Card tags with product details**
- **JSON-LD structured data:**
  - Product schema with name, description, image, price, availability, brand, category\n  - Breadcrumb schema\n  - Review schema (if reviews are added in future)
- **Canonical URL for each product page**
- **Alt text for all product images**
- **Internal linking to related products and categories**
\n#### 5.6.2 City-wise SEO
- **Dynamic city landing pages: /[city-name]**
- **City-specific meta title format: [Product Category] in [City Name] | BantConfirm**
- **City-specific meta description including city name and available products**
- **City-specific focus keywords: [product] in [city], [service] [city], [category] [city]**
- **OpenGraph tags with city-specific content**
- **JSON-LD structured data:**
  - LocalBusiness schema with city address and contact details
  - BreadcrumbList schema
  - ItemList schema for products available in the city
- **City-specific page content with H1, H2, H3 headings**
- **Internal linking to state page and product pages**
- **City name in URL slug (lowercase, hyphen-separated)**\n
#### 5.6.3 State-wise SEO
- **Dynamic state landing pages: /[state-name]**
- **State-specific meta title format: [Product Category] in [State Name] | BantConfirm**
- **State-specific meta description including state name and coverage**
- **State-specific focus keywords: [product] in [state], [service] [state], [category] [state]**\n- **OpenGraph tags with state-specific content**
- **JSON-LD structured data:**\n  - Organization schema with state-level information
  - BreadcrumbList schema
  - ItemList schema for cities and products in the state
- **State-specific page content with H1, H2, H3 headings**
- **Internal linking to city pages and product pages**
- **State name in URL slug (lowercase, hyphen-separated)**

#### 5.6.4 General SEO Requirements
- **Sitemap.xml generation including:**
  - All product pages
  - All city landing pages
  - All state landing pages
  - Blog pages
  - Static pages (About, Contact, FAQ)
- **Robots.txt configuration with proper directives**
- **Canonical tags on all pages to avoid duplicate content**
- **Hreflang tags for multi-language support (if applicable)**
- **Mobile-friendly and responsive design**
- **Fast page load speed with optimized images**
- **Structured data validation using Google Rich Results Test**
- **Google Search Console integration**
- **Google Analytics integration**
- **Schema.org markup for all relevant entities**
- **Breadcrumb navigation on all pages**
- **Internal linking strategy with anchor text optimization**
- **Image optimization with WebP format and lazy loading**
- **Meta robots tags for indexing control**

### 5.7 Data & Security
- All data fetched from Supabase\n- RLS enforced on all tables
- Secure admin authentication
- Secure user authentication with Google OAuth
- Error handling and empty states
\n---

## 6. Admin Panel Capabilities

### 6.1 Dashboard\n- Total leads count with Users icon and gradient card
- New leads count with Bell icon and gradient card
- Assigned leads count with UserCheck icon and gradient card
- Total vendors count with Store icon and gradient card
- Total products count with Package icon and gradient card
- Total users count with UserCog icon and gradient card
- Recent activity list with Activity icon\n- Revenue metrics with DollarSign icon and colorful chart
\n### 6.2 Leads Hub (Critical)
- View all leads with full details in table format
- Display user details: Full Name, Mobile Number, Email Address, Location (City, State), Company Name
- Display requirement details: Exact requirement, Category, Budget, Authority, Need, Timing, AI BANT Score
- Lead assignment to one or multiple vendors via dropdown
- Update lead status with color-coded badges: New (Blue), Assigned (Purple), In Progress (Orange), Closed (Green), Rejected (Red)\n- Add internal admin remarks with MessageSquare icon
- Track lead history with Clock icon
- Download all leads to Excel (.xlsx) with Download icon
- Filters with Filter icon: By status, category, date, location
\n### 6.3 Product & Service Catalog Management
- Add new products/services with PlusCircle icon
- Edit existing products/services with Pencil icon
- Enable/disable visibility with Eye/EyeOff icons
- Manage fields: Name, Category, Short description, Full description, Feature list (dynamic), Price, Pricing unit, Vendor mapping, Similar products, Status\n- Upload multiple images (PNG, JPEG) with Upload icon
- Preview, delete, and reorder images\n- Images stored in Supabase Storage
- **Automatic URL slug generation from product name**
\n### 6.4 Vendor Management
- Add vendors manually with UserPlus icon
- Edit vendor details with Pencil icon
- Approve/reject vendors with CheckCircle/XCircle icons
- Upload vendor logo (PNG/JPEG) with Image icon
- Enable/disable vendors with ToggleLeft/ToggleRight icons
- View assigned leads per vendor with Eye icon
- Vendor logos displayed on homepage in horizontal scrolling marquee
\n### 6.5 Users Management (New)
- **View all registered users in table format**
- **User table columns:**
  - User ID
  - Full Name\n  - Email Address
  - Mobile Number\n  - Location (City, State)
  - Company Name
  - Registration Date
  - Registration Method (Email/Google)
  - Account Status (Active/Inactive)
- **Filter users by:**
  - Registration method (Email/Google)
  - Location (City/State)
  - Registration date range
  - Account status
- **Search users by name, email, or mobile number**
- **View user profile details with Eye icon**
- **Edit user profile with Pencil icon**
- **Enable/disable user account with ToggleLeft/ToggleRight icons**
- **Delete user account with Trash icon (with confirmation)**
- **Export users to Excel (.xlsx) with Download icon**
- **User activity tracking: Posted requirements, Lead status, Last login**

### 6.6 Blog Manager
- Create new blogs with PlusCircle icon
- Edit existing blogs with Pencil icon
- SEO field management with Search icon
- Category assignment with Tag icon
- Homepage display toggle with Home icon
\n### 6.7 Category Management
- Add/edit categories with FolderPlus/Pencil icons
- Enable/disable categories with ToggleLeft/ToggleRight icons
- Assign to products, services, blogs, and leads
\n### 6.8 Promotional Banner Management
- **Create and edit Latest Product Promotional Banner**
- **Manage banner fields:**
  - Banner title with Heading icon
  - Banner description with FileText icon
  - Featured product selection with Package icon
  - Banner background image upload with Upload icon
  - CTA button text with MousePointer icon
  - Banner status toggle with ToggleLeft/ToggleRight icons
- **Real-time banner preview with Eye icon**
- **Save and update banner with Save icon**
- **Banner images stored in Supabase Storage**
- **Banner updates reflect on homepage immediately**

### 6.9 SEO Management
\n#### 6.9.1 Product SEO Management
- **Select product from dropdown with search functionality**
- **Edit product-specific SEO fields:**
  - Meta Title (max 60 characters)
  - Meta Description (max 160 characters)
  - Focus Keywords (comma-separated)
  - Canonical URL (auto-generated)
  - OpenGraph Title, Description, Image
  - Twitter Card Title, Description\n  - Schema Markup (JSON-LD, auto-generated with manual override)
- **SEO Score Indicator (Poor/Fair/Good/Excellent)**\n- **Google Search Result Preview**
- **Save Product SEO button**
\n#### 6.9.2 City SEO Management
- **View all cities in table format**
- **Add new city with city name, state, and SEO fields**
- **Edit city SEO fields:**
  - Meta Title (includes city name)
  - Meta Description (includes city-specific content)
  - Focus Keywords (city + product combinations)
  - Page Heading and Description
  - Featured Products (multi-select)\n  - Schema Markup (LocalBusiness schema)
- **City landing page preview**
- **Save City SEO button**

#### 6.9.3 State SEO Management
- **View all states in table format**
- **Add new state with state name and SEO fields**
- **Edit state SEO fields:**
  - Meta Title (includes state name)
  - Meta Description (includes state-specific content)
  - Focus Keywords (state + product combinations)\n  - Page Heading and Description
  - Featured Products and Cities (multi-select)
  - Schema Markup (Organization schema)\n- **State landing page preview**
- **Save State SEO button**

#### 6.9.4 SEO Tools
- **Bulk SEO optimization for all products**
- **SEO audit report generation**
- **Keyword research suggestions**
- **Competitor analysis tool**
- **Sitemap generation and submission**
- **Robots.txt editor**
- **Google Search Console integration status**
- **SEO performance metrics dashboard**

### 6.10 Website Settings
- Upload website logo (PNG) with Image icon
- Upload favicon (PNG) with Star icon
- Manage social media icons and links: Facebook, LinkedIn, Instagram, Twitter\n- WhatsApp number with Phone icon
- Footer text editing with FileText icon
- Notification settings with Bell icon
- Promotional strip message management with Megaphone icon
- Real-time website updates\n
---

## 7. User Dashboard Features

- View posted requirements with FileText icon
- Track lead status with colorful status badges
- View vendor responses with MessageCircle icon
- Receive real-time notifications with Bell icon
- Edit user profile with Pencil icon
- View profile completion status\n\n---

## 8. Vendor Dashboard Features

- View assigned leads with Users icon\n- Lead status tracking with colorful badges
- Add remarks with MessageSquare icon
- Access contact details with Phone icon
- Performance statistics with TrendingUp icon and colorful charts
- Receive real-time notifications with Bell icon\n\n---

## 9. Database Schema Updates

### 9.1 users Table (Enhanced)
- id (UUID, Primary Key)
- email (TEXT, Unique)
- password_hash (TEXT, nullable for Google OAuth users)
- full_name (TEXT)\n- mobile_number (TEXT)\n- city (TEXT)
- state (TEXT)
- company_name (TEXT, nullable)
- registration_method (TEXT: email/google)
- profile_completed (BOOLEAN, default: false)\n- account_status (TEXT: active/inactive, default: active)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- last_login (TIMESTAMP)
\n### 9.2 product_seo Table\n- id (UUID, Primary Key)
- product_id (UUID, Foreign Key to products table)
- meta_title (TEXT)\n- meta_description (TEXT)\n- focus_keywords (TEXT[])
- canonical_url (TEXT)
- og_title (TEXT)
- og_description (TEXT)
- og_image (TEXT)
- twitter_title (TEXT)
- twitter_description (TEXT)
- schema_markup (JSONB)\n- seo_score (INTEGER)\n- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
\n### 9.3 city_seo Table
- id (UUID, Primary Key)
- city_name (TEXT)
- state_name (TEXT)
- slug (TEXT, Unique)
- meta_title (TEXT)
- meta_description (TEXT)
- focus_keywords (TEXT[])
- page_heading (TEXT)
- page_description (TEXT)
- featured_products (UUID[])
- schema_markup (JSONB)
- is_active (BOOLEAN)\n- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### 9.4 state_seo Table
- id (UUID, Primary Key)
- state_name (TEXT)
- slug (TEXT, Unique)
- meta_title (TEXT)
- meta_description (TEXT)
- focus_keywords (TEXT[])
- page_heading (TEXT)
- page_description (TEXT)
- featured_products (UUID[])
- featured_cities (UUID[])
- schema_markup (JSONB)\n- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

---

## 10. Reference Files

1. UI Screenshot 1: 1000036460.jpg
2. UI Screenshot 2: 1000036462.jpg
3. UI Screenshot 3: 1000036464.jpg
4. UI Screenshot 4: 1000036468.jpg
5. UI Screenshot 5: 1000036466.jpg
\n---

## 11. Deliverables

- **Google OAuth login and signup implementation using OSS Google login method**
- **Profile completion flow for new users with mandatory fields: Name, Mobile Number, Email, Location (City, State), Company Name (optional)**
- **Admin Users Management page with full user data display and management capabilities**
- **User profile data storage in Supabase database**
- Admin panel pages with working forms and colorful UI
- **Latest Product Promotional Banner on homepage**
- **Admin Promotional Banner Management page with full CRUD functionality**
- **Product detail page with complete information display**
- **Contact Us page with support email, address, and contact form**
- **FAQ page with relevant content and accordion-style layout**
- **About Us page with Mission and Vision sections including relevant images**
- **Admin SEO Management page with Product, City, and State SEO sections**
- **Dynamic city landing pages with SEO optimization**
- **Dynamic state landing pages with SEO optimization**
- **Product-wise SEO implementation with meta tags, schema markup, and canonical URLs**
- **City-wise SEO implementation with location-specific content and schema**
- **State-wise SEO implementation with regional content and schema**
- Database schema for Supabase PostgreSQL including users table and SEO tables
- Supabase RLS policies for user data protection
- Excel export logic (.xlsx format)\n- API/data-fetching logic\n- **Dynamic routing for product, city, and state pages with SEO-friendly URLs**
- **Sitemap.xml generation including all product, city, and state pages**\n- **Robots.txt configuration**
- **Schema.org structured data implementation**
- Error handling and empty states
- Production-ready code with scalable architecture
- Comprehensive icon integration across all pages
- Colorful gradient backgrounds and accent colors
\n---

## 12. Additional Notes

- All UI elements must match the provided screenshots exactly with enhanced colorful design
- No redesign or simplification allowed\n- Layout, spacing, colors, cards, buttons, sections, typography, and interactions must be replicated precisely
- Every admin tab must work and load real content
- Every link must be clickable\n- Every form must save and fetch real data
- No placeholder UI, dead routes, or static content
- This is a production system, not a demo
- **Google OAuth must use OSS Google login method, not Google OAuth API**
- **Profile completion is mandatory for all new users before accessing full platform features**
- **Admin can view and manage all registered users with complete profile data**
- **User registration method (Email/Google) must be tracked and displayed in Admin Panel**
- **Clean URL routing without hash symbols: /products/[product-name], /[city-name], /[state-name]**
- **Product detail pages must display complete information with multiple images**
- **About Us page is now publicly accessible and included in navigation and footer**
- **About Us page must include Mission and Vision sections with relevant content and image placeholders**
- **Latest Product Promotional Banner must be fully functional and admin-manageable**
- **SEO optimization must be comprehensive and cover product, city, and state levels**
- **All SEO meta tags, schema markup, and structured data must be dynamically generated**
- **City and state landing pages must be fully functional with real content**
- **Sitemap must include all dynamic pages and be submitted to Google Search Console**
- No broken links\n- Must be production-ready\n- **All sections must include relevant colorful icons from Lucide-React**
- **Gradient backgrounds and vibrant color palette must be applied throughout**
- **Status indicators must use color-coded badges**
- **All buttons and interactive elements must have icons**