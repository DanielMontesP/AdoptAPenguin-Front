import styled from "styled-components";
import iconHamburguer from "../images/menu_hamburguer.png";
import iconBack from "../images/detailPrev.png";
import iconFavs from "../images/icon-stars.png";
import iconMenuFavs from "../images/fav-empty.png";
import iconMenuFavsDelete from "../images/fav-full.png";
import iconHome from "../images/icon-home.png";
import iconLogout from "../images/icon-logout-white.png";
import iconDeleteBlack from "../images/delete-black.png";
import iconSoundOff from "../images/icon-sound-off.png";
import iconSoundOn from "../images/icon-sound-on.png";
import iconEdit from "../images/edit.png";
import iconLike from "../images/like-full.png";
import iconLikeInit from "../images/like-add.png";
import iconMesssagesGot from "../images/mail-empty.png";
import iconMesssagesNew from "../images/mail-full.png";

const PagesStyles = styled.div`
  text-align: center;

  .footer {
    color: lightgrey;
    position: fixed;
    bottom: 20px;
  }

  @media only screen and (min-width: 421px) {
    .penguin-description {
      font-size: 14px;
    }

    .bt-container {
      width: 50%;
      max-width: 450px;
      margin: auto;
      position: fixed;
      bottom: 25%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: space-evenly;
      -webkit-justify-content: space-evenly;
      -ms-flex-pack: space-evenly;
      justify-content: space-evenly;
      column-gap: 30px;
    }
  }

  @media only screen and (max-width: 420px) {
    .bt-container {
      width: 75%;
      margin: auto;
      position: fixed;
      bottom: 25%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: space-evenly;
      -webkit-justify-content: space-evenly;
      -ms-flex-pack: space-evenly;
      justify-content: space-evenly;
      column-gap: 30px;
    }
  }

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
    height: 220px;
    width: 100%;
    min-width: 320px;
    border-radius: 5px;
    margin: auto;
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
    background-color: lightgrey;
    padding-left: 5px;
    padding-right: 5px;
    box-shadow: 0 3px 6px #666;
  }

  .likes {
    width: 30px;
    height: 30px;
    position: relative;
    top: -15px;
    left: -5px;
    color: white;
    padding: 2px;
    display: inline-flex;
    border: 2px solid white;
    box-shadow: 0 1px 1px black;
    background-color: rgb(241, 14, 14);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1em;
  }

  .penguin-name {
    height: 30px;
    text-align: left;
    margin-left: 10px;
    flex: 2;
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
    background: none;
    background-image: url(${iconLike});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 0;
  }

  .animatedLikeInit {
    background: none;
    background-image: url(${iconLikeInit});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    border: 0;
  }
  .penguin-description {
    min-height: 40px;
    margin: auto;
    margin-top: 20px;
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

    margin-top: 90px;
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
    background: url(${iconMenuFavs});
    background-size: 60%;
    background-repeat: no-repeat;
    border: 0;
  }

  .bt-message-new {
    background: url(${iconMesssagesNew});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border: 0;
    flex: 1;
  }

  .bt-message-got {
    background: url(${iconMesssagesGot});
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
    border: 0;
    flex: 1;
  }

  .penguin-image-container {
    height: 210px;
    width: 100%;
    display: flex;
    border-radius: 5px 5px 5px 5px;
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

  .penguin-container {
    max-width: 378px;
    height: 440px;
    margin: auto;
    margin-bottom: 50px;
    text-align: center;
    padding: 0.5em;
    border-radius: 15px;
    display: inline-flex;
    flex-wrap: wrap;
    background: #fff;
    -webkit-transition: 0.5s;
  }

  .penguin-datalist {
    width: 100%;
    text-align: left;
    margin-top: 15px;
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
    width: 100%;
    height: 50px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    background-color: white;
    border-radius: 15px;
    border: 0;
  }
  .header-wellcome {
    display: none;
  }
  .bt-login {
    width: 100%;
    height: 50px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
    border-radius: 15px;
    border: 1px solid white;
  }

  .link {
    width: 100%;
    color: black;
    font-size: 18px;
    cursor: pointer;
  }

  .submitContainer {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
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
    background: none;
    background-image: url(${iconMenuFavs});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    border: 0;
    flex: 2;
  }

  .animatedFavDelete {
    background: none;
    background-image: url(${iconMenuFavsDelete});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    border: 0;
    flex: 2;
  }

  .animatedDelete {
    border: none;
    height: 17px;
    width: 17px;
    background: url(${iconDeleteBlack});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-left: 30px;
  }

  .animatedEdit {
    width: 30px;
    height: 30px;
    background: url(${iconEdit});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    border: 0;
    margin: auto;
    margin-right: 10px;
  }

  .bt-Edit {
    width: 30px;
    height: 30px;
    background: url(${iconEdit});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    border: 0;
    margin: auto;
    margin-right: 10px;
  }

  .no-visible {
    visibility: hidden;
  }

  .buttons-container {
    width: 95%;
    display: flex;
    margin: auto;
    margin-top: 30px;
  }

  .edit-buttons-container {
    height: 30px;
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
    margin: auto;
  }

  .disapear {
    -webkit-animation-name: disapear;
    animation-name: disapear;
  }

  .bounce2 {
    -webkit-animation-name: bounce2;
    animation-name: bounce2;
    margin: auto;
  }
`;

export default PagesStyles;
