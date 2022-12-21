import "../../styles/WellcomeStyles.css";

const Help = (): JSX.Element => {
  return (
    <div className="message-container">
      <div className="options">
        <button className="modal-edit"> View inbox.</button>
        <button className="modal-like">Add/Delete Like.</button>
        <button className="modal-fav">Add/Delete Favorite.</button>
        <button className="modal-delete"> Delete penguin.</button>
      </div>
    </div>
  );
};
export default Help;
