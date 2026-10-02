import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Credentials } from "@/components/home/Credentials";
import { Hero } from "@/components/home/Hero";
import { HowIWork } from "@/components/home/HowIWork";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhoIHelp } from "@/components/home/WhoIHelp";
import { ImpactSnapshot } from "@/components/sections/ImpactSnapshot";

/**
 * Homepage — 9 sections, each with one job and one next step:
 * proposition → who I help → services → proof → numbers → process → credentials → human → ask.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhoIHelp />
      <ServicesGrid />
      <FeaturedShowcase />
      <ImpactSnapshot />
      <HomeTestimonials />
      <HowIWork />
      <Credentials />
      <AboutTeaser />
      <ClosingCTA />
    </>
  );
}
