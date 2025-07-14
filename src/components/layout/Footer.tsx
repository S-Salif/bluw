import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();

  const navigationItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/reviews', label: t('nav.reviews') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container-bluw py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Bluw</h3>
            <p className="text-muted-foreground text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:streulens.salif@gmail.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>streulens.salif@gmail.com</span>
              </a>
              <a
                href="https://www.bluw.blue"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>www.bluw.blue</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2024 Bluw. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link
              to={`/${language === 'fr' ? 'mentions-legales' : 'legal-notice'}`}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
            >
              {t('footer.legal')}
            </Link>
            <Link
              to={`/${language === 'fr' ? 'conditions' : 'terms'}`}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;