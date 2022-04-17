import Link from "next/link";

const LayoutHeader: React.FC = () => {
  return (
    <header>
      <Link href="/" passHref={true}>
        <h1 id="goHome">Kaichoku</h1>
      </Link>
      <Link href="/signin" passHref={true}>
        <button>Login</button>
      </Link>
      <button>言語</button>
    </header>
  );
};

export default LayoutHeader;
