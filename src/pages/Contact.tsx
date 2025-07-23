
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CreditCard, CheckCircle, AlertCircle, Upload, Building, Palette, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Company information
    companyName: '',
    sector: '',
    email: '',
    phone: '',
    website: '',
    
    // Logo information
    logoName: '',
    style: '',
    message: '',
    formats: [] as string[],
    
    // Visual preferences (optional)
    preferredColors: '',
    avoidedColors: '',
    typography: '',
    icons: '',
    slogan: '',
    examplesUrl: '',
    usage: [] as string[],
    
    // Package
    package: searchParams.get('plan') || '',
  });
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === 'formats' || name === 'usage') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    }
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['companyName', 'sector', 'email', 'phone', 'logoName', 'style', 'message', 'package'];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);
    
    if (missing.length > 0) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.formats.length === 0) {
      toast({
        title: "Formats manquants",
        description: "Veuillez sélectionner au moins un format de fichier.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create logo order
      const { data, error } = await supabase.functions.invoke('create-logo-order', {
        body: formData,
      });

      if (error) throw error;

      // Store order ID for later use
      localStorage.setItem('pending_order_id', data.order_id);

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }

      toast({
        title: "Commande créée !",
        description: "Redirection vers le paiement en cours...",
      });

    } catch (error) {
      console.error('Error creating logo order:', error);
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
              setFormData({
                companyName: '', sector: '', email: '', phone: '', website: '',
                logoName: '', style: '', message: '', formats: [],
                preferredColors: '', avoidedColors: '', typography: '', icons: '',
                slogan: '', examplesUrl: '', usage: [], package: ''
              });
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
            <form onSubmit={handleSubmit} className="card-elegant space-y-8">
              {/* 1. Informations sur l'entreprise */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b border-border">
                  <Building className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-primary">Informations sur l'entreprise</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Ex. Agence Pixelia"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sector">Secteur d'activité *</Label>
                    <Input
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      placeholder="Ex. Marketing, IT, Santé..."
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contact@exemple.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+33 6 12 34 56 78"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="website">Site web (optionnel)</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://monsite.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Informations sur le logo */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b border-border">
                  <Palette className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-primary">Informations sur le logo</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="logoName">Nom du logo *</Label>
                    <Input
                      id="logoName"
                      name="logoName"
                      value={formData.logoName}
                      onChange={handleInputChange}
                      placeholder="Nom à afficher sur le logo"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="style">Style souhaité *</Label>
                    <Select value={formData.style} onValueChange={(value) => handleSelectChange(value, 'style')} disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Moderne">Moderne</SelectItem>
                        <SelectItem value="Classique">Classique</SelectItem>
                        <SelectItem value="Minimaliste">Minimaliste</SelectItem>
                        <SelectItem value="Rétro">Rétro</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="message">Message/image à véhiculer *</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez l'image ou le message que le logo doit transmettre"
                      required
                      disabled={isLoading}
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50 resize-none"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label>Formats de fichiers souhaités *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {['PNG', 'JPG', 'SVG', 'PDF'].map((format) => (
                        <label key={format} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="formats"
                            value={format}
                            checked={formData.formats.includes(format)}
                            onChange={handleCheckboxChange}
                            disabled={isLoading}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm">{format}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Préférences visuelles */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b border-border">
                  <Palette className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-primary">Préférences visuelles (optionnel)</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredColors">Couleurs préférées</Label>
                    <textarea
                      id="preferredColors"
                      name="preferredColors"
                      value={formData.preferredColors}
                      onChange={handleInputChange}
                      placeholder="#0033cc, bleu nuit, vert anis..."
                      disabled={isLoading}
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50 resize-none"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="avoidedColors">Couleurs à éviter</Label>
                    <textarea
                      id="avoidedColors"
                      name="avoidedColors"
                      value={formData.avoidedColors}
                      onChange={handleInputChange}
                      placeholder="Rouge vif, orange..."
                      disabled={isLoading}
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50 resize-none"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="typography">Typographie souhaitée</Label>
                    <Input
                      id="typography"
                      name="typography"
                      value={formData.typography}
                      onChange={handleInputChange}
                      placeholder="Sans Serif, Serif, Manuscrite..."
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="icons">Éléments graphiques souhaités</Label>
                    <Input
                      id="icons"
                      name="icons"
                      value={formData.icons}
                      onChange={handleInputChange}
                      placeholder="Feuille, flamme, initiales..."
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slogan">Slogan</Label>
                    <Input
                      id="slogan"
                      name="slogan"
                      value={formData.slogan}
                      onChange={handleInputChange}
                      placeholder="Votre tagline"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="examplesUrl">Exemples de logos appréciés (URL)</Label>
                    <Input
                      id="examplesUrl"
                      name="examplesUrl"
                      type="url"
                      value={formData.examplesUrl}
                      onChange={handleInputChange}
                      placeholder="Lien vers un logo inspirant"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label>Utilisations prévues</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {['Site web', 'Carte de visite', 'Réseaux sociaux', 'Print'].map((usage) => (
                        <label key={usage} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="usage"
                            value={usage}
                            checked={formData.usage.includes(usage)}
                            onChange={handleCheckboxChange}
                            disabled={isLoading}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm">{usage}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Sélection du forfait */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b border-border">
                  <Package className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-primary">Sélection du forfait</h2>
                </div>
                
                <div>
                  <Label htmlFor="package">Forfait *</Label>
                  <Select value={formData.package} onValueChange={(value) => handleSelectChange(value, 'package')} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez un forfait" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basique – 280€</SelectItem>
                      <SelectItem value="advanced">Avancé – 690€</SelectItem>
                      <SelectItem value="ultimate">Ultime – 1290€</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Package Summary */}
              {selectedPackage && (
                <div className="bg-muted p-6 border-l-4 border-primary rounded-r-lg">
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
              <div className="bg-accent/5 p-6 border border-accent/20 rounded-lg">
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
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer la commande et procéder au paiement
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
