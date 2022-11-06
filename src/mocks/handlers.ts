import { rest } from "msw";
import { getFiles, getMuchPagesFiles, notFoundFiles } from "./fixtures/files";

export const handlers = [
  rest.get("http://localhost:8000/api/files/type/pdf", (req, res, ctx) => {
    const q = req.url.searchParams.get("q");
    if (q) {
      if (q === "notfound") {
        return res(ctx.json(notFoundFiles));
      } else if (q === "muchpages") {
        return res(ctx.json(getMuchPagesFiles));
      }
      const filesHasQ = getFiles.files.filter((file) => file.title.includes(q));
      return res(ctx.json(filesHasQ ? getFiles : notFoundFiles));
    }
    return res(ctx.json(getFiles));
  }),
  rest.post("http://localhost:8000/api/files", async (req, res, ctx) => {
    const { title, subject } = await req.json();
    return res(
      ctx.json({
        _id: "635d36d96918c5d856f970f0",
        authorId: "631c6e33f662e5a65f13d617",
        authorName: "creend",
        type: "pdf",
        createdAt: "2022-10-29T14:21:13.438Z",
        updatedAt: "2022-10-29T14:21:13.438Z",
        title,
        subject,
      })
    );
  }),
];
