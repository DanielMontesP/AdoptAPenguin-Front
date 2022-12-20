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
  const { isMenuOpen } = useAppSelector((state) => state.ui);
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

  const handleUserMenu = () => {
    dispatch(isMenuOpenActionCreator(!isMenuOpen));
  };

  return (
    <div className={`menu-user menu-open`} onClick={handleUserMenu}>
      <image className={`menu-bt-user`} />
      <div className="user-data-container">
        <img src={userImage} className="user-photo" alt="user" />
        <h3 className="user-username">{toPascalCase(`${user.username}`)}</h3>
      </div>

      <div className="menu-vertical">
        <button
          onClick={handleInbox}
          className="bt-menu-view-messages"
          title="bt-view-messages"
        >
          <h3 className="menu-icon-label-vertical">Inbox</h3>
        </button>
      </div>
      <div className="menu-horizontal">
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
