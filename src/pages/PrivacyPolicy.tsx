import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="container-bluw py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          {t('privacy.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.dataCollection.title')}</h2>
              <div className="whitespace-pre-line">{t('privacy.dataCollection.content')}</div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.dataUsage.title')}</h2>
              <div className="whitespace-pre-line">{t('privacy.dataUsage.content')}</div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.dataSharing.title')}</h2>
              <div className="whitespace-pre-line">{t('privacy.dataSharing.content')}</div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.userRights.title')}</h2>
              <div className="whitespace-pre-line">{t('privacy.userRights.content')}</div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.contact.title')}</h2>
              <div className="whitespace-pre-line">{t('privacy.contact.content')}</div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;