const prisma = require("../config/prisma");

const getApprovedEvents = async () => {
  return prisma.event.findMany({
    where: {
      status: "APPROVED",
    },
    include: {
      club: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};

const getEventById = async (eventId) => {
  return prisma.event.findUnique({
    where: {
      event_id: eventId,
    },
    include: {
      club: true,
    },
  });
};

module.exports = {
  getApprovedEvents,
  getEventById,
};