import React from "react";
import Head from "next/head";
import LayoutHeader from "./header";

interface LayoutProp {
  children: React.ReactNode;
  pageTitle: string;
}

const Layout: React.FC<LayoutProp> = ({ children, pageTitle }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="da" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="topContainer">
        <LayoutHeader></LayoutHeader>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
