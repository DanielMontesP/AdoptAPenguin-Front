import styled from "styled-components";
import iconHamburguer from "../images/menu_hamburguer.png";
import iconFavs from "../images/fav-empty.png";
import iconMenuFavs from "../images/fav-full.png";
import iconLike from "../images/like-full.png";
import iconLikeInit from "../images/like-add.png";
import iconHome from "../images/icon-home.png";
import iconLogout from "../images/icon-logout-white.png";
import iconSoundOff from "../images/icon-sound-off.png";
import iconEdit from "../images/edit.png";
import iconMesssagesGot from "../images/mail-empty.png";
import iconMesssagesNew from "../images/mail-full.png";
import iconMesssagesView from "../images/view-16.png";
import detailPrev from "../images/detailPrev.png";
import detailNext from "../images/detailNext.png";

const DetailPageStyles = styled.div`
  font-family: Montserrat, sans-serif;
  text-align: justify;

  .new-messages-counter {
    height: 30px;
    width: 30px;
    padding: 2px;
    color: white;
    font-size: 16px;
    background-color: rgb(241, 14, 14);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    position: relative;
    left: -5px;
    top: -15px;
    display: inline-flex;
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
    background-color: rgb(241, 14, 14);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1em;
  }

  .detail-name {
    height: 15px;
    width: 90%;
    text-align: left;
  }

  @media only screen and (min-width: 421px) {
    .detail-header {
      display: flex;
      width: 80%;
      max-width: 550px;
      margin: auto;

      position: relative;
      top: 80px;
    }

    .detailPrev {
      background: none;
      background-image: url(${detailPrev});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 60px;
      position: relative;
      left: 12%;
      border: 0;
    }

    .detailNext {
      background: none;
      background-image: url(${detailNext});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 60px;
      position: relative;
      right: 12%;
      border: 0;
    }

    .buttons-container {
      margin: auto;
      width: 95%;
      max-width: 550px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-around;

      margin-top: 15px;
    }

    .detail-container {
      margin: auto;
      margin-bottom: 10px;
      border-radius: 5px 5px 5px 5px;
      height: 87.4vh;
    }

    .penguin-description {
      min-height: 40px;
      margin: auto;
      text-align: justify;
      display: flex;
      flex-direction: column;
      width: 80%;
    }

    .penguin--container {
      border-radius: 5px 5px 5px 5px;
      margin: auto;
      width: 100%;
      max-height: 354px;

      text-align: center;
    }

    .detail-content {
      height: 450px;
      background: white;
    }
    .img-container {
      max-width: 690px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: auto;
      margin-top: 80px;
      height: 280px;
    }

    .detail-description {
      display: flex;
      font-size: 1rem;
      background: white;
      padding: 10px 10px 20px 10px;
      border-radius: 0 5px 5px 5px;
      margin: auto;
      text-align: justify;
      min-width: 320px;
      max-width: 690px;
      min-height: 100px;
    }

    .detail-image {
      height: 270px;
      width: 95%;
      max-width: 690px;
      margin: auto;
      object-fit: cover;
    }

    .penguin-container {
      margin: auto;
      text-align: center;
      border-radius: 15px;
      background: #fff;
      -webkit-transition: 0.5s;
      -moz-box-sizing: border-box;
      display: flow-root;
      margin-top: 80px;
    }
  }

  @media only screen and (max-width: 420px) {
    .penguin-container {
      margin: auto;
      text-align: center;
      border-radius: 15px;
      background: #fff;
      -webkit-transition: 0.5s;
      -moz-box-sizing: border-box;
      display: flow-root;
      margin-top: 80px;
    }

    .detailPrev {
      background: none;
      background-image: url(${detailPrev});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 60px;
      position: absolute;
      left: 3%;
    }

    .detailNext {
      background: none;
      background-image: url(${detailNext});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 60px;
      position: absolute;
      right: 3%;
    }

    .detail-header {
      display: flex;
      width: 90%;
      max-width: 550px;
      margin: auto;
    }
    .buttons-container {
      margin: auto;
      width: 95%;
      max-width: 690px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-around;
      margin-top: 20px;
    }

    .detail-container {
      margin: auto;
      margin-bottom: 10px;
      border-radius: 5px 5px 5px 5px;
      margin-top: 5.2rem;
      height: 87.4vh;
    }

    .detail-image {
      object-fit: cover;
      -ms-flex: 1;
      width: 100%;
      max-width: 690px;
      height: 280px;
    }

    .detail-description {
      display: flex;
      font-size: 1rem;
      background: white;
      padding: 10px;

      margin: auto;
      text-align: justify;
      min-height: 100px;
    }

    .penguin-description {
      max-width: 380px;
      margin: auto;
      text-align: justify;
      display: flex;
      flex-direction: column;
    }

    .penguin--container {
      border-radius: 5px 5px 5px 5px;
      margin: auto;
      width: 95%;
    }

    .img-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: auto;
      height: 280px;
      width: 95%;
    }
  }

  .tab-description {
    width: 100px;
    background: none;
    font-size: 0.9rem;
    color: black;
    border: 0;
  }

  .tab-messages {
    font-size: 0.9rem;
    width: 100px;
    color: black;
    background: none;
    padding: 5px;
    border: 0;
  }

  .tab-selected {
    font-size: 1rem;
    font-weight: bold;
    width: 100px;
    background: white;
    border: 1px solid;
    border-radius: 10px 10px 0px 0;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    color: black;
  }

  .detail-info {
    display: flex;
    width: 275px;
    margin: auto;
    margin-top: 15px;
  }

  .detail-description-container {
    margin: auto;
    max-width: 480px;
    margin-top: 10px;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0 15px 6px #666;
  }
  /* } */

  element.style {
    text-align: center;
  }

  button {
    cursor: pointer;
  }

  .bt-menu {
    background: url(${iconHamburguer});
    border-radius: 10px;
    margin-right: 20px;
    height: 36px;
    margin: auto;
  }

  ul {
    width: 100%;
    margin: 0 0 0 0;
    padding: 0;
    border-radius: 35px;
    height: fit-content;
    background: #fff;
  }

  li {
    list-style-type: none;
    text-align: justify;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }

  h1 {
    font-size: 1.3em;
  }

  h2 {
    font-size: 16px;
    text-align: center;
  }

  .bt-delete {
    visibility: hidden;
  }

  .bt-logout {
    background: url(${iconLogout});
    height: 65px;
    width: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
  }

  .bt-sound-off {
    background: url(${iconSoundOff});
    height: 65px;
    width: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
  }

  .bt-favs-menu {
    background: url(${iconFavs});
    width: 65px;
    height: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
  }

  .modal-message {
    color: white;
    text-align: center;
  }

  .imgDetailNext {
    height: 180px;
    border: 0;
  }

  .imgDetailPrev {
    height: 180px;
    border: 0;
  }

  .penguin-image-container {
    width: 100%;
    height: 100%;
    border-radius: 35px;
    border: px solid #fff;
  }

  .bt-back {
    background: url(${detailPrev});
    background-position: center;
    width: 45px;
    height: 5rem;
    margin-left: 10px;
  }
  .menu-icons-lower {
    display: flex;
    flex-direction: row;

    bottom: 20px;
  }

  .display-none {
    display: none;
  }

  .bt-home {
    background: url(${iconHome});
    height: 65px;
    width: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
  }

  .bt-edit {
    top: 50px;
    flex: 2;
  }

  .bt-favs {
    width: 45px;
    height: 45px;
    background: url(${iconMenuFavs});
    position: relative;
    margin-top: 7px;
  }

  .bt-addfav {
    width: 65px;
    height: 65px;
    background: url(${iconFavs});
    background-size: 60%;
    background-repeat: no-repeat;
  }

  .bt-likes {
    flex: 2;
  }

  .bt-likes {
    width: 32px;
    height: 32px;
    background: url(${iconLike});
    background-repeat: no-repeat;
    padding: 0 0 0 0;
  }

  .detail-info {
    display: flex;
    width: 70%;
    margin: auto;
    margin-top: 50px;
    max-width: 400px;
  }

  .description-container {
    background-color: rgb(255 254 254);
    margin-left: 18px;
    margin-right: 18px;
  }

  .message-content {
    display: none;
  }

  .message-subject {
    margin-right: 5px;
    text-align: left;
    margin-left: 10px;
    flex: 2;
    overflow: hidden;
  }

  .message-read-img {
    background: url(${iconMesssagesView});
    background-repeat: no-repeat;
    background-size: 20px;
    width: 24px;
    height: 24px;
    border: 0;
  }

  .message-buttons {
    display: flex;
    justify-content: left;
    text-align: left;
    margin-bottom: 10px;
  }

  .message-new {
    color: black;
    background-color: transparent;
    border: 2px solid black;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    border-radius: 15px;
    width: 235px;
  }

  .message-noread-img {
    background: url(${iconFavs});
    background-size: 25px;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
  }

  .detail-title {
    display: flex;
    margin-bottom: 20px;
  }

  .detail-tabs {
    width: 100%;
    max-width: 550px;
    margin: auto;
  }
  .image-delete {
    position: relative;
    top: -140px;
    right: -14px;
    display: flex;
    justify-content: flex-end;
    width: 104%;
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

  .header {
    display: flex;
    align-items: center;
    background: url("../images/icon-star_full.png");
    height: 5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #292929;
    margin: auto;
    color: white;
  }

  .category {
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    max-width: 690px;
    color: black;
    font-size: 1rem;
    text-align: left;
    padding-left: 5px;
    padding-right: 5px;
    background-color: lightgrey;
    border-radius: 4px;
    box-shadow: 0 3px 6px #666;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
    display: flex;
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

  .item {
    display: inline-flex;
    background: #fff;
    padding: 0.5em;
    max-height: 650px;
    -webkit-transition: 0.5s;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-shadow: 2px 2px 10px rgb(140, 134, 134);
    border-radius: 2px 2px 2px 2px;
    flex-wrap: wrap;
  }

  .item img {
    max-width: 100%;
  }
  .item:nth-of-type(4n + 1) {
    transform: rotate(5deg);
    transition: all 0.35s;
  }
  .item:nth-of-type(4n + 2) {
    transform: rotate(-5deg);
    transition: all 0.35s;
  }
  .item:nth-of-type(4n + 3) {
    transform: rotate(3deg);
    transition: all 0.35s;
  }
  .item:nth-of-type(4n + 4) {
    transform: rotate(-3deg);
    transition: all 0.35s;
  }
  .item:nth-of-type(4n + 5) {
    transform: rotate(3deg);
    transition: all 0.35s;
  }
  .item:hover {
    transform: rotate(15deg);
  }

  .animated {
    background-repeat: no-repeat;
    background-position: left top;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .detail-animatedLikeInit {
    width: 45px;
    height: 90px;
    background: none;
    background-image: url(${iconLikeInit});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .detail-animatedLike {
    width: 45px;
    height: 90px;
    background: none;
    background-image: url(${iconLike});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
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

  .animatedFav {
    background: none;
    background-image: url(${iconFavs});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    border: 0;
    flex: 2;
  }

  .animatedFavDelete {
    background: none;
    background-image: url(${iconMenuFavs});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    border: 0;
    flex: 2;
  }

  .animatedEdit {
    height: 30px;
    background: none;
    background: url(${iconEdit});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin: auto;
  }

  .bt-messages {
    background: url("../images/message-45.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 40px;
    margin-left: 24px;
    border: 0;
  }

  .bt-message-new {
    background: url(${iconMesssagesNew});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 40px;
    margin-left: 24px;
    border: 0;
  }

  .bt-message-got {
    background: url(${iconMesssagesGot});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 40px;
    border: 0;
    width: 45px;
  }

  .form-detail-animatedEdit {
    background: none;
    background: url(${iconEdit});
    background-repeat: no-repeat;
    background-position: center;
    width: 70%;
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

  .bounce2 {
    -webkit-animation-name: bounce2;
    animation-name: bounce2;
    margin: auto;
  }

  .header {
    justify-content: space-between;
  }
`;

export default DetailPageStyles;
