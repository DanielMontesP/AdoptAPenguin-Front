import styled from "styled-components";
import iconHamburguer from "../images/menu_hamburguer.png";
import iconBack from "../images/icon-back.png";
import iconFavs from "../images/icon-stars.png";
import iconMenuFavs from "../images/fav-add-32.png";
import iconMenuFavsDelete from "../images/fav-delete-32.png";
import iconAddFav from "../images/icon-add_plus.png";
import iconHome from "../images/icon-home.png";
import iconLogout from "../images/icon-logout-white.png";
import iconDelete from "../images/delete-32.png";
import iconSoundOff from "../images/icon-sound-off.png";
import iconSoundOn from "../images/icon-sound-on.png";
import iconEdit from "../images/icon-editar32.png";
import iconLike from "../images/heartLike.png";
import iconLikeInit from "../images/icon-likes-empty.png";

const PagesStyles = styled.div`
  @media only screen and (min-width: 421px) {
    .penguin-description {
      font-size: 14px;
    }
  }

  text-align: center;
  margin-top: 100px;

  .container {
    width: 90%;
    margin: auto;
    display: flow-root;
    max-width: 600px;
  }

  element.style {
    text-align: center;
  }

  form {
    row-gap: 20px;
    width: 70%;
    margin: auto;
    margin-top: 60px;
    max-width: 500px;
  }

  hr {
    width: 40%;
    margin: 35px;
    margin-top: 5px;
  }

  li {
    height: 48px;
    list-style-type: none;
    text-align: left;
    padding-top: 43px;
    width: 200px;
  }

  h1 {
    font-size: 20px;
    margin-left: 10px;
  }

  h2 {
    font-size: 16px;
    text-align: center;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 80%;
    padding-bottom: 10px;
    font-size: 20px;
    margin: auto;
  }

  input {
    border: 2px solid black;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    box-sizing: border-box;
    color: black;
    font-size: 18px;
    height: 100%;
  }

  input :placeholder {
    text-align: center;
  }

  nav {
    margin-right: 9px;
  }

  button {
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: middle;
  }

  .Toastify__toast-body {
    text-align: center;
  }

  .penguin-image {
    width: 95%;
    border-radius: 5px;
    min-width: 320px;
    height: 220px;
    margin: auto;
    margin-top: 10px;
    background-color: lightgray;
    object-fit: cover;
  }

  .header {
    position: fixed;
    right: 20px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 95%;
  }

  .category {
    height: fit-content;
    font-size: 15px;
    background-color: #ffe02c;
    padding-left: 5px;
    padding-right: 5px;
    box-shadow: 0 3px 6px #666;
  }

  .likes {
    animation-name: bounce;
    font-size: 16px;
    margin: auto;
    margin-top: 5px;
  }

  .penguin-name {
    flex: 2;
    border: 0;
    margin-top: -40px;
    min-width: 55px;
  }

  .animated {
    background-repeat: no-repeat;
    background-position: left top;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animatedLike {
    width: 30px;
    height: 30px;
    background: none;
    background-image: url(${iconLike});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 0;
  }

  .animatedLikeInit {
    width: 30px;
    height: 30px;
    background: none;
    background-image: url(${iconLikeInit});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    border: 0;
  }
  .penguin-description {
    width: 89%;
    min-height: 40px;
    margin: auto;
    text-align: justify;
  }

  .menu-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: -10px;
  }

  .menu-header {
    width: 100%;
  }

  .bt-logout {
    background: url(${iconLogout});
    height: 65px;
    width: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 0;
  }

  .detail-container {
    width: 100%;
  }

  .img-Home {
    border: 3px solid black;
    border-radius: 25px;
    width: 80%;
    max-width: 400px;
    margin-bottom: 30px;
  }

  .bt-container {
    margin-top: 30px;
    max-width: 500px;
    margin: auto;
    margin-top: 50px;
  }

  .li-detail {
  }

  .bt-sound {
    height: 65px;
    width: 65px;
    background: url(${iconSoundOn});
    background-size: 60%;
    background-repeat: no-repeat;
    border: 0;
  }
  .bt-sound-off {
    height: 65px;
    width: 65px;
    background: url(${iconSoundOff});
    background-size: 60%;
    background-repeat: no-repeat;
    border: 0;
  }

  .bt-menu {
    background: url(${iconHamburguer});
    border-radius: 10px;
    margin-right: 20px;
    border: 0;
  }

  .bt-favs-menu {
    background: url(${iconFavs});
    width: 65px;
    height: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 0;
  }

  .bt-back {
    background: url(${iconBack});
    width: 45px;
    height: 45px;
    margin-left: 10px;
    border: 0;
  }

  .menu-icons-lower {
    display: flex;
    flex-direction: row;
    bottom: 20px;
  }

  .bt-home {
    background: url(${iconHome});
    height: 65px;
    width: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 0;
  }

  .bt-favs {
    width: 45px;
    height: 45px;
    background: none;
    background: url(${iconMenuFavs});
    position: relative;
    margin-top: 7px;
    border: 0;
  }

  .bt-addfav {
    width: 65px;
    height: 65px;
    background: none;
    background: url(${iconAddFav});
    background-size: 60%;
    background-repeat: no-repeat;
    border: 0;
  }

  .penguin-image-container {
    height: 280px;
    width: 95%;
    display: flex;
    justify-content: space-between;
    margin: auto;
    margin-top: -20px;
    border-radius: 5px 5px 5px 5px;
    text-align: center;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .penguin-image-detail {
    min-height: auto;
    min-width: 200px;
    box-shadow: 0 3px 6px #666;
    padding: 10px 10px 100px 10px;
    margin-bottom: 10px;
    border-radius: 5px 5px 5px 5px;
    margin: auto;
    text-align: center;
  }

  .image-delete {
    width: 100%;
    position: relative;
    top: -140px;
    right: -14px;
    display: flex;
    justify-content: flex-end;
  }

  .penguins-container {
    padding: 0 10px 15px;
  }

  .penguin-container {
    width: 378px;
    height: 440px;
    margin: auto;
    margin-bottom: 50px;
    text-align: center;
    padding: 0.5em;
    border: 1px solid grey;
    border-radius: 15px;
    display: inline-flex;
    flex-wrap: wrap;
    background: #fff;
    -webkit-transition: 0.5s;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-shadow: 2px 2px 10px rgb(140, 134, 134);
  }

  .penguin-datalist {
    position: relative;
    left: 20px;
    display: flex;
  }

  .bt-likes {
    flex: 2;
    border: 0;
    margin-top: -40px;
  }

  .bt-likes {
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    padding: 0 0 0 0;
  }

  .bt-likesInit {
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    padding: 0 0 0 0;
    border: 0;
  }

  .bt-register {
    width: 40%;
    height: 50px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: rgb(29, 29, 29);
    border-radius: 15px;
    border: 0;
  }

  .bt-login {
    width: 40%;
    height: 50px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: rgb(29, 29, 29);
    border-radius: 10px;
    margin: 10px;
    border: 0;
  }

  .link {
    margin: auto;
    color: blue;
    font-size: 14px;
    cursor: pointer;
  }

  .submitContainer {
    display: flex;
    width: 100%;
  }

  .display-none {
    display: none;
  }

  .projectLayout {
    max-width: 90%;
    justify-content: center;
    align-items: center;
    -moz-column-count: 4;
    -webkit-column-gap: 1.5em;
    -moz-column-gap: 1.5em;
    column-gap: 1.5em;
    margin: 1em;
    padding: 1;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em;
    font-size: 0.85em;
    transform: translate(40px, 50px);
  }

  .animatedFav {
    width: 30px;
    height: 30px;
    background: none;
    background-image: url(${iconMenuFavs});
    background-repeat: no-repeat;
    background-position: inherit;
    background-size: contain;
    border: 0;
  }

  .animatedFavDelete {
    width: 30px;
    height: 30px;
    background: none;
    background-image: url(${iconMenuFavsDelete});
    background-repeat: no-repeat;
    background-position: inherit;
    background-size: contain;
    border: 0;
  }

  .animatedDelete {
    width: 30px;
    height: 30px;
    background: none;
    background-image: url(${iconDelete});
    background-size: contain;
    border: 0;
    margin: auto;
  }

  .animatedEdit {
    width: 30px;
    height: 30px;
    background: url(${iconEdit});
    background-repeat: no-repeat;
    background-position: right;
    border: 0;
    margin: auto;
  }

  .no-visible {
    visibility: hidden;
  }

  .buttons-container {
    width: 85%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    position: relative;
    top: 265px;
    margin: auto;
  }

  .container {
    width: 90%;
    margin: auto;
    display: flow-root;
    max-width: 600px;
  }

  @-webkit-keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      -webkit-transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-30px);
    }
    60% {
      -webkit-transform: translateY(-15px);
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
  @keyframes bounce2 {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }

  .bounce {
    -webkit-animation-name: bounce;
    animation-name: bounce;
  }
  .bounce2 {
    -webkit-animation-name: bounce2;
    animation-name: bounce2;
  }
`;

export default PagesStyles;
