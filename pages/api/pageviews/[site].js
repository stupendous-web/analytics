import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default async function handle(request, response) {
  const { site, days } = request.query;
  const where = {
    site: {
      contains: site,
    },
    createdAt: {
      gte: moment()
        .subtract(days || 7, "days")
        .format(),
      lte: moment().format(),
    },
  };
  const sessionCount = await prisma.pageview.groupBy({
    by: ["anonymousId"],
    where: where,
  });
  const pageviewCount = await prisma.pageview.groupBy({
    by: ["site"],
    where: where,
    _count: {
      site: true,
    },
  });
  const referrers = await prisma.pageview.groupBy({
    by: ["referrer"],
    where: where,
    _count: {
      referrer: true,
    },
    orderBy: {
      _count: {
        referrer: "desc",
      },
    },
  });
  const paths = await prisma.pageview.groupBy({
    by: ["path"],
    where: where,
    _count: {
      path: true,
    },
    orderBy: {
      _count: {
        path: "desc",
      },
    },
  });
  response.json({
    sessionCount: sessionCount,
    pageviewCount: pageviewCount,
    referrers: referrers,
    paths: paths,
  });
}
