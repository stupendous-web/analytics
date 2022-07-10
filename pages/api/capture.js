import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const pageview = await prisma.pageview.create({
    data: {
      path: "/",
      referrer: "",
      search: "",
      height: 0,
      width: 0,
    },
  });
  res.json(pageview);
}
