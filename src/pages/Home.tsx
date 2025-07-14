import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Target, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Lightbulb,
      title: t('home.values.creativity.title'),
      description: t('home.values.creativity.desc'),
    },
    {
      icon: Target,
      title: t('home.values.clarity.title'),
      description: t('home.values.clarity.desc'),
    },
    {
      icon: Award,
      title: t('home.values.professionalism.title'),
      description: t('home.values.professionalism.desc'),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-bluw">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-hero text-primary mb-6 animate-fade-up">
              {t('home.hero.title')}
            </h1>
            <p className="text-hero mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/services" className="btn-primary inline-flex items-center space-x-2">
                <span>{t('home.hero.cta1')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center space-x-2">
                <span>{t('home.hero.cta2')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-bluw">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card-elegant text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-section">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-bluw text-center">
          <h2 className="heading-section mb-6">
            Prêt à créer votre identité visuelle ?
          </h2>
          <p className="text-hero mb-8 opacity-90">
            Découvrez nos forfaits et commencez votre projet dès aujourd'hui
          </p>
          <Link to="/services" className="btn-accent inline-flex items-center space-x-2">
            <span>Découvrir nos services</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;