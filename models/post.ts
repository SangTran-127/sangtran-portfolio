export interface Author {
  name: string;
  title: string;
  profileUrl: string;
  avatarUrl: string;
}
export interface Post {
  id: string | number;
  title: string;
  publishedDate: string;
  tagList: Array<Tag>;
  description: string;
  slug: string;
  type: string;
  author?: Author;
  mdContent?: string;
  htmlContent?: string;
  thumbnailUrl?: string;
}

export interface Tag {
  name: string;
  path?: string;
  color: string;
}
