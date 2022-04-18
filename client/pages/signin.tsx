import { gql, useLazyQuery } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import Layout from "../components/layout";
import { $api } from "../axios";
import { AuthContext } from "./_app";
import { UserEntity } from "@entities";
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
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await $api.post<{ access_token: string } & UserEntity>("login", { email, password: pw });
    const { access_token, ...user } = data;
    setAuth(user);
    sessionStorage.setItem("access_token", data.access_token);
  };
  console.log(auth);
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
              <Button variant="contained" type="submit">
                ログイン
              </Button>
              <Button variant="contained" type="button" onClick={() => testQuery()}>
                テスト
              </Button>
            </form>
          </Stack>
          <Stack padding={1} paddingTop={0}>
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