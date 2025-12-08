import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Yeltu Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // ❌ NO SEO
      // ❌ NO LINK (uses BrowserRouter)
      // ❌ NO components using context
      return (
        <div className="min-h-screen flex flex-col items-center justify-center 
                        bg-slate-900 text-white px-4 text-center">
          <h1 className="text-6xl font-extrabold mb-4">500</h1>

          <p className="text-blue-200 text-lg max-w-md mb-6">
            Something went wrong on our side.<br />
            Please refresh or try again later.
          </p>

          {/* Use plain <a>, not <Link> */}
          <a
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-slate-900 
                       hover:bg-slate-200 shadow transition"
          >
            Go Back Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
