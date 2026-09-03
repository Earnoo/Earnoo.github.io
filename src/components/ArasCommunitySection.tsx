import React, { useState, useEffect } from 'react';
import { ARAS_COMMUNITY_PHOTOS } from '../data/communityData';
import { CommunityEventPhoto } from '../types';
import {
  Users,
  MapPin,
  Calendar,
  Sparkles,
  Maximize2,
  X,
  Presentation,
  Compass,
  Plane,
  Camera,
  Upload,
  ChevronRight,
  Info
} from 'lucide-react';

interface ArasCommunitySectionProps {
  onOpenPhotoLightbox?: (photo: CommunityEventPhoto) => void;
}

export const ArasCommunitySection: React.FC<ArasCommunitySectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalPhoto, setActiveModalPhoto] = useState<CommunityEventPhoto | null>(null);
  const [userCustomImages, setUserCustomImages] = useState<Record<string, string>>({});

  // Load any locally cached image uploads if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aras_custom_community_images');
      if (saved) {
        setUserCustomImages(JSON.parse(saved));
      }
    } catch {
      // Ignore local storage error in restricted iframes
    }
  }, []);

  const handleFileUpload = (photoId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setUserCustomImages((prev) => {
          const updated = { ...prev, [photoId]: result };
          try {
            localStorage.setItem('aras_custom_community_images', JSON.stringify(updated));
          } catch {
            // Storage quota fallback
          }
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const categories = ['All', 'Academic Presentation', 'Faculty Retreat', 'Field Expedition', 'Academic Travel'];

  const filteredPhotos = selectedCategory === 'All'
    ? ARAS_COMMUNITY_PHOTOS
    : ARAS_COMMUNITY_PHOTOS.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic Presentation':
        return <Presentation className="w-3.5 h-3.5" />;
      case 'Faculty Retreat':
        return <Users className="w-3.5 h-3.5" />;
      case 'Field Expedition':
        return <Compass className="w-3.5 h-3.5" />;
      case 'Academic Travel':
        return <Plane className="w-3.5 h-3.5" />;
      default:
        return <Camera className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="community" className="py-16 sm:py-20 border-b border-neutral-800 bg-[#0a0a0a] relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Users className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">
                Lab Life & Research Community
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Life at <span className="font-semibold text-indigo-400">ARAS AI Lab</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Scientific inquiry thrives on collaborative synergy. A glimpse into academic presentations, annual team expeditions, and community at K. N. Toosi University of Technology.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredPhotos.map((photo) => {
            const currentImg = userCustomImages[photo.id] || photo.imageSrc;

            return (
              <div
                key={photo.id}
                className="group bg-neutral-900/90 border border-neutral-800 hover:border-indigo-500/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col shadow-lg"
              >
                {/* Photo Display Window */}
                <div
                  onClick={() => setActiveModalPhoto(photo)}
                  className="relative aspect-[16/10] bg-neutral-950 overflow-hidden cursor-pointer flex items-center justify-center"
                >
                  <img
                    src={currentImg}
                    alt={`Alireza Jahani - ARAS AI Lab: ${photo.title}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully if direct file not yet placed
                      e.currentTarget.style.display = 'none';
                      const fallbackEl = document.getElementById(`fallback-${photo.id}`);
                      if (fallbackEl) fallbackEl.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* SVG Themed Fallback if image path not yet loaded */}
                  <div
                    id={`fallback-${photo.id}`}
                    style={{ display: 'none' }}
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-neutral-900 to-neutral-950"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                      {getCategoryIcon(photo.category)}
                    </div>
                    <div className="text-xs font-mono font-semibold text-white mb-1">
                      {photo.title}
                    </div>
                    <div className="text-[11px] text-neutral-400 max-w-xs line-clamp-2">
                      {photo.description}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-indigo-400 bg-neutral-900 px-2 py-1 rounded border border-neutral-800">
                      <Camera className="w-3 h-3" />
                      <span>ARAS Lab Event</span>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Category & Location Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 text-white text-[11px] font-medium shadow-sm">
                      {getCategoryIcon(photo.category)}
                      <span>{photo.category}</span>
                    </span>
                  </div>

                  {/* Zoom indicator on hover */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600/90 backdrop-blur-sm text-white text-[11px] font-medium shadow-md">
                      <Maximize2 className="w-3 h-3" />
                      <span>View Full Image</span>
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-indigo-400" />
                        <span className="truncate max-w-[200px]">{photo.location}</span>
                      </span>
                      <span className="flex items-center gap-1 text-neutral-500">
                        <Calendar className="w-3 h-3" />
                        <span>{photo.date}</span>
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveModalPhoto(photo)}
                      className="text-base font-medium text-white group-hover:text-indigo-400 transition-colors cursor-pointer leading-snug mb-2"
                    >
                      {photo.title}
                    </h3>

                    <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                      {photo.description}
                    </p>

                    {/* Highlights bullets */}
                    <div className="space-y-1.5 mb-4">
                      {photo.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
                      <Users className="w-3 h-3 text-neutral-500" />
                      <span>{photo.affiliation}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Photo Upload / Change Option */}
                      <label className="cursor-pointer inline-flex items-center gap-1 px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-medium transition-colors border border-neutral-700/60">
                        <Upload className="w-3 h-3 text-indigo-400" />
                        <span>Update Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(photo.id, e)}
                        />
                      </label>

                      <button
                        onClick={() => setActiveModalPhoto(photo)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-[11px] font-medium border border-indigo-500/30 transition-colors"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lab Culture Summary Callout */}
        <div className="mt-10 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">ARAS Lab Culture & Collaboration</div>
              <div className="text-xs text-neutral-400 mt-0.5 max-w-2xl leading-relaxed">
                Led by Prof. Hamid D. Taghirad, the ARAS AI Lab champions open academic discourse, advanced machine learning prototyping, and joint student expeditions to foster high-impact scientific research.
              </div>
            </div>
          </div>
          <a
            href="https://aras.kntu.ac.ir/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium border border-neutral-700 transition-colors shrink-0"
          >
            <span>Visit ARAS Official Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
          </a>
        </div>
      </div>

      {/* Full-Screen Photo Lightbox Modal */}
      {activeModalPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {getCategoryIcon(activeModalPhoto.category)}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white truncate max-w-md sm:max-w-xl">
                    {activeModalPhoto.title}
                  </h3>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    {activeModalPhoto.location} &bull; {activeModalPhoto.date}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModalPhoto(null)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden min-h-[320px] max-h-[58vh]">
              <img
                src={userCustomImages[activeModalPhoto.id] || activeModalPhoto.imageSrc}
                alt={`Alireza Jahani - ARAS AI Lab: ${activeModalPhoto.title}`}
                referrerPolicy="no-referrer"
                className="max-h-[58vh] w-auto max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const modalFallback = document.getElementById('modal-fallback');
                  if (modalFallback) modalFallback.style.display = 'flex';
                }}
              />
              <div
                id="modal-fallback"
                style={{ display: 'none' }}
                className="w-full h-64 flex flex-col items-center justify-center p-6 text-center text-neutral-400"
              >
                <Camera className="w-12 h-12 text-indigo-400/50 mb-3" />
                <div className="text-sm font-medium text-neutral-200">{activeModalPhoto.title}</div>
                <div className="text-xs text-neutral-500 max-w-sm mt-1">{activeModalPhoto.description}</div>
              </div>
            </div>

            {/* Modal Footer / Detailed Metadata */}
            <div className="p-5 bg-neutral-950 border-t border-neutral-800 overflow-y-auto">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                {activeModalPhoto.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800/80">
                  <span className="text-neutral-500 font-mono block mb-1">Key Context:</span>
                  <ul className="space-y-1 text-neutral-300">
                    {activeModalPhoto.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-indigo-400">&bull;</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800/80 flex flex-col justify-between">
                  <div>
                    <span className="text-neutral-500 font-mono block mb-1">Affiliation & Participants:</span>
                    <div className="text-neutral-200 font-medium">{activeModalPhoto.affiliation}</div>
                    {activeModalPhoto.keyPeople && (
                      <div className="text-neutral-400 text-[11px] mt-1">
                        {activeModalPhoto.keyPeople.join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload High-Res Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleFileUpload(activeModalPhoto.id, e);
                        }}
                      />
                    </label>

                    <button
                      onClick={() => setActiveModalPhoto(null)}
                      className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors"
                    >
                      Close Viewer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
