import React from "react";
import Head from "next/head";
import LayoutHeader from "./header";

interface LayoutProp {
  children: React.ReactNode;
  pageTitle: string;
  mainId: string;
}

const Layout: React.FC<LayoutProp> = ({ children, pageTitle, mainId }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="da" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="topContainer">
        <LayoutHeader></LayoutHeader>
        <main id={mainId}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
