
import { useState } from "react";

function CreateEvent() {
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    club_id: "",
    category: "",
    tags: "",
    capacity: "",
    endDate: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Poster size must be less than 5 MB.");
      return;
    }

    setError("");
    setPoster(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!formData.title.trim()) {
      setError("Please enter an event title.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter an event description.");
      return;
    }

    if (!formData.date) {
      setError("Please select an event date.");
      return;
    }

    if (!formData.venue.trim()) {
      setError("Please enter the venue.");
      return;
    }

    if (!formData.club_id) {
      setError("Please enter the club ID.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("time", formData.time);
      data.append("venue", formData.venue);
      data.append("club_id", formData.club_id);
      data.append("category", formData.category);
      data.append("tags", formData.tags);
      data.append("capacity", formData.capacity);

      if (formData.endDate) {
        data.append("endDate", formData.endDate);
      }

      if (poster) {
        data.append("poster", poster);
      }

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create event");
      }

      setMessage(
        "Event submitted successfully! It is now waiting for approval."
      );

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        club_id: "",
        category: "",
        tags: "",
        capacity: "",
        endDate: "",
      });

      setPoster(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-header">
        <p className="section-label">ORGANIZER PORTAL</p>

        <h1>Create a New Event</h1>

        <p>
          Share your event with students across campus.
        </p>
      </div>

      <form className="create-event-form" onSubmit={handleSubmit}>

        <div className="poster-section">
          <div className="poster-upload">

            {preview ? (
              <div className="poster-preview">
                <img src={preview} alt="Event poster preview" />

                <button
                  type="button"
                  onClick={() => {
                    setPoster(null);
                    setPreview("");
                  }}
                >
                  Remove poster
                </button>
              </div>
            ) : (
              <label className="upload-box">
                <div className="upload-icon">＋</div>

                <h3>Upload Event Poster</h3>

                <p>
                  JPG, PNG or WEBP
                  <br />
                  Maximum size: 5 MB
                </p>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePosterChange}
                />
              </label>
            )}

          </div>
        </div>

        <div className="form-section">

          <h2>Event Information</h2>

          <div className="form-group">
            <label>Event Title *</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. AI Hackathon 2026"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell students what this event is about..."
              rows="5"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Date *</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Time</label>

              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="10:00 AM"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Venue *</label>

            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g. Main Auditorium"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Technology"
              />
            </div>

            <div className="form-group">
              <label>Club ID *</label>

              <input
                type="number"
                name="club_id"
                value={formData.club_id}
                onChange={handleChange}
                placeholder="e.g. 1"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Tags</label>

            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="AI, ML, Hackathon, Coding"
            />

            <small>
              Separate multiple tags using commas.
            </small>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Capacity</label>

              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 100"
              />
            </div>

            <div className="form-group">
              <label>End Date</label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {message && (
          <div className="form-success">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="create-event-button"
          disabled={loading}
        >
          {loading ? "Creating Event..." : "Submit Event →"}
        </button>

      </form>
    </div>
  );
}

export default CreateEvent;

