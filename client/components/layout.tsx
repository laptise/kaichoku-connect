import { JWTPayload } from "@entities";
import { ChevronRight, Home } from "@mui/icons-material";
import { TreeView, TreeItem } from "@mui/lab";
import { List, ListItem, ListItemText, Stack } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import LayoutHeader from "./header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export enum TreeNodes {
  Opened = "Opened",
  OpenedJpn = "OpenedJpn",
  OpenedKor = "OpenedKor",
  Closed = "Closed",
  ClosedJpn = "ClosedJpn",
  ClosedKor = "ClosedKor",
}

type CommonMenuProps = {
  expanded?: TreeNodes[];
  selected?: TreeNodes;
};

type LayoutProp = {
  children: React.ReactNode;
  pageTitle: string;
  mainId: string;
  isCommonLayout?: boolean;
  pagePaths?: PagePath[];
  payload?: JWTPayload;
  commonMenuProps?: CommonMenuProps;
};

export type PagePath = {
  label: string;
  path: string;
};

const SingleMenu: React.FC<{ title: string }> = ({ title }) => <span style={{ minHeight: 30, display: "flex", alignItems: "center" }}>{title}</span>;

const CommonMenu: React.FC<CommonMenuProps> = ({ selected, expanded }) => {
  return (
    <>
      <List style={{ padding: 0 }} className="menuHeader">
        <ListItem button key="ホーム">
          <Home style={{ marginRight: 5 }} fontSize="small" />
          <ListItemText primary="ホーム" />
        </ListItem>
      </List>
      <TreeView
        selected={selected}
        defaultExpanded={expanded}
        className="menuBody"
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <TreeItem nodeId={TreeNodes.Opened} label={<SingleMenu title="新規リクエスト" />}>
          <Link href="/trade-requests/jpn/" passHref={true}>
            <TreeItem nodeId={TreeNodes.OpenedJpn} label={<SingleMenu title="日本向けリクエスト" />} />
          </Link>
          <Link href="/trade-requests/kor/" passHref={true}>
            <TreeItem nodeId={TreeNodes.OpenedKor} label={<SingleMenu title="韓国向けリクエスト" />} />
          </Link>
        </TreeItem>
        <TreeItem nodeId={TreeNodes.Closed} label={<SingleMenu title="完了済リクエスト" />}>
          <TreeItem nodeId={TreeNodes.ClosedJpn} label={<SingleMenu title="日本向けリクエスト" />} />
          <TreeItem nodeId={TreeNodes.ClosedKor} label={<SingleMenu title="韓国向けリクエスト" />} />
        </TreeItem>
      </TreeView>
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

const Layout: React.FC<LayoutProp> = ({ children, pageTitle, mainId, isCommonLayout, pagePaths, payload, commonMenuProps }) => {
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
        <LayoutHeader payload={payload} />
        <CommonMenu selected={commonMenuProps?.selected} expanded={commonMenuProps?.expanded} />
        {pagePaths && pagePaths.length > 0 && <ContentPaths paths={pagePaths} />}
        <main id={mainId}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
