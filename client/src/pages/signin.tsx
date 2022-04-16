import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Container, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import Layout from "../components/layout";

const SigninPage: NextPage = () => {
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const toggleShowPw = () => setShowPw(!showPw);
  return (
    <Layout pageTitle="ログイン" mainId="signIn">
      <Stack>
        <InputLabel htmlFor="email-input">Eメール</InputLabel>
        <Input id="email-input" />
        <InputLabel htmlFor="pw-input">パスワード</InputLabel>
        <Input id="pw-input" type="password" />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPw ? "text" : "password"}
            value={pw}
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
        <Stack></Stack>
      </Stack>
    </Layout>
  );
};
export default SigninPage;
