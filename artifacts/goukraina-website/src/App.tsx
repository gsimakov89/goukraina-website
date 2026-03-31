import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/layout/ScrollToTop";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { OrganizationSchema } from "@/components/seo/SchemaOrg";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Reh2o from "@/pages/initiatives/Reh2o";
import PowerGenerators from "@/pages/initiatives/PowerGenerators";
import Advocacy from "@/pages/initiatives/Advocacy";
import UkraineDreamzzz from "@/pages/initiatives/UkraineDreamzzz";
import Summit from "@/pages/Summit";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Donate from "@/pages/Donate";
import Impact from "@/pages/Impact";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import DriveImporter from "@/pages/DriveImporter";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { useLocation } from "wouter";

const queryClient = new QueryClient();

function ScrollManager() {
  const [pathname] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollManager />
      <OrganizationSchema />
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          
          <Route path="/initiatives/reh2o" component={Reh2o} />
          <Route path="/initiatives/power-generators" component={PowerGenerators} />
          <Route path="/initiatives/advocacy" component={Advocacy} />
          <Route path="/initiatives/ukraine-dreamzzz" component={UkraineDreamzzz} />
          
          <Route path="/summit" component={Summit} />
          
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          
          <Route path="/donate" component={Donate} />
          <Route path="/impact" component={Impact} />
          <Route path="/events" component={Events} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin/drive" component={DriveImporter} />
          
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
