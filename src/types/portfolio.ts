// Portfolio Data Types

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'leetcode' | 'email' | 'website' | 'youtube' | 'instagram';
  url: string;
  label: string;
}

export interface MetaInfo {
  title: string;
  description: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle?: string;
  keywords: string[];
}

export interface HeroData {
  greeting: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
  highlights: {
    value: string;
    label: string;
  }[];
  codeSnippet: {
    filename: string;
    code: string;
  };
}

export interface AboutData {
  title: string;
  subtitle: string;
  bio: string[];
  image?: string;
  resumeUrl: string;
  currentFocus: string[];
  funFacts: {
    icon: string;
    label: string;
    value: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  industry: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
  type: 'full-time' | 'contract' | 'freelance' | 'remote';
}

export interface Skill {
  name: string;
  icon?: string;
  category: string;
  proficiency: 'expert' | 'advanced' | 'intermediate';
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'extension' | 'saas' | 'open-source';
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  url?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  availability: string;
  calendlyUrl?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  description?: string;
}

export interface UseItem {
  category: string;
  items: {
    name: string;
    description: string;
    url?: string;
  }[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Education{
  domain:"Bachelor of Engineering",
  branch:"Computer Science",
  college:"JSS Science and Technology University",
  duration:"2017-2021"
}

export interface EmailJs{
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export interface PortfolioData {
  meta: MetaInfo;
  navigation: NavigationItem[];
  moreNavigation: NavigationItem[];
  hero: HeroData;
  about: AboutData;
  experience: Experience[];
  skillCategories: SkillCategory[];
  projects: Project[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
  uses: UseItem[];
  process: ProcessStep[];
  education:Education;
  emailjsConfig:EmailJs;
}
