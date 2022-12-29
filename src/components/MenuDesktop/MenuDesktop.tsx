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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state);
  const { isMenuOpen } = useAppSelector((state) => state.ui);
  const { connected } = useAppSelector((state) => state.system.server);

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

  const handleUserMenu = () => {
    dispatch(isMenuOpenActionCreator(!isMenuOpen));
  };

  const handleStatus = () => {
    return connected ? " Connected" : " local";
  };
  const classServerStatus = connected ? "server" : "local";

  return (
    <div className={`menu-user`} onClick={handleUserMenu}>
      <div className={`menu-user-header`}>
        <div className={`menu-bt-user`} />
      </div>
      <div className="menu-user-data">
        <img src={userImage} className="user-photo" alt="user" />
        <h3 className="user-username">{toPascalCase(`${user.username}`)}</h3>

        <h3 className="server-status-container">
          <span className={`${classServerStatus}-status`}>
            {handleStatus()}
          </span>
        </h3>
      </div>

      <div className="menu-user-vertical">
        <button
          onClick={handleInbox}
          className="bt-menu-view-messages"
          title="bt-view-messages"
        >
          <h3 className="menu-icon-label-vertical">Inbox</h3>
        </button>
      </div>
      <div className="menu-footer">
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
