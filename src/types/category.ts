export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  _count: {
    posts: number;
  };
};
