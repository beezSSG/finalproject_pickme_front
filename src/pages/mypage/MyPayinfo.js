import { useAuth } from "../../utils/AuthProvider";


export default function MyPayinfo() {
  const {token} = useAuth();

  return (
    <>
      <p>{token}</p>
      <p>결제정보창입니다</p>
    </>
  );
}