import { BookOpen, Menu, Search, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Browse Notes", to: "/browse" },
  { label: "Upload Notes", to: "/upload" },
  { label: "Download Notes", to: "/download" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
          
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlineHero" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem disabled>
                  <div className="flex flex-col">
                    <span className="font-medium">{currentUser.displayName || 'User'}</span>
                    <span className="text-xs text-muted-foreground">{currentUser.email}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <LoginModal>
                <Button variant="outlineHero" className="text-inverted">Log in</Button>
              </LoginModal>
              <LoginModal>
                <Button variant="hero">Sign up</Button>
              </LoginModal>
            </>
          )}
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
                <div className="mt-4 space-y-3">
                  {currentUser ? (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-muted/20">
                        <p className="font-medium">{currentUser.displayName || 'User'}</p>
                        <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                      </div>
                      <Button variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <LoginModal>
                        <Button variant="outlineHero" className="w-full text-inverted">Log in</Button>
                      </LoginModal>
                      <LoginModal>
                        <Button variant="hero" className="w-full">Sign up</Button>
                      </LoginModal>
                    </div>
                  )}
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
