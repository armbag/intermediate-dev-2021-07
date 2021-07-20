export function getSummary(body: string) {
  // getting the first paragraph which is the forth element (title, space, subtitle, space, paragraph)
  const paragraph = body.split('\n')[4];
  // they all start by Lorem markdownum so we'll remove it
  const initialCleaning = paragraph.replace('Lorem markdownum ', '');
  const cleanParagraph = initialCleaning.replace('Lorem markdownum, ', '');

  // we return the beginning of the string with etc to make it look as an excerpt
  return cleanParagraph.substr(0, 30).trim() + '...';
}
