import NextCors from "nextjs-cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  await prisma.pageview.create({
    data: {
      path: req.body.path,
      referrer: req.body.referrer,
      height: req.body.height,
      width: req.body.width,
    },
  });
  res.json("Good things come to those who wait.");
}
