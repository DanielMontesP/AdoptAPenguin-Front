import styled from "styled-components";

const FormsStyles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap");

  a {
    font-size: 12px;
    color: grey;
    text-decoration: none;
  }
  .footer-sonar {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .footer-repos {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .footer {
    margin: auto;
  }

  .wellcome-techs {
    margin-top: 20px;
  }
  .message-content {
    margin-top: 20px;
  }
  .iconsNames {
    font-size: 12px;
  }

  .wellcome-title {
    margin-top: 10px;
    font-size: 14px;
  }

  .footer {
    position: fixed;
    top: 90%;
    color: grey;
    text-align: center;
    margin: auto;
    width: 100%;
  }
`;

export default FormsStyles;
