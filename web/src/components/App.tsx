import * as React from 'react';
import PostContent from './PostBody';
import Authors from './Authors';
import Table from './Table';

import { useAllPosts } from '../hooks/useAllPosts';
import { PostI } from '../@types/types';

import '../style/App.css';

function App() {
  const [allPosts, isLoading, error] = useAllPosts();
  const [postsFromAuthor, setPostsFromAuthor] = React.useState<PostI[]>([]);
  const [selectedPostBody, setSelectedPostBody] = React.useState<string>('');

  function handleAuthorSelection(authorsPosts: PostI[]) {
    setPostsFromAuthor(authorsPosts);
  }

  function handlePostSelection(postBody: string) {
    setSelectedPostBody(postBody);
  }

  return (
    <div className="container">
      <h1 className="title">All posts</h1>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>An error occured, please try again</p> : null}
      <Authors posts={allPosts} handleAuthorSelection={handleAuthorSelection} />
      <Table
        allPosts={allPosts}
        postsFromAuthor={postsFromAuthor}
        handleSelectedTitle={handlePostSelection}
      />
      {selectedPostBody ? <PostContent content={selectedPostBody} /> : null}
    </div>
  );
}

export { App };
