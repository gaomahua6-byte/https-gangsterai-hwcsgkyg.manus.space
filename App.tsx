import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import FraudAlert from "./pages/FraudAlert";
import ScamEncyclopedia from "./pages/ScamEncyclopedia";
import StreetScams from "./pages/StreetScams";
import TelecomFraud from "./pages/TelecomFraud";
import ScamReplay from "./pages/ScamReplay";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/fraud-alert" component={FraudAlert} />
      <Route path="/scam-encyclopedia" component={ScamEncyclopedia} />
      <Route path="/street-scams" component={StreetScams} />
      <Route path="/telecom-fraud" component={TelecomFraud} />
      <Route path="/scam-replay" component={ScamReplay} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
