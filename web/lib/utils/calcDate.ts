export function calcDate(date: number | string | Date) {
  const registerDate = new Date(date);
  const now = new Date();

  let dateDiff = now.getTime() - registerDate.getTime();
  dateDiff = Math.abs(dateDiff / (1000 * 60));

  if (dateDiff < 60) {
    return `${dateDiff}분 전`;
  } else if (dateDiff < 1440) {
    return `${Math.round(dateDiff / 60)}시간 전`;
  } else if (dateDiff < 43200) {
    return `${Math.round(dateDiff / 1440)}일 전`;
  } else if (dateDiff < 525600) {
    return `${Math.round(dateDiff / 43800)}달 전`;
  } else {
    return `${Math.round(dateDiff / 525600)}년 전`;
  }
}
