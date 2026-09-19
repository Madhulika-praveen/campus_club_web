function EventCard({ item }) {
  const event = item.event || item;

  const recommendationScore =
    item.recommendation?.score !== undefined
      ? item.recommendation.score
      : null;

  const date = new Date(event.date);

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

        <button className="view-event-button">
          View Event
        </button>
      </div>
    </div>
  );
}

export default EventCard;