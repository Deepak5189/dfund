export default function DonateSidebar({ campaign }: any) {
  return (
    <div className="sticky top-24 h-fit animate-fade-up">

      <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">

        <div className="p-6">
          <div className="font-serif text-3xl font-black">
            {campaign.raised}
          </div>

          <div className="text-sm text-muted mb-4">
            raised of {campaign.goal}
          </div>

          {/* Progress */}
          <div className="h-2 bg-border rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-amber to-amber-light"
              style={{ width: `${campaign.pct}%` }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 text-center border-t border-border">
            <div className="p-3">
              <div className="font-serif font-bold text-amber">
                {campaign.pct}%
              </div>
              <div className="text-xs text-muted">Funded</div>
            </div>

            <div className="p-3 border-x border-border">
              <div className="font-serif font-bold">
                {campaign.donors}
              </div>
              <div className="text-xs text-muted">Donors</div>
            </div>

            <div className="p-3">
              <div className="font-serif font-bold">
                {campaign.daysLeft}
              </div>
              <div className="text-xs text-muted">Days Left</div>
            </div>
          </div>
        </div>

        {/* Donate Button */}
        <div className="p-6">
          <button className="w-full py-3 rounded-lg bg-amber text-ink font-semibold hover:bg-amber-light transition">
            Donate Now →
          </button>
        </div>

      </div>

    </div>
  );
}