import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react';
import type { ContactInfo } from '../../types';
import { colorPalette } from '../../utils/colors';

interface ContactLinksProps {
  contact: ContactInfo;
}

const socialIcons = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  website: ExternalLink,
};

export function ContactLinks({ contact }: ContactLinksProps) {
  const links = [
    { key: 'email', url: `mailto:${contact.email}`, label: 'Email' },
    { key: 'linkedin', url: contact.linkedin, label: 'LinkedIn' },
    { key: 'github', url: contact.github, label: 'GitHub' },
    { key: 'twitter', url: contact.twitter, label: 'Twitter' },
    { key: 'website', url: contact.website, label: 'Website' },
  ].filter(link => link.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex flex-wrap justify-center gap-4 mt-8"
    >
      {links.map((link, index) => {
        const Icon = socialIcons[link.key as keyof typeof socialIcons];
        
        return (
          <motion.a
            key={link.key}
            href={link.url}
            target={link.key === 'email' ? undefined : '_blank'}
            rel={link.key === 'email' ? undefined : 'noopener noreferrer'}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.7 + index * 0.1,
              duration: 0.3
            }}
            whileHover={{ 
              scale: 1.1,
              y: -2,
              transition: { duration: 0.2 }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg 
                     transition-all duration-200 border"
            style={{
              backgroundColor: colorPalette.background.card,
              color: colorPalette.text.secondary,
              borderColor: colorPalette.interactive.border,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colorPalette.interactive.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colorPalette.text.secondary;
            }}
            aria-label={link.label}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{link.label}</span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}