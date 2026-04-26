import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import PostRequirementPage from './pages/PostRequirementPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeadsPage from './pages/admin/AdminLeadsPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminVendorsPage from './pages/admin/AdminVendorsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminBlogsPage from './pages/admin/AdminBlogsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import CityServicesPage from './pages/CityServicesPage';
import StateServicesPage from './pages/StateServicesPage';
import NotFound from './pages/NotFound';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'Products',
    path: '/products',
    element: <ProductsPage />
  },
  {
    name: 'Product Detail',
    path: '/products/:slug',
    element: <ProductDetailPage />
  },
  {
    name: 'Blog',
    path: '/blog',
    element: <BlogListPage />
  },
  {
    name: 'Blog Detail',
    path: '/blog/:slug',
    element: <BlogDetailPage />
  },
  {
    name: 'Post Requirement',
    path: '/post-requirement',
    element: <PostRequirementPage />
  },
  {
    name: 'About',
    path: '/about',
    element: <AboutPage />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <ContactPage />
  },
  {
    name: 'FAQ',
    path: '/faq',
    element: <FAQPage />
  },
  {
    name: 'City Services',
    path: '/services/:citySlug',
    element: <CityServicesPage />
  },
  {
    name: 'State Services',
    path: '/services/state/:stateSlug',
    element: <StateServicesPage />
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />
  },
  {
    name: 'Register',
    path: '/register',
    element: <RegisterPage />
  },
  {
    name: 'User Dashboard',
    path: '/user/dashboard',
    element: <UserDashboard />
  },
  {
    name: 'Admin Dashboard',
    path: '/admin',
    element: <AdminDashboard />
  },
  {
    name: 'Admin Leads',
    path: '/admin/leads',
    element: <AdminLeadsPage />
  },
  {
    name: 'Admin Products',
    path: '/admin/products',
    element: <AdminProductsPage />
  },
  {
    name: 'Admin Vendors',
    path: '/admin/vendors',
    element: <AdminVendorsPage />
  },
  {
    name: 'Admin Categories',
    path: '/admin/categories',
    element: <AdminCategoriesPage />
  },
  {
    name: 'Admin Blogs',
    path: '/admin/blogs',
    element: <AdminBlogsPage />
  },
  {
    name: 'Admin Settings',
    path: '/admin/settings',
    element: <AdminSettingsPage />
  },
  {
    name: 'Admin Users',
    path: '/admin/users',
    element: <AdminUsersPage />
  },
  {
    name: 'Not Found',
    path: '/404',
    element: <NotFound />
  }
];

export default routes;
