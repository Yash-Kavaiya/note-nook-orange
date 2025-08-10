import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">About NoteNook</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering students to share knowledge and succeed together through collaborative note-sharing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create a platform where students can easily share, discover, and access high-quality study materials, 
                  fostering a collaborative learning environment that benefits everyone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Knowledge sharing and collaboration</li>
                  <li>• Academic integrity and authenticity</li>
                  <li>• Accessibility and inclusivity</li>
                  <li>• Student success and empowerment</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-4">Why NoteNook?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe that education is most powerful when it's collaborative. NoteNook was born from the idea that 
                students helping students creates the strongest foundation for academic success. By sharing notes, study guides, 
                and learning materials, we build a community where knowledge flows freely and everyone can thrive.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Community Driven</h3>
              <p className="text-muted-foreground text-sm">
                Built by students, for students. Our platform grows stronger with every contribution.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quality Content</h3>
              <p className="text-muted-foreground text-sm">
                Curated notes and materials from top-performing students across various subjects.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Easy Access</h3>
              <p className="text-muted-foreground text-sm">
                Simple, intuitive platform that makes finding and sharing notes effortless.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;