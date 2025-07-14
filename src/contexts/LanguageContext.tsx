import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.reviews': 'Avis clients',
    
    // Home page
    'home.hero.title': 'Logos haut de gamme pour marques ambitieuses',
    'home.hero.subtitle': 'Nous concevons des identités visuelles professionnelles pour entreprises, startups, consultants et freelances.',
    'home.hero.cta1': 'Voir les services',
    'home.hero.cta2': 'Commander maintenant',
    
    // Values
    'home.values.creativity.title': 'Créativité',
    'home.values.creativity.desc': 'Des concepts uniques qui reflètent votre vision',
    'home.values.clarity.title': 'Clarté',
    'home.values.clarity.desc': 'Messages visuels simples et impactants',
    'home.values.professionalism.title': 'Sérieux',
    'home.values.professionalism.desc': 'Respect des délais et qualité garantie',
    
    // About page
    'about.title': 'À propos de Bluw',
    'about.content': 'Bluw est une agence de branding spécialisée dans la création d\'identités visuelles haut de gamme. Fondée par un étudiant passionné de design, notre mission est d\'accompagner les marques ambitieuses dans leur développement visuel. Nous nous positionnons sur le segment du design de luxe, en offrant des solutions créatives et professionnelles adaptées aux entreprises, startups, consultants et freelances qui souhaitent se démarquer par une identité forte et mémorable.',
    
    // Services page
    'services.title': 'Nos Services',
    'services.subtitle': 'Choisissez le forfait qui correspond à vos besoins',
    
    // Pricing
    'pricing.basic.name': 'Forfait Basique',
    'pricing.basic.price': '280 €',
    'pricing.basic.feature1': '1 proposition de logo',
    'pricing.basic.feature2': '2 retours maximum',
    'pricing.basic.feature3': 'Formats de base',
    'pricing.basic.feature4': 'Délai : 5 jours',
    
    'pricing.advanced.name': 'Forfait Avancé',
    'pricing.advanced.price': '690 €',
    'pricing.advanced.feature1': '2 propositions de logo',
    'pricing.advanced.feature2': 'Déclinaisons incluses',
    'pricing.advanced.feature3': '3 retours maximum',
    'pricing.advanced.feature4': 'Tous formats',
    'pricing.advanced.feature5': 'Délai : 7 jours',
    'pricing.advanced.badge': 'Populaire',
    
    'pricing.ultimate.name': 'Forfait Ultime',
    'pricing.ultimate.price': '1190 €',
    'pricing.ultimate.feature1': 'Branding complet',
    'pricing.ultimate.feature2': '3 propositions de logo',
    'pricing.ultimate.feature3': 'Toutes déclinaisons',
    'pricing.ultimate.feature4': 'Retours illimités',
    'pricing.ultimate.feature5': 'Charte graphique',
    'pricing.ultimate.feature6': 'Délai : 10 jours',
    
    'pricing.cta': 'Commander',
    
    // Contact page
    'contact.title': 'Commande & Contact',
    'contact.subtitle': 'Prêt à donner vie à votre marque ?',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email',
    'contact.form.package': 'Forfait souhaité',
    'contact.form.message': 'Décrivez votre projet',
    'contact.form.submit': 'Envoyer la commande',
    'contact.success': 'Votre commande a été envoyée avec succès ! Nous vous recontacterons sous 24h.',
    
    // Reviews page
    'reviews.title': 'Avis Clients',
    'reviews.subtitle': 'Ce que nos clients disent de nous',
    'reviews.form.title': 'Laissez votre avis',
    'reviews.form.name': 'Votre nom',
    'reviews.form.company': 'Entreprise',
    'reviews.form.rating': 'Note',
    'reviews.form.comment': 'Votre commentaire',
    'reviews.form.submit': 'Publier l\'avis',
    
    // Footer
    'footer.email': 'Contact : streulens.salif@gmail.com',
    'footer.legal': 'Mentions légales',
    'footer.tagline': 'Bluw - Logos haut de gamme professionnels',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.reviews': 'Reviews',
    
    // Home page
    'home.hero.title': 'Premium Logos for Ambitious Brands',
    'home.hero.subtitle': 'We design professional visual identities for companies, startups, consultants and freelancers.',
    'home.hero.cta1': 'View Services',
    'home.hero.cta2': 'Order Now',
    
    // Values
    'home.values.creativity.title': 'Creativity',
    'home.values.creativity.desc': 'Unique concepts that reflect your vision',
    'home.values.clarity.title': 'Clarity',
    'home.values.clarity.desc': 'Simple and impactful visual messages',
    'home.values.professionalism.title': 'Professionalism',
    'home.values.professionalism.desc': 'Deadline respect and guaranteed quality',
    
    // About page
    'about.title': 'About Bluw',
    'about.content': 'Bluw is a branding agency specialized in creating premium visual identities. Founded by a design-passionate student, our mission is to support ambitious brands in their visual development. We position ourselves in the luxury design segment, offering creative and professional solutions tailored to companies, startups, consultants and freelancers who want to stand out with a strong and memorable identity.',
    
    // Services page
    'services.title': 'Our Services',
    'services.subtitle': 'Choose the package that fits your needs',
    
    // Pricing
    'pricing.basic.name': 'Basic Package',
    'pricing.basic.price': '€280',
    'pricing.basic.feature1': '1 logo proposal',
    'pricing.basic.feature2': '2 revisions maximum',
    'pricing.basic.feature3': 'Basic formats',
    'pricing.basic.feature4': 'Delivery: 5 days',
    
    'pricing.advanced.name': 'Advanced Package',
    'pricing.advanced.price': '€690',
    'pricing.advanced.feature1': '2 logo proposals',
    'pricing.advanced.feature2': 'Variations included',
    'pricing.advanced.feature3': '3 revisions maximum',
    'pricing.advanced.feature4': 'All formats',
    'pricing.advanced.feature5': 'Delivery: 7 days',
    'pricing.advanced.badge': 'Popular',
    
    'pricing.ultimate.name': 'Ultimate Package',
    'pricing.ultimate.price': '€1190',
    'pricing.ultimate.feature1': 'Complete branding',
    'pricing.ultimate.feature2': '3 logo proposals',
    'pricing.ultimate.feature3': 'All variations',
    'pricing.ultimate.feature4': 'Unlimited revisions',
    'pricing.ultimate.feature5': 'Brand guidelines',
    'pricing.ultimate.feature6': 'Delivery: 10 days',
    
    'pricing.cta': 'Order',
    
    // Contact page
    'contact.title': 'Order & Contact',
    'contact.subtitle': 'Ready to bring your brand to life?',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Email',
    'contact.form.package': 'Desired package',
    'contact.form.message': 'Describe your project',
    'contact.form.submit': 'Send Order',
    'contact.success': 'Your order has been sent successfully! We will contact you within 24h.',
    
    // Reviews page
    'reviews.title': 'Client Reviews',
    'reviews.subtitle': 'What our clients say about us',
    'reviews.form.title': 'Leave your review',
    'reviews.form.name': 'Your name',
    'reviews.form.company': 'Company',
    'reviews.form.rating': 'Rating',
    'reviews.form.comment': 'Your comment',
    'reviews.form.submit': 'Publish Review',
    
    // Footer
    'footer.email': 'Contact: streulens.salif@gmail.com',
    'footer.legal': 'Legal Notice',
    'footer.tagline': 'Bluw - Professional Premium Logos',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};