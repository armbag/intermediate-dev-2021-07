export function getSummary(body: string) {
  // presuming summary is the first title of the post
  // we split with \n, as it's the first character breaking the title, and we grab first element
  const summary = body.split('\n')[0];
  // we remove the first 2 characters(# and space)
  return summary.slice(2);
}
