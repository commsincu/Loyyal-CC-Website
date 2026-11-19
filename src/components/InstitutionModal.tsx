import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Users, BookOpen, Calendar, Award, ExternalLink, Globe2 } from 'lucide-react';
import { Institution } from '../data/institutions';

interface InstitutionModalProps {
  institution: Institution | null;
  onClose: () => void;
  onFocusGlobe: (lat: number, lng: number) => void;
}

export const InstitutionModal: React.FC<InstitutionModalProps> = ({
  institution,
  onClose,
  onFocusGlobe,
}) => {
  if (!institution) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 md:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badge & Name */}
          <div className="flex items-start gap-4 pr-8">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center p-2 text-center shadow-md font-bold text-xs whitespace-pre-line ${institution.bg || 'bg-slate-900'} ${institution.textColor || 'text-white'}`}
            >
              {institution.shortName}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {institution.region}
                </span>
                {institution.badgeText && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    {institution.badgeText}
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-xl font-bold text-slate-900 tracking-tight leading-snug">
                {institution.name}
              </h3>
            </div>
          </div>

          {/* Key Facts Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Location</p>
                <p className="text-xs font-semibold text-slate-800">{institution.location}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Students</p>
                <p className="text-xs font-semibold text-slate-800">{institution.studentsCount}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Curriculum</p>
                <p className="text-xs font-semibold text-slate-800 truncate">{institution.curriculum}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Established</p>
                <p className="text-xs font-semibold text-slate-800">{institution.established}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => {
                onFocusGlobe(institution.coordinates.lat, institution.coordinates.lng);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              <Globe2 className="w-4 h-4" />
              Locate on 3D Globe
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
