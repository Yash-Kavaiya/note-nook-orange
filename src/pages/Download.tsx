import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NoteCard, { Note } from "@/components/notes/NoteCard";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

const NOTES: Note[] = [
  { id: "1", title: "Linear Algebra - Matrix Basics", subject: "Math", college: "Harvard", level: "Junior", date: "Aug 5, 2025", downloads: 2120, rating: 5 },
  { id: "2", title: "Thermodynamics Cheat Sheet", subject: "Physics", college: "MIT", level: "Senior", date: "Aug 2, 2025", downloads: 1650, rating: 4 },
  { id: "3", title: "Macro Econ - GDP & Inflation", subject: "Economics", college: "Stanford", level: "Sophomore", date: "Jul 28, 2025", downloads: 980, rating: 4 },
];

const Download = () => {
  const handleDownload = (id: string) => {
    const note = NOTES.find((n) => n.id === id);
    toast({ title: "Download started", description: note ? note.title : "Your download is starting." });
    // Placeholder for actual download logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Download Notes – NoteNook</title>
        <meta name="description" content="Download top-rated study notes from NoteNook." />
        <link rel="canonical" href="/download" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto py-10">
        <h1 className="font-heading text-3xl font-semibold mb-6">Download Notes</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {NOTES.map((note) => (
            <NoteCard key={note.id} note={note} onDownload={handleDownload} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Download;
