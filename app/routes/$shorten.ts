import { redirect, type LoaderFunctionArgs } from "react-router";
import { db } from "~/lib/db";
import { clicks } from "~/schemas";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const shortenUrl = params.shorten;
  const headers = request.headers;

  if (!shortenUrl) return redirect("/");

  const link = await db.query.links.findFirst({
    where: (l, { eq }) => eq(l.shortenCode, shortenUrl)
  })

  if (!link) {
    return Response.json({ message: "Link doesn't found" }, {
      status: 404,
      headers: { "Content-Type": "application/json" }
    })
  }

  const referrer = headers.get("referer") ?? "";
  const userAgent = headers.get("user-agent") ?? "";

  await db.insert(clicks).values({
    linkId: link.id,
    userId: link.userId,
    referrer,
    userAgent,
  })

  return redirect(link.originalUrl);
}