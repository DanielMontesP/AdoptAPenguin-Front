import { useNavigate } from "react-router-dom";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";

interface Props {
  penguin: IPenguin;
}

const MessageButton = ({ penguin }: Props): JSX.Element => {
  const navigate = useNavigate();

  const iconType = " bounce bt-message-got";

  const handleMessage = () => {
    navigate(`/detail/${penguin.id}#messages`);
  };

  return (
    <button
      className={`animated${iconType}`}
      onClick={handleMessage}
      title="bt-message"
    />
  );
};

export default MessageButton;
