import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Upload = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Upload successful", description: "Your note has been uploaded." });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Upload Notes – NoteNook</title>
        <meta name="description" content="Upload your study notes to NoteNook with subject and college tags." />
        <link rel="canonical" href="/upload" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto py-10">
        <h1 className="font-heading text-3xl font-semibold mb-6">Upload Notes</h1>
        <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="e.g., Calculus I - Limits" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" required placeholder="e.g., Math" />
            </div>
            <div>
              <Label htmlFor="college">College</Label>
              <Input id="college" name="college" required placeholder="e.g., MIT" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Brief details about your notes" rows={6} />
            </div>
            <div>
              <Label htmlFor="file">File</Label>
              <Input id="file" name="file" type="file" accept=".pdf,.doc,.docx,.png,.jpg" required />
              <p className="mt-1 text-xs text-muted-foreground">Accepted: PDF, DOC, DOCX, PNG, JPG — Max 10MB</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <Button variant="hero" size="lg" disabled={loading}>
              {loading ? "Uploading..." : "Upload Now"}
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
