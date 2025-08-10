import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NoteCard, { Note } from "@/components/notes/NoteCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

const MOCK_NOTES: Note[] = [
  { id: "1", title: "Calculus I - Limits & Derivatives", subject: "Math", college: "Harvard", date: "Aug 1, 2025", downloads: 1204, rating: 5 },
  { id: "2", title: "Physics - Kinematics Summary", subject: "Physics", college: "MIT", date: "Jul 22, 2025", downloads: 842, rating: 4 },
  { id: "3", title: "Microeconomics: Elasticity", subject: "Economics", college: "Stanford", date: "Jun 14, 2025", downloads: 467, rating: 4 },
  { id: "4", title: "Organic Chemistry - Reactions", subject: "Chemistry", college: "UCLA", date: "Aug 4, 2025", downloads: 998, rating: 5 },
];

const subjects = ["All", "Math", "Physics", "Economics", "Chemistry"];

const Browse = () => {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");

  const filtered = useMemo(() => {
    return MOCK_NOTES.filter((n) =>
      (subject === "All" || n.subject === subject) &&
      (n.title.toLowerCase().includes(query.toLowerCase()) || n.college.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, subject]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Browse Notes – NoteNook</title>
        <meta name="description" content="Browse and filter notes by subject and college on NoteNook." />
        <link rel="canonical" href="/browse" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto py-10">
        <h1 className="font-heading text-3xl font-semibold mb-6">Browse Notes</h1>
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-lg border bg-card p-4 h-max">
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input id="search" placeholder="Search by title or college" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div>
                <Label>Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>
          <section>
            {filtered.length === 0 ? (
              <div className="rounded-lg border bg-card p-10 text-center text-muted-foreground">No notes found. Try adjusting filters.</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((note) => (
                  <NoteCard key={note.id} note={note} onDownload={() => { /* placeholder */ }} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
