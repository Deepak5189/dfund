import { notFound } from "next/navigation";
import { campaigns } from "@/components/explore/CampaignData";
import CampaignNavbar from "@/components/campaign/CampaignNavbar";
import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignStory from "@/components/campaign/CampaignStory";
import DonateSidebar from "@/components/campaign/DonateSidebar";

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const {id} = await params;
  const campaign = campaigns.find((c) => c.id === Number(id));

  if (!campaign) notFound();


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
        <CampaignStory campaign={campaign} />
        <DonateSidebar campaign={campaign} />
      </div>
    </>
  );
}