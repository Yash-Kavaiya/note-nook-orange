import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-students.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="relative min-h-[60vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="Students studying together - NoteNook"
      >
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="relative container mx-auto flex min-h-[60vh] flex-col items-center justify-center text-center text-inverted animate-fade-in">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold max-w-3xl">
            Share & Discover Notes at NoteNook
          </h1>
          <p className="mt-4 max-w-2xl text-inverted/90">
            Upload your notes, filter by subject & college, and download what you need.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/upload">Get Started</Link></Button>
            <Button asChild variant="outlineHero" size="lg"><Link to="/browse">Browse Notes</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
