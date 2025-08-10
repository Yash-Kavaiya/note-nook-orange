import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { seedInitialNotes } from "@/lib/firestore";
import { Database, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const FirebaseSetup = () => {
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeedData = async () => {
    setSeeding(true);
    setError(null);

    try {
      await seedInitialNotes();
      setSeeded(true);
    } catch (err: any) {
      setError(err.message || 'Failed to seed data');
      console.error('Seeding error:', err);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Firebase Setup
        </CardTitle>
        <CardDescription>
          Initialize your Firebase database with sample notes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        
        {seeded && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            Sample data seeded successfully!
          </div>
        )}

        <Button 
          onClick={handleSeedData} 
          disabled={seeding || seeded}
          className="w-full"
        >
          {seeding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Seeding Data...
            </>
          ) : seeded ? (
            "Data Already Seeded"
          ) : (
            "Seed Sample Data"
          )}
        </Button>

        <div className="text-xs text-muted-foreground">
          <p><strong>Note:</strong> Make sure to configure your Firebase project settings in <code>src/lib/firebase.ts</code></p>
        </div>
      </CardContent>
    </Card>
  );
};