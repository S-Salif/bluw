import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
const About = () => {
  const {
    t
  } = useLanguage();
  return <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-bluw">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-hero text-primary mb-6 animate-fade-up">
              {t('about.title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-bluw">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <p className="text-section text-lg leading-relaxed text-justify">
                  {t('about.content')}
                </p>
              </div>
              
              {/* Placeholder for image */}
              <div className="animate-fade-up" style={{
              animationDelay: '0.2s'
            }}>
                <div className="bg-muted h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-xl">B</span>
                    </div>
                    <p className="text-muted-foreground">Image à venir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-muted">
        <div className="container-bluw">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-section text-primary mb-6">
              Notre Mission
            </h2>
            <p className="text-section text-lg">
              Transformer les idées en identités visuelles puissantes qui marquent les esprits et distinguent les marques sur leur marché.
            </p>
          </div>
        </div>
      </section>
    </div>;
};
export default About;