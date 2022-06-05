import { Avatar, Box, IconButton, InputBase, Paper, Stack, TextField, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import ChatIcon from "@mui/icons-material/Chat";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_CHAT_MESSAGES } from "../gqls/queries/chat-message";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { ChatMessage, Trade } from "@entities";
import { Send, SetMealSharp } from "@mui/icons-material";
import { ADD_NEW_CHAT_MESSAGE } from "../gqls/mutations/chat-message";
import { format } from "date-fns";
import { SUBSCRIBE_CHAT_ROOM } from "../gqls/subscriptions/chat-message";
import client from "../apollo-client";
import { AuthNextPage } from "../env";

const ChatRoom: AuthNextPage<{ trade: Trade }> = ({ trade, payload }) => {
  return (
    <Paper style={csp().Size.padding(10).minWidth(600).csp}>
      <Stack>
        <ChatRoomHeader />
        <ChatRoomBody payload={payload} trade={trade} />
        <ChatRoomFooter trade={trade} />
      </Stack>
    </Paper>
  );
};

const ChatRoomHeader = () => {
  return (
    <Stack style={csp().Flex.row.verticalCenterAlign.injectProps({ borderBottom: "1px solid #ccc" }).csp}>
      <ChatIcon />
    </Stack>
  );
};

const ChatRoomBody: AuthNextPage<{ trade: Trade }> = ({ trade, payload }) => {
  const { data } = useQuery<NestedQuery<"getChatMessages", ChatMessage[]>>(GET_CHAT_MESSAGES, { variables: { roomId: trade.id } });
  const [messages, setMessage] = useState<ChatMessage[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const messages = data?.getChatMessages || [];
    setMessage(messages.reverse());
  }, [data]);
  useEffect(() => {
    const subs = client.subscribe({ query: SUBSCRIBE_CHAT_ROOM, variables: { roomId: trade.id } }).subscribe((res) => {
      const data = res.data?.newMessage as ChatMessage;
      if (data) {
        setMessage((m) => [...m, data]);
      }
    });
    return () => subs.unsubscribe();
  }, []);
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight + 1000;
    }
  }, [messages]);
  console.log(payload);
  return (
    <Box ref={boxRef} style={{ ...csp().Size.height("100%").csp, ...{ overflowY: "auto", maxHeight: 500 } }}>
      {messages?.map((msg) => (
        <Message key={msg.id} message={msg} isOwned={payload?.userId === msg.createdBy} />
      ))}
    </Box>
  );
};

const TimeStamp: FC<{ date: Date }> = ({ date }) => (
  <Typography style={{ color: "#aaa" }} variant="caption">
    {format(date, "hh:mm")}
  </Typography>
);

const Message: FC<{ message: ChatMessage; isOwned: boolean }> = ({ message, isOwned }) => {
  return isOwned ? (
    <Stack
      style={
        csp({ justifyContent: isOwned ? "flex-end" : "flex-start" })
          .Flex.row.gap(10)
          .verticalCenterAlign.Size.width("100%").csp
      }
    >
      <TimeStamp date={new Date(message.createdAt)} />
      <Typography>{message.content}</Typography>
    </Stack>
  ) : (
    <MessageFromOther message={message} />
  );
};

const MessageFromOther: FC<{ message: ChatMessage }> = ({ message }) => {
  const date = new Date(message.createdAt);

  return (
    <Stack>
      <Stack style={csp().Flex.row.verticalCenterAlign.gap(5).csp}>
        <Avatar src={message.author?.imgUrl} alt={message.author?.displayName} sx={{ width: 24, height: 24 }} />
        {message.author?.displayName}
      </Stack>
      <Stack style={csp({ justifyContent: "flex-start" }).Flex.row.gap(10).verticalCenterAlign.Size.width("100%").csp}>
        <Typography>{message.content}</Typography>
        <TimeStamp date={new Date(message.createdAt)} />
      </Stack>
    </Stack>
  );
};

const ChatRoomFooter: FC<{ trade: Trade }> = ({ trade }) => {
  const [value, setValue] = useState("");
  const [addComment] = useMutation(ADD_NEW_CHAT_MESSAGE);
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await addComment({ variables: { roomId: Number(trade.id), content: value } });
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
