import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PricingCard from '@/components/ui/PricingCard';

const Services = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handlePackageSelect = (packageName: string) => {
    navigate(`/contact?plan=${packageName}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-bluw">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-hero text-primary mb-6 animate-fade-up">
              {t('services.title')}
            </h1>
            <p className="text-hero mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding">
        <div className="container-bluw">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="animate-scale-in">
              <PricingCard
                packageName="basic"
                onSelect={handlePackageSelect}
              />
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <PricingCard
                packageName="advanced"
                isPopular={true}
                onSelect={handlePackageSelect}
              />
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <PricingCard
                packageName="ultimate"
                onSelect={handlePackageSelect}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="section-padding bg-muted">
        <div className="container-bluw">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-section text-primary mb-6">
              Process de Création
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold mb-2">Brief</h3>
                <p className="text-muted-foreground text-sm">
                  Nous analysons vos besoins et votre secteur d'activité
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold mb-2">Création</h3>
                <p className="text-muted-foreground text-sm">
                  Conception des propositions selon votre forfait
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold mb-2">Livraison</h3>
                <p className="text-muted-foreground text-sm">
                  Finalisation et remise des fichiers dans tous les formats
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;