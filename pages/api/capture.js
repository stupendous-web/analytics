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
        path: "",
        referrer: "",
        height: 0,
        width: 0,
      },
    });
  } catch (error) {
    res.status(500).send(error);
    throw error;
  }
  res.json("Good things come to those who wait.");
}
