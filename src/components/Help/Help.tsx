import { ReactElement } from "react";
import "../../styles/WellcomeStyles.css";

const Help = (): ReactElement => {
  return (
    <div className="message-container">
      <div className="options">
        <button className="bt-inbox"> View inbox.</button>
        <button className="modal-like">Add/Delete Like.</button>
        <button className="modal-fav">Add/Delete Favorite.</button>
        <button className="modal-delete"> Delete penguin.</button>
      </div>
    </div>
  );
};
export default Help;
