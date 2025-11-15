import Header from "@/components/Header";
import WorldClock from "@/components/WorldClock";
import RegionMonitor from "@/components/RegionMonitor";
import PipToggle from "@/components/PipToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div id="pip-content" className="space-y-8">
          {/* World Clocks */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="h-1 w-1 bg-primary rounded-full" />
              Live Time Zones
            </h2>
            <WorldClock />
          </section>

          {/* Region Status Monitor */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="h-1 w-1 bg-primary rounded-full" />
                Regional Store Status
              </h2>
              <PipToggle />
            </div>
            <RegionMonitor />
          </section>
        </div>

        {/* Footer Info */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          
        </footer>
      </main>
    </div>
  );
};

export default Index;
