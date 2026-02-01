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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 px-1">
      {/* Header */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.span 
          variants={staggerItem}
          className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium text-primary mb-4 sm:mb-6"
        >
          Resume
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-2 sm:mb-4"
        >
          <span className="gradient-text">{hero.name}</span>
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-base sm:text-xl text-muted-foreground"
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
        className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 space-y-6 sm:space-y-8 print:shadow-none print:p-0"
      >
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm pb-4 sm:pb-6 border-b border-border/30">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 sm:gap-2 hover:text-primary transition-colors">
            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="truncate max-w-[150px] sm:max-w-none">{contact.email}</span>
          </a>
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 sm:gap-2 hover:text-primary transition-colors">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {contact.phone}
            </a>
          )}
          <span className="flex items-center gap-1.5 sm:gap-2">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {contact.location}
          </span>
          <a 
            href={socialLinks.find(l => l.platform === 'linkedin')?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 hover:text-primary transition-colors"
          >
            <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            LinkedIn
          </a>
          <a 
            href={socialLinks.find(l => l.platform === 'github')?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 hover:text-primary transition-colors"
          >
            <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            GitHub
          </a>
        </div>

        {/* Summary */}
        <section>
          <h2 className="text-lg sm:text-xl font-display font-bold mb-2 sm:mb-3 text-primary">Professional Summary</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {hero.description}
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg sm:text-xl font-display font-bold mb-3 sm:mb-4 text-primary">Experience</h2>
          <div className="space-y-4 sm:space-y-6">
            {experience.map((exp) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-3 sm:p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">{exp.role}</h3>
                    <p className="text-primary text-xs sm:text-sm">{exp.company} • {exp.industry}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                  {exp.description.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg sm:text-xl font-display font-bold mb-3 sm:mb-4 text-primary">Skills</h2>
          <div className="space-y-2 sm:space-y-3">
            {skillCategories.map((category) => (
              <div key={category.name} className="text-sm sm:text-base">
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
          <h2 className="text-lg sm:text-xl font-display font-bold mb-2 sm:mb-3 text-primary">Education</h2>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
            <div>
              <h3 className="font-bold text-sm sm:text-base">Bachelor of Technology</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Aryabhatta Knowledge University</p>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">Aug 2017 – Oct 2021</span>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
