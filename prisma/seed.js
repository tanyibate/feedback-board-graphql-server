const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.user.upsert({
    where: { username: "bobthelegend" },
    update: {},
    create: {
      username: "bobthelegend",
      fullName: "Bob Roberts",
      imageURL:
        "https://portraitsrefined.com/wp-content/uploads/2020/03/Headshot.jpg",
    },
  });
  const firstFeedback = await prisma.feedback.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Add tags for solutions",
      detail: "Easier to search for solutions based on a specific stack.",
      category: "Enhancement",
      updateStatus: "Planned",
    },
  });
  console.log(bob, firstFeedback);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
