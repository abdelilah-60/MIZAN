import { prisma } from "./lib/prisma";

async function main() {
  const summaries = await prisma.fieldSeasonSummary.findMany();
  console.log("Season Summaries:");
  console.log(JSON.stringify(summaries, null, 2));

  const fields = await prisma.field.findMany();
  console.log("Fields:");
  console.log(JSON.stringify(fields, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
