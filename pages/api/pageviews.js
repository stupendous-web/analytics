import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const pageviews = await prisma.pageview.findMany();
  res.json(pageviews);
}
