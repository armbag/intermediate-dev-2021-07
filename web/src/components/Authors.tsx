import { useAuthors } from '../hooks/useAuthors';

interface PropsAuthors {
  posts: any[];
  handleAuthorSelection: any;
}

function Authors(props: PropsAuthors) {
  const authors = useAuthors(props.posts);
  // this will sort the posts to only display the ones from the selected author
  function handleClickAuthor(e: React.MouseEvent<HTMLElement>) {
    const authorSelected = e.target as HTMLElement;
    // get all posts from that author
    const authorsPosts = props.posts.filter((post) => {
      return post.author.name === authorSelected.innerText;
    });
    props.handleAuthorSelection(authorsPosts);
  }
  return (
    <ul>
      <li
        onClick={() => {
          props.handleAuthorSelection([]);
        }}
        className="author selected"
      >
        All posts
      </li>
      {authors.map((author) => {
        return (
          <li key={author} onClick={handleClickAuthor} className="author">
            {author}
          </li>
        );
      })}
    </ul>
  );
}

export default Authors;
