import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { cn } from '@/lib/utils';

export default function SkillsPage() {
  const { skillCategories } = portfolioData;

  const proficiencyColors = {
    expert: 'bg-green-500',
    advanced: 'bg-blue-500',
    intermediate: 'bg-yellow-500',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16">
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
          Technical Arsenal
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          Skills & Expertise
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          A comprehensive toolkit honed through years of building production applications
        </motion.p>
      </motion.section>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-6"
      >
        {Object.entries(proficiencyColors).map(([level, color]) => (
          <div key={level} className="flex items-center gap-2 text-sm">
            <span className={cn("w-3 h-3 rounded-full", color)} />
            <span className="capitalize text-muted-foreground">{level}</span>
          </div>
        ))}
      </motion.div>

      {/* Skill Categories */}
      <div className="space-y-12">
        {skillCategories.map((category, catIndex) => (
          <motion.section
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-display font-bold mb-2">{category.name}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: skillIndex * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-4 relative overflow-hidden group cursor-default"
                >
                  {/* Proficiency indicator */}
                  <div className={cn(
                    "absolute top-3 right-3 w-2 h-2 rounded-full",
                    proficiencyColors[skill.proficiency]
                  )} />

                  <span className="font-medium text-sm">{skill.name}</span>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* All Skills Cloud */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-3xl p-8 lg:p-10"
      >
        <h2 className="text-2xl font-display font-bold mb-6 text-center">All Technologies</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skillCategories.flatMap(cat => cat.skills).map((skill, index) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.1 }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-default",
                skill.proficiency === 'expert' 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "glass hover:bg-secondary"
              )}
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
