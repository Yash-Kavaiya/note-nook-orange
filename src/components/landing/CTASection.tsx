import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section id="cta" className="py-16">
      <div className="container mx-auto rounded-xl bg-hero-gradient p-10 text-inverted shadow-glow">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-semibold mb-3">Ready to Share?</h2>
          <p className="mb-6 text-inverted/90">Join NoteNook and help students everywhere by uploading your notes.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="hero" size="lg">Upload Notes</Button>
            <Button variant="outlineHero" size="lg">Browse Notes</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
