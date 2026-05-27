type ParagraphBlock = {
  type: "paragraph";
  value: string;
};

type ImageBlock = {
  type: "image";
  value: string;
  caption?: string
};

type SubtitleBlock = {
  type: "subtitle";
  value: string;
};


export type ContentBlock = ParagraphBlock | ImageBlock | SubtitleBlock ;

export type BlockType = "subtitle" | "paragraph" | "image" ;

export type Block = {
  id: number;
  type: BlockType;

  value: string | File;

  preview?: string;

  uploading?: boolean;

  caption?: string;
};
