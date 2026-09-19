const prisma = require("../config/prisma");

const getOrganizerEvents = async (organizerId) => {
  return prisma.event.findMany({
    where: {
      created_by: organizerId,
    },
    include: {
      club: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  getOrganizerEvents,
};