import React from "react";

export interface SpectralIndexGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpectralIndexGuide = React.memo(function SpectralIndexGuide({
  isOpen,
  onClose
}: SpectralIndexGuideProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-right relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full transition-all"
          >
            ✕
          </button>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">📖 دليل المؤشرات الفضائية والاستشعار عن بعد</h3>
            <span className="text-xl">🛰️</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/70 border border-emerald-500/20 p-3.5 rounded-2xl space-y-1">
            <h4 className="font-bold text-emerald-400 text-sm flex items-center justify-end gap-1.5">
              <span>كثافة الأشجار (% Cover)</span>
              <span>🌳</span>
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              المعيار التراكمي المباشر لحجم المساحة الخضراء التي تصنعها غصون الأشجار بالنسبة لمساحة الحقل الكلية، مصفاة 100% من أثر التبن والتربة.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-emerald-500/20 p-3.5 rounded-2xl space-y-1">
            <h4 className="font-bold text-emerald-400 text-sm flex items-center justify-end gap-1.5">
              <span>صحة الأشجار (SAVI)</span>
              <span>🌿</span>
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              المعيار الذهبي المعتمد لبساتين الزيتون؛ لأنه يحيد أثر لون التربة الكلسية أو الحصوية ويقيس النشاط الخضري الحقيقي للأوراق.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-teal-500/20 p-3.5 rounded-2xl space-y-1">
            <h4 className="font-bold text-teal-400 text-sm flex items-center justify-end gap-1.5">
              <span>الغطاء النباتي (NDVI)</span>
              <span>🌱</span>
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              يقيس كثافة البناء الضوئي الإجمالية وكمية الخضرة. يمثل الصورة الشاملة لنشاط النباتات والكتلة الحيوية.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-blue-500/20 p-3.5 rounded-2xl space-y-1">
            <h4 className="font-bold text-blue-400 text-sm flex items-center justify-end gap-1.5">
              <span>الإجهاد المائي (NDWI)</span>
              <span>💧</span>
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              يقيس المحتوى المائي الداخلي لخلايا الورقة ويكشف نقص الماء والإجهاد الهيدروليكي قبل ظهور أعراض الذبول بالعين المجردة بـ 5 أيام.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-amber-500/20 p-3.5 rounded-2xl space-y-1">
            <h4 className="font-bold text-amber-400 text-sm flex items-center justify-end gap-1.5">
              <span>مؤشر التبن والقش (NDTI)</span>
              <span>🌾</span>
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              يستغل الأشعة تحت الحمراء القصيرة (SWIR2) لكشف بصمة السليولوز والتبن الجاف بعد حصاد القمح، ويمنع الإيجابيات الكاذبة.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-red-500/20 p-3.5 rounded-2xl space-y-1">
            <h4 className="font-bold text-red-400 text-sm flex items-center justify-end gap-1.5">
              <span>حافة الكلوروفيل (NDRE)</span>
              <span>🔴</span>
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              يقيس القفزة الطيفية للكلوروفيل عند الطول الموجي 705nm، مما يضمن كشف الأشجار الفتية ذات العرش الصغير ودون إسقاطها.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2 rounded-xl text-xs transition-all shadow-lg"
          >
            فهمت ذلك / إغلاق
          </button>
        </div>
      </div>
    </div>
  );
});
