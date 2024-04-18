import { useContext } from "react";
import { ChatSelect } from "../components/ChatSelect";
import { InboxPeople } from "../components/InboxPeople";
import { ChatContext } from "../context/chat/ChatContext";

import "../css/chat.css";
import { Menssages } from "../components/Menssages";

export const ChatPage = () => {
  const { chatState } = useContext(ChatContext);

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

        {chatState.chatActivo ? <Menssages /> : <ChatSelect />}
      </div>
    </div>
  );
};
