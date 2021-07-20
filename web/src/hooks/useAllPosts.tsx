import * as React from 'react';

export function useAllPosts() {
  const [allPosts, setAllPosts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<any>(false);
  const [error, setError] = React.useState<any>(false);
  // fetching all posts and placing them into a local state
  React.useEffect(() => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_SERVER_URL + 'posts')
      .then((res) => res.json())
      .then((unsortedPosts) => {
        // before setting them into the state, this will sort them right away so they
        // appear in reverse chronological order
        const sortedPosts = unsortedPosts.sort(
          (previousPost: any, nextPost: any) => {
            return (
              +new Date(nextPost.publishedAt) -
              +new Date(previousPost.publishedAt)
            );
          }
        );
        setAllPosts(sortedPosts);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return [allPosts, isLoading, error];
}
