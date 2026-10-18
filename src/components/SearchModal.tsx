import React, { useState } from 'react';
import { Product, Language } from '../types';
import { TEA_PRODUCTS } from '../data/teaProducts';
import { sfx } from '../utils/audio';
import { Search, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  lang: Language;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  lang,
}) => {
  if (!isOpen) return null;
  const isFa = lang === 'fa';
  const [query, setQuery] = useState('');

  const filtered = TEA_PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.nameFa.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.descriptionFa.toLowerCase().includes(q) ||
      p.descriptionEn.toLowerCase().includes(q) ||
      p.tastingNotesFa.some((t) => t.toLowerCase().includes(q)) ||
      p.tastingNotesEn.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-xs p-4 pt-20">
      <div 
        className="w-full max-w-xl bg-[#0c2419] border-4 border-[#255e3e] shadow-[8px_8px_0_#030a07] p-5 text-right dir-rtl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#1c482f] mb-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#4ade80]" />
            <h3 className="font-persian-pixel text-lg text-[#ffffff]">
              {isFa ? 'جستجو در انواع چای لاهیجان' : 'Search Lahijan Teas'}
            </h3>
          </div>
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="p-1 bg-[#123323] text-[#a7f3d0] hover:text-white border border-[#2d6e46]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input */}
        <div className="relative mb-4">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isFa ? 'نام چای، طعم (سرگل، سبز، ممتاز، هل)...' : 'Search by name, notes, harvest...'}
            className="w-full bg-[#081811] border-2 border-[#2a613f] p-3 text-sm text-[#ffffff] focus:border-[#52c97c] outline-none font-persian-text"
          />
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center font-persian-text text-xs text-[#82a58b] py-6">
              {isFa ? 'موردی یافت نشد.' : 'No teas matched your query.'}
            </p>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  sfx.playClick();
                  onSelectProduct(prod);
                  onClose();
                }}
                className="bg-[#091d14] border border-[#1e4832] p-3 flex items-center justify-between hover:bg-[#133724] cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="font-persian-pixel text-sm text-[#ffffff]">
                    {isFa ? prod.nameFa : prod.nameEn}
                  </h4>
                  <p className="font-persian-text text-xs text-[#86efac]">
                    {isFa ? prod.subtitleFa : prod.subtitleEn}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-persian-pixel text-xs text-[#fef08a]">
                  <span>{isFa ? prod.priceFormattedFa : prod.priceFormattedEn}</span>
                  {isFa ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
