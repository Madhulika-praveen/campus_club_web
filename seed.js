require("dotenv").config();
const prisma = require("./prismaClient");
const bcrypt = require("bcrypt");

async function main() {
  console.log("Clearing existing data...");
  // delete in dependency order (children first)
  await prisma.notInterested.deleteMany();
  await prisma.eventFeedback.deleteMany();
  await prisma.rSVP.deleteMany();
  await prisma.eventView.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.eventPromotion.deleteMany();
  await prisma.event.deleteMany();
  await prisma.organizer.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.student.deleteMany();
  await prisma.club.deleteMany();
  await prisma.admin.deleteMany();

  console.log("Creating clubs...");
  const techClub = await prisma.club.create({
    data: { club_name: "Tech Club", description: "Coding, AI, hackathons" },
  });
  const artsClub = await prisma.club.create({
    data: { club_name: "Music & Arts Club", description: "Music, dance, drama" },
  });
  const sportsClub = await prisma.club.create({
    data: { club_name: "Sports Club", description: "All things sports and fitness" },
  });

  console.log("Creating organizers + faculty...");
  const hashed = await bcrypt.hash("1234", 10);

  const techOrg = await prisma.organizer.create({
    data: { name: "Tech Org", email: "techorg@test.com", password: hashed, club_id: techClub.club_id },
  });
  const artsOrg = await prisma.organizer.create({
    data: { name: "Arts Org", email: "artsorg@test.com", password: hashed, club_id: artsClub.club_id },
  });
  const sportsOrg = await prisma.organizer.create({
    data: { name: "Sports Org", email: "sportsorg@test.com", password: hashed, club_id: sportsClub.club_id },
  });

  await prisma.faculty.create({
    data: { name: "Faculty One", email: "faculty@test.com", password: hashed, club_id: techClub.club_id },
  });

  console.log("Creating events...");
  const now = Date.now();
  const daysFromNow = (n) => new Date(now + n * 24 * 60 * 60 * 1000);

  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "AI Hackathon 2026",
        description: "24-hour hackathon building AI-powered apps",
        date: daysFromNow(10),
        time: "09:00 AM",
        venue: "CS Block Auditorium",
        club_id: techClub.club_id,
        created_by: techOrg.org_id,
        category: "Technical",
        tags: ["AI", "Coding", "Hackathon"],
        status: "APPROVED",
        capacity: 100,
      },
    }),
    prisma.event.create({
      data: {
        title: "Intro to Machine Learning Workshop",
        description: "Hands-on ML workshop for beginners",
        date: daysFromNow(5),
        time: "02:00 PM",
        venue: "Lab 3",
        club_id: techClub.club_id,
        created_by: techOrg.org_id,
        category: "Technical",
        tags: ["AI", "Coding", "Workshop"],
        status: "APPROVED",
        capacity: 40,
      },
    }),
    prisma.event.create({
      data: {
        title: "Competitive Coding Contest",
        description: "Solve algorithmic problems, win prizes",
        date: daysFromNow(20),
        time: "11:00 AM",
        venue: "CS Block Lab 1",
        club_id: techClub.club_id,
        created_by: techOrg.org_id,
        category: "Technical",
        tags: ["Coding", "Contest"],
        status: "APPROVED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Battle of Bands",
        description: "Live music competition between campus bands",
        date: daysFromNow(7),
        time: "06:00 PM",
        venue: "Open Air Theatre",
        club_id: artsClub.club_id,
        created_by: artsOrg.org_id,
        category: "Cultural",
        tags: ["Music", "Live Performance"],
        status: "APPROVED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Classical Dance Evening",
        description: "An evening of classical Indian dance forms",
        date: daysFromNow(15),
        time: "05:30 PM",
        venue: "Main Auditorium",
        club_id: artsClub.club_id,
        created_by: artsOrg.org_id,
        category: "Cultural",
        tags: ["Dance", "Music"],
        status: "APPROVED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Open Mic Night",
        description: "Poetry, music, comedy — sign up and perform",
        date: daysFromNow(3),
        time: "07:00 PM",
        venue: "Cafeteria Lawn",
        club_id: artsClub.club_id,
        created_by: artsOrg.org_id,
        category: "Cultural",
        tags: ["Music", "Open Mic"],
        status: "APPROVED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Inter-College Football Tournament",
        description: "Football tournament against neighbouring colleges",
        date: daysFromNow(12),
        time: "08:00 AM",
        venue: "Main Ground",
        club_id: sportsClub.club_id,
        created_by: sportsOrg.org_id,
        category: "Sports",
        tags: ["Football", "Tournament"],
        status: "APPROVED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Campus Marathon",
        description: "5K run around campus, open to all",
        date: daysFromNow(25),
        time: "06:00 AM",
        venue: "Campus Grounds",
        club_id: sportsClub.club_id,
        created_by: sportsOrg.org_id,
        category: "Sports",
        tags: ["Running", "Fitness"],
        status: "APPROVED",
      },
    }),
    // A very recently posted event with zero engagement yet — tests the
    // freshness/item-cold-start boost so it isn't buried by popularity=0
    prisma.event.create({
      data: {
        title: "Robotics Club Demo Day",
        description: "New robotics club showcasing first projects",
        date: daysFromNow(6),
        time: "03:00 PM",
        venue: "CS Block Lab 2",
        club_id: techClub.club_id,
        created_by: techOrg.org_id,
        category: "Technical",
        tags: ["Robotics", "AI"],
        status: "APPROVED",
        createdAt: new Date(), // posted just now
      },
    }),
  ]);

  const [aiHackathon, mlWorkshop, codingContest, battleOfBands, classicalDance, openMic, football, marathon, roboticsDemo] = events;

  console.log("Creating students...");
  const studentA = await prisma.student.create({
    data: {
      name: "Alice (Tech-leaning)",
      email: "alice@test.com",
      password: hashed,
      interests: ["AI", "Coding"],
    },
  });

  const studentB = await prisma.student.create({
    data: {
      name: "Bina (Arts-leaning)",
      email: "bina@test.com",
      password: hashed,
      interests: ["Music", "Dance"],
    },
  });

  const studentC = await prisma.student.create({
    data: {
      name: "Chetan (Brand new, cold start)",
      email: "chetan@test.com",
      password: hashed,
      interests: [],
    },
  });

  console.log("Creating bookmarks + views to build history...");
  await prisma.bookmark.create({ data: { student_id: studentA.student_id, event_id: aiHackathon.event_id } });
  await prisma.bookmark.create({ data: { student_id: studentA.student_id, event_id: mlWorkshop.event_id } });
  await prisma.eventView.create({ data: { student_id: studentA.student_id, event_id: codingContest.event_id } });

  await prisma.bookmark.create({ data: { student_id: studentB.student_id, event_id: battleOfBands.event_id } });
  await prisma.bookmark.create({ data: { student_id: studentB.student_id, event_id: openMic.event_id } });
  await prisma.eventView.create({ data: { student_id: studentB.student_id, event_id: classicalDance.event_id } });

  // studentC: no bookmarks, no views — pure cold start test case

  // give football/marathon a couple of bookmarks so popularity fallback has signal
  await prisma.bookmark.create({ data: { student_id: studentA.student_id, event_id: football.event_id } });
  await prisma.bookmark.create({ data: { student_id: studentB.student_id, event_id: football.event_id } });

  console.log("\n✅ Seed complete!\n");
  console.log("Test accounts (all password: 1234):");
  console.log("  Tech-leaning:   alice@test.com   -> expect Tech/AI recs to rank high");
  console.log("  Arts-leaning:   bina@test.com    -> expect Cultural/Music recs to rank high");
  console.log("  Cold start:     chetan@test.com  -> expect popularity/freshness-driven recs (incl. Robotics Demo Day)");
  console.log("\nOrganizer login: techorg@test.com / artsorg@test.com / sportsorg@test.com (password 1234)");
  console.log("Faculty login:   faculty@test.com (password 1234)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });