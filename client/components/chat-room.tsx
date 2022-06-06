import { Avatar, Box, Button, IconButton, InputBase, Paper, Stack, TextField, Typography } from "@mui/material";
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

type ChatRoomProps = AuthNextPage<{ trade: Trade; expanded: boolean; onExpand: (v: boolean) => void }>;

const ChatRoom: ChatRoomProps = ({ trade, payload, expanded, onExpand }) => {
  return (
    <Paper
      id="chatRoom"
      className={expanded ? "expanded" : "not-expanded"}
      style={csp().Flex.column.injectProps({ overflow: "hidden", flex: 1 }).csp}
    >
      <ChatRoomHeader onExpand={() => onExpand(!expanded)} expanded={expanded} />
      <ChatRoomBody payload={payload} trade={trade} />
      <ChatRoomFooter trade={trade} />
    </Paper>
  );
};

const ChatRoomHeader: FC<{ onExpand: () => void; expanded: boolean }> = ({ onExpand, expanded }) => {
  return (
    <Stack
      style={
        csp().Flex.row.verticalCenterAlign.Size.padding(10).injectProps({ boxShadow: "0 1px 2px rgba(0,0,0,0.3)", justifyContent: "space-between" })
          .csp
      }
    >
      <ChatIcon />
      <Button className="forMobile expandButton" onClick={() => onExpand()}>
        {expanded ? "取引内容を表示" : "チャットを表示"}
      </Button>
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
    <Box ref={boxRef} style={{ ...csp().Size.padding(10).height("100%").csp, ...{ overflowY: "auto", flex: 1 } }}>
      {messages?.map((msg, index, msgs) => (
        <Message key={msg.id} message={msg} prev={msgs[index - 1]} isOwned={payload?.userId === msg.createdBy} />
      ))}
    </Box>
  );
};

const TimeStamp: FC<{ date: Date }> = ({ date }) => (
  <Typography className="timeStamp" style={{ color: "#aaa" }} variant="caption">
    {format(date, "HH:mm")}
  </Typography>
);

const Message: FC<{ message: ChatMessage; isOwned: boolean; prev?: ChatMessage }> = ({ message, isOwned, prev }) => {
  const dateIsDifferent = prev && new Date(message.createdAt).getDate() !== new Date(prev.createdAt).getDate();
  return (
    <>
      {dateIsDifferent && (
        <Typography variant="body2" style={csp().Flex.row.centerAlign.injectProps({ color: "#aaa", fontSize: 11 }).csp}>
          {format(new Date(message.createdAt), "yyyy年M月d日")}
        </Typography>
      )}
      {isOwned ? (
        <Stack
          className="messageArea own"
          style={
            csp({ justifyContent: isOwned ? "flex-end" : "flex-start" })
              .Flex.row.gap(5)
              .verticalCenterAlign.Size.width("100%").csp
          }
        >
          <TimeStamp date={new Date(message.createdAt)} />
          <Typography className="message">{message.content}</Typography>
        </Stack>
      ) : (
        <MessageFromOther message={message} />
      )}
    </>
  );
};

const MessageFromOther: FC<{ message: ChatMessage }> = ({ message }) => {
  const date = new Date(message.createdAt);

  return (
    <Stack className="messageArea other">
      <Stack style={csp().Flex.row.verticalCenterAlign.gap(5).csp}>
        <Avatar src={message.author?.imgUrl} alt={message.author?.displayName} sx={{ width: 24, height: 24 }} />
        {message.author?.displayName}
      </Stack>
      <Stack style={csp({ justifyContent: "flex-start" }).Flex.row.gap(10).verticalCenterAlign.Size.width("100%").csp}>
        <Typography className="message">{message.content}</Typography>
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
      <Stack style={csp().Flex.row.BorderTop.solid.width(1).color("#ccc").csp}>
        <InputBase
          sx={{ ml: 1, flex: 1, borderBottom: "1px solid #ccc" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="メッセージを送る"
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
