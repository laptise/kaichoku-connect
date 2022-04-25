import React from "react";
import Head from "next/head";
import LayoutHeader from "./header";
import { List, ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { ChevronRight, Home, Logout } from "@mui/icons-material";
import Link from "next/link";

type LayoutProp = {
  children: React.ReactNode;
  pageTitle: string;
  mainId: string;
  isCommonLayout?: boolean;
  pagePaths?: PagePath[];
};

export type PagePath = {
  label: string;
  path: string;
};

const CommonMenu = () => {
  return (
    <>
      <List style={{ padding: 0 }} className="menuHeader">
        <ListItem button key="ホーム">
          <Home style={{ marginRight: 5 }} fontSize="small" />
          <ListItemText primary="ホーム" />
        </ListItem>
      </List>
      <List style={{ padding: 0 }} className="menuBody">
        <ListItem button key="新規取引リクエスト">
          <ListItemText sx={{ fontSize: 12 }} primary="新規取引リクエスト" />
        </ListItem>
        <ListItem button key="完了した取引リクエスト">
          <ListItemText sx={{ fontSize: 12 }} primary="完了した取引リクエスト" />
        </ListItem>
      </List>
    </>
  );
};

const ContentPaths: React.FC<{ paths: PagePath[] }> = ({ paths }) => {
  return (
    <Stack className="contentHeader" divider={<ChevronRight />}>
      {paths?.map?.(({ path, label }, index) => (
        <Link key={index} passHref={true} href={path}>
          <a>{label}</a>
        </Link>
      ))}
    </Stack>
  );
};

const Layout: React.FC<LayoutProp> = ({ children, pageTitle, mainId, isCommonLayout, pagePaths }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="da" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(d) {
    var config = {
      kitId: 'zdn2nvm',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);
        `,
          }}
        ></script>
      </Head>
      <div className={"topContainer" + (isCommonLayout ? " common" : "")}>
        <LayoutHeader></LayoutHeader>
        <CommonMenu />
        {pagePaths && pagePaths.length > 0 && <ContentPaths paths={pagePaths} />}
        <main id={mainId}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
