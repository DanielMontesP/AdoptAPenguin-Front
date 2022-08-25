const DevIcons = (): JSX.Element => {
  return (
    <>
      <div className="devicons-container">
        <span className="devicons-about">Dev Tools:</span>
        <img
          src="https://media.giphy.com/media/SS8CV2rQdlYNLtBCiF/giphy.gif"
          width="30px"
          alt="VSCode"
          className="about-icon"
        />
        <img
          src="https://media.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif"
          width="30px"
          alt="React"
          className="about-icon"
        />
        <span className="devicons-repo">Repo:</span>

        <a className="devicons-by" href="https://github.com/DanielMontesP">
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/github/github-original.svg"
            title="Git"
            alt="Git"
            className="about-icon"
          />
        </a>
        <span className="devicons-year">2022</span>
      </div>
    </>
  );
};
export default DevIcons;
