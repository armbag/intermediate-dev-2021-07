import * as React from 'react';

interface PostI {
  id: string;
  body: string;
  publishedAt: string;
  author: {
    name: string;
    id: string;
  };
}

export function useAllAuthors(allPosts: any) {
  const [authors, setAuthors] = React.useState<any[]>([]);
  // from all the posts get all authors and filter them to not have duplicates
  React.useEffect(() => {
    const allAuthors = allPosts.map((post: PostI) => post.author.name);
    const uniqueAuthors = allAuthors.filter(
      (author: string, i: number, self: string) => self.indexOf(author) === i
    );
    setAuthors(uniqueAuthors);
  }, [allPosts]);

  return authors;
}
