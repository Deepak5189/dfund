
import { notFound } from "next/navigation";

import CampaignNavbar from "@/components/campaign/CampaignNavbar";
import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignStory from "@/components/campaign-details/CampaignStory";
import DonateSidebar from "@/components/campaign/DonateSidebar";
import CampaignComments from "@/components/campaign-details/CampaignComments";
import RecommendedCampaigns from "@/components/campaign-details/RecommendedCampaigns";

import { fetchCampaign } from "@/lib/store/api/postAPI";
import type { Campaign } from "@/components/explore/CampaignCard";
import type { Response } from "@/components/create-campaign/CreateCampaignForm";
import CreatorBar from "@/components/campaign-details/CreatorBar";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response: Response = await fetchCampaign(id);

  if (!response?.data) {
    notFound();
  }

  const campaign = response.data as Campaign;
  console.log(campaign);

  return (
    <>
      <CampaignNavbar title={campaign.title} />

      <CampaignHero campaign={campaign} />

      <main className="campaign-detail-container p-8">
        {/* Main story and donation sidebar */}
        <div className="campaign-detail-layout">
          <div className="campaign-detail-main">
            <CreatorBar campaign = {campaign}/>
            <CampaignStory campaign={campaign} />

            <CampaignComments
              comments={campaign.comments ?? []}
              campaignId={campaign.id}
            />
          </div>

          <aside className="campaign-detail-sidebar">
            <DonateSidebar campaign={campaign} />
          </aside>
        </div>

        {/* Recommendations span the full content width */}
        <section className="campaign-recommendations">
          <RecommendedCampaigns />
        </section>
      </main>
    </>
  );
}