
import ExploreNavbar from "@/components/explore/ExploreNavbar";
import ExploreSidebar from "@/components/explore/ExploreSidebar";
import ExploreMain from "@/components/explore/ExploreMain";

export default function ExplorePage() {
  return (
    <>
      <ExploreNavbar />
      <div style={{ display: "flex", paddingTop: "65px", minHeight: "100vh" }}>
        <ExploreSidebar />
        <ExploreMain />
      </div>
    </>
  );
}