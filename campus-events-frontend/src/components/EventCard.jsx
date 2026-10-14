
import { useEffect, useState } from "react";
import { addBookmark, removeBookmark } from "../services/api";

function EventCard({ item, onBookmarkChange }) {
  const event = item.event || item;

  const recommendationScore =
    item.recommendation?.score !== undefined
      ? item.recommendation.score
      : null;

  const date = new Date(event.date);

  const [isBookmarked, setIsBookmarked] = useState(
    Boolean(item.isBookmarked)
  );

  useEffect(() => {
    setIsBookmarked(Boolean(item.isBookmarked));
  }, [item.isBookmarked]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBookmark = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (isBookmarked) {
        await removeBookmark(event.event_id);
        setIsBookmarked(false);
        onBookmarkChange?.(event.event_id, false);
        setMessage("Bookmark removed");
      } else {
        await addBookmark(event.event_id);
        setIsBookmarked(true);
        onBookmarkChange?.(event.event_id, true);
        setMessage("Event bookmarked!");
      }
    } catch (error) {
      console.error("Bookmark error:", error);
      setMessage("Could not update bookmark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-card">
      <div className="event-card-content">
        <div className="event-category">
          {event.category || "Event"}
        </div>

        <h3>{event.title}</h3>

        <p className="event-description">
          {event.description}
        </p>

        <div className="event-info">
          <p>📅 {date.toLocaleDateString()}</p>
          <p>🕒 {event.time || "Time not specified"}</p>
          <p>📍 {event.venue}</p>
        </div>

        {event.club && (
          <p className="event-club">
            🏫 {event.club.club_name}
          </p>
        )}

        {recommendationScore !== null && (
          <div className="recommendation-score">
            ✨ Recommended for you
          </div>
        )}

        <button
          className="view-event-button"
          onClick={handleBookmark}
          disabled={loading}
          type="button"
        >
          {loading
            ? "Please wait..."
            : isBookmarked
              ? "♥ Remove Bookmark"
              : "♡ Bookmark Event"}
        </button>

        {message && (
          <p role="status" aria-live="polite">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default EventCard;
