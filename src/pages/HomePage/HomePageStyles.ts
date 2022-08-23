import styled from "styled-components";

import iconCancel from "../../images/modal-cancel-32.png";
import iconAccept from "../../images/modal-accept-32.png";

const HomePageStyles = styled.div`
  font-family: Roboto, sans-serif;
  text-align: center;

  body {
    background-image: url("../images/background2Heart.png");
  }

  @media only screen and (max-width: 420px) {
    .modal-message {
      font-size: 14px;
    }
  }

  .modal-body {
    height: 80%;
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  }

  .modal-btn-close {
    width: 30px;
    height: 30px;
    position: fixed;
    top: 10px;
    right: 5px;
    background-image: url(${iconCancel});
    background-color: rgb(29, 29, 29);
    font-size: 20px;
    align-items: center;
  }

  .modal-btn-accept {
    background-image: url(${iconAccept});
    background-color: black;
    font-size: 20px;
    border-radius: 15px;
    align-items: center;
    width: 40%;
    height: 50px;
    color: white;
  }

  .modal-btn-cancel {
    background-image: url(${iconCancel});
    background-color: black;
    font-size: 20px;
    border-radius: 15px;
    align-items: center;
    width: 40%;
    height: 50px;
  }

  .devicons-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    margin: auto;
    width: 95%;
  }

  .devicons-year {
    text-align: right;
    margin-left: 5px;
  }
  .devicons-devtools {
    text-align: right;
    margin-left: 5px;
  }
  .bt-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 475px;
    width: 100%;
  }

  .devicons-by {
    text-align: right;
    color: blue;
    width: 140px;
    flex: 2;
  }

  .bt-login,
  .bt-register {
    height: 60px;
    color: white;
    width: 80%;
    background-color: black;
    padding: 14px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    font-size: 20px;
    border-radius: 15px;
    align-items: center;
    margin: auto;
  }

  .container {
    width: 100%;
  }

  h1 {
    top: 25px;
    position: relative;
    width: 100%;
    font-size: 18px;
  }

  .link {
    margin: auto;
  }

  a {
    text-decoration: none;
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
    width: 100%;
    margin: auto;
    padding-top: 180px;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 60px;
    padding-bottom: 10px;
    font-size: 20px;
    margin: auto;
    display: none;
  }

  input {
    border: 2px solid black;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    box-sizing: border-box;
    color: black;
    font-size: 18px;
    height: 60px;
    width: 80%;
  }

  input:placeholder {
    font-weight: bolder;
    padding-left: 20px;
    text-align: center;
  }

  .submitContainer {
    display: flex;
    width: 100%;
  }
`;

export default HomePageStyles;
