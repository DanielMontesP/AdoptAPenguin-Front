import { useNavigate } from "react-router-dom";
import {
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import noPhoto from "../../images/userPhoto.png";
import { toPascalCase } from "../../functions/sysHandlers/sysHandlers";
import {
  handleLogoutPrompt,
  loadAbout,
  loadHelp,
} from "../../functions/uiHandlers/uiHandlers";

interface Props {
  isMenuOpened: boolean;
}

const MenuDesktop = ({ isMenuOpened }: Props): JSX.Element => {
  const { user } = useAppSelector((state) => state);
  const { connected } = useAppSelector((state) => state.system.server);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userImage = user.image || noPhoto;

  const handleLogoutCall = () => {
    handleLogoutPrompt(dispatch, navigate);
  };

  const handleAbout = () => {
    loadAbout(dispatch);
  };

  const handleHelp = () => {
    loadHelp(dispatch);
  };

  const handleSettings = () => {
    dispatch(modalTypeActionCreator("Settings"));
    dispatch(isMenuOpenActionCreator(false));
    dispatch(isModalOpenActionCreator(true));
  };

  const handleInbox = () => {
    dispatch(isMenuOpenActionCreator(false));
    dispatch(isMenuOpenActionCreator(false));
    navigate(`/users/messages/${user.id}`);
  };

  const handleStatus = () => {
    return connected ? " Connected" : " local";
  };
  const classServerStatus = connected ? "server" : "local";

  return (
    <div className={`menu-app menu-open`}>
      <div className="user-data-container">
        <img src={userImage} className="user-photo" alt="user" />
        <h3 className="user-username">{toPascalCase(`${user.username}`)}</h3>
      </div>
      <h3 className="server-status-container">
        <span className={`server-status-${classServerStatus}`}>
          {handleStatus()}
        </span>
      </h3>
      <div className="menu-vertical">
        <hr className="menu-hr-photo" />

        <button
          onClick={handleInbox}
          className="bt-menu-view-messages"
          title="bt-view-messages"
        >
          <h3 className="menu-icon-label-vertical">Inbox</h3>
        </button>
      </div>
      <div className="menu-horizontal">
        <hr className="menu-hr-horizontal" />
        <div className="menu-icons-horizontal">
          <button
            onClick={handleLogoutCall}
            className="bt-logout"
            title="btn-logout"
          />
          <button onClick={handleHelp} className="bt-help" title="bt-help" />
          <button onClick={handleAbout} className="bt-about" title="bt-about" />
          <button
            onClick={handleSettings}
            className="bt-settings"
            title="bt-settings"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuDesktop;
