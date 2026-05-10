export default function CampaignHero({ campaign }: any) {
  return (
    <div
      className="mt-[65px] h-[420px] flex items-end px-16 pb-10 relative"
      style={{ background: campaign.gradient }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <h1 className="relative text-white font-serif text-3xl font-black max-w-2xl">
        {campaign.title}
      </h1>
    </div>
  );
}