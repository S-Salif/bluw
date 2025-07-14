import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LegalNotice = () => {
  const { t } = useLanguage();

  return (
    <div className="container-bluw py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          {t('legal.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('legal.legalInfo.title')}</h2>
              <div className="whitespace-pre-line">{t('legal.legalInfo.content')}</div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('legal.liability.title')}</h2>
              <div className="whitespace-pre-line">{t('legal.liability.content')}</div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('legal.intellectual.title')}</h2>
              <div className="whitespace-pre-line">{t('legal.intellectual.content')}</div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;