import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function ExperiencePage() {
  const { experience } = portfolioData;

  const formatDate = (date: string) => {
    if (date === 'Present') return date;
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
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
          Career Journey
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          Work Experience
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Building products that impact millions of users across industries
        </motion.p>
      </motion.section>

      {/* Timeline */}
      <section className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

        <div className="space-y-12">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10">
                {exp.endDate === 'Present' && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
                )}
              </div>

              {/* Date card - left/right alternating on desktop */}
              <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </span>
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <motion.article
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-3xl p-6 lg:p-8"
                >
                  {/* Mobile date */}
                  <div className="md:hidden flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </span>
                  </div>

                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-display font-bold">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-primary font-medium">
                          <Building2 className="h-4 w-4" />
                          {exp.company}
                          {exp.companyUrl && (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary/80"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      {exp.endDate === 'Present' && (
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="tag">{exp.industry}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                      <span className="tag capitalize">{exp.type}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tag tag-primary text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-3xl p-8"
      >
        <h2 className="text-2xl font-display font-bold mb-6">Education</h2>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🎓</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Bachelor of Technology</h3>
            <p className="text-primary">Aryabhatta Knowledge University</p>
            <p className="text-sm text-muted-foreground">Aug 2017 – Oct 2021</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
