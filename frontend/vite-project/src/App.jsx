
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import CreatePost from "./pages/create-post.jsx";
import Feed from "./pages/feed.jsx";

const AppContent = () => {
  const location = useLocation();

  const pages = [
    { name: "Home", path: "/", icon: "🏠", description: "Explore your world" },
    { name: "Feed", path: "/feed", icon: "🌐", description: "Discover amazing posts" },
    { name: "Create Post", path: "/create-post", icon: "✨", description: "Share your creativity" },
    { name: "About", path: "/about", icon: "🚀", description: "Discover our vision" },
  ];

  return (
    <div className="app">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          background: #080b18;
          color: white;
        }

        .app {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 20% 10%, #29205a 0%, transparent 40%),
            radial-gradient(ellipse at 90% 70%, #123d58 0%, transparent 38%),
            #080b18;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 18px 7%;
          background: rgba(8, 11, 24, 0.8);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,.1);
        }

        .logo {
          font-size: 25px;
          font-weight: 900;
          letter-spacing: -1px;
          background: linear-gradient(90deg, #a78bfa, #67e8f9);
          -webkit-background-clip: text;
          color: transparent;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .nav-link {
          text-decoration: none;
          color: #cbd5e1;
          padding: 10px 14px;
          border-radius: 12px;
          transition: .25s;
          font-size: 14px;
        }

        .nav-link:hover, .nav-link.active {
          color: white;
          background: rgba(139, 92, 246, .25);
          box-shadow: 0 0 18px rgba(139, 92, 246, .18);
        }

        .hero {
          max-width: 1150px;
          margin: auto;
          padding: 75px 24px 35px;
          text-align: center;
          perspective: 1000px;
        }

        .badge {
          display: inline-block;
          padding: 9px 16px;
          border: 1px solid #51417d;
          border-radius: 30px;
          background: rgba(139,92,246,.12);
          color: #c4b5fd;
          font-size: 13px;
        }

        .hero h1 {
          font-size: clamp(38px, 7vw, 76px);
          line-height: 1.08;
          margin: 25px auto 18px;
          max-width: 850px;
          letter-spacing: -3px;
        }

        .gradient-text {
          background: linear-gradient(90deg, #c4b5fd, #67e8f9, #f0abfc);
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero p {
          color: #a5b4cc;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto;
          font-size: 16px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          max-width: 1150px;
          padding: 35px 24px 70px;
          margin: auto;
          perspective: 1200px;
        }

        .card {
          min-height: 230px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 25px;
          border-radius: 22px;
          text-decoration: none;
          color: white;
          border: 1px solid rgba(255,255,255,.13);
          background: linear-gradient(145deg, rgba(255,255,255,.10), rgba(255,255,255,.025));
          box-shadow: 0 15px 35px rgba(0,0,0,.25), inset 0 1px rgba(255,255,255,.08);
          transform-style: preserve-3d;
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
          animation: appear .7s both;
        }

        .card:hover {
          transform: translateY(-12px) rotateX(5deg) rotateY(-5deg) scale(1.025);
          border-color: #a78bfa;
          box-shadow: 0 25px 55px rgba(124,58,237,.22);
        }

        .card.active {
          border-color: #8b5cf6;
          background: linear-gradient(145deg, rgba(139,92,246,.24), rgba(255,255,255,.035));
        }

        .card-icon {
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          font-size: 31px;
          border-radius: 18px;
          background: linear-gradient(145deg, rgba(167,139,250,.3), rgba(103,232,249,.1));
          border: 1px solid rgba(255,255,255,.13);
          transform: translateZ(25px);
        }

        .card h2 {
          font-size: 20px;
          margin: 25px 0 8px;
          transform: translateZ(20px);
        }

        .card p {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: #a5b4cc;
        }

        .arrow {
          position: absolute;
          right: 23px;
          bottom: 25px;
          font-size: 23px;
          color: #c4b5fd;
          transition: transform .25s;
        }

        .card:hover .arrow {
          transform: translate(4px, -4px);
        }

        .content {
          max-width: 1150px;
          min-height: 300px;
          padding: 25px 24px 80px;
          margin: auto;
          animation: appear .4s ease;
        }

        .page-heading {
          text-align: center;
          margin: 10px 0 35px;
        }

        .page-heading h2 {
          font-size: clamp(30px, 5vw, 48px);
          margin-bottom: 12px;
        }

        .page-heading p {
          color: #a5b4cc;
        }

        .about-box {
          max-width: 700px;
          margin: auto;
          padding: 35px;
          line-height: 1.9;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.05);
          box-shadow: 0 20px 50px rgba(0,0,0,.2);
        }

        .footer {
          text-align: center;
          padding: 25px;
          color: #64748b;
          border-top: 1px solid rgba(255,255,255,.08);
          font-size: 13px;
        }

        @keyframes appear {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 850px) {
          .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .navbar { padding: 16px 5%; }
        }

        @media (max-width: 500px) {
          .navbar { align-items: flex-start; flex-direction: column; }
          .nav-links { gap: 4px; }
          .nav-link { padding: 8px; }
          .cards { grid-template-columns: 1fr; padding-top: 20px; }
          .hero { padding-top: 50px; }
          .hero h1 { letter-spacing: -1.5px; }
          .card { min-height: 200px; }
        }
      `}</style>

      <header className="navbar">
        <Link className="logo" to="/">IMAGEVERSE ✦</Link>

        <nav className="nav-links">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className={`nav-link ${
                location.pathname === page.path ? "active" : ""
              }`}
            >
              {page.name}
            </Link>
          ))}
        </nav>
      </header>

      <section className="hero">
        <span className="badge">✦ YOUR CREATIVE UNIVERSE</span>

        <h1>
          Turn your ideas into{" "}
          <span className="gradient-text">something extraordinary.</span>
        </h1>

        <p>
          Explore creative posts, share your imagination, and discover a
          new world through an immersive 3D-inspired experience.
        </p>
      </section>

      <section className="cards">
        {pages.map((page, index) => (
          <Link
            key={page.path}
            to={page.path}
            className={`card ${
              location.pathname === page.path ? "active" : ""
            }`}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="card-icon">{page.icon}</div>

            <div>
              <h2>{page.name}</h2>
              <p>{page.description}</p>
            </div>

            <span className="arrow">↗</span>
          </Link>
        ))}
      </section>

      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="page-heading">
                <h2>Welcome to <span className="gradient-text">ImageVerse</span></h2>
                <p>Choose a card above to explore your next destination.</p>
              </div>
            }
          />

          <Route
            path="/feed"
            element={
              <>
                <div className="page-heading">
                  <h2>🌐 Explore the Feed</h2>
                  <p>Discover what's happening in your creative universe.</p>
                </div>
                <Feed />
              </>
            }
          />

          <Route
            path="/create-post"
            element={
              <>
                <div className="page-heading">
                  <h2>✨ Create Something</h2>
                  <p>Bring your ideas to life and share them.</p>
                </div>
                <CreatePost />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <div className="page-heading">
                  <h2>About <span className="gradient-text">Us</span></h2>
                  <p>A space for imagination, creativity, and connection.</p>
                </div>

                <div className="about-box">
                  <h2>🚀 Our Vision</h2>
                  <p>
                    ImageVerse is a creative space where people can publish
                    posts, explore ideas, and share their imagination.
                    Our goal is to make every interaction feel modern,
                    immersive, and engaging.
                  </p>
                </div>
              </>
            }
          />

          <Route
            path="*"
            element={
              <div className="page-heading">
                <h2>404 — Page Not Found</h2>
                <Link className="nav-link" to="/">Return Home ↗</Link>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} ImageVerse · Made for creativity ✦
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
