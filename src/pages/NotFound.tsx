import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center max-w-md mx-auto">
        <div className="text-8xl font-bold text-primary mb-6">404</div>
        <h1 className="heading-section text-foreground mb-4">Page introuvable</h1>
        <p className="text-section mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Page précédente</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
