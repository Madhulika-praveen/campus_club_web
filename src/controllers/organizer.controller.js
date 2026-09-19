const organizerService = require("../services/organizer.service");

const getOrganizerEvents = async (req, res, next) => {
  try {
    const events = await organizerService.getOrganizerEvents(
      req.user.id
    );

    res.json(events);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrganizerEvents,
};