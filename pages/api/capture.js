import NextCors from "nextjs-cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  try {
    await prisma.pageview.create({
      data: {
        site: req.body.site || null,
        anonymousId: req.body.anonymousId || null,
        path: req.body.path || null,
        referrer: req.body.referrer || null,
        height: req.body.height || null,
        width: req.body.width || null,
      },
    });
  } catch (error) {
    res.status(500).send(error);
    throw error;
  }
  res.json("Good things come to those who wait.");
}
