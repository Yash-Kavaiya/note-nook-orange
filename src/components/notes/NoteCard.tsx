import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Heart, School, Star } from "lucide-react";

export type Note = {
  id: string;
  title: string;
  subject: string;
  college: string;
  date: string;
  downloads: number;
  rating: number; // 0-5
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-primary" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-current" : ""}`} />
    ))}
  </div>
);

const NoteCard = ({ note, onDownload }: { note: Note; onDownload?: (id: string) => void }) => {
  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle className="text-base">{note.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{note.subject}</Badge>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><School className="h-4 w-4" />{note.college}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{note.date}</span>
          <span>{note.downloads.toLocaleString()} downloads</span>
        </div>
        <Stars rating={note.rating} />
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button variant="hero" className="flex-1" onClick={() => onDownload?.(note.id)}>
          <Download className="h-4 w-4" /> Download
        </Button>
        <Button variant="outlineHero" size="icon" aria-label="Favorite">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
