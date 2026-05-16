import { TopDonorItem } from "../../services/api";
import { formatCurrency } from "../../utils/format";

export default function TopDonors({ donors }: { donors: TopDonorItem[] }) {
  return (
    <div className="glass rounded-3xl bg-[#121315] p-6 h-full flex flex-col overflow-hidden">
      <h3 className="text-xl font-semibold mb-6">Top Donors</h3>

      {donors.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-[#666]">
          <p className="text-sm">No donors yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {donors.slice(0, 5).map((donor, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;

            return (
              <div
                key={index}
                className={`flex justify-between items-center p-3.5 rounded-2xl transition-all duration-200 group
                  ${isFirst ? "bg-[#FFD700]/10 border border-[#FFD700]/20" : "bg-white/5 hover:bg-white/10"}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black shrink-0
                    ${isFirst ? "bg-[#FFD700] text-[#121315]" :
                      isSecond ? "bg-[#C0C0C0] text-[#121315]" :
                        isThird ? "bg-[#CD7F32] text-[#121315]" : "bg-white/10 text-white/40"}`}
                  >
                    {index + 1}
                  </div>

                  <span className="font-medium truncate text-white/90">
                    {donor.name}
                  </span>
                </div>

                <span
                  className={`font-bold text-sm sm:text-base cursor-help shrink-0 ml-2
                    ${isFirst ? "text-[#FFD700]" :
                      isSecond ? "text-[#C0C0C0]" :
                        isThird ? "text-[#CD7F32]" : "text-donathell-main"}`}
                  title={formatCurrency(donor.convertedValue)}
                >
                  {formatCurrency(donor.convertedValue, true)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
