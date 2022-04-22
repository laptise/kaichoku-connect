import { gql, useMutation } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, Stack } from "@mui/material";
import { FormEvent, useState } from "react";
import Layout from "../components/layout";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($id: String!, $email: String!, $dispName: String!, $password: String!) {
    addUser(newUser: { id: $id, email: $email, displayName: $dispName, password: $password }) {
      email
      displayName
    }
  }
`;

const SignUp = () => {
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const toggleShowPw = () => setShowPw(!showPw);
  const [createUser] = useMutation(SIGN_UP_MUTATION);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser({
      variables: {
        email,
        password: pw,
        dispName: userName,
        id,
      },
    });
  };
  return (
    <Layout pageTitle="ログイン" mainId="signIn">
      <Paper elevation={2}>
        <form onSubmit={(e) => submit(e)} style={{ all: "inherit" }}>
          <Stack padding={1} divider={<Divider orientation="vertical" variant="middle" flexItem style={{ background: "black", height: 1 }} />}>
            <Stack alignItems={"center"}>
              <h1>会員登録</h1>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
                <OutlinedInput id="outlined-adornment-id" value={id} onChange={(e) => setId(e.target.value)} label="ID" type="text" />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">メールアドレス</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
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
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password-confirm">パスワード確認</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-confirm"
                  value={pwConfirm}
                  type={showPw ? "text" : "password"}
                  onChange={(e) => setPwConfirm(e.target.value)}
                  error={pwConfirm !== pw}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton tabIndex={-1} aria-label="toggle password visibility" onClick={toggleShowPw} onMouseDown={toggleShowPw} edge="end">
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="パスワード確認"
                />
              </FormControl>
            </Stack>
            <Stack alignItems={"center"}>
              <h3>基本情報</h3>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">ニックネーム</InputLabel>
                <OutlinedInput id="outlined-adornment-password" value={userName} onChange={(e) => setUserName(e.target.value)} label="ニックネーム" />
              </FormControl>
            </Stack>
            <Button variant="contained" type="submit" disabled={pw != pwConfirm}>
              会員登録
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default SignUp;
