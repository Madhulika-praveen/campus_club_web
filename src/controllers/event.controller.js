const eventService = require("../services/event.service");

const getApprovedEvents = async (req, res, next) => {
  try {
    const events = await eventService.getApprovedEvents();

    res.json(events);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    if (Number.isNaN(eventId)) {
      return res.status(400).json({
        error: "Invalid event ID",
      });
    }

    const event = await eventService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApprovedEvents,
  getEventById,
};