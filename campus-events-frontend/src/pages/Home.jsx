import { useEffect, useState } from "react";
import { getRecommendedEvents } from "../services/api";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendedEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">
          Campus<span>Events</span>
        </div>

        <div className="navbar-links">
          <button>Home</button>
          <button>All Events</button>
          <button>My Bookmarks</button>
          <button>Profile</button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div>
          <p className="hero-small">
            Welcome back 👋
          </p>

          <h1>
            Discover what's happening
            <br />
            around your campus.
          </h1>

          <p className="hero-description">
            Find events that match your interests,
            discover something new, and never miss
            what's happening on campus.
          </p>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <main className="events-section">

        <div className="section-header">
          <div>
            <p className="section-label">
              PERSONALIZED FOR YOU
            </p>

            <h2>✨ Recommended Events</h2>

            <p>
              Events selected based on your interests
              and activity.
            </p>
          </div>
        </div>

        {loading && (
          <div className="loading">
            Loading your recommendations...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="empty-state">
            No recommendations available right now.
          </div>
        )}

        <div className="events-grid">
          {events.map((item) => (
            <EventCard
              key={(item.event || item).event_id}
              item={item}
            />
          ))}
        </div>

      </main>
    </div>
  );
}

export default Home;