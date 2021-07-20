import ReactMarkdown from 'react-markdown';

interface PropsPostContent {
  content: string;
}

function PostContent(props: PropsPostContent) {
  return <ReactMarkdown>{props.content}</ReactMarkdown>;
}

export default PostContent;
