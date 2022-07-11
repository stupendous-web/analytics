import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(request, response) {
  const { site } = request.query;
  const pageviewCount = await prisma.pageview.groupBy({
    by: ["site"],
    where: {
      site: {
        contains: site,
      },
    },
    _count: {
      site: true,
    },
  });
  const sessionCount = await prisma.pageview.groupBy({
    by: ["anonymousId"],
    where: {
      site: {
        contains: site,
      },
    },
  });
  console.log(sessionCount);
  const referrers = await prisma.pageview.groupBy({
    by: ["referrer"],
    where: {
      site: {
        contains: site,
      },
    },
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
    where: {
      site: {
        contains: site,
      },
    },
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
    pageviewCount: pageviewCount,
    sessionCount: sessionCount,
    referrers: referrers,
    paths: paths,
  });
}
