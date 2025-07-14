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
          <p className="mb-6">
            {t('legal.placeholder')}
          </p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">{t('legal.section1.title')}</h2>
              <p>{t('legal.section1.content')}</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">{t('legal.section2.title')}</h2>
              <p>{t('legal.section2.content')}</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">{t('legal.section3.title')}</h2>
              <p>{t('legal.section3.content')}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;