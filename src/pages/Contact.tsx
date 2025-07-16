
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: searchParams.get('plan') || '',
    message: '',
  });

  // Check for payment success/cancellation on component mount
  useEffect(() => {
    const success = searchParams.get('success');
    const cancelled = searchParams.get('cancelled');
    const sessionId = searchParams.get('session_id');

    if (success === 'true' && sessionId) {
      // Handle successful payment
      handlePaymentSuccess(sessionId);
    } else if (cancelled === 'true') {
      toast({
        title: "Paiement annulé",
        description: "Votre paiement a été annulé. Vous pouvez réessayer quand vous le souhaitez.",
        variant: "destructive",
      });
      // Clear URL parameters
      setSearchParams({});
    }
  }, [searchParams]);

  const handlePaymentSuccess = async (sessionId: string) => {
    try {
      // Get order ID from session storage or URL
      const orderId = localStorage.getItem('pending_order_id');
      if (!orderId) {
        throw new Error('Order ID not found');
      }

      // Send confirmation email
      const { data, error } = await supabase.functions.invoke('send-confirmation', {
        body: {
          order_id: orderId,
          session_id: sessionId,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      localStorage.removeItem('pending_order_id');
      
      toast({
        title: "Paiement confirmé !",
        description: "Votre commande a été confirmée et un email de confirmation vous a été envoyé.",
      });

      // Clear URL parameters
      setSearchParams({});
    } catch (error) {
      console.error('Error handling payment success:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la confirmation. Nous vous contacterons bientôt.",
        variant: "destructive",
      });
    }
  };

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
    setIsLoading(true);
    
    try {
      // Create payment session and order
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: formData,
      });

      if (error) throw error;

      // Store order ID for later use
      localStorage.setItem('pending_order_id', data.order_id);

      // Send initial confirmation email (order received)
      await supabase.functions.invoke('send-confirmation', {
        body: {
          order_id: data.order_id,
        },
      });

      // Redirect to Stripe checkout in new tab
      if (data.url) {
        window.open(data.url, '_blank');
      }

      toast({
        title: "Commande créée !",
        description: "Votre commande a été créée. Veuillez finaliser le paiement dans l'onglet qui vient de s'ouvrir.",
      });

    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPackage = packages.find(pkg => pkg.value === formData.package);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center section-padding">
        <div className="text-center max-w-md mx-auto">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="heading-section text-primary mb-4">
            Merci pour votre commande !
          </h1>
          <p className="text-section mb-4">
            Votre paiement a été confirmé avec succès. Nous avons envoyé un email de confirmation avec tous les détails.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Nous vous contacterons dans les 24h pour discuter de votre projet en détail.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', package: '', message: '' });
            }}
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
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
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
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
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
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
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
                  disabled={isLoading}
                  rows={6}
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
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

              {/* Payment Information */}
              <div className="bg-accent/5 p-6 border border-accent/20">
                <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Paiement sécurisé</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Après validation de votre commande, vous serez redirigé vers Stripe pour effectuer le paiement de manière sécurisée.
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>Vous recevrez un email de confirmation après votre commande</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Création en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('contact.form.submit')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
