import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="cta" className="py-16">
      <div className="container mx-auto rounded-xl bg-hero-gradient p-10 text-inverted shadow-glow">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-semibold mb-3">Ready to Share?</h2>
          <p className="mb-6 text-inverted/90">Join NoteNook and help students everywhere by uploading your notes.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/upload">Upload Notes</Link></Button>
            <Button asChild variant="outlineHero" size="lg"><Link to="/browse">Browse Notes</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
