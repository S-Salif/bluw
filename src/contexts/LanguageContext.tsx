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
    'pricing.ultimate.price': '1290 €',
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
    'contact.form.companyName': 'Nom de l\'entreprise',
    'contact.form.sector': 'Secteur d\'activité',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Téléphone',
    'contact.form.website': 'Site web (optionnel)',
    'contact.form.logoName': 'Nom du logo',
    'contact.form.style': 'Style souhaité',
    'contact.form.message': 'Message/image à véhiculer',
    'contact.form.formats': 'Formats de fichiers souhaités',
    'contact.form.preferredColors': 'Couleurs préférées',
    'contact.form.avoidedColors': 'Couleurs à éviter',
    'contact.form.typography': 'Typographie souhaitée',
    'contact.form.icons': 'Éléments graphiques souhaités',
    'contact.form.slogan': 'Slogan',
    'contact.form.examplesUrl': 'Exemples de logos appréciés (URL)',
    'contact.form.usage': 'Utilisations prévues',
    'contact.form.package': 'Forfait',
    'contact.form.submit': 'Envoyer la commande et procéder au paiement',
    'contact.success': 'Votre commande a été envoyée avec succès ! Nous vous recontacterons sous 24h.',
    'contact.companyInfo': 'Informations sur l\'entreprise',
    'contact.logoInfo': 'Informations sur le logo',
    'contact.visualPrefs': 'Préférences visuelles (optionnel)',
    'contact.packageSelection': 'Sélection du forfait',
    'contact.packageSelected': 'Forfait sélectionné',
    'contact.paymentSecure': 'Paiement sécurisé',
    'contact.paymentInfo': 'Après validation de votre commande, vous serez redirigé vers Stripe pour effectuer le paiement de manière sécurisée.',
    'contact.confirmationEmail': 'Vous recevrez un email de confirmation après votre commande',
    'contact.creating': 'Création en cours...',
    'contact.thankYou': 'Merci pour votre commande !',
    'contact.paymentConfirmed': 'Votre paiement a été confirmé avec succès. Nous avons envoyé un email de confirmation avec tous les détails.',
    'contact.contactSoon': 'Nous vous contacterons dans les 24h pour discuter de votre projet en détail.',
    'contact.newOrder': 'Nouvelle commande',
    
    'contact.form.deadlineHelp': 'Date limite souhaitée pour la livraison',
    'contact.form.rgpd': 'J\'accepte que mes données soient utilisées pour traiter ma commande selon la [politique de confidentialité](/politique-de-confidentialite).',
    'contact.error.rgpdRequired': 'Vous devez accepter la politique de confidentialité pour continuer.',
    
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
    'legal.legalInfo.content': 'Le présent site web, accessible à l\'adresse www.bluw.blue, est édité par **Bluw**, une entreprise individuelle en cours de création par Salif Streulens.\n\nResponsable de la publication : Salif Streulens\nContact : Bluw.agency@gmail.com\nHébergeur : Netlify\nContact hébergeur : team@netlify.com',
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
    
    // Privacy Policy page
    'privacy.title': 'Politique de confidentialité',
    'privacy.dataCollection.title': 'Collecte des données',
    'privacy.dataCollection.content': 'Bluw collecte uniquement les données personnelles nécessaires au traitement de votre commande :\n\n• Informations de contact (nom, email, téléphone)\n• Informations sur votre entreprise (nom, secteur d\'activité, site web)\n• Informations sur votre projet (nom du logo, style souhaité, message à véhiculer)\n• Préférences visuelles (couleurs, typographie, éléments graphiques)\n\nCes données sont collectées via le formulaire de commande présent sur notre site web.',
    'privacy.dataUsage.title': 'Utilisation des données',
    'privacy.dataUsage.content': 'Vos données personnelles sont utilisées exclusivement pour :\n\n• Traiter et suivre votre commande\n• Vous contacter concernant votre projet\n• Facturation et gestion comptable\n• Améliorer nos services\n\nNous ne vendons, ne louons, ni ne partageons vos données avec des tiers à des fins commerciales.',
    'privacy.dataSharing.title': 'Partage des données',
    'privacy.dataSharing.content': 'Vos données peuvent être partagées uniquement avec :\n\n• **Stripe** : pour le traitement sécurisé des paiements\n• **Supabase** : pour le stockage sécurisé des données de commande\n• **Resend** : pour l\'envoi d\'emails de confirmation\n\nCes prestataires respectent des standards de sécurité élevés et ne traitent vos données que dans le cadre des services fournis.',
    'privacy.userRights.title': 'Vos droits',
    'privacy.userRights.content': 'Conformément au RGPD, vous disposez des droits suivants :\n\n• **Droit d\'accès** : obtenir une copie de vos données personnelles\n• **Droit de rectification** : corriger des données inexactes\n• **Droit à l\'effacement** : demander la suppression de vos données\n• **Droit à la portabilité** : recevoir vos données dans un format structuré\n• **Droit d\'opposition** : vous opposer au traitement de vos données\n\nPour exercer ces droits, contactez-nous à streulens.salif@gmail.com.',
    'privacy.contact.title': 'Contact',
    'privacy.contact.content': 'Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, vous pouvez nous contacter :\n\n**Email** : streulens.salif@gmail.com\n**Responsable** : Salif Streulens\n**Entreprise** : Bluw\n\nCette politique de confidentialité peut être mise à jour. Nous vous recommandons de la consulter régulièrement.',

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
    'pricing.ultimate.price': '€1290',
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
    'contact.form.companyName': 'Company name',
    'contact.form.sector': 'Business sector',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.website': 'Website (optional)',
    'contact.form.logoName': 'Logo name',
    'contact.form.style': 'Desired style',
    'contact.form.message': 'Message/image to convey',
    'contact.form.formats': 'Desired file formats',
    'contact.form.preferredColors': 'Preferred colors',
    'contact.form.avoidedColors': 'Colors to avoid',
    'contact.form.typography': 'Desired typography',
    'contact.form.icons': 'Desired graphic elements',
    'contact.form.slogan': 'Slogan',
    'contact.form.examplesUrl': 'Examples of appreciated logos (URL)',
    'contact.form.usage': 'Intended usage',
    'contact.form.package': 'Package',
    'contact.form.submit': 'Submit order and proceed to payment',
    'contact.success': 'Your order has been sent successfully! We will contact you within 24h.',
    'contact.companyInfo': 'Company information',
    'contact.logoInfo': 'Logo information',
    'contact.visualPrefs': 'Visual preferences (optional)',
    'contact.packageSelection': 'Package selection',
    'contact.packageSelected': 'Selected package',
    'contact.paymentSecure': 'Secure payment',
    'contact.paymentInfo': 'After validating your order, you will be redirected to Stripe to make the payment securely.',
    'contact.confirmationEmail': 'You will receive a confirmation email after your order',
    'contact.creating': 'Creating order...',
    'contact.thankYou': 'Thank you for your order!',
    'contact.paymentConfirmed': 'Your payment has been successfully confirmed. We have sent a confirmation email with all the details.',
    'contact.contactSoon': 'We will contact you within 24h to discuss your project in detail.',
    'contact.newOrder': 'New order',
    'contact.form.rgpd': 'I agree that my data may be used to process my order according to the [privacy policy](/privacy-policy).',
    'contact.error.rgpdRequired': 'You must accept the privacy policy to continue.',
    
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
    'legal.legalInfo.content': 'This website, accessible at www.bluw.blue, is published by **Bluw**, a sole proprietorship being created by Salif Streulens.\n\nPublication Director: Salif Streulens\nContact: Bluw.agency@gmail.com\nHosting: Netlify\nHosting contact: team@netlify.com',
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
    
    // Privacy Policy page
    'privacy.title': 'Privacy Policy',
    'privacy.dataCollection.title': 'Data Collection',
    'privacy.dataCollection.content': 'Bluw only collects personal data necessary for processing your order:\n\n• Contact information (name, email, phone)\n• Company information (name, business sector, website)\n• Project information (logo name, desired style, message to convey)\n• Visual preferences (colors, typography, graphic elements)\n\nThis data is collected through the order form on our website.',
    'privacy.dataUsage.title': 'Data Usage',
    'privacy.dataUsage.content': 'Your personal data is used exclusively to:\n\n• Process and track your order\n• Contact you regarding your project\n• Billing and accounting management\n• Improve our services\n\nWe do not sell, rent, or share your data with third parties for commercial purposes.',
    'privacy.dataSharing.title': 'Data Sharing',
    'privacy.dataSharing.content': 'Your data may only be shared with:\n\n• **Stripe**: for secure payment processing\n• **Supabase**: for secure order data storage\n• **Resend**: for sending confirmation emails\n\nThese providers adhere to high security standards and only process your data as part of the services provided.',
    'privacy.userRights.title': 'Your Rights',
    'privacy.userRights.content': 'Under GDPR, you have the following rights:\n\n• **Right of access**: obtain a copy of your personal data\n• **Right of rectification**: correct inaccurate data\n• **Right to erasure**: request deletion of your data\n• **Right to portability**: receive your data in a structured format\n• **Right to object**: object to the processing of your data\n\nTo exercise these rights, contact us at streulens.salif@gmail.com.',
    'privacy.contact.title': 'Contact',
    'privacy.contact.content': 'For any questions regarding this privacy policy or the processing of your personal data, you can contact us:\n\n**Email**: streulens.salif@gmail.com\n**Responsible**: Salif Streulens\n**Company**: Bluw\n\nThis privacy policy may be updated. We recommend checking it regularly.',

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