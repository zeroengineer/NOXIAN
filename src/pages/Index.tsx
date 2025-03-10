
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-slate-900 to-black">
      <Navbar />
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary/30 to-primary/10 border border-primary/20">
              <span className="text-lg font-bold tracking-wider text-primary">NOXIAN</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 text-left">
              Detect AI-Generated Images
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-left">
              Advanced AI technology to analyze and detect whether images are AI-generated or authentic photographs.
            </p>
            <div className="flex items-start gap-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/upload">Try It Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
