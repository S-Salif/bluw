import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut, loading } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navigationItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/reviews', label: t('nav.reviews') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container-bluw">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary transition-colors duration-300 hover:text-primary/80">
            Bluw
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`link-elegant ${
                  isActive(item.path) ? 'text-primary font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Auth Section */}
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Mon compte</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={signOut} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Se déconnecter
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/auth">
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      Se connecter
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-colors duration-300 ${
                    isActive(item.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border">
                {!loading && (
                  <>
                    {user ? (
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="text-lg font-medium text-red-600 hover:text-red-700 transition-colors duration-300"
                      >
                        Se déconnecter
                      </button>
                    ) : (
                      <Link
                        to="/auth"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300"
                      >
                        Se connecter
                      </Link>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;