import { gql, useLazyQuery } from "@apollo/client";
import { JWTPayload } from "@entities";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { Divider, Fab, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { FormEvent, useContext, useState } from "react";
import { $api, checkAuthSSR } from "../axios";
import Layout from "../components/layout";
import { AuthContext } from "./_app";
const SIGN_IN_QUERY = gql`
  query SignIn($email: String!, $password: String!) {
    signInWithEmailAndPassword(credential: { email: $email, password: $password }) {
      email
      displayName
    }
  }
`;

const GET_ALL_QUERY = gql`
  query {
    users {
      email
      displayName
    }
  }
`;

const SigninPage: NextPage = () => {
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const toggleShowPw = () => setShowPw(!showPw);
  const [testQuery] = useLazyQuery(GET_ALL_QUERY);
  const [auth, setAuth] = useContext(AuthContext).authState;
  const router = useRouter();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await $api.post<{ access_token: string } & JWTPayload>("login", { email, password: pw });
    const { access_token, ...user } = data;
    setCookie(null, "access_token", data.access_token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    sessionStorage.setItem("access_token", data.access_token);
    router.reload();
  };
  return (
    <Layout pageTitle="ログイン" mainId="signIn">
      <Paper elevation={2}>
        <Stack divider={<Divider orientation="vertical" variant="middle" flexItem style={{ background: "black", height: 1 }} />}>
          <Stack alignItems={"center"}>
            <form onSubmit={(e) => submit(e)} style={{ all: "inherit" }}>
              <h1>ログイン</h1>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">メールアドレス</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="メールアドレス"
                  type="email"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={pw}
                  type={showPw ? "text" : "password"}
                  onChange={(e) => setPw(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton tabIndex={-1} aria-label="toggle password visibility" onClick={toggleShowPw} onMouseDown={toggleShowPw} edge="end">
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="パスワード"
                />
              </FormControl>
              <Fab variant="extended" color="primary" type="submit">
                <Login sx={{ mr: 1 }} />
                ログイン
              </Fab>
            </form>
          </Stack>
          <Stack padding={1} paddingTop={0} alignItems={"center"}>
            <Link href="/signup" passHref={true}>
              <a>まだ会員登録がお済みでない方はこちら</a>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Layout>
  );
};
export default SigninPage;

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const payload = await checkAuthSSR(req);
  if (payload)
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
      props: { payload },
    };
  return { props: {} };
};
