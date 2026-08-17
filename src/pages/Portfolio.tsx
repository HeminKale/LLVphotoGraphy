import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Heart, Church, Users, Baby, Camera, Flower2, Gem, Sun } from 'lucide-react';
import { galleries as galleryData, Gallery } from '../data/galleries';
import portfolioBanner from '../assets/gallery/mehndhi/02.jpg';

const categories = [
  { name: 'All Work', value: 'All', icon: Sparkles },
  { name: 'Wedding', value: 'Wedding', icon: Church },
  { name: 'Pre-Wedding', value: 'Pre-Wedding', icon: Gem },
  { name: 'Engagement', value: 'Engagement', icon: Heart },
  { name: 'Mehndhi', value: 'Mehndhi', icon: Flower2 },
  { name: 'Maternity', value: 'Maternity', icon: Sun },
  { name: 'Babyshoot', value: 'Babyshoot', icon: Baby },
  { name: 'Family Shoot', value: 'Family Shoot', icon: Users },
  { name: 'Modeling', value: 'Modeling', icon: Camera },
];

export default function Portfolio() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [filteredGalleries, setFilteredGalleries] = useState<Gallery[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const sorted = [...galleryData].sort((a, b) => a.order_position - b.order_position);
    setGalleries(sorted);
    setFilteredGalleries(sorted);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredGalleries(galleries);
    } else {
      setFilteredGalleries(
        galleries.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory, galleries]);

  const getCategoryBadgeStyle = (category: string) => {
    const styles: Record<string, string> = {
      Wedding: 'bg-[#E8C5A0] text-[#2D2D2D]',
      'Pre-Wedding': 'bg-[#D4A574] text-white',
      Engagement: 'bg-[#F4E6E1] text-[#2D2D2D]',
      Mehndhi: 'bg-[#D4A574] text-white',
      Maternity: 'bg-[#F4E6E1] text-[#2D2D2D] border border-[#E8C5A0]',
      Babyshoot: 'bg-[#FAF9F6] text-[#2D2D2D] border border-[#E8C5A0]',
      'Family Shoot': 'bg-[#E8C5A0] text-[#2D2D2D]',
      Modeling: 'bg-[#2D2D2D] text-white',
    };
    return styles[category] || 'bg-[#E8C5A0] text-[#2D2D2D]';
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || filteredGalleries.length === 0) return current;
      return (current - 1 + filteredGalleries.length) % filteredGalleries.length;
    });
  }, [filteredGalleries.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || filteredGalleries.length === 0) return current;
      return (current + 1) % filteredGalleries.length;
    });
  }, [filteredGalleries.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const activeImage = lightboxIndex !== null ? filteredGalleries[lightboxIndex] : null;

  return (
    <div className="bg-[#121113]">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${portfolioBanner})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/55" />
        </div>

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <p className="font-sans text-[#E8C5A0] text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-shadow-sm">
            PORTFOLIO
          </p>
          <h1 className="font-elegant text-5xl md:text-6xl lg:text-7xl text-white mb-6 text-shadow">
            Celebration Moments
          </h1>
          <p className="text-white/90 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed text-shadow-sm">
            From weddings and engagements to family portraits and beyond—capturing the
            <br className="hidden md:block" />
            laughter, connection, and moments that make every story uniquely yours.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#121113]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-sm font-sans text-xs tracking-wide transition-all duration-300 ${
                    activeCategory === category.value
                      ? 'bg-[#D4A574] text-[#121113] shadow-md'
                      : 'bg-[#1E1D1F] text-[#F5F0E8] hover:bg-[#2A2830]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {filteredGalleries.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative block w-full mb-6 break-inside-avoid overflow-hidden rounded-sm bg-[#1E1D1F] animate-fade-in text-left"
                style={{ animationDelay: `${(index % 9) * 0.08}s` }}
              >
                <img
                  src={photo.image_url}
                  alt={photo.couple_names || photo.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span
                    className={`inline-block mb-2 px-3 py-1 rounded-sm text-[10px] font-sans tracking-wider lowercase ${getCategoryBadgeStyle(
                      photo.category
                    )}`}
                  >
                    {photo.category.toLowerCase()}
                  </span>
                  <p className="font-elegant text-xl text-white">
                    {photo.couple_names || photo.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {filteredGalleries.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#B8AFA0] text-lg font-light">
                No celebrations found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center px-4 py-8 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 md:left-6 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 md:right-6 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div
            className="max-w-5xl max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.image_url}
              alt={activeImage.couple_names || activeImage.title}
              className="max-h-[80vh] w-auto object-contain rounded-sm shadow-2xl"
            />
            <div className="mt-4 flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-sm text-[10px] font-sans tracking-wider lowercase ${getCategoryBadgeStyle(
                  activeImage.category
                )}`}
              >
                {activeImage.category.toLowerCase()}
              </span>
              <p className="font-elegant text-xl text-white">
                {activeImage.couple_names || activeImage.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
