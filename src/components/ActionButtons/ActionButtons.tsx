import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { blankFormData } from "../../app/redux/initializers/iniPenguins";
import { getMessagesThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import {
  editPenguinThunk,
  getPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { cleanArray, hasNewMessages } from "../../utils/utils";
import { handleNoConexion } from "../uiHandlers/uiHandlers";

interface Props {
  penguin: IPenguin;
}

const ActionButtons = ({ penguin }: Props): JSX.Element => {
  const idUser = useAppSelector((state) => state.user.id);
  const { allMessages } = useAppSelector((state) => state.user);
  const { connected } = useAppSelector((state) => state.system.server);

  const [, setFormData] = useState<IPenguin>(blankFormData);

  const iconType = " bt-message-got";

  const countNewMessages = (penguin: IPenguin) => {
    return hasNewMessages(allMessages, penguin.id);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFav = penguin.favs?.includes(idUser);
  const isLiker = penguin.likers?.includes(idUser);

  const selectIconFav = isFav ? " animatedFavDelete" : " animatedFav";
  const selectIconLike = isLiker ? " animatedLike" : ` animatedLikeInit`;

  const handleMessage = () => {
    if (connected) {
      dispatch(getPenguinThunk(penguin.id));
      dispatch(getMessagesThunk(penguin.id));

      navigate(`/detail/${penguin.id}#messages`);
    } else {
      handleNoConexion(dispatch, idUser);
    }
  };

  const deleteFromLikers = () => {
    const newData = { ...penguin };
    newData.likers = newData.likers.filter((liker) => liker !== idUser);
    newData.likes = penguin.likes >= 1 ? penguin.likes - 1 : penguin.likes;

    setFormData(newData);
    dispatch(editPenguinThunk(newData, "Delete Like."));
  };

  const addToLikers = () => {
    const newData = { ...penguin };
    newData.likers = newData.likers.concat(idUser);
    newData.likes = penguin.likes + 1;

    setFormData(newData);

    dispatch(editPenguinThunk(newData, "Add Like."));
  };

  const handleLikes = () => {
    if (Array(penguin.likers)) {
      cleanArray(penguin.likers);

      if (connected) {
        isLiker ? deleteFromLikers() : addToLikers();
      } else {
        handleNoConexion(dispatch, idUser);
      }
    }
  };

  const deleteFromFavs = () => {
    const newData = { ...penguin };
    newData.favs = penguin.favs.filter((fav) => fav !== idUser);

    setFormData(newData);
    dispatch(editPenguinThunk(newData, "Delete from favorites."));
  };

  const addToFavs = () => {
    const newData = { ...penguin };
    newData.favs = penguin.favs.concat(idUser);

    setFormData(newData);
    dispatch(editPenguinThunk(newData, "Add to favorites."));
  };

  const handleFavs = () => {
    if (Array(penguin.favs)) {
      cleanArray(penguin.favs);

      if (connected) {
        isFav ? deleteFromFavs() : addToFavs();
      } else {
        handleNoConexion(dispatch, idUser);
      }
    }
  };

  return (
    <div className={"buttons-container"}>
      <button
        className={`animated${selectIconLike}`}
        onClick={handleLikes}
        title="btn-likes"
      />
      <span className={`likes`}>{penguin.likes}</span>
      <button
        className={`animated${iconType}`}
        onClick={handleMessage}
        title="bt-message"
      />
      <span className="new-messages-counter">{countNewMessages(penguin)}</span>
      <button
        placeholder="btn-favs"
        onClick={handleFavs}
        className={`animated${selectIconFav}`}
      />
    </div>
  );
};

export default ActionButtons;
