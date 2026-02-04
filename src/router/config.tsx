import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load components
const Login = lazy(() => import('../pages/login/page'));
const Signup = lazy(() => import('../pages/signup/page'));
const ForgotPassword = lazy(() => import('../pages/forgot-password/page'));
const OTPVerification = lazy(() => import('../pages/otp-verification/page'));
const PharmacySetup = lazy(() => import('../pages/pharmacy-setup/page'));
const Dashboard = lazy(() => import('../pages/home/page'));
const Inventory = lazy(() => import('../pages/inventory/page'));
const Sales = lazy(() => import('../pages/sales/page'));
const Purchase = lazy(() => import('../pages/purchase/page'));
const Orders = lazy(() => import('../pages/orders/page'));
const Customers = lazy(() => import('../pages/customers/page'));
const Suppliers = lazy(() => import('../pages/suppliers/page'));
const Offers = lazy(() => import('../pages/offers/page'));
const Reports = lazy(() => import('../pages/reports/page'));
const Settings = lazy(() => import('../pages/settings/page'));
const Profile = lazy(() => import('../pages/profile/page'));
const SubscriptionPlans = lazy(() => import('../pages/subscription-plans/page'));
const ConfirmPlan = lazy(() => import('../pages/subscription-plans/confirm-plan/page'));
const Payment = lazy(() => import('../pages/subscription-plans/payment/page'));
const Upload = lazy(() => import('../pages/upload/page'));
const HelpSupport = lazy(() => import('../pages/help-support/page'));
const AppSettings = lazy(() => import('../pages/app-settings/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const StaffDashboard = lazy(() => import('../pages/staff-dashboard/page'));
const Staff = lazy(() => import('../pages/staff/page'));
const SuperAdmin = lazy(() => import('../pages/super-admin/page'));
const SuperAdminDashboard = lazy(() => import('../pages/super-admin/dashboard/page'));
const PharmaciesManagement = lazy(() => import('../pages/super-admin/pharmacies/page'));
const SubscriptionPlansManagement = lazy(() => import('../pages/super-admin/plans/page'));
const PaymentsBilling = lazy(() => import('../pages/super-admin/payments/page'));
const OnlineStoreControl = lazy(() => import('../pages/super-admin/online-control/page'));
const OffersControl = lazy(() => import('../pages/super-admin/offers-control/page'));
const SuperAdminReports = lazy(() => import('../pages/super-admin/reports/page'));
const SupportTickets = lazy(() => import('../pages/super-admin/support/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/otp-verification',
    element: <OTPVerification />,
  },
  {
    path: '/pharmacy-setup',
    element: <PharmacySetup />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/inventory',
    element: <Inventory />,
  },
  {
    path: '/sales',
    element: <Sales />,
  },
  {
    path: '/purchase',
    element: <Purchase />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/customers',
    element: <Customers />,
  },
  {
    path: '/suppliers',
    element: <Suppliers />,
  },
  {
    path: '/offers',
    element: <Offers />,
  },
  {
    path: '/reports',
    element: <Reports />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/subscription-plans',
    element: <SubscriptionPlans />,
  },
  {
    path: '/subscription-plans/confirm-plan',
    element: <ConfirmPlan />,
  },
  {
    path: '/subscription-plans/payment',
    element: <Payment />,
  },
  {
    path: '/upload',
    element: <Upload />,
  },
  {
    path: '/help-support',
    element: <HelpSupport />,
  },
  {
    path: '/app-settings',
    element: <AppSettings />,
  },
  {
    path: '/staff-dashboard',
    element: <StaffDashboard />,
  },
  {
    path: '/staff',
    element: <Staff />,
  },
  {
    path: '/super-admin',
    element: <SuperAdmin />,
  },
  {
    path: '/super-admin/dashboard',
    element: <SuperAdminDashboard />,
  },
  {
    path: '/super-admin/pharmacies',
    element: <PharmaciesManagement />,
  },
  {
    path: '/super-admin/plans',
    element: <SubscriptionPlansManagement />,
  },
  {
    path: '/super-admin/payments',
    element: <PaymentsBilling />,
  },
  {
    path: '/super-admin/online-control',
    element: <OnlineStoreControl />,
  },
  {
    path: '/super-admin/offers',
    element: <OffersControl />,
  },
  {
    path: '/super-admin/reports',
    element: <SuperAdminReports />,
  },
  {
    path: '/super-admin/support',
    element: <SupportTickets />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
