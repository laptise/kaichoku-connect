import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
} from "@mui/material";
import { createHash } from "crypto";
import { NextPage } from "next";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Layout from "../components/layout";

const SigninPage: NextPage = () => {
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const toggleShowPw = () => setShowPw(!showPw);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hash = createHash("sha256");
    hash.update(pw);
    const res = hash.digest("hex");
    console.log(res.length);
    console.log(email);
    console.log(pw, res);
  };
  return (
    <Layout pageTitle="ログイン" mainId="signIn">
      <Paper elevation={2}>
        <Stack divider={<Divider orientation="vertical" variant="middle" flexItem style={{ background: "black", height: 1 }} />}>
          <Stack alignItems={"center"}>
            <form onSubmit={submit} style={{ all: "inherit" }}>
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
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={pw}
                  type={showPw ? "text" : "password"}
                  onChange={(e) => setPw(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={toggleShowPw} onMouseDown={toggleShowPw} edge="end">
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button variant="contained" type="submit">
                ログイン
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
