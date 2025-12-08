import { Link } from "react-router-dom";
import SEO from "./SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-800 px-4">

      {/* SEO */}
      <SEO
        title="404 – Page Not Found | Yeltu"
        description="The page you are looking for does not exist."
        url="https://yeltu.com/404"
        image="/og-404.jpg"
      />

      <h1 className="text-7xl font-bold text-slate-900 mb-4">404</h1>

      <p className="text-lg text-slate-600 mb-8 text-center max-w-md">
        The page you are looking for could not be found.  
        It might have been moved or removed.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-700 transition shadow"
      >
        Go Back Home
      </Link>
    </div>
  );
}
