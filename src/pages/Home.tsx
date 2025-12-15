import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Star, Users, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  couple_names: string;
  quote: string;
  wedding_date: string;
}

interface Gallery {
  id: string;
  title: string;
  image_url: string;
  category: string;
}

const heroImages = [
  {
    url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Turning Love Stories',
    subtitle: 'Into Timeless Memories',
  },
  {
    url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Capturing Every',
    subtitle: 'Beautiful Moment',
  },
  {
    url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Where Love Becomes',
    subtitle: 'Eternal Art',
  },
];

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [featuredImages, setFeaturedImages] = useState<Gallery[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    fetchTestimonials();
    fetchFeaturedImages();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (!error && data) {
      setTestimonials(data);
    }
  };

  const fetchFeaturedImages = async () => {
    const { data, error } = await supabase
      .from('galleries')
      .select('*')
      .order('order_position', { ascending: true })
      .limit(6);

    if (!error && data) {
      setFeaturedImages(data);
    }
  };

  return (
    <div className="bg-cream-50">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((hero, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${hero.url})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </div>
          </div>
        ))}

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <h1 className="font-elegant text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight text-shadow">
            {heroImages[currentHeroSlide].title}
            <br />
            {heroImages[currentHeroSlide].subtitle}
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
            Fine-art wedding photography that captures the emotion, beauty, and
            romance of your special day
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-white text-slate-800 px-8 py-4 rounded-sm hover:bg-cream-100 transition-all duration-300 font-sans text-sm tracking-wider uppercase"
          >
            View Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentHeroSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative overflow-hidden rounded-sm shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Couple walking together"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>

            <div className="space-y-6 lg:pr-8">
              <p className="font-elegant text-[#D4A574] text-xl md:text-2xl italic">
                Welcome to Eternal Moments
              </p>

              <h2 className="font-elegant text-4xl md:text-5xl lg:text-6xl text-[#2D2D2D] leading-tight">
                Where Authentic Moments Become Heirloom Art
              </h2>

              <div className="space-y-5 text-[#6B7280] text-base md:text-lg leading-relaxed">
                <p>
                  Your love story is unique, profound, and deserves to be told with the
                  artistry it deserves. At Eternal Moments, we don't just capture
                  weddings—we preserve the essence of your connection, the subtle
                  glances, the gentle touches, and the unguarded laughter that define
                  your journey together.
                </p>

                <p>
                  With a cinematic approach that balances documentary authenticity
                  with fine-art elegance, we create timeless images that transport you
                  back to the emotions of your wedding day, year after year.
                </p>

                <p>
                  Every couple has a story worth telling beautifully. Let us be the ones to
                  tell yours.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#D4A574] text-white px-8 py-4 rounded-sm hover:bg-[#C09563] transition-all duration-300 font-sans text-sm tracking-wider"
                >
                  Our Story
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 bg-white text-[#2D2D2D] border-2 border-[#E8C5A0] px-8 py-4 rounded-sm hover:bg-[#FAF9F6] transition-all duration-300 font-sans text-sm tracking-wider"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-cream-50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-elegant text-4xl md:text-5xl text-slate-800 mb-4">
              Capturing Moments That Last Forever
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Every wedding tells a unique love story. My approach combines
              editorial elegance with authentic emotion, creating images that
              feel both timeless and deeply personal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden aspect-[4/5] bg-sand-200 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-elegant text-xl">{image.title}</p>
                  <p className="text-sm text-cream-200">{image.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-slate-800 border-2 border-slate-800 px-8 py-3 rounded-sm hover:bg-slate-800 hover:text-white transition-all duration-300 font-sans text-sm tracking-wider uppercase"
            >
              Explore Full Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="font-elegant text-4xl md:text-5xl lg:text-6xl text-[#2D2D2D] mb-6">
              Love Stories in Their Own Words
            </h2>
            <p className="text-[#6B7280] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Hear from the couples who trusted us to capture their most precious moments
              and create timeless memories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAF9F6] mb-6 group-hover:bg-[#D4A574] transition-colors duration-300">
                <Heart className="w-8 h-8 text-[#D4A574] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="font-elegant text-5xl md:text-6xl text-[#2D2D2D] mb-2">
                250<sup className="text-3xl">+</sup>
              </div>
              <p className="text-[#6B7280] text-sm md:text-base font-medium">
                Love Stories Captured
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAF9F6] mb-6 group-hover:bg-[#D4A574] transition-colors duration-300">
                <Star className="w-8 h-8 text-[#D4A574] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="font-elegant text-5xl md:text-6xl text-[#2D2D2D] mb-2">
                4.9
              </div>
              <p className="text-[#6B7280] text-sm md:text-base font-medium">
                Average Rating
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAF9F6] mb-6 group-hover:bg-[#D4A574] transition-colors duration-300">
                <Users className="w-8 h-8 text-[#D4A574] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="font-elegant text-5xl md:text-6xl text-[#2D2D2D] mb-2">
                500<sup className="text-3xl">+</sup>
              </div>
              <p className="text-[#6B7280] text-sm md:text-base font-medium">
                Happy Couples
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAF9F6] mb-6 group-hover:bg-[#D4A574] transition-colors duration-300">
                <Sparkles className="w-8 h-8 text-[#D4A574] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="font-elegant text-5xl md:text-6xl text-[#2D2D2D] mb-2">
                12<sup className="text-3xl">+</sup>
              </div>
              <p className="text-[#6B7280] text-sm md:text-base font-medium">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-24 px-6 bg-cream-50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <h2 className="font-elegant text-4xl md:text-5xl text-slate-800 mb-2">
                Kind Words
              </h2>
              <p className="text-slate-600">From couples we've had the honor to work with</p>
            </div>

            <div className="relative min-h-[300px] flex items-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <blockquote className="text-center">
                    <p className="font-elegant text-2xl md:text-3xl text-slate-700 mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <footer className="font-sans">
                      <p className="text-slate-800 font-medium text-lg">
                        {testimonial.couple_names}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {new Date(testimonial.wedding_date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-rose-500 w-8'
                      : 'bg-sand-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-elegant text-4xl md:text-5xl mb-6">
            Let's Tell Your Love Story
          </h2>
          <p className="text-sand-300 text-lg mb-8 leading-relaxed">
            Every couple deserves wedding photos that capture the essence of
            their love. Let's create something beautiful together.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-sm hover:bg-cream-100 transition-all duration-300 font-sans text-sm tracking-wider uppercase"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
