import type { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  meta: {
    title: 'Vaibhav Kumar | Senior Software Engineer',
    description: 'Senior Frontend Developer specializing in creating performant, accessible, and visually stunning web applications with React, TypeScript, and modern web technologies.',
    siteUrl: 'https://vaibhavkumar.in',
    ogImage: '/og-image.png',
    twitterHandle: '@vaibhavkumarswe',
    keywords: [
      'Senior Software Engineer',
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
    name: 'Vaibhav Kumar',
    title: 'Senior Software Engineer',
    tagline: 'I craft exceptional digital experiences',
    description: 'A senior frontend developer specializing in creating performant, accessible, and visually stunning web applications with React, TypeScript, and cutting-edge technologies.',
    ctaPrimary: {
      label: 'Explore My Work',
      href: '/projects',
    },
    ctaSecondary: {
      label: 'Get In Touch',
      href: '/contact',
    },
    highlights: [
      { value: '4+', label: 'Years Experience' },
      { value: '50+', label: 'Projects Delivered' },
      { value: '100%', label: 'Client Satisfaction' },
    ],
    codeSnippet: {
      filename: 'developer.ts',
      code: `const developer = {
  name: "Vaibhav Kumar",
  role: "Senior Software Engineer",
  passion: ["React", "TypeScript", "UI/UX"],
  currentFocus: "Building scalable web apps",
  coffee: Infinity,
};`,
    },
  },

  about: {
    title: 'About Me',
    subtitle: 'Building the web, one component at a time',
    bio: [
      'I\'m a Senior Software Engineer with 4+ years of experience crafting exceptional digital experiences. My journey in software development started with a curiosity about how websites work, which evolved into a deep passion for creating performant, accessible, and beautifully designed web applications.',
      'Currently, I lead frontend development at WebileApps (Kfintech), where I architect Wealth Management Systems for NBFCs serving 100,000+ users. I specialize in React.js, TypeScript, and modern frontend technologies, with a strong focus on scalable architecture and developer experience.',
      'When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, or writing technical articles. I believe in continuous learning and sharing knowledge with the developer community.',
    ],
    resumeUrl: '/resume.pdf',
    currentFocus: [
      'Building scalable frontend architectures',
      'Performance optimization',
      'Design systems & component libraries',
      'AI-powered developer tools',
    ],
    funFacts: [
      { icon: '☕', label: 'Coffee Consumed', value: '∞ cups' },
      { icon: '💻', label: 'Lines of Code', value: '500K+' },
      { icon: '🎯', label: 'Bugs Squashed', value: '10K+' },
      { icon: '📚', label: 'Books Read', value: '50+' },
    ],
  },

  experience: [
    {
      id: 'webileapps',
      role: 'Senior Software Engineer',
      company: 'WebileApps (Kfintech)',
      industry: 'Fintech',
      location: 'Hyderabad, Telangana',
      startDate: '2025-03',
      endDate: 'Present',
      type: 'full-time',
      description: [
        'Led frontend architecture and development of a Wealth Management System (WMS) for NBFCs, implementing role-based access control (RBAC) for 4+ user roles using React.js, TypeScript, Material UI.',
        'Built 15+ reusable, prop-driven UI components and functions, improving development velocity.',
        'Implemented Highcharts to deliver 10+ interactive visualizations for asset allocation and portfolio analytics.',
        'Designed a scalable frontend architecture supporting 100,000+ users and integrated BSE Star APIs for secure mutual fund transactions.',
        'Optimized frontend performance through code-splitting and render optimization, improving load times and user experience at scale.',
        'Established CI/CD pipelines and code quality gates (linting, unit and integration testing, PR templates), mentored 4+ engineers through code reviews and MR evaluations, reducing post-release defects by 30%.',
      ],
      technologies: ['React.js', 'TypeScript', 'Material UI', 'Highcharts', 'Redux', 'REST APIs'],
    },
    {
      id: 'swift-security',
      role: 'Sr. Frontend Developer',
      company: 'Swift Security (Concentric AI)',
      industry: 'AI SaaS',
      location: 'US, Remote',
      startDate: '2024-10',
      endDate: '2025-03',
      type: 'remote',
      description: [
        'Engineered a secure browser extension using Plasmo, React.js, and TypeScript, enabling advanced content script injection with 100% AI interaction tracking.',
        'Developed event interception middleware using DOM Manipulation to capture and control 100% of LLM interactions, including blocking copy, paste, download, and print actions across platforms such as ChatGPT, Claude, and Gemini.',
        'Implemented sensitive data protection features by intercepting LLM event APIs, automatically blurring 100% sensitive information and securely capturing screenshots when required.',
      ],
      technologies: ['React.js', 'TypeScript', 'Plasmo', 'Chrome Extensions', 'DOM Manipulation'],
    },
    {
      id: 'tcs',
      role: 'Software Developer',
      company: 'TCS (Client: Pfizer Inc.)',
      industry: 'Healthcare',
      location: 'Kolkata, West Bengal',
      startDate: '2022-01',
      endDate: '2024-09',
      type: 'full-time',
      description: [
        'Coded user interfaces for a large-scale Data Management Platform, integrating 25+ REST APIs with pagination, filtering, and search parameters.',
        'Collaborated within a 7-member Agile team, delivering user stories with a 20% faster turnaround through effective sprint planning and Jira tracking.',
        'Architected 30+ modular, reusable React components using Tailwind CSS and prop-based design, improving UI consistency and development efficiency.',
      ],
      technologies: ['React.js', 'Tailwind CSS', 'REST APIs', 'Jira', 'Agile'],
    },
    {
      id: 'ayushya',
      role: 'Frontend Developer',
      company: 'Ayushya Healthcare',
      industry: 'Healthcare',
      location: 'Mumbai, Maharashtra',
      startDate: '2021-06',
      endDate: '2021-12',
      type: 'full-time',
      description: [
        'Improved website SEO through HTML and CSS optimizations, achieving top-three Google search rankings for 10+ high-value keywords and driving sustained organic traffic growth.',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
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
        { name: 'Redux', category: 'library', proficiency: 'expert' },
        { name: 'Redux Saga', category: 'library', proficiency: 'advanced' },
        { name: 'React Router v6', category: 'library', proficiency: 'expert' },
        { name: 'Material UI', category: 'library', proficiency: 'expert' },
        { name: 'Tailwind CSS', category: 'library', proficiency: 'expert' },
        { name: 'shadcn/ui', category: 'library', proficiency: 'expert' },
        { name: 'SCSS', category: 'library', proficiency: 'advanced' },
        { name: 'React Hook Form', category: 'library', proficiency: 'expert' },
        { name: 'Zod', category: 'library', proficiency: 'advanced' },
        { name: 'Recharts', category: 'library', proficiency: 'advanced' },
        { name: 'Framer Motion', category: 'library', proficiency: 'advanced' },
      ],
    },
    {
      name: 'Development Tools',
      description: 'Workflow optimization',
      skills: [
        { name: 'Git', category: 'tool', proficiency: 'expert' },
        { name: 'GitHub', category: 'tool', proficiency: 'expert' },
        { name: 'Webpack', category: 'tool', proficiency: 'advanced' },
        { name: 'Vite', category: 'tool', proficiency: 'advanced' },
        { name: 'npm/yarn', category: 'tool', proficiency: 'expert' },
        { name: 'Postman', category: 'tool', proficiency: 'expert' },
        { name: 'Jira', category: 'tool', proficiency: 'advanced' },
        { name: 'Figma', category: 'tool', proficiency: 'advanced' },
      ],
    },
    {
      name: 'Testing & Best Practices',
      description: 'Quality assurance',
      skills: [
        { name: 'React Testing Library', category: 'testing', proficiency: 'advanced' },
        { name: 'Jest', category: 'testing', proficiency: 'advanced' },
        { name: 'Test-Driven Development', category: 'practice', proficiency: 'advanced' },
        { name: 'Responsive Design', category: 'practice', proficiency: 'expert' },
        { name: 'Performance Optimization', category: 'practice', proficiency: 'expert' },
        { name: 'Agile Methodology', category: 'practice', proficiency: 'expert' },
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
      githubUrl: 'https://github.com/vaibhavkumarswe/acadex',
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
      githubUrl: 'https://github.com/vaibhavkumarswe/inspectcode',
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
      githubUrl: 'https://github.com/vaibhavkumarswe/hmr-extension',
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
      id: 'building-design-systems',
      title: 'Building Scalable Design Systems',
      excerpt: 'A comprehensive guide to creating reusable component libraries that scale with your team and product.',
      date: '2024-10-05',
      readTime: '12 min read',
      tags: ['Design Systems', 'React', 'UI/UX'],
    },
  ],

  testimonials: [
    {
      id: '1',
      quote: 'Vaibhav is an exceptional technical leader who I had the pleasure of working with on multiple projects. Their deep technical expertise, combined with their leadership skills, made a significant impact on the success of our project. They have an unparalleled ability to break down complex technical challenges, propose effective solutions, and guide the team through execution smoothly. What I particularly admire about Vaibhav is their focus on mentoring team members and fostering a culture of learning and innovation.',
      author: 'Ashish Dhagat',
      role: 'Assistant Consultant',
      company: 'TCS',
    },
  ],

  contact: {
    email: 'vaibhavkumarswe@gmail.com',
    phone: '+91 7044533675',
    location: 'Hyderabad, India',
    availability: 'Open to new opportunities',
  },

  socialLinks: [
    { platform: 'github', url: 'https://github.com/vaibhavkumarswe', label: 'GitHub' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/vaibhavkumarswe', label: 'LinkedIn' },
    { platform: 'leetcode', url: 'https://leetcode.com/u/vaibhavkumarswe', label: 'LeetCode' },
    { platform: 'email', url: 'mailto:vaibhavkumarswe@gmail.com', label: 'Email' },
  ],

  uses: [
    {
      category: 'Editor & Terminal',
      items: [
        { name: 'VS Code', description: 'Primary code editor with custom theme and extensions' },
        { name: 'iTerm2', description: 'Terminal emulator with Oh My Zsh' },
        { name: 'GitHub Copilot', description: 'AI-powered code completion' },
      ],
    },
    {
      category: 'Design & Productivity',
      items: [
        { name: 'Figma', description: 'UI/UX design and prototyping' },
        { name: 'Notion', description: 'Notes, docs, and project management' },
        { name: 'Linear', description: 'Issue tracking and project management' },
      ],
    },
    {
      category: 'Tech Stack',
      items: [
        { name: 'React + TypeScript', description: 'Primary frontend stack' },
        { name: 'Tailwind CSS', description: 'Utility-first styling' },
        { name: 'Vite', description: 'Build tool and dev server' },
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
