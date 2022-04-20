import { gql, useMutation } from "@apollo/client";
import { Paper, Stack } from "@mui/material";
import { NextPage } from "next";
import React, { useContext, useState } from "react";
import Layout from "../../components/layout";
import { AuthContext } from "../_app";

const ADD_NEW_REQUEST_GQL = gql`
  mutation ($title: String!, $content: String!) {
    addNewTradeRequest(data: { title: $title, content: $content }) {
      id
    }
  }
`;

const AddNewTradeRequest: NextPage = () => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addNew] = useMutation(ADD_NEW_REQUEST_GQL);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNew({
      variables: {
        title,
        content,
      },
    });
  };
  console.log(auth);
  return (
    <Layout pageTitle="取引を依頼" mainId="newTradeRequest">
      <Paper style={{ padding: 10 }}>
        <form onSubmit={(e) => submit(e)} style={{ all: "inherit" }}>
          <Stack>
            <h1>取引を依頼</h1>
            <input value={title} onInput={(e) => setTitle(e.currentTarget.value)} />
            <textarea value={content} onInput={(e) => setContent(e.currentTarget.value)} />
            <button>send</button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default AddNewTradeRequest;
