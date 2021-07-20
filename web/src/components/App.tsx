import * as React from 'react';
import Post from './Post';
import Authors from './Authors';
import Table from './Table';
import { useAllPosts } from '../hooks/useAllPosts';
import { PostI } from '../@types/types';

import '../style/App.css';

function App() {
  const [allPosts, isLoading, error] = useAllPosts();
  const [postsFromAuthor, setPostsFromAuthor] = React.useState<PostI[]>([]);
  const [selectedPost, setSelectedPost] = React.useState<PostI | any>({});

  function handleAuthorSelection(authorsPosts: PostI[]) {
    // Shows the articles from the autor selected
    setPostsFromAuthor(authorsPosts);
    // remove content and title from previous clicked post
    setSelectedPost({});
  }

  function handlePostSelection(post: PostI) {
    setSelectedPost(post);
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
      {selectedPost?.title ? (
        <Post title={selectedPost.title} content={selectedPost.body} />
      ) : null}
    </div>
  );
}

export { App };
