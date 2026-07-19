import ExploreNavbar from "@/components/explore/ExploreNavbar";
import MyCampaignsMain from "@/components/myCompaigns/MyCampaignMain";
// import MyCampaignsMain from "@/components/myCampaigns/MyCampaignsMain";

export default function MyCampaignsPage() {
  return (
    <>
      <ExploreNavbar />
      <div style={{ paddingTop: "65px", minHeight: "100vh", background: "#FDFAF6" }}>
        <MyCampaignsMain />
      </div>
    </>
  );
}