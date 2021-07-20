import * as React from 'react';
import { useAuthors } from '../hooks/useAuthors';
import { PropsAuthors } from '../@types/types';

function Authors({ posts, handleAuthorSelection }: PropsAuthors) {
  const [selectedAuthor, setSelectedAuthor] = React.useState<string>('');
  const authors = useAuthors(posts);
  // this will sort the posts to only display the ones from the selected author
  function handleClickAuthor(e: React.MouseEvent<HTMLElement>) {
    const authorSelected = e.target as HTMLElement;
    // get all posts from that author
    const authorsPosts = posts.filter((post) => {
      return post.author.name === authorSelected.innerText;
    });
    setSelectedAuthor(authorSelected.innerText);
    handleAuthorSelection(authorsPosts);
  }

  function isSelected(author: string) {
    return selectedAuthor === author ? 'author selected' : 'author';
  }

  if (!posts.length) {
    return null;
  }
  return (
    <ul>
      <li
        onClick={() => {
          handleAuthorSelection([]);
          setSelectedAuthor('');
        }}
        className={isSelected('')}
      >
        All posts
      </li>
      {authors.map((author) => {
        return (
          <li
            key={author}
            onClick={handleClickAuthor}
            className={isSelected(author)}
          >
            {author}
          </li>
        );
      })}
    </ul>
  );
}

export default Authors;
