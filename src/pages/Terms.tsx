import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="container-bluw py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          {t('terms.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
          <p className="mb-8">
            {t('terms.intro')}
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.purpose.title')}</h2>
              <p>{t('terms.purpose.content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.ordering.title')}</h2>
              <p>{t('terms.ordering.content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.intellectual.title')}</h2>
              <p>{t('terms.intellectual.content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.liability.title')}</h2>
              <p>{t('terms.liability.content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.governing.title')}</h2>
              <p>{t('terms.governing.content')}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;