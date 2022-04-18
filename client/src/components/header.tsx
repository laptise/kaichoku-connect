import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../pages/_app";

const LayoutHeader: React.FC = () => {
  const [auth] = useContext(AuthContext).authState;
  return (
    <header>
      <Link href="/" passHref={true}>
        <h1 id="goHome">Kaichoku</h1>
      </Link>
      <Link href="/signin" passHref={true}>
        <button>Login</button>
      </Link>
      <button>言語</button>
      {auth?.displayName || ""}
    </header>
  );
};

export default LayoutHeader;
