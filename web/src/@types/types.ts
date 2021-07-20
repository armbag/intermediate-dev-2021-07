export interface PostI {
  id: string;
  body: string;
  title: string;
  publishedAt: string;
  author: {
    name: string;
    id: string;
  };
}

export interface TableI {
  allPosts: PostI[];
  postsFromAuthor: PostI[];
  handleSelectedTitle: any;
}

export interface PropsAuthors {
  posts: PostI[];
  handleAuthorSelection: any;
}
