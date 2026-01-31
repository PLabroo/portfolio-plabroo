import { motion } from 'framer-motion';
import { Download, ExternalLink, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';

export default function ResumePage() {
  const { hero, experience, skillCategories, contact, socialLinks } = portfolioData;

  const formatDate = (date: string) => {
    if (date === 'Present') return date;
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.span 
          variants={staggerItem}
          className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6"
        >
          Resume
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          {hero.name}
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-xl text-muted-foreground"
        >
          {hero.title}
        </motion.p>
      </motion.section>

      {/* Download Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <Button size="lg" className="group">
          <Download className="mr-2 h-4 w-4" />
          Download PDF Resume
          <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </motion.div>

      {/* Resume Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8 lg:p-10 space-y-8 print:shadow-none print:p-0"
      >
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm pb-6 border-b border-border/50">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            {contact.email}
          </a>
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              {contact.phone}
            </a>
          )}
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {contact.location}
          </span>
          <a 
            href={socialLinks.find(l => l.platform === 'linkedin')?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a 
            href={socialLinks.find(l => l.platform === 'github')?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>

        {/* Summary */}
        <section>
          <h2 className="text-xl font-display font-bold mb-3 text-primary">Professional Summary</h2>
          <p className="text-muted-foreground leading-relaxed">
            {hero.description}
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-display font-bold mb-4 text-primary">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold">{exp.role}</h3>
                    <p className="text-primary">{exp.company} • {exp.industry}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-display font-bold mb-4 text-primary">Skills</h2>
          <div className="space-y-3">
            {skillCategories.map((category) => (
              <div key={category.name}>
                <span className="font-semibold">{category.name}: </span>
                <span className="text-muted-foreground">
                  {category.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-display font-bold mb-3 text-primary">Education</h2>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-bold">Bachelor of Technology</h3>
              <p className="text-muted-foreground">Aryabhatta Knowledge University</p>
            </div>
            <span className="text-sm text-muted-foreground">Aug 2017 – Oct 2021</span>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
