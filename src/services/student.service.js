const prisma = require("../config/prisma");

const recordEventView = async (studentId, eventId) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id: eventId,
    },
  });

  if (!event || event.status !== "APPROVED") {
    throw new Error("Event not found");
  }

  return prisma.eventView.create({
    data: {
      student_id: studentId,
      event_id: eventId,
    },
  });
};

const bookmarkEvent = async (studentId, eventId) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id: eventId,
    },
  });

  if (!event || event.status !== "APPROVED") {
    throw new Error("Event not found");
  }

  return prisma.bookmark.create({
    data: {
      student_id: studentId,
      event_id: eventId,
    },
  });
};

const removeBookmark = async (studentId, eventId) => {
  return prisma.bookmark.deleteMany({
    where: {
      student_id: studentId,
      event_id: eventId,
    },
  });
};

const rsvpEvent = async (studentId, eventId) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id: eventId,
    },
  });

  if (!event || event.status !== "APPROVED") {
    throw new Error("Event not found");
  }

  return prisma.rSVP.create({
    data: {
      student_id: studentId,
      event_id: eventId,
    },
  });
};

const cancelRsvp = async (studentId, eventId) => {
  return prisma.rSVP.deleteMany({
    where: {
      student_id: studentId,
      event_id: eventId,
    },
  });
};

const giveFeedback = async (studentId, eventId, rating) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id: eventId,
    },
  });

  if (!event || event.status !== "APPROVED") {
    throw new Error("Event not found");
  }

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  return prisma.eventFeedback.upsert({
    where: {
      student_id_event_id: {
        student_id: studentId,
        event_id: eventId,
      },
    },
    update: {
      rating,
    },
    create: {
      student_id: studentId,
      event_id: eventId,
      rating,
    },
  });
};

const markNotInterested = async (studentId, eventId) => {
  const event = await prisma.event.findUnique({
    where: {
      event_id: eventId,
    },
  });

  if (!event || event.status !== "APPROVED") {
    throw new Error("Event not found");
  }

  return prisma.notInterested.upsert({
    where: {
      student_id_event_id: {
        student_id: studentId,
        event_id: eventId,
      },
    },
    update: {},
    create: {
      student_id: studentId,
      event_id: eventId,
    },
  });
};

module.exports = {
  recordEventView,
  bookmarkEvent,
  removeBookmark,
  rsvpEvent,
  cancelRsvp,
  giveFeedback,
  markNotInterested,
};