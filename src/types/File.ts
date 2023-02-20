import { FileType } from "./FileType";

export interface FileInterface {
  _id: string;
  title: string;
  subject: string;
  authorId: string;
  authorName: string;
  type: FileType;
  createdAt: string;
  updatedAt: string;
  fileSize: number;
  extension: string;
  slug: string;
}
