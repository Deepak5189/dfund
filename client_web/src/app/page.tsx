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

export default async function Home() {


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