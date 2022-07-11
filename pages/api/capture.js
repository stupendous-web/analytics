import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  await prisma.pageview.create({
    data: {
      site: req.body.site,
      anonymousId: req.body.anonymousId,
      path: req.body.path,
      referrer: req.body.referrer,
      os: req.body.os,
      osVersion: req.body.osVersion,
      browser: req.body.browser,
      browserVersion: req.body.browserVersion,
      height: req.body.height,
      width: req.body.width,
    },
  });
  res.json("Good things come to those who wait.");
}
