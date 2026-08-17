import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { packages as packageData, Package } from '../data/packages';
import FAQ from '../components/FAQ';

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    setPackages([...packageData].sort((a, b) => a.order_position - b.order_position));
  }, []);

  return (
    <div className="bg-[#100B21]">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/265705/pexels-photo-265705.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <h1 className="font-elegant text-5xl md:text-7xl text-white mb-4 text-shadow">
            Investment
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Timeless collections designed to tell your complete love story
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-elegant text-4xl md:text-5xl text-[#F1EDFB] mb-4">
              Wedding Collections
            </h2>
            <p className="text-[#A9A0C4] text-lg max-w-2xl mx-auto leading-relaxed">
              Each collection is thoughtfully designed to capture every precious
              moment of your wedding day, from getting ready to the final dance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative bg-[#1C1330] rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-slide-up ${
                  pkg.featured ? 'lg:-mt-8 lg:mb-8' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.featured && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white text-center py-2 font-sans text-sm tracking-wider uppercase flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <div className={`p-8 ${pkg.featured ? 'pt-14' : ''}`}>
                  <h3 className="font-elegant text-3xl text-[#F1EDFB] mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-[#A9A0C4] text-sm mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-[#332950]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#8B82A8] text-sm">Starting at</span>
                      <span className="font-serif text-4xl text-[#F1EDFB]">
                        ${pkg.starting_price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[#8B82A8] text-xs mt-1">
                      {pkg.hours_coverage} hours of coverage
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {pkg.deliverables.map((item: string, i: number) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-[#8F1ED2]/15 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#8F1ED2]" />
                        </div>
                        <span className="text-[#D9D2E8] text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className={`block text-center py-3 rounded-sm font-sans text-sm tracking-wider uppercase transition-all duration-300 ${
                      pkg.featured
                        ? 'bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white hover:opacity-90'
                        : 'border-2 border-[#8F1ED2] text-[#8F1ED2] hover:bg-[#8F1ED2] hover:text-white'
                    }`}
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1C1330] p-8 md:p-12 rounded-sm shadow-lg">
            <h3 className="font-elegant text-3xl text-[#F1EDFB] mb-6 text-center">
              What's Included in Every Collection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-[#8F1ED2] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#F1EDFB] mb-1">
                    Professional Editing
                  </h4>
                  <p className="text-[#A9A0C4] text-sm">
                    Every image is carefully edited in my signature soft,
                    romantic style
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-[#8F1ED2] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#F1EDFB] mb-1">
                    Online Gallery
                  </h4>
                  <p className="text-[#A9A0C4] text-sm">
                    Private online gallery to share with family and friends
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-[#8F1ED2] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#F1EDFB] mb-1">
                    High-Resolution Images
                  </h4>
                  <p className="text-[#A9A0C4] text-sm">
                    Full resolution files perfect for printing and albums
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-[#8F1ED2] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#F1EDFB] mb-1">
                    Print Release
                  </h4>
                  <p className="text-[#A9A0C4] text-sm">
                    Rights to print your images wherever you choose
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-[#8F1ED2] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#F1EDFB] mb-1">
                    Timeline Planning
                  </h4>
                  <p className="text-[#A9A0C4] text-sm">
                    Help creating a photography timeline for your day
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-[#8F1ED2] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#F1EDFB] mb-1">
                    Fast Turnaround
                  </h4>
                  <p className="text-[#A9A0C4] text-sm">
                    Sneak peek within 48 hours, full gallery in 4-6 weeks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#1C1330]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-elegant text-4xl md:text-5xl text-[#F1EDFB] mb-6">
            Custom Collections Available
          </h2>
          <p className="text-[#A9A0C4] text-lg leading-relaxed mb-8">
            Every wedding is unique, and I'm happy to create a custom collection
            tailored to your specific needs. Whether you're planning a
            destination wedding, multi-day celebration, or intimate elopement,
            let's discuss how I can best serve you.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white px-8 py-4 rounded-sm hover:opacity-90 transition-all duration-300 font-sans text-sm tracking-wider uppercase"
          >
            Discuss Custom Options
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#100B21]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-elegant text-4xl md:text-5xl text-[#F1EDFB] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#A9A0C4] text-lg max-w-2xl mx-auto">
              Everything you need to know about booking and the photography process
            </p>
          </div>
          <FAQ />
        </div>
      </section>

      <section className="py-20 px-6 bg-[#1C1330] text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-elegant text-4xl md:text-5xl mb-6">
            Ready to Begin?
          </h2>
          <p className="text-sand-300 text-lg mb-8 leading-relaxed">
            I only take a limited number of weddings each year to ensure every
            couple receives my full attention and artistry. Let's connect and
            see if we're the perfect fit.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-[#0A60CF] via-[#8F1ED2] to-[#C404CB] text-white px-8 py-4 rounded-sm hover:opacity-90 transition-all duration-300 font-sans text-sm tracking-wider uppercase"
          >
            Check Availability
          </Link>
        </div>
      </section>
    </div>
  );
}
