import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "NoteNook saved my semester! Found exactly what I needed.",
    author: "Ava, Computer Science",
  },
  {
    quote: "Uploading my notes helped classmates and boosted my GPA.",
    author: "Leo, Physics",
  },
  {
    quote: "Clean, fast, and organized — the best place for study notes.",
    author: "Mia, Economics",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-accent/30">
      <div className="container mx-auto">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold mb-3">Trusted by students</h2>
          <p className="text-muted-foreground">Real stories from real students using NoteNook.</p>
        </div>
        <Carousel className="mx-auto max-w-3xl">
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <blockquote className="rounded-xl border bg-card p-8 shadow-sm">
                  <p className="text-lg leading-relaxed">“{t.quote}”</p>
                  <footer className="mt-4 text-sm text-muted-foreground">— {t.author}</footer>
                </blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex items-center justify-center gap-2">
            <CarouselPrevious className="static" />
            <CarouselNext className="static" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
