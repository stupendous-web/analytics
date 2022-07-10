import { PrismaClient } from "@prisma/client";
import NextCors from "nextjs-cors";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const pageview = await prisma.pageview.create({
    data: {
      path: "/",
      referrer: "",
      search: "",
      height: 0,
      width: 0,
    },
  });
  res.json(pageview);
}
