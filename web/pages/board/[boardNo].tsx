import { useRouter } from "next/router";

const BoardDetail = () => {
  const router = useRouter();
  const boardNo = router.query.boardNo;

  return <div>게시글 상세</div>;
};

export default BoardDetail;
