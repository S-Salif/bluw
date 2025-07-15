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
    'footer.terms': 'Conditions générales',
    'footer.tagline': 'Bluw - Logos haut de gamme professionnels',
    
    // Legal Notice page
    'legal.title': 'Mentions légales',
    'legal.legalInfo.title': 'Informations légales',
    'legal.legalInfo.content': 'Le présent site web, accessible à l\'adresse www.bluw.blue, est édité par **Bluw**, une entreprise individuelle en cours de création par Salif Streulens.\n\nResponsable de la publication : Salif Streulens\nContact : streulens.salif@gmail.com\nHébergeur : Lovable (Hyper, Inc. — 2261 Market Street #4858, San Francisco, CA 94114, United States)\nContact hébergeur : support@lovable.so',
    'legal.liability.title': 'Responsabilité',
    'legal.liability.content': 'Bluw met à disposition un site internet professionnel destiné à présenter et vendre des prestations de création de logos.\nBien que nous veillions à fournir des informations fiables et à jour, la responsabilité de l\'éditeur ne saurait être engagée en cas d\'erreur, d\'omission ou de mauvais usage des contenus présents sur le site.\n\nL\'utilisateur est seul responsable de l\'utilisation qu\'il fait du site et des services proposés. En aucun cas Bluw ne pourra être tenu responsable des dommages directs ou indirects résultant de l\'accès ou de l\'utilisation du site.',
    'legal.intellectual.title': 'Propriété intellectuelle',
    'legal.intellectual.content': 'Tous les éléments présents sur le site www.bluw.blue — notamment les textes, images, graphismes, logos, icônes, et maquettes — sont la propriété exclusive de Bluw ou de ses partenaires.\n\nToute reproduction, représentation, diffusion ou utilisation non autorisée, totale ou partielle, des éléments du site est strictement interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.',
    
    // Terms page
    'terms.title': 'Conditions générales d\'utilisation',
    'terms.purpose.title': 'Objet du contrat',
    'terms.purpose.content': 'Les présentes conditions générales ont pour objet de définir les modalités d\'accès et d\'utilisation du site www.bluw.blue et des services proposés par Bluw, notamment la commande en ligne de prestations de création de logo.\n\nEn accédant au site ou en passant commande, l\'utilisateur accepte pleinement et sans réserve les présentes conditions.',
    'terms.ordering.title': 'Commande & Paiement',
    'terms.ordering.content': 'Le site permet aux clients de commander des prestations de design à tarif fixe, selon trois forfaits prédéfinis.\nLe paiement est exigible immédiatement à la commande et s\'effectue via un prestataire de paiement sécurisé.\n\nAucune prestation ne sera entamée sans règlement préalable. En cas d\'annulation après paiement, seul un remboursement partiel pourra être envisagé, selon l\'état d\'avancement du travail.',
    'terms.intellectual.title': 'Propriété intellectuelle',
    'terms.intellectual.content': 'Les droits d\'utilisation du logo livré au client sont cédés dans le cadre du forfait choisi.\nBluw conserve le droit moral sur toutes ses créations, y compris celles livrées.\nToute reproduction ou modification sans accord explicite est interdite.',
    'terms.liability.title': 'Responsabilité',
    'terms.liability.content': 'Bluw s\'engage à fournir des prestations professionnelles et conformes à la description du service choisi.\nCependant, sa responsabilité ne pourra être engagée en cas de :\n- mauvaise utilisation du logo par le client,\n- refus subjectif sans fondement,\n- incident lié à un tiers (hébergeur, prestataire de paiement…).',
    'terms.governing.title': 'Loi applicable',
    'terms.governing.content': 'Les présentes conditions sont régies par le droit belge.\nEn cas de litige, et à défaut de résolution amiable, compétence exclusive est attribuée aux tribunaux francophones de Bruxelles.',
    
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
    'footer.terms': 'Terms & Conditions',
    'footer.tagline': 'Bluw - Professional Premium Logos',
    
    // Legal Notice page
    'legal.title': 'Legal Notice',
    'legal.legalInfo.title': 'Legal Information',
    'legal.legalInfo.content': 'This website, accessible at www.bluw.blue, is published by **Bluw**, a sole proprietorship being created by Salif Streulens.\n\nPublication Director: Salif Streulens\nContact: streulens.salif@gmail.com\nHosting: Lovable (Hyper, Inc. — 2261 Market Street #4858, San Francisco, CA 94114, United States)\nHosting contact: support@lovable.so',
    'legal.liability.title': 'Liability',
    'legal.liability.content': 'Bluw provides a website for the sale of professional logo design services.\nAlthough we strive to ensure reliable and up-to-date information, the publisher cannot be held liable for errors, omissions, or misuse of the content provided on the site.\n\nUsers are solely responsible for how they use the site and the services offered. Bluw cannot be held liable for any direct or indirect damage resulting from access to or use of the site.',
    'legal.intellectual.title': 'Intellectual Property',
    'legal.intellectual.content': 'All elements of the website www.bluw.blue — including text, images, graphics, logos, icons, and mockups — are the exclusive property of Bluw or its partners.\n\nAny reproduction, representation, distribution or unauthorized use, in whole or in part, is strictly prohibited and constitutes an infringement punishable under intellectual property law.',
    
    // Terms page
    'terms.title': 'Terms & Conditions',
    'terms.purpose.title': 'Purpose of the contract',
    'terms.purpose.content': 'These terms govern the access to and use of the website www.bluw.blue and the services provided by Bluw, including online ordering of logo design services.\n\nBy accessing the site or placing an order, the user fully and unreservedly accepts these terms.',
    'terms.ordering.title': 'Ordering & Payment',
    'terms.ordering.content': 'The site allows clients to purchase fixed-price design services across three predefined packages.\nPayment is due immediately upon ordering and is processed via a secure third-party payment provider.\n\nNo service will begin without prior payment. In case of cancellation after payment, only a partial refund may be considered, depending on the project\'s progress.',
    'terms.intellectual.title': 'Intellectual Property',
    'terms.intellectual.content': 'The client is granted usage rights to the delivered logo under the chosen package.\nBluw retains moral rights on all its creations, including those delivered.\nAny reproduction or modification without express consent is prohibited.',
    'terms.liability.title': 'Liability',
    'terms.liability.content': 'Bluw commits to delivering professional services in accordance with the chosen package description.\nHowever, it cannot be held liable for:\n- misuse of the delivered logo,\n- subjective dissatisfaction without objective basis,\n- incidents involving third-party providers (hosting, payment…)',
    'terms.governing.title': 'Governing Law',
    'terms.governing.content': 'These terms are governed by Belgian law.\nIn case of dispute, and in the absence of an amicable resolution, exclusive jurisdiction is granted to the French-speaking courts of Brussels.',
    
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