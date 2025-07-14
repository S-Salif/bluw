import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CreditCard, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: searchParams.get('plan') || '',
    message: '',
  });

  const packages = [
    { value: 'basic', label: t('pricing.basic.name'), price: t('pricing.basic.price') },
    { value: 'advanced', label: t('pricing.advanced.name'), price: t('pricing.advanced.price') },
    { value: 'ultimate', label: t('pricing.ultimate.name'), price: t('pricing.ultimate.price') },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    try {
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "Commande envoyée !",
        description: t('contact.success'),
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: t('common.error'),
        variant: "destructive",
      });
    }
  };

  const selectedPackage = packages.find(pkg => pkg.value === formData.package);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center section-padding">
        <div className="text-center max-w-md mx-auto">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="heading-section text-primary mb-4">
            Merci !
          </h1>
          <p className="text-section mb-8">
            {t('contact.success')}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn-primary"
          >
            Nouvelle commande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-bluw">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-hero text-primary mb-6 animate-fade-up">
              {t('contact.title')}
            </h1>
            <p className="text-hero mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-bluw">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="card-elegant space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.form.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.form.package')} *
                </label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                >
                  <option value="">Sélectionnez un forfait</option>
                  {packages.map((pkg) => (
                    <option key={pkg.value} value={pkg.value}>
                      {pkg.label} - {pkg.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Décrivez votre projet, votre secteur d'activité, vos préférences..."
                />
              </div>

              {/* Package Summary */}
              {selectedPackage && (
                <div className="bg-muted p-6 border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2">
                    Forfait sélectionné
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{selectedPackage.label}</span>
                    <span className="font-bold text-primary text-lg">{selectedPackage.price}</span>
                  </div>
                </div>
              )}

              {/* Payment Simulation */}
              <div className="bg-accent/5 p-6 border border-accent/20">
                <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Paiement sécurisé</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Le paiement sera traité via Stripe après validation de votre commande.
                </p>
                <div className="text-xs text-muted-foreground">
                  * Paiement sécurisé - Nous vous enverrons un lien de paiement par email
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{t('contact.form.submit')}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;