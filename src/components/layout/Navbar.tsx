import { BookOpen, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Browse Notes", to: "/browse" },
  { label: "Upload Notes", to: "/upload" },
  { label: "Download Notes", to: "/download" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50 border-b bg-hero-gradient">
      <nav className="container mx-auto flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-inverted" aria-hidden />
          <span className="font-heading text-lg font-semibold text-inverted">NoteNook</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `story-link ${isActive ? "text-inverted" : "text-inverted/90 hover:text-inverted"}`
              }
              end
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-inverted/70" />
            <Input
              aria-label="Search notes"
              placeholder="Search notes"
              className="pl-9 bg-card text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
          <Button variant="outlineHero" className="">Log in</Button>
          <Button variant="hero">Sign up</Button>
        </div>

        <div className="md:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button aria-label="Open menu" variant="outlineHero" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-foreground hover:text-primary ${isActive ? 'font-medium' : ''}`
                    }
                    end
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="mt-4 flex gap-3">
                  <Button variant="outlineHero" className="w-full">Log in</Button>
                  <Button variant="hero" className="w-full">Sign up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
