import React from 'react';
import { Check, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PricingCardProps {
  packageName: 'basic' | 'advanced' | 'ultimate';
  isPopular?: boolean;
  onSelect: (packageName: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ packageName, isPopular, onSelect }) => {
  const { t } = useLanguage();

  const getFeatures = (pkg: string) => {
    switch (pkg) {
      case 'basic':
        return [
          t('pricing.basic.feature1'),
          t('pricing.basic.feature2'),
          t('pricing.basic.feature3'),
          t('pricing.basic.feature4'),
        ];
      case 'advanced':
        return [
          t('pricing.advanced.feature1'),
          t('pricing.advanced.feature2'),
          t('pricing.advanced.feature3'),
          t('pricing.advanced.feature4'),
          t('pricing.advanced.feature5'),
        ];
      case 'ultimate':
        return [
          t('pricing.ultimate.feature1'),
          t('pricing.ultimate.feature2'),
          t('pricing.ultimate.feature3'),
          t('pricing.ultimate.feature4'),
          t('pricing.ultimate.feature5'),
          t('pricing.ultimate.feature6'),
        ];
      default:
        return [];
    }
  };

  const features = getFeatures(packageName);

  return (
    <div className={`card-pricing ${isPopular ? 'card-pricing-popular' : ''} relative`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current" />
            <span>{t('pricing.advanced.badge')}</span>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="heading-card mb-2">{t(`pricing.${packageName}.name`)}</h3>
        <div className="text-4xl font-bold text-primary mb-2">
          {t(`pricing.${packageName}.price`)}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(packageName)}
        className={`w-full py-3 px-6 font-medium transition-all duration-300 ${
          isPopular
            ? 'btn-primary'
            : 'btn-secondary'
        }`}
      >
        {t('pricing.cta')}
      </button>
    </div>
  );
};

export default PricingCard;