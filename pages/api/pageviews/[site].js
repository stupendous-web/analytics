import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(request, response) {
  if (request.method === "GET") {
    const count = await prisma.pageview.groupBy({
      by: ["site"],
      where: {
        site: {
          contains: "stupendous-web",
        },
      },
      _count: {
        site: true,
      },
    });
    console.log(count[0]?._count?.site);
    const referrers = await prisma.pageview.groupBy({
      by: ["referrer"],
      where: {
        site: {
          contains: "stupendous-web",
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
          contains: "stupendous-web",
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
    response.json({ count: count, referrers: referrers, paths: paths });
  }
}
