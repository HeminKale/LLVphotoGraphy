import { useEffect, useState } from 'react';
import { Heart, Star, Quote } from 'lucide-react';
import { testimonials as testimonialData, Testimonial } from '../data/testimonials';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const sorted = [...testimonialData].sort(
      (a, b) => new Date(b.wedding_date).getTime() - new Date(a.wedding_date).getTime()
    );
    setTestimonials(sorted);
  }, []);

  return (
    <div className="bg-[#121113] pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Heart className="w-16 h-16 text-[#D4A574] mx-auto mb-6" />
          <h1 className="font-elegant text-5xl md:text-6xl lg:text-7xl text-[#F5F0E8] mb-6">
            Love Stories in Their Own Words
          </h1>
          <p className="text-[#B8AFA0] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Hear from the couples who trusted us to capture their most precious moments
            and create timeless memories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24">
          <div className="text-center group bg-[#1E1D1F] p-8 rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E1D1F] mb-6 group-hover:bg-[#D4A574] transition-colors duration-300">
              <Heart className="w-8 h-8 text-[#D4A574] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="font-elegant text-5xl md:text-6xl text-[#F5F0E8] mb-2">
              250<sup className="text-3xl">+</sup>
            </div>
            <p className="text-[#B8AFA0] text-sm md:text-base font-medium">
              Love Stories Captured
            </p>
          </div>

          <div className="text-center group bg-[#1E1D1F] p-8 rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E1D1F] mb-6 group-hover:bg-[#D4A574] transition-colors duration-300">
              <Star className="w-8 h-8 text-[#D4A574] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="font-elegant text-5xl md:text-6xl text-[#F5F0E8] mb-2">
              4.9
            </div>
            <p className="text-[#B8AFA0] text-sm md:text-base font-medium">
              Average Rating
            </p>
          </div>

          <div className="text-center group bg-[#1E1D1F] p-8 rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E1D1F] mb-6 group-hover:bg-[#D4A574] transition-colors duration-300">
              <Heart className="w-8 h-8 text-[#D4A574] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="font-elegant text-5xl md:text-6xl text-[#F5F0E8] mb-2">
              500<sup className="text-3xl">+</sup>
            </div>
            <p className="text-[#B8AFA0] text-sm md:text-base font-medium">
              Happy Couples
            </p>
          </div>

          <div className="text-center group bg-[#1E1D1F] p-8 rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E1D1F] mb-6 group-hover:bg-[#D4A574] transition-colors duration-300">
              <Star className="w-8 h-8 text-[#D4A574] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="font-elegant text-5xl md:text-6xl text-[#F5F0E8] mb-2">
              12<sup className="text-3xl">+</sup>
            </div>
            <p className="text-[#B8AFA0] text-sm md:text-base font-medium">
              Years of Excellence
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="font-elegant text-4xl md:text-5xl text-[#F5F0E8] text-center mb-16">
            What Our Couples Say
          </h2>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-[#1E1D1F] p-8 md:p-10 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Quote className="w-12 h-12 text-[#D4A574] mb-6" />

                  <blockquote className="mb-6">
                    <p className="font-elegant text-xl md:text-2xl text-[#B8AFA0] leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  <footer className="border-t border-[#3A362F] pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#D4A574] flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-[#F5F0E8] font-semibold text-lg">
                          {testimonial.couple_names}
                        </p>
                        <p className="text-[#B8AFA0] text-sm">
                          {new Date(testimonial.wedding_date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </footer>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#1E1D1F] rounded-sm shadow-lg">
              <Heart className="w-16 h-16 text-sand-300 mx-auto mb-4" />
              <p className="text-[#B8AFA0] text-lg">
                Loading testimonials...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
