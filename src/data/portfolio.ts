import type { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  meta: {
    title: 'Prateek Labroo | Software Engineer',
    description: 'Software Engineer specializing in creating performant, accessible, and scalable web applications with React, TypeScript, and modern frontend technologies.',
    siteUrl: 'https://prateeklabroo.dev',
    ogImage: '/og-image.png',
    twitterHandle: '@prateeklabroo',
    keywords: [
      'Software Engineer',
      'Frontend Developer',
      'React Developer',
      'TypeScript',
      'JavaScript',
      'Web Development',
      'UI/UX',
      'Full Stack',
    ],
  },

  navigation: [
    { label: 'Home', href: '/', icon: 'Home', description: 'Back to homepage' },
    { label: 'About', href: '/about', icon: 'User', description: 'Learn more about me' },
    { label: 'Experience', href: '/experience', icon: 'Briefcase', description: 'My work history' },
    { label: 'Projects', href: '/projects', icon: 'Folder', description: 'Featured projects' },
    { label: 'Contact', href: '/contact', icon: 'Mail', description: 'Get in touch' },
  ],

  moreNavigation: [
    { label: 'Skills', href: '/skills', icon: 'Sparkles', description: 'Technical expertise' },
    { label: 'System Design', href: '/system-design', icon: 'Layers', description: 'Architecture & patterns' },
    { label: 'Games', href: '/games', icon: 'Gamepad2', description: 'Fun coding games' },
    { label: 'Blog', href: '/blog', icon: 'PenTool', description: 'Thoughts and tutorials' },
    { label: 'Resume', href: '/resume', icon: 'FileText', description: 'Download my CV' },
    { label: 'Uses', href: '/uses', icon: 'Laptop', description: 'Tools I use' },
  ],

  hero: {
    greeting: 'Hello, I\'m',
    name: 'Prateek Labroo',
    title: 'Software Engineer',
    tagline: 'I craft exceptional digital experiences',
    description: 'A software engineer specializing in creating performant, accessible, and scalable web applications with React, TypeScript, and cutting-edge technologies.',
    ctaPrimary: {
      label: 'Explore My Work',
      href: '/projects',
    },
    ctaSecondary: {
      label: 'Get In Touch',
      href: '/contact',
    },
    highlights: [
      { value: '3+', label: 'Years Experience' },
      { value: '100K+', label: 'Users Onboarded' },
      { value: '99.9%', label: 'Uptime Maintained' },
    ],
    codeSnippet: {
      filename: 'developer.ts',
      code: `const developer = {
  name: "Prateek Labroo",
  role: "Software Engineer",
  passion: ["React", "TypeScript", "Performance"],
  currentFocus: "Building scalable fintech apps",
  coffee: Infinity,
};`,
    },
  },

  about: {
    title: 'About Me',
    subtitle: 'Building the web, one component at a time',
    bio: [
      'I\'m a Software Engineer with 3+ years of experience crafting exceptional digital experiences. My journey in software development started with a deep curiosity about how systems work, which evolved into a passion for creating performant, accessible, and beautifully designed web applications.',
      'Currently, I work at KFintech building Wealth Management Systems for NBFCs serving 100,000+ users. I specialize in React.js, TypeScript, and modern frontend technologies, with a strong focus on scalable architecture, accessibility, and performance optimization.',
      'Previously, I worked as a Site Reliability Engineer at Dish Networks maintaining 99.9% uptime for Sling TV serving 10M+ users. This experience gave me a unique perspective on building reliable, scalable systems.',
    ],
    resumeUrl: '/resume.pdf',
    currentFocus: [
      'Building scalable frontend architectures',
      'Performance optimization & code splitting',
      'Accessibility-compliant components (WCAG 2.1)',
      'Fintech & payment integrations',
    ],
    funFacts: [
      { icon: '☕', label: 'Coffee Consumed', value: '∞ cups' },
      { icon: '👥', label: 'Users Onboarded', value: '100K+' },
      { icon: '⏱️', label: 'Uptime Maintained', value: '99.9%' },
      { icon: '🎯', label: 'API Errors Reduced', value: '12%' },
    ],
  },

  experience: [
    {
      id: 'kfintech-se',
      role: 'Software Engineer',
      company: 'KFintech',
      industry: 'Fintech',
      location: 'Hyderabad, Telangana',
      startDate: '2024-04',
      endDate: 'Present',
      type: 'full-time',
      description: [
        'Built RBAC (4+ roles) + Formik/Yup workflows with React, TypeScript, MUI, Redux Toolkit; onboarded 100K+ users via BSE Star.',
        'Delivered customised NAV dashboards + analytics, calculators for Aditya Birla, Tata Capital using HighCharts library.',
        'Optimized frontend performance using code splitting, error boundaries, and efficient API handling reducing API errors by 12%.',
      ],
      technologies: ['React.js', 'TypeScript', 'Material UI', 'Redux Toolkit', 'HighCharts', 'Formik', 'Yup'],
    },
    {
      id: 'webileapps-ase',
      role: 'Associate Software Engineer',
      company: 'WebileApps (KFintech)',
      industry: 'Fintech',
      location: 'Hyderabad, Telangana',
      startDate: '2023-04',
      endDate: '2024-04',
      type: 'full-time',
      description: [
        'Integrated Billdesk gateway achieving 95% transaction accuracy & 25% faster page loads via RTK Query caching on Redux Toolkit.',
        'Engineered accessibility-compliant React components (WCAG 2.1 AA) with keyboard navigation, screen reader support; reduced accessibility issues 10%.',
      ],
      technologies: ['React.js', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Accessibility', 'WCAG 2.1'],
    },
    {
      id: 'dish-sre',
      role: 'Site Reliability Engineer (SRE)',
      company: 'Dish Networks',
      industry: 'Media & Entertainment',
      location: 'Bangalore, Karnataka',
      startDate: '2021-08',
      endDate: '2022-07',
      type: 'full-time',
      description: [
        'Maintained 99.9% uptime for Sling TV (10M+ users) using New Relic, Grafana, SLO alerting.',
        'Built UI monitoring dashboard reducing MTTR 19% via log anomaly detection.',
      ],
      technologies: ['New Relic', 'Grafana', 'SLO Alerting', 'Monitoring', 'Log Analytics'],
    },
  ],

  skillCategories: [
    {
      name: 'Core Technologies',
      description: 'Foundation of my technical expertise',
      skills: [
        { name: 'JavaScript (ES6+)', category: 'core', proficiency: 'expert' },
        { name: 'TypeScript', category: 'core', proficiency: 'expert' },
        { name: 'React.js', category: 'core', proficiency: 'expert' },
        { name: 'HTML5', category: 'core', proficiency: 'expert' },
        { name: 'CSS3', category: 'core', proficiency: 'expert' },
      ],
    },
    {
      name: 'Frontend Libraries',
      description: 'Tools that power my applications',
      skills: [
        { name: 'Redux Toolkit', category: 'library', proficiency: 'expert' },
        { name: 'Redux Saga', category: 'library', proficiency: 'advanced' },
        { name: 'React Router v6', category: 'library', proficiency: 'expert' },
        { name: 'RTK Query', category: 'library', proficiency: 'expert' },
        { name: 'Material UI', category: 'library', proficiency: 'expert' },
        { name: 'Tailwind CSS', category: 'library', proficiency: 'expert' },
        { name: 'shadcn/ui', category: 'library', proficiency: 'expert' },
        { name: 'SCSS', category: 'library', proficiency: 'advanced' },
        { name: 'React Hook Form', category: 'library', proficiency: 'expert' },
        { name: 'Formik', category: 'library', proficiency: 'expert' },
        { name: 'Zod', category: 'library', proficiency: 'advanced' },
        { name: 'Yup', category: 'library', proficiency: 'expert' },
        { name: 'Recharts', category: 'library', proficiency: 'advanced' },
        { name: 'HighCharts', category: 'library', proficiency: 'advanced' },
      ],
    },
    {
      name: 'Development Tools',
      description: 'Workflow optimization',
      skills: [
        { name: 'Git', category: 'tool', proficiency: 'expert' },
        { name: 'GitHub', category: 'tool', proficiency: 'expert' },
        { name: 'Webpack', category: 'tool', proficiency: 'advanced' },
        { name: 'Babel', category: 'tool', proficiency: 'advanced' },
        { name: 'npm', category: 'tool', proficiency: 'expert' },
        { name: 'Postman', category: 'tool', proficiency: 'expert' },
        { name: 'Jira', category: 'tool', proficiency: 'advanced' },
        { name: 'Figma', category: 'tool', proficiency: 'advanced' },
        { name: 'New Relic', category: 'tool', proficiency: 'advanced' },
        { name: 'Grafana', category: 'tool', proficiency: 'advanced' },
      ],
    },
    {
      name: 'Testing & Best Practices',
      description: 'Quality assurance',
      skills: [
        { name: 'React Testing Library', category: 'testing', proficiency: 'advanced' },
        { name: 'Unit Testing', category: 'testing', proficiency: 'advanced' },
        { name: 'Test-Driven Development', category: 'practice', proficiency: 'advanced' },
        { name: 'Responsive Design', category: 'practice', proficiency: 'expert' },
        { name: 'Cross-Browser Compatibility', category: 'practice', proficiency: 'expert' },
        { name: 'Performance Optimization', category: 'practice', proficiency: 'expert' },
        { name: 'Agile Methodology', category: 'practice', proficiency: 'expert' },
        { name: 'Accessibility (WCAG 2.1)', category: 'practice', proficiency: 'expert' },
      ],
    },
  ],

  projects: [
    {
      id: 'acadex',
      title: 'AcadEx: Academy Management System',
      description: 'Full-featured academy management platform with RBAC for 6+ roles, payment processing, and AI-driven features.',
      longDescription: 'Led end-to-end development of AcadEx, automating over 70% of routine administrative tasks through intelligent automation.',
      technologies: ['React.js', 'TypeScript', 'Redux Toolkit', 'React Router', 'React Hook Form', 'Tailwind', 'Zod'],
      githubUrl: 'https://github.com/prateeklabroo/acadex',
      featured: true,
      category: 'saas',
      highlights: [
        'Role-based access control for 6+ user types',
        'Integrated payment processing',
        'AI-driven automation features',
        '70% reduction in administrative tasks',
      ],
    },
    {
      id: 'inspectcode',
      title: 'InspectCode: Developer Platform',
      description: 'Centralized developer resource platform featuring code snippets, blogs, quick-start guides, and AI solutions.',
      longDescription: 'Designed and launched a comprehensive developer resource hub that increased user engagement by 45% within the first quarter.',
      technologies: ['React.js', 'TypeScript', 'shadcn/ui', 'MDX'],
      githubUrl: 'https://github.com/prateeklabroo/inspectcode',
      featured: true,
      category: 'web',
      highlights: [
        '30+ curated code snippets',
        'Interactive blog platform',
        'AI-powered solutions',
        '45% engagement increase',
      ],
    },
    {
      id: 'hmr-extension',
      title: 'HMR Extension: Secure Communication',
      description: 'Chrome extension with payload encryption, secure credential storage, and embedded chat application.',
      longDescription: 'Created a secure browser extension used by 10+ internal engineering teams for encrypted communications.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'DOM Manipulation', 'Node.js', 'Chrome APIs'],
      githubUrl: 'https://github.com/prateeklabroo/hmr-extension',
      featured: true,
      category: 'extension',
      highlights: [
        'End-to-end encryption',
        'Secure credential storage',
        'Platform access control',
        'Used by 10+ engineering teams',
      ],
    },
  ],

  blogPosts: [
    {
      id: 'react-performance',
      title: 'Optimizing React Performance: A Deep Dive',
      excerpt: 'Learn advanced techniques for improving React application performance through code-splitting, memoization, and virtual DOM optimization.',
      date: '2024-12-15',
      readTime: '8 min read',
      tags: ['React', 'Performance', 'JavaScript'],
    },
    {
      id: 'typescript-patterns',
      title: 'TypeScript Design Patterns for Frontend',
      excerpt: 'Explore practical TypeScript patterns that make your frontend code more maintainable, scalable, and type-safe.',
      date: '2024-11-20',
      readTime: '10 min read',
      tags: ['TypeScript', 'Design Patterns', 'Architecture'],
    },
    {
      id: 'accessibility-react',
      title: 'Building Accessible React Components',
      excerpt: 'A comprehensive guide to creating WCAG 2.1 compliant components with keyboard navigation and screen reader support.',
      date: '2024-10-05',
      readTime: '12 min read',
      tags: ['Accessibility', 'React', 'WCAG'],
    },
  ],

  testimonials: [
    {
      id: '1',
      quote: 'Prateek is an exceptional engineer with deep expertise in frontend development and performance optimization. His work on accessibility-compliant components and payment integrations significantly improved our product quality and user experience.',
      author: 'Team Lead',
      role: 'Engineering Manager',
      company: 'KFintech',
    },
  ],

  contact: {
    email: 'prateeklabrooswe@gmail.com',
    phone: '+91 9682605997',
    location: 'Hyderabad, India',
    availability: 'Open to new opportunities',
  },

  socialLinks: [
    { platform: 'github', url: 'https://github.com/prateeklabroo', label: 'GitHub' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/prateeklabroo', label: 'LinkedIn' },
    { platform: 'leetcode', url: 'https://leetcode.com/u/prateeklabroo', label: 'LeetCode' },
    { platform: 'email', url: 'mailto:prateeklabrooswe@gmail.com', label: 'Email' },
  ],

  uses: [
    {
      category: 'Editor & Terminal',
      items: [
        { name: 'VS Code', description: 'Primary code editor with custom theme and extensions' },
        { name: 'Terminal', description: 'Command line with Oh My Zsh' },
        { name: 'GitHub Copilot', description: 'AI-powered code completion' },
      ],
    },
    {
      category: 'Design & Productivity',
      items: [
        { name: 'Figma', description: 'UI/UX design and prototyping' },
        { name: 'Jira', description: 'Project management and issue tracking' },
        { name: 'Postman', description: 'API testing and documentation' },
      ],
    },
    {
      category: 'Monitoring & DevOps',
      items: [
        { name: 'New Relic', description: 'Application performance monitoring' },
        { name: 'Grafana', description: 'Metrics visualization and dashboards' },
        { name: 'Git', description: 'Version control' },
      ],
    },
  ],

  process: [
    {
      step: 1,
      title: 'Discovery',
      description: 'Understanding your vision, goals, and requirements through collaborative discussions.',
      icon: 'Search',
    },
    {
      step: 2,
      title: 'Strategy',
      description: 'Crafting the perfect technical approach and architecture for your project.',
      icon: 'Lightbulb',
    },
    {
      step: 3,
      title: 'Development',
      description: 'Building with clean, scalable code and continuous communication.',
      icon: 'Code',
    },
    {
      step: 4,
      title: 'Launch',
      description: 'Deploying your polished product and providing ongoing support.',
      icon: 'Rocket',
    },
  ],
};

export default portfolioData;
