import { useEffect, useState } from 'react';
import { MapPin, Calendar, Sparkles, Sun, Heart, Church, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Gallery {
  id: string;
  title: string;
  image_url: string;
  category: string;
  couple_names?: string;
  venue_name?: string;
  wedding_date?: string;
  description?: string;
  hashtags?: string;
}

const categories = [
  { name: 'All Celebrations', value: 'All', icon: Sparkles },
  { name: 'Formal Elegance', value: 'Formal Elegance', icon: Church },
  { name: 'Casual Joy', value: 'Casual Joy', icon: Sun },
  { name: 'Outdoor Magic', value: 'Outdoor Magic', icon: Heart },
  { name: 'Intimate Gatherings', value: 'Intimate Gatherings', icon: Users },
];

export default function Portfolio() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [filteredGalleries, setFilteredGalleries] = useState<Gallery[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchGalleries();
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getCategoryBadgeStyle = (category: string) => {
    const styles: Record<string, string> = {
      'Formal Elegance': 'bg-[#E8C5A0] text-[#2D2D2D]',
      'Casual Joy': 'bg-[#F4E6E1] text-[#2D2D2D]',
      'Outdoor Magic': 'bg-[#D4A574] text-white',
      'Intimate Gatherings': 'bg-[#FAF9F6] text-[#2D2D2D] border border-[#E8C5A0]',
    };
    return styles[category] || 'bg-[#E8C5A0] text-[#2D2D2D]';
  };

  const fetchGalleries = async () => {
    const { data, error } = await supabase
      .from('galleries')
      .select('*')
      .order('order_position', { ascending: true });

    if (!error && data) {
      setGalleries(data);
      setFilteredGalleries(data);
    }
  };


  return (
    <div className="bg-cream-50">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/10" />
        </div>

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <p className="font-sans text-[#D4A574] text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            PORTFOLIO
          </p>
          <h1 className="font-elegant text-5xl md:text-6xl lg:text-7xl text-[#2D2D2D] mb-6 text-shadow-sm">
            Celebration Moments
          </h1>
          <p className="text-[#4A5568] text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Where reception energy meets family joy—capturing the laughter, dancing,
            <br className="hidden md:block" />
            and heartfelt connections that make your celebration uniquely yours.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
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
                      ? 'bg-[#D4A574] text-white shadow-md'
                      : 'bg-[#FAF9F6] text-[#2D2D2D] hover:bg-[#F4E6E1]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredGalleries.map((wedding) => (
              <div
                key={wedding.id}
                className="group bg-gradient-to-b from-white to-[#FEFEFE] overflow-hidden animate-fade-in"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src={wedding.image_url}
                    alt={wedding.couple_names || wedding.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="px-2">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-elegant text-3xl text-[#2D2D2D]">
                      {wedding.couple_names || wedding.title}
                    </h2>
                    <span className={`px-3 py-1 rounded-sm text-[10px] font-sans tracking-wider lowercase whitespace-nowrap ${getCategoryBadgeStyle(wedding.category)}`}>
                      {wedding.category.toLowerCase()}
                    </span>
                  </div>

                  {(wedding.venue_name || wedding.wedding_date) && (
                    <div className="space-y-1.5 mb-4">
                      {wedding.venue_name && (
                        <div className="flex items-center gap-2 text-[#6B7280]">
                          <MapPin className="w-3.5 h-3.5 text-[#D4A574] flex-shrink-0" />
                          <span className="text-xs">{wedding.venue_name}</span>
                        </div>
                      )}
                      {wedding.wedding_date && (
                        <div className="flex items-center gap-2 text-[#6B7280]">
                          <Calendar className="w-3.5 h-3.5 text-[#D4A574] flex-shrink-0" />
                          <span className="text-xs">{formatDate(wedding.wedding_date)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {wedding.description && (
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
                      {wedding.description}
                    </p>
                  )}

                  {wedding.hashtags && (
                    <div className="flex flex-wrap gap-2">
                      {wedding.hashtags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="text-[#D4A574] text-[11px] font-sans tracking-wide"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredGalleries.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#6B7280] text-lg font-light">
                No celebrations found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
