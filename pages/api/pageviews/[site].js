import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const referrers = await prisma.pageview.groupBy({
    by: ["referrer"],
    where: {
      site: {
        contains: "stupendous-web",
      },
    },
  });
  console.log(referrers);
  res.json({ referrers: referrers });
}
