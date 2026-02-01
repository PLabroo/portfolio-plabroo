import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { contact, socialLinks } = portfolioData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const socialIcons: Record<string, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    leetcode: ExternalLink,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12 px-1">
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
          Get In Touch
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4"
        >
          Let's Work <span className="gradient-text">Together</span>
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Have a project in mind? Let's discuss how I can help bring your ideas to life.
        </motion.p>
      </motion.section>

      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-4 sm:space-y-6"
        >
          {/* Contact Details */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-display font-bold mb-2 sm:mb-4">Contact Information</h2>
            
            <motion.a
              href={`mailto:${contact.email}`}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-secondary transition-colors group"
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0"
                whileHover={{ rotate: 10 }}
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-sm sm:text-base truncate">{contact.email}</p>
              </div>
            </motion.a>

            {contact.phone && (
              <motion.a
                href={`tel:${contact.phone}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-secondary transition-colors group"
              >
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0"
                  whileHover={{ rotate: 10 }}
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm sm:text-base">{contact.phone}</p>
                </div>
              </motion.a>
            )}

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-sm sm:text-base">{contact.location}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-display font-bold mb-3 sm:mb-4">Connect</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform] || ExternalLink;
                return (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl glass hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="font-medium capitalize text-sm sm:text-base truncate">{link.platform}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <motion.div 
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.span 
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-semibold text-sm sm:text-base">{contact.availability}</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Currently accepting new projects and opportunities
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3"
        >
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-display font-bold">Send a Message</h2>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="name" className="text-xs sm:text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="rounded-lg sm:rounded-xl bg-background/50 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="email" className="text-xs sm:text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="rounded-lg sm:rounded-xl bg-background/50 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="subject" className="text-xs sm:text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="What's this about?"
                required
                className="rounded-lg sm:rounded-xl bg-background/50 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="message" className="text-xs sm:text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                required
                className="rounded-lg sm:rounded-xl bg-background/50 resize-none text-sm sm:text-base"
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mr-2"
                  >
                    ⏳
                  </motion.span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
