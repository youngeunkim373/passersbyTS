export function calcDate(date: number | string | Date) {
  const registerDate = new Date(date);
  const now = new Date();

  const dateDiff = Math.abs(
    (now.getTime() - registerDate.getTime()) / (1000 * 60)
  );

  let expression;
  if (dateDiff < 60) {
    expression = `${dateDiff}분 전`;
  } else if (dateDiff < 1440) {
    expression = `${Math.round(dateDiff / 60)}시간 전`;
  } else if (dateDiff < 43200) {
    expression = `${Math.round(dateDiff / 1440)}일 전`;
  } else if (dateDiff < 525600) {
    expression = `${Math.round(dateDiff / 43800)}달 전`;
  } else {
    expression = `${Math.round(dateDiff / 525600)}년 전`;
  }

  return { expression: expression, dateDiff: dateDiff };
}
