import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function handle(req, res) {
  prisma.pageview.create({
    data: {
      site: req.body.site,
      anonymousId: req.body.anonymousId,
      path: req.body.path,
      referrer: req.body.referrer,
      height: req.body.height,
      width: req.body.width,
    },
  });
  res.json("Good things come to those who wait.");
}
