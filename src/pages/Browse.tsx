import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NoteCard, { Note } from "@/components/notes/NoteCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { getAllNotes, getFilteredNotes, incrementDownloads, FirebaseNote } from "@/lib/firestore";
import { Loader2 } from "lucide-react";

const MOCK_NOTES: Note[] = [
  { id: "1", title: "Calculus I - Limits & Derivatives", subject: "Math", college: "Harvard", level: "Freshman", date: "Aug 1, 2025", downloads: 1204, rating: 5 },
  { id: "2", title: "Physics - Kinematics Summary", subject: "Physics", college: "MIT", level: "Sophomore", date: "Jul 22, 2025", downloads: 842, rating: 4 },
  { id: "3", title: "Microeconomics: Elasticity", subject: "Economics", college: "Stanford", level: "Junior", date: "Jun 14, 2025", downloads: 467, rating: 4 },
  { id: "4", title: "Organic Chemistry - Reactions", subject: "Chemistry", college: "UCLA", level: "Senior", date: "Aug 4, 2025", downloads: 998, rating: 5 },
  { id: "5", title: "Linear Algebra - Matrix Operations", subject: "Math", college: "CalTech", level: "Sophomore", date: "Jul 28, 2025", downloads: 756, rating: 5 },
  { id: "6", title: "American History - Civil War Era", subject: "History", college: "Yale", level: "Junior", date: "Aug 5, 2025", downloads: 523, rating: 4 },
  { id: "7", title: "Cell Biology - Mitosis & Meiosis", subject: "Biology", college: "Johns Hopkins", level: "Freshman", date: "Jul 15, 2025", downloads: 891, rating: 4 },
  { id: "8", title: "Macroeconomics - Monetary Policy", subject: "Economics", college: "Chicago", level: "Senior", date: "Aug 2, 2025", downloads: 634, rating: 5 },
  { id: "9", title: "English Literature - Shakespeare Analysis", subject: "Literature", college: "Oxford", level: "Junior", date: "Jun 30, 2025", downloads: 412, rating: 3 },
  { id: "10", title: "Computer Science - Data Structures", subject: "Computer Science", college: "Carnegie Mellon", level: "Sophomore", date: "Aug 6, 2025", downloads: 1456, rating: 5 },
  { id: "11", title: "Statistics - Probability Distributions", subject: "Math", college: "Berkeley", level: "Junior", date: "Jul 20, 2025", downloads: 678, rating: 4 },
  { id: "12", title: "Psychology - Cognitive Behavioral Theory", subject: "Psychology", college: "Harvard", level: "Senior", date: "Aug 3, 2025", downloads: 542, rating: 4 },
  { id: "13", title: "Thermodynamics - Heat Transfer", subject: "Physics", college: "MIT", level: "Junior", date: "Jul 12, 2025", downloads: 723, rating: 5 },
  { id: "14", title: "Philosophy - Ethics & Morality", subject: "Philosophy", college: "Princeton", level: "Senior", date: "Jun 25, 2025", downloads: 298, rating: 3 },
  { id: "15", title: "Molecular Biology - DNA Replication", subject: "Biology", college: "Stanford", level: "Graduate", date: "Aug 7, 2025", downloads: 1123, rating: 5 },
  { id: "16", title: "World History - Renaissance Period", subject: "History", college: "Columbia", level: "Sophomore", date: "Jul 8, 2025", downloads: 387, rating: 4 },
  { id: "17", title: "Algorithms & Complexity", subject: "Computer Science", college: "MIT", level: "Graduate", date: "Aug 4, 2025", downloads: 932, rating: 5 },
  { id: "18", title: "Advanced Calculus - Multivariable", subject: "Math", college: "Princeton", level: "Junior", date: "Jul 25, 2025", downloads: 567, rating: 4 },
  { id: "19", title: "Marketing Fundamentals", subject: "Business", college: "Wharton", level: "Sophomore", date: "Aug 1, 2025", downloads: 445, rating: 4 },
  { id: "20", title: "Quantum Mechanics - Wave Functions", subject: "Physics", college: "CalTech", level: "Graduate", date: "Jul 18, 2025", downloads: 789, rating: 5 }
];

const subjects = ["All", "Math", "Physics", "Economics", "Chemistry", "History", "Biology", "Literature", "Computer Science", "Psychology", "Philosophy", "Business"];
const levels = ["All", "Freshman", "Sophomore", "Junior", "Senior", "Graduate"];

const Browse = () => {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState("All");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert Firebase note to Note interface
  const convertFirebaseNote = (firebaseNote: FirebaseNote): Note => {
    const createdAt = firebaseNote.createdAt?.toDate?.() || new Date();
    return {
      id: firebaseNote.id || '',
      title: firebaseNote.title,
      subject: firebaseNote.subject,
      college: firebaseNote.college,
      level: firebaseNote.level,
      date: createdAt.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      downloads: firebaseNote.downloads,
      rating: firebaseNote.rating,
      ratingCount: firebaseNote.ratingCount,
      description: firebaseNote.description,
      uploaderName: firebaseNote.uploaderName
    };
  };

  // Load notes from Firestore
  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const firebaseNotes = await getFilteredNotes({
        subject: subject !== "All" ? subject : undefined,
        level: level !== "All" ? level : undefined,
        searchQuery: query || undefined
      });
      
      const convertedNotes = firebaseNotes.map(convertFirebaseNote);
      setNotes(convertedNotes);
    } catch (err) {
      console.error('Error loading notes:', err);
      setError('Failed to load notes. Please try again.');
      // Fallback to mock data
      setNotes(MOCK_NOTES.filter((n) =>
        (subject === "All" || n.subject === subject) &&
        (level === "All" || n.level === level) &&
        (n.title.toLowerCase().includes(query.toLowerCase()) || n.college.toLowerCase().includes(query.toLowerCase()))
      ));
    } finally {
      setLoading(false);
    }
  };

  // Load notes on component mount and filter changes
  useEffect(() => {
    loadNotes();
  }, [subject, level, query]);

  const handleDownload = async (noteId: string) => {
    try {
      await incrementDownloads(noteId);
      // Update local state
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === noteId 
            ? { ...note, downloads: note.downloads + 1 }
            : note
        )
      );
    } catch (err) {
      console.error('Error updating download count:', err);
    }
  };

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
              <div>
                <Label>College Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>
          <section>
            {loading ? (
              <div className="flex items-center justify-center p-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading notes...</span>
              </div>
            ) : error ? (
              <div className="rounded-lg border bg-card p-10 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={loadNotes} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : notes.length === 0 ? (
              <div className="rounded-lg border bg-card p-10 text-center text-muted-foreground">No notes found. Try adjusting filters.</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {notes.map((note) => (
                  <NoteCard key={note.id} note={note} onDownload={handleDownload} />
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
