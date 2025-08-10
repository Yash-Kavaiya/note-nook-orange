import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Search, Download, Star } from "lucide-react";

const features = [
  {
    title: "Easy Uploads",
    description: "Upload PDFs and tag by subject and college for quick discovery.",
    Icon: UploadCloud,
  },
  {
    title: "Powerful Search",
    description: "Find notes fast with keyword and filter-based search.",
    Icon: Search,
  },
  {
    title: "One-click Download",
    description: "Grab what you need instantly with clean, secure downloads.",
    Icon: Download,
  },
  {
    title: "Favorites & Ratings",
    description: "Save top notes and rate to help others find the best.",
    Icon: Star,
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold mb-3">Everything you need to excel</h2>
          <p className="text-muted-foreground">Upload, search, and download notes in a beautiful, fast interface.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, Icon }) => (
            <Card key={title} className="hover-scale border border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Icon className="h-5 w-5" />
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
