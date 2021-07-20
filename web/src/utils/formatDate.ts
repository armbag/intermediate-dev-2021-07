export function formatDate(date: string) {
  const [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
  return `${dd}-${mm}-${yyyy} ${hh}:${mi}`;
}
