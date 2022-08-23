const DevIcons = (): JSX.Element => {
  return (
    <>
      <div className="devicons-container">
        <span className="devicons-about">Dev Tools:</span>
        <img
          src="https://media.giphy.com/media/SS8CV2rQdlYNLtBCiF/giphy.gif"
          width="30"
          alt="VSCode"
        />
        <img
          src="https://media.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif"
          width="30"
          alt="React"
        />
        <a className="devicons-by" href="https://github.com/DanielMontesP">
          by Daniel Montes
        </a>
        <span className="devicons-year">2022</span>
      </div>
    </>
  );
};
export default DevIcons;
