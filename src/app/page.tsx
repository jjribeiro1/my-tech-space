import { Header } from "@/features/landing-page/components/header";
import { Hero } from "@/features/landing-page/components/hero";
import { Benefits } from "@/features/landing-page/components/benefits";
import { HowItWorks } from "@/features/landing-page/components/how-it-works";
import { ResourceTypes } from "@/features/landing-page/components/resource-types";
import { CTA } from "@/features/landing-page/components/cta";
import { Footer } from "@/features/landing-page/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <ResourceTypes />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
