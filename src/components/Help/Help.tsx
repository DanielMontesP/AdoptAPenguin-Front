import Styles from "../../styles/WellcomeStyles";

const Help = (): JSX.Element => {
  return (
    <Styles>
      <div className="message-container">
        <div className="options">
          <button className="animatedEdit"> Edit penguin data.</button>
          <button className="animatedFavs">Add/Delete to Favorites</button>
          <button className="animatedLikes">Add/Delete Like.</button>
          <button className="animatedDelete"> Delete penguin.</button>
        </div>
      </div>
    </Styles>
  );
};
export default Help;
