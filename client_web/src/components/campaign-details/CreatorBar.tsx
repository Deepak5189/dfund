export default function CreatorBar({ campaign }: any) {
  return (
    <div className="flex justify-between items-center p-5 bg-white border border-border rounded-xl mb-8 animate-fade-up">
      
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold"
          style={{ background: campaign.avatarGradient }}
        >
          {campaign.initials}
        </div>

        <div>
          <div className="font-semibold text-sm">{campaign.creator}</div>
          <div className="text-xs text-muted flex gap-2 items-center">
            <span>Campaign Creator</span>
            <span className="bg-sage-light text-sage px-2 rounded text-[10px] font-semibold">
              ✓ Verified
            </span>
          </div>
        </div>
      </div>

      <button className="px-4 py-2 border border-border rounded-md text-sm hover:border-amber hover:text-amber">
        + Follow
      </button>
    </div>
  );
}