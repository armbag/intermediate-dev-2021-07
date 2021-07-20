import ReactMarkdown from 'react-markdown';

import '../style/Post.css';

interface PropsPost {
  content: string;
  title: string;
}

function Post({ title, content }: PropsPost) {
  return (
    <div>
      <h1 className="post-title">{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Post;
