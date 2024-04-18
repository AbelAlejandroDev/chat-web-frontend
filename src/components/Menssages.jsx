import { IncomingMessage } from "./IncomingMessage";
import { SendMessage } from "./SendMessage";
import { OutgoingMesssage } from "./OutgoingMesssage";
import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Menssages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="mesgs">
      <div className="msg_history">
        {chatState.mensajes.map((msg) =>
          msg.para === auth.uid ? (
            <IncomingMessage key={msg._id}  msg={msg} />
          ) : (
            <OutgoingMesssage key={msg._id} msg={msg} />
          )
        )}
      </div>

      <SendMessage />
    </div>
  );
};
