import {
  Navbar,
  Hero,
  TrustBar,
  HowItWorks,
  FeaturedCampaigns,
  Categories,
  CTASection,
  Footer,
} from "@/components/landing";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/explore");
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeaturedCampaigns />
      <Categories />
      <CTASection />
      <Footer />
    </main>
  );
}