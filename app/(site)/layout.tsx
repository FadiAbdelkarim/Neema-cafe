import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PatternDivider from "@/components/pattern-divider";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <PatternDivider />
      <Footer />
    </>
  );
}
