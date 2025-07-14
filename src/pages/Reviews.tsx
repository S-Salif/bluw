import React, { useState } from 'react';
import { Star, User, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Reviews = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rating: 5,
    comment: '',
  });

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Marie Dubois",
      company: "Tech Startup",
      rating: 5,
      comment: "Excellent travail sur notre logo ! L'équipe a parfaitement compris notre vision et a livré un résultat au-delà de nos attentes.",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Pierre Martin",
      company: "Consultant Indépendant",
      rating: 5,
      comment: "Service professionnel et créatif. Mon nouveau logo reflète parfaitement mon activité de consulting.",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Sophie Laurent",
      company: "E-commerce",
      rating: 4,
      comment: "Très satisfaite du résultat. Communication fluide et respect des délais.",
      date: "2024-01-05"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'rating' ? parseInt(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate form submission
      console.log('Review submitted:', formData);
      
      toast({
        title: "Avis publié !",
        description: "Merci pour votre retour, il sera publié après modération.",
      });
      
      // Reset form
      setFormData({
        name: '',
        company: '',
        rating: 5,
        comment: '',
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: t('common.error'),
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-bluw">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-hero text-primary mb-6 animate-fade-up">
              {t('reviews.title')}
            </h1>
            <p className="text-hero mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('reviews.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Display */}
      <section className="section-padding">
        <div className="container-bluw">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="card-elegant animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-muted-foreground italic mb-4">
                  "{review.comment}"
                </p>
                
                <p className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="section-padding bg-muted">
        <div className="container-bluw">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="heading-section text-primary mb-4">
                {t('reviews.form.title')}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="card-elegant space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('reviews.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('reviews.form.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('reviews.form.rating')} *
                </label>
                <div className="flex items-center space-x-4">
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} étoile{rating > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  {renderStars(formData.rating, 'lg')}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('reviews.form.comment')} *
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Partagez votre expérience avec Bluw..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{t('reviews.form.submit')}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;