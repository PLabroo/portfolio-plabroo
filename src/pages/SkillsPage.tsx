import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import {
  staggerContainer,
  staggerItem,
} from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Code2 } from "lucide-react";

export default function SkillsPage() {
  const { skillCategories } = portfolioData;

  const proficiencyConfig = {
    expert: {
      color: "bg-emerald",
      bg: "from-emerald/15 to-cyan/10",
      text: "text-emerald",
      border: "border-emerald/20",
    },
    advanced: {
      color: "bg-primary",
      bg: "from-primary/15 to-accent/10",
      text: "text-primary",
      border: "border-primary/20",
    },
    intermediate: {
      color: "bg-amber",
      bg: "from-amber/15 to-orange/10",
      text: "text-amber",
      border: "border-amber/20",
    },
  };

  const categoryColors = [
    {
      gradient: "from-primary/10 to-accent/5",
      icon: "from-primary to-accent",
      iconBg: "bg-primary/10",
    },
    {
      gradient: "from-cyan/10 to-emerald/5",
      icon: "from-cyan to-emerald",
      iconBg: "bg-cyan/10",
    },
    {
      gradient: "from-rose/10 to-orange/5",
      icon: "from-rose to-orange",
      iconBg: "bg-rose/10",
    },
    {
      gradient: "from-violet/10 to-accent/5",
      icon: "from-violet to-accent",
      iconBg: "bg-violet/10",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 sm:space-y-16 px-1">
      {/* Header */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.span
          variants={staggerItem}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm font-medium bg-gradient-to-r from-primary/10 to-accent/10 text-primary mb-4 sm:mb-6"
        >
          <Zap className="w-4 h-4" />
          Technical Arsenal
        </motion.span>
        <motion.h1
          variants={staggerItem}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4"
        >
          Skills & <span className="gradient-text">Expertise</span>
        </motion.h1>
        <motion.p
          variants={staggerItem}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
        >
          A comprehensive toolkit honed through years of building production
          applications
        </motion.p>
      </motion.section>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 sm:gap-6"
      >
        {Object.entries(proficiencyConfig).map(([level, config]) => (
          <div
            key={level}
            className={cn(
              "flex items-center gap-2 text-xs sm:text-sm px-3 py-1.5 rounded-full glass",
              config.border,
            )}
          >
            <span
              className={cn(
                "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full",
                config.color,
              )}
            />
            <span className={cn("capitalize", config.text)}>{level}</span>
          </div>
        ))}
      </motion.div>

      {/* Skill Categories */}
      <div className="space-y-8 sm:space-y-12">
        {skillCategories.map((category, catIndex) => {
          const catColor = categoryColors[catIndex % categoryColors.length];
          return (
            <motion.section
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="mb-4 sm:mb-6 flex items-center gap-3">
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    catColor.iconBg,
                  )}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Code2 className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold">
                    {category.name}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const config = proficiencyConfig[skill.proficiency];
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.03 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={cn(
                        "glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 relative overflow-hidden group cursor-default border",
                        "bg-gradient-to-br",
                        config.bg,
                        config.border,
                      )}
                    >
                      {/* Proficiency indicator */}
                      <motion.div
                        className={cn(
                          "absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 rounded-full",
                          config.color,
                        )}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />

                      <span className="font-medium text-xs sm:text-sm">
                        {skill.name}
                      </span>

                      {/* Hover gradient */}
                      <div
                        className={cn(
                          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br",
                          config.bg.replace("/15", "/25").replace("/10", "/20"),
                        )}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* All Skills Cloud */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
      >
        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 via-accent/5 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan/10 to-transparent rounded-tr-full" />

        <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-center flex items-center justify-center gap-2 relative">
          <Sparkles className="w-5 h-5 text-primary" />
          All <span className="gradient-text">Technologies</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 relative">
          {skillCategories
            .flatMap((cat) => cat.skills)
            .map((skill, index) => {
              const config = proficiencyConfig[skill.proficiency];
              return (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.015 }}
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-default border",
                    skill.proficiency === "expert"
                      ? "bg-gradient-to-r from-emerald/10 to-cyan/10 text-emerald border-emerald/20"
                      : skill.proficiency === "advanced"
                        ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20"
                        : "bg-gradient-to-r from-amber/10 to-orange/10 text-amber border-amber/20",
                  )}
                >
                  {skill.name}
                </motion.span>
              );
            })}
        </div>
      </motion.section>
    </div>
  );
}
