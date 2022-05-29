import { Box, Paper, Stack, Typography } from "@mui/material";
import { csp } from "chained-style-props";
import ChatIcon from "@mui/icons-material/Chat";
const ChatRoom = () => {
  return (
    <Paper style={csp().Size.padding(10).minWidth(600).csp}>
      <Stack>
        <ChatRoomHeader />
        <ChatRoomBody />
        <ChatRoomFooter />
      </Stack>
    </Paper>
  );
};

const ChatRoomHeader = () => {
  return (
    <Stack style={csp().Flex.row.verticalCenterAlign.BorderBottom.solid.width(1).color("#ccc").csp}>
      <ChatIcon />
      <Typography variant="h5"> チャット</Typography>
    </Stack>
  );
};

const ChatRoomBody = () => {
  return <Box style={csp().Size.height("100%").csp}>da</Box>;
};

const ChatRoomFooter = () => {
  return <Stack style={csp().Flex.row.csp}>da</Stack>;
};
export default ChatRoom;
