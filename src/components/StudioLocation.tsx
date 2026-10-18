import { MapPin, ArrowUpRight } from 'lucide-react';
import { studio } from '../data/studio';

export default function StudioLocation() {
  return (
    <section className="px-6 pb-20" aria-labelledby="studio-location-title">
      <div className="container mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-xl border border-[#332950] bg-[#1C1330]">
          <div className="flex flex-col gap-5 p-6 md:p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-[#C98BEA]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Jalgaon, Maharashtra
              </div>
              <h2 id="studio-location-title" className="font-elegant text-3xl md:text-4xl text-[#F1EDFB]">
                Visit Lovelight Vision Studio
              </h2>
            </div>
            <a href={studio.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md border border-[#8F1ED2]/50 px-5 py-3 text-sm font-medium text-[#F1EDFB] hover:bg-[#8F1ED2]/15 transition-colors sm:self-auto">
              Open in Google Maps
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <iframe
            src={studio.mapEmbedUrl}
            title="Lovelight Vision Studio location in Jalgaon"
            className="block h-72 w-full sm:h-96"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
