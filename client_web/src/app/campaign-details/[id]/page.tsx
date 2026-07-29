import { notFound } from "next/navigation";
// import { campaigns } from "@/components/explore/CampaignData";
import CampaignNavbar from "@/components/campaign/CampaignNavbar";
import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignStory from "@/components/campaign-details/CampaignStory";
import DonateSidebar from "@/components/campaign/DonateSidebar";
import { fetchCampaign } from "@/lib/store/api/postAPI";
import CampaignComments from "@/components/campaign-details/CampaignComments";
import RecommendedCampaigns from "@/components/campaign-details/RecommendedCampaigns";
import { Campaign } from "@/components/explore/CampaignCard";
import { Response } from "@/components/create-campaign/CreateCampaignForm";

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const {id} = await params;
  // fetching campaign with either campaign_id or campaign_slug
  const response: Response = await fetchCampaign(id);
  // console.log(response)
  if (!response) notFound();

  const campaign: Campaign = response.data || null; 
  if(!campaign) notFound();
  console.log(campaign);
  // const campaign = campaigns[0];



  return (
    <>
      <CampaignNavbar title={campaign.title} />
      <CampaignHero campaign={campaign} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap: "48px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 60px 80px",
      }}>
        <div className="space-y-16">
          <CampaignStory campaign={campaign} />
          <CampaignComments comments={campaign.comments} campaignId={campaign.id}/>
          {/* <CampaignComments/> */}
          <RecommendedCampaigns />
        </div>
        <DonateSidebar campaign={campaign} />
      </div>
    </>
  );
}