import { Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-secondary">
      <div className="container mx-auto flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-xl text-secondary-foreground">NoteNook</p>
          <p className="text-sm text-secondary-foreground/80">© {new Date().getFullYear()} NoteNook. All rights reserved.</p>
        </div>
        <nav className="flex items-center gap-4 text-secondary-foreground/90">
          <a href="#features" className="hover:text-secondary-foreground">Features</a>
          <a href="#testimonials" className="hover:text-secondary-foreground">Testimonials</a>
          <a href="#cta" className="hover:text-secondary-foreground">Get Started</a>
        </nav>
        <div className="flex items-center gap-3">
          <a aria-label="Twitter" href="#" className="hover:opacity-80"><Twitter className="h-5 w-5 text-secondary-foreground" /></a>
          <a aria-label="GitHub" href="#" className="hover:opacity-80"><Github className="h-5 w-5 text-secondary-foreground" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
