import imgGitHub from "../../images/github.svg";
import imgReact from "../../images/react-40.gif";
import imgRedux from "../../images/redux-40.png";
import imgJS from "../../images/javascript-40.png";
import imgTypeScript from "../../images/typescript-40.png";
import imgFirebase from "../../images/firebase-40.png";
import imgCSS from "../../images/css-40.png";
import imgNode from "../../images/nodejs-40.png";
import imgHTML5 from "../../images/html5-40.png";
import imgJest from "../../images/jest-40.png";
import imgApp from "../../images/userPhoto.png";
import Styles from "../../Styles/WellcomeStyles";

const WellcomeComments = (): JSX.Element => {
  return (
    <Styles>
      <div className="message-container">
        <img
          src={imgApp}
          title="App icon"
          alt="App icon "
          width="30"
          height="30"
        />
        <br />
        <a href="https://adoptapenguin.netlify.app" className="wellcome-title">
          AdoptAPenguin.com
        </a>
        <div className="message-content">
          AdoptAPenguin.com was my final{" "}
          <a
            href="https://daniel-montes-final-project-202204-bcn.netlify.app/"
            className="wellcome-title"
          >
            project
          </a>{" "}
          at ISDI Coders fullstack developer bootcamp (2022).
          <br />
          <br />
          This site is based on this project, tested, renewed and with new
          features...
          <br />
          <br />
          Designed for mobile and desktop rendering.
          <div className="wellcome-techs">
            <b>Front end:</b>
            <br />
            <img
              src={imgReact}
              title="React"
              alt="React"
              width="20"
              height="20"
            />
            &nbsp;
            <img
              src={imgRedux}
              title="Redux"
              alt="Redux "
              width="20"
              height="20"
            />
            &nbsp;
            <img
              src={imgJS}
              title="JavaScript"
              alt="JavaScript"
              width="20"
              height="20"
            />
            &nbsp;
            <img
              src={imgTypeScript}
              title="typescript"
              alt="typescript"
              width="20"
              height="20"
            />
            &nbsp;
            <img
              src={imgFirebase}
              title="Firebase"
              alt="Firebase"
              width="20"
              height="20"
            />
            &nbsp;
            <img src={imgCSS} title="CSS3" alt="CSS" width="20" height="20" />
            &nbsp;
            <img
              src={imgHTML5}
              title="HTML5"
              alt="HTML"
              width="20"
              height="20"
            />
            &nbsp;
            <img src={imgJest} title="jest" alt="jest" width="20" height="20" />
            &nbsp;
            <img src={imgGitHub} title="Git" alt="Git" width="20" height="20" />
            &nbsp;
            <img
              src="https://avatars2.githubusercontent.com/u/39168408?s=460&v=4"
              title="sonarcloud"
              alt="sonarcloud"
              width="20"
              height="20"
            />
            <b>Back end:</b>
            <br />
            <img
              src={imgReact}
              title="React"
              alt="React"
              width="20"
              height="20"
            />
            &nbsp;
            <img
              src={imgJS}
              title="JavaScript"
              alt="JavaScript"
              width="20"
              height="20"
            />
            &nbsp;
            <img
              src={imgNode}
              title="NodeJS"
              alt="NodeJS"
              width="20"
              height="20"
            />
            &nbsp;
            <img src={imgJest} title="jest" alt="jest" width="20" height="20" />
            &nbsp;
            <img
              src={imgFirebase}
              title="Firebase"
              alt="Firebase"
              width="20"
              height="20"
            />
            &nbsp;
            <img src={imgGitHub} title="Git" alt="Git" width="20" height="20" />
            &nbsp;
            <img
              src="https://avatars2.githubusercontent.com/u/39168408?s=460&v=4"
              title="sonarcloud"
              alt="sonarcloud"
              width="20"
              height="20"
            />
            <br />
          </div>
        </div>
        <div className="footer">
          <div className="footer-repos">
            <img src={imgGitHub} title="Git" alt="Git" width="20" height="20" />
            &nbsp;
            <b>REPOS:</b>&nbsp;
            <a href="https://github.com/DanielMontesP/AdoptAPenguin-Front">
              FRONT
            </a>
            &nbsp;|&nbsp;
            <a href="https://github.com/DanielMontesP/AdoptAPenguin-Back">
              BACK
            </a>
          </div>

          <div className="footer-sonar">
            <img
              src="https://avatars2.githubusercontent.com/u/39168408?s=460&v=4"
              title="sonarcloud"
              alt="sonarcloud"
              width="20"
              height="20"
            />
            &nbsp;
            <b>SONARCLOUD:</b>&nbsp;
            <br />
            <a href="https://sonarcloud.io/summary/overall?id=DanielMontesP_AdoptAPenguin-Front">
              FRONT
            </a>
            &nbsp;|&nbsp;
            <a href="https://sonarcloud.io/summary/overall?id=DanielMontesP_AdoptAPenguin-Back">
              BACK
            </a>
          </div>
        </div>
      </div>
    </Styles>
  );
};
export default WellcomeComments;
