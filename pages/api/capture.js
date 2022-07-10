import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    await prisma.pageview.create({
      data: {
        site: req.body.site,
        anonymousId: req.body.anonymousId,
        path: req.body.path,
        referrer: req.body.referrer,
        height: req.body.height,
        width: req.body.width,
      },
    });
  } catch (error) {
    res.status(500).send(error);
    throw error;
  }
  res.json("Good things come to those who wait.");
}
