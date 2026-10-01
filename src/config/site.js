/**
 * Central place for navigation and call-to-action destinations.
 * Replace the app routes below with the real VeeDesk application URLs
 * once the login / sign-up / demo-request flows are available.
 */
export const site = {
  name: 'VeeDesk',
  tagline: 'Employee Management, Simplified.',
  links: {
    login: '/login',
    getStarted: '/signup',
    bookDemo: '/demo',
  },
};

export const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Security', href: '#security' },
];

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Employee Management', href: '#features' },
      { label: 'Attendance', href: '#attendance' },
      { label: 'Leave', href: '#features' },
      { label: 'Work Allocation', href: '#work' },
      { label: 'Performance', href: '#analytics' },
      { label: 'Reports', href: '#reports' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];
