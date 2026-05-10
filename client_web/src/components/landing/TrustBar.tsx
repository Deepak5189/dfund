const stats = [
  { num: "$4.2M+", label: "Total Raised" },
  { num: "1,840", label: "Campaigns Funded" },
  { num: "12K+", label: "Donors Worldwide" },
  { num: "100%", label: "Admin Reviewed" },
];

export default function TrustBar() {
  return (
    <div className="bg-[#E8820C] py-8 px-15 flex justify-center gap-20 items-center">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-20">
          <div className="text-center">
            <div className="font-['Playfair_Display'] text-[2rem] font-black text-[#1A1410]">
              {stat.num}
            </div>
            <div className="text-xs text-[#1A1410]/65 font-medium mt-0.5">{stat.label}</div>
          </div>
          {i < stats.length - 1 && (
            <div className="w-px h-10 bg-[#1A1410]/15" />
          )}
        </div>
      ))}
    </div>
  );
}