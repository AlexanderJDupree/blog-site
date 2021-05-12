/**
 * JSON Type mapping between server and client
 */

export interface Frontmatter {
  title: string;
  tags: string[];
  categories: string[];
  image: string;
}

export interface PostPreview {
  date: string;
  link: string;
  frontmatter: Frontmatter;
  preview: string;
}

export interface PostContent {
  frontmatter: Frontmatter;
  body: string;
}
