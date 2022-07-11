import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(request, response) {
  await prisma.pageview.create({
    data: {
      site: request.body.site,
      anonymousId: request.body.anonymousId,
      path: request.body.path,
      referrer: request.body.referrer,
      os: request.body.os,
      osVersion: request.body.osVersion,
      browser: request.body.browser,
      browserVersion: request.body.browserVersion,
      height: request.body.height,
      width: request.body.width,
    },
  });
  response.json("Good things come to those who wait.");
}
