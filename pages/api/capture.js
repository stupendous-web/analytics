import NextCors from "nextjs-cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  const pageview = await prisma.pageview.create({
    data: {
      path: "",
      referrer: "",
      height: 0,
      width: 0,
    },
  });
  res.json(pageview);
}
