import Hero from "@/components/hero";
import About from "@/components/about";
import Gallery from "@/components/gallery";
import LocationSection from "@/components/location";
import PatternDivider from "@/components/pattern-divider";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PatternDivider />
      <Gallery />
      <PatternDivider />
      <LocationSection />
    </main>
  );
}