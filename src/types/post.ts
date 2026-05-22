export type ParagraphBlock = {
  type: "paragraph";
  value: string;
};

export type SubtitleBlock = {
  type: "subtitle";
  value: string;
};

export type ImageBlock = {
  type: "image";
  value: string;
};

export type ContentBlock = ParagraphBlock | SubtitleBlock | ImageBlock;

export type Post = {
  id: string;
  image: string;
  title: string;
  description: string;
  content: ContentBlock[];
  slug: string;
  views: number;
  createdAt: string;
  updatedAt: string;
};
