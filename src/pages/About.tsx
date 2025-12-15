import { Camera, Heart, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-cream-50">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/10" />
        </div>

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <p className="font-sans text-[#D4A574] text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            ABOUT ME
          </p>
          <h1 className="font-elegant text-5xl md:text-6xl lg:text-7xl text-[#2D2D2D] mb-6 text-shadow-sm">
            About Me
          </h1>
          <p className="text-[#4A5568] text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Creating art from your most precious moments
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1 animate-slide-up">
              <h2 className="font-elegant text-4xl md:text-5xl text-[#2D2D2D] mb-6">
                Hello, I'm Sarah
              </h2>
              <div className="space-y-4 text-[#4A5568] leading-relaxed">
                <p>
                  For over a decade, I've had the privilege of witnessing and
                  capturing the most beautiful moments of people's lives. Every
                  wedding is a unique love story, and I approach each one with
                  the reverence and artistry it deserves.
                </p>
                <p>
                  My journey into wedding photography began with a simple belief:
                  that photographs should do more than document a day—they should
                  capture the feeling of it. The nervous excitement before the
                  ceremony, the tears of joy during vows, the genuine laughter
                  during toasts, and those quiet, stolen moments in between.
                </p>
                <p>
                  I blend fine-art aesthetics with photojournalistic storytelling
                  to create images that are both timeless and authentic. My style
                  is soft, romantic, and deeply emotional—because your wedding
                  day is all of those things.
                </p>
                <p>
                  When I'm not behind the camera, you'll find me exploring art
                  galleries, traveling to new places for inspiration, or spending
                  time with my family. These experiences continually shape how I
                  see and capture beauty in the world.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-in">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Sarah - Wedding Photographer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-lg max-w-xs">
                  <p className="font-elegant text-lg text-[#2D2D2D] italic">
                    "Every love story deserves to be beautifully told"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-t border-sand-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-[#D4A574]" />
              </div>
              <h3 className="font-serif text-3xl text-[#2D2D2D] mb-2">250+</h3>
              <p className="text-[#6B7280]">Weddings Captured</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#D4A574]" />
              </div>
              <h3 className="font-serif text-3xl text-[#2D2D2D] mb-2">10+</h3>
              <p className="text-[#6B7280]">Years Experience</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#D4A574]" />
              </div>
              <h3 className="font-serif text-3xl text-[#2D2D2D] mb-2">15+</h3>
              <p className="text-[#6B7280]">Awards Won</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#D4A574]" />
              </div>
              <h3 className="font-serif text-3xl text-[#2D2D2D] mb-2">500+</h3>
              <p className="text-[#6B7280]">Happy Couples</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-elegant text-4xl md:text-5xl text-[#2D2D2D] text-center mb-12">
            My Approach
          </h2>

          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center">
                <span className="font-serif text-[#D4A574] text-xl">1</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#2D2D2D] mb-3">
                  Building Trust & Connection
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Before your wedding day, we'll spend time getting to know each
                  other. I want to understand your love story, your vision, and
                  what matters most to you. This connection allows me to capture
                  authentic moments because you'll feel comfortable being
                  yourselves.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center">
                <span className="font-serif text-[#D4A574] text-xl">2</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#2D2D2D] mb-3">
                  Capturing Real Emotions
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  The best photographs happen when you're living in the moment,
                  not posing for it. While I'll guide you for portraits, most of
                  your day will be documented naturally—the way you truly
                  experienced it, filled with genuine emotion and joy.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center">
                <span className="font-serif text-[#D4A574] text-xl">3</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#2D2D2D] mb-3">
                  Creating Timeless Art
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  After your wedding, I carefully curate and edit each image to
                  create a cohesive collection that tells your complete story.
                  My editing style is soft, romantic, and timeless—designed to
                  look beautiful today and decades from now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#2D2D2D] text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-elegant text-4xl md:text-5xl mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-[#E8C5A0] text-lg mb-8 leading-relaxed">
            I'd love to hear about your wedding day and discuss how we can
            capture your unique love story.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#2D2D2D] px-8 py-4 rounded-sm hover:bg-[#FAF9F6] transition-all duration-300 font-sans text-sm tracking-wider uppercase"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
