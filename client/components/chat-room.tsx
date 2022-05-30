import { Box, IconButton, InputBase, Paper, Stack, TextField, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import ChatIcon from "@mui/icons-material/Chat";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CHAT_MESSAGES } from "../gqls/queries/chat-message";
import { FC, useContext, useState } from "react";
import { ChatMessage, Trade } from "@entities";
import { Send } from "@mui/icons-material";
import { ADD_NEW_CHAT_MESSAGE } from "../gqls/mutations/chat-message";

const ChatRoom: FC<{ trade: Trade }> = ({ trade }) => {
  return (
    <Paper style={csp().Size.padding(10).minWidth(600).csp}>
      <Stack>
        <ChatRoomHeader />
        <ChatRoomBody trade={trade} />
        <ChatRoomFooter trade={trade} />
      </Stack>
    </Paper>
  );
};

const ChatRoomHeader = () => {
  return (
    <Stack style={csp().Flex.row.verticalCenterAlign.injectProps({ borderBottom: "1px solid #ccc" }).csp}>
      <ChatIcon />
      <Typography variant="h5"> チャット</Typography>
    </Stack>
  );
};

const ChatRoomBody: FC<{ trade: Trade }> = ({ trade }) => {
  const { data } = useQuery<NestedQuery<"getChatMessages", ChatMessage[]>>(GET_CHAT_MESSAGES, { variables: { roomId: trade.id } });
  console.log(data?.getChatMessages);
  return <Box style={csp().Size.height("100%").csp}>da</Box>;
};

const ChatRoomFooter: FC<{ trade: Trade }> = ({ trade }) => {
  const [value, setValue] = useState("");
  const [addComment] = useMutation(ADD_NEW_CHAT_MESSAGE);
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await addComment({ variables: { roomId: trade.id, content: value } });
    setValue("");
    //  setComments([data.addComment, ...comments]);
    //  setValue("");
  };
  return (
    <form onSubmit={(e) => submitComment(e)}>
      <Stack style={csp().Flex.row.csp}>
        <InputBase
          sx={{ ml: 1, flex: 1, borderBottom: "1px solid #ccc" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="コメントを書く"
          inputProps={{ "aria-label": "コメントを書く" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" disabled={false}>
          <Send />
        </IconButton>
      </Stack>
    </form>
  );
};
export default ChatRoom;
