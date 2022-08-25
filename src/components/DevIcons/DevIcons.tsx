import imgVSCode from "../../images/vscode.gif";
import imgReact from "../../images/react.gif";
import imgGitHub from "../../images/github.svg";

const DevIcons = (): JSX.Element => {
  return (
    <>
      <div className="devicons-container">
        <span className="devicons-about">Dev Tools:</span>
        <img src={imgVSCode} width="30px" alt="VSCode" className="about-icon" />
        <img src={imgReact} width="30px" alt="React" className="about-icon" />
        <span className="devicons-repo">Repo:</span>

        <a className="devicons-by" href="https://github.com/DanielMontesP">
          <img src={imgGitHub} title="Git" alt="Git" className="about-icon" />
        </a>
        <span className="devicons-year">2022</span>
      </div>
    </>
  );
};
export default DevIcons;
