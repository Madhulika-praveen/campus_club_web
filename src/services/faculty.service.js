const prisma = require("../config/prisma");

const getPendingEvents = async () => {
  return prisma.event.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      club: true,
      organizer: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

const approveEvent = async (eventId) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.status !== "PENDING") {
    throw new Error("Only pending events can be approved");
  }

  return prisma.event.update({
    where: {
      event_id: eventId,
    },
    data: {
      status: "APPROVED",
    },
  });
};

const rejectEvent = async (eventId) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.status !== "PENDING") {
    throw new Error("Only pending events can be rejected");
  }

  return prisma.event.update({
    where: {
      event_id: eventId,
    },
    data: {
      status: "REJECTED",
    },
  });
};

module.exports = {
  getPendingEvents,
  approveEvent,
  rejectEvent,
};