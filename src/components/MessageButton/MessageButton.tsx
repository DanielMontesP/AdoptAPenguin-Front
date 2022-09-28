import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/redux/hooks/hooks";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";

interface Props {
  penguin: IPenguin;
}

const MessageButton = ({ penguin }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { allMessages } = useAppSelector((state) => state.messages);

  let iconType = "";

  const getMessageType = () => {
    const gotMessages = " message-got";
    const newMessages = " bt-messages";

    if (Array(allMessages)) {
      iconType = allMessages.length ? gotMessages : newMessages;
    } else {
      iconType = " message-got";
    }
  };

  const handleMessage = () => {
    navigate(`/detail/${penguin.id}#messages`);
  };

  getMessageType();

  useEffect(() => {});

  return (
    <button
      className={`bt-messages bounce ${iconType}`}
      onClick={handleMessage}
    />
  );
};

export default MessageButton;
