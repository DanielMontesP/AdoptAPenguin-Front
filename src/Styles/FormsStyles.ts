import styled from "styled-components";
import iconHamburguer from "../images/menu_hamburguer.png";
import iconBack from "../images/icon-back.png";
import iconFavs from "../images/icon-stars.png";
import iconMenuFavs from "../images/star_add_icon.png";
import iconLike from "../images/heartLike.png";
import iconAddFav from "../images/icon-add_plus.png";
import iconHome from "../images/icon-home.png";
import iconDelete from "../images/icon-logout1.png";
import iconSoundOff from "../images/icon-sound-off.png";
import iconSoundOn from "../images/icon-sound-on.png";
import iconAddPhoto from "../images/contact-photo.png";
import iconEdit from "../images/icon-editar.png";

const FormsStyles = styled.div`
  @media only screen and (max-width: 420px) {
    .preview-image {
      max-width: 280px;
      height: 190px;
      margin: auto;
      border: 2px solid black;
      border-radius: 15px;
      background-color: white;
      margin-top: 60px;
      aspect-ratio: auto;
    }

    .input-description {
      height: 150px;
      width: 40vh;
      margin: auto;
      font-family: inherit;
      border: 2px solid black;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      box-sizing: border-box;
      color: black;
      font-size: 18px;
    }

    .form-img__file-label {
      position: absolute;
      top: 4px;
      display: block;
      width: 40vh;
      height: 180px;
      cursor: pointer;
      background-color: rgb(223 223 218 / 90%);
      background-image: url(${iconAddPhoto});
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 15px;
      border: 2px black solid;
      opacity: 0.5;
    }

    input {
      border: 2px solid black;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      box-sizing: border-box;
      color: black;
      font-size: 18px;
      width: 40vh;
      margin: auto;
      background: white;
      height: 50px;
    }

    .form-img__img-preview {
      display: block;
      width: 40vh;
      height: 190px;
      margin-top: 5px;
      background: white;
      object-fit: scale-down;
      border-radius: 15px;
      opacity: 0;
    }

    .form-img__img-preview-Hidden {
      display: block;
      width: 40vh;
      height: 190px;
      margin-top: 5px;
      background: white;
      object-fit: scale-down;
      border-radius: 15px;
      opacity: 1;
    }
  }

  @media only screen and (min-width: 421px) {
    .preview-image {
      max-width: 350px;
      margin: auto;
      border: 2px solid black;
      border-radius: 15px;
      background-color: white;
      margin-top: 80px;
      background-image: url(${iconAddPhoto});
      background-repeat: no-repeat;
      background-position: center;
      aspect-ratio: auto;
    }

    .input-description {
      height: 150px;
      width: 50vh;
      margin: auto;
      font-family: inherit;
      border: 2px solid black;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      box-sizing: border-box;
      color: black;
      font-size: 18px;
    }

    .form-img__file-label {
      position: absolute;
      top: 4px;
      display: block;
      width: 50vh;
      height: 220px;
      cursor: pointer;
      background-color: rgb(223 223 218 / 90%);
      background-image: url(${iconAddPhoto});
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 15px;
      border: 2px black solid;
      opacity: 0.5;
    }

    input {
      border: 2px solid black;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      box-sizing: border-box;
      color: black;
      font-size: 18px;
      width: 50vh;
      margin: auto;
      background: white;
      height: 50px;
    }

    .form-img__img-preview {
      display: block;
      width: 50vh;
      height: 235px;
      margin-top: 5px;
      background: white;
      object-fit: scale-down;
      border-radius: 15px;
      opacity: 0;
    }

    .form-img__img-preview-Hidden {
      display: block;
      width: 50vh;
      height: 235px;
      margin-top: 5px;
      background: white;
      object-fit: scale-down;
      border-radius: 15px;
      opacity: 1;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 100%;
    max-width: 500px;
    margin: auto;
  }

  .form-register {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 100%;
    margin-top: 290px;
  }

  hr {
    width: 40%;
    margin: 35px;
    margin-top: 50%;
  }

  li {
    height: 48px;
    list-style-type: none;
    text-align: left;
    padding-top: 43px;
    width: 200px;
  }
  div {
    height: 100%;
  }
  h1 {
    top: 25px;
    position: relative;
    width: 100%;
    font-size: 18px;
  }

  h2 {
    font-size: 20px;
    margin-left: 12px;
  }

  a {
    text-decoration: none;
    color: black;
    font-size: 20px;
    font-size: 14px;
    cursor: pointer;
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

  button {
    padding: 14px 20px;
    font-weight: bold;
    cursor: pointer;
    width: 40vh;
    display: flex;
    justify-content: center;
    font-size: 20px;
    border-radius: 15px;
    align-items: center;
    margin: auto;
  }

  span {
    font-size: 20px;
    margin-left: 50px;
  }

  nav {
    margin-right: 9px;
  }

  .input-login-user {
    border: 2px solid black;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    box-sizing: border-box;
    color: black;
    font-size: 20px;
    width: 70%;
    margin: auto;
    background: white;
    height: 45px;
  }

  .submitContainer {
    display: flex;
    width: 100%;
  }

  .img-Home {
    border: 3px solid black;
    border-radius: 25px;
    width: 80%;
    max-width: 500px;
    margin: auto;
  }

  input ::placeholder {
    font-weight: bolder;
    padding-left: 220px;
    text-align: center;
    font-size: 20px;
  }

  .bt-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 400px;
    width: 100%;
    background-image: none;
    margin-top: 50px;
  }

  .input-likes {
    display: none;
  }

  .bt-login,
  .bt-register {
    color: white;
    background-color: rgb(29, 29, 29);
    padding: 14px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 20px;
    border-radius: 15px;
    align-items: center;
    margin: auto;
  }

  .header {
    position: fixed;
    right: 20px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 95vw;
  }

  .form-create {
    margin-top: 20px;
  }

  .image-container {
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 90px;
  }

  .edit-image {
    width: 160px;
    height: 160px;
    background-image: url(${iconAddPhoto});
    background-color: white;
    background-repeat: no-repeat;
  }

  .penguin-image {
    height: 225px;
    max-width: 300px;
    border: 2px solid;
    border-radius: 15px;
    background-image: url(${iconAddPhoto});
    background-color: white;
    background-repeat: no-repeat;
    background-position-x: 50%;
    background-position-y: 50%;
    margin: auto;
    object-fit: cover;
  }

  .container {
    max-width: 600px;
    width: 100%;
    display: flow-root;
    margin: auto;
  }

  .register-container {
    width: 100%;
    display: flow-root;
    margin-top: -50px;
  }

  .category {
    position: relative;
    top: -140px;
    left: 15px;
    background-color: #ffe02c;
    border-radius: 4px;
    flex: 1;
    margin-bottom: 25px;
    padding-left: 5px;
    box-shadow: 0 3px 6px #666;
    margin-left: 5px;
  }

  .likes {
    text-align: right;
    flex: 3;
    position: relative;
    top: -140px;
    left: -36px;
  }
  .penguin-description {
    width: 89%;
    min-height: 40px;
    position: relative;
    top: -140px;
    left: 18px;
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
    margin-top: 30%;
  }

  .bt-delete {
    background: url(${iconDelete});
    height: 65px;
    width: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
  }

  .bt-sound {
    background: url(${iconSoundOn});
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

  .bt-menu {
    background: url(${iconHamburguer});
    background-repeat: no-repeat;
    border-radius: 10px;
    margin-right: 20px;
  }

  .bt-favs-menu {
    background: url(${iconFavs});
    width: 65px;
    height: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
  }

  .bt-back {
    background: url(${iconBack});
    width: 45px;
    height: 45px;
    margin-left: 10px;
  }
  .menu-icons-lower {
    display: flex;
    flex-direction: row;
    margin: auto;
    bottom: 20px;
  }

  .bt-home {
    background: url(${iconHome});
    height: 65px;
    width: 65px;
    background-size: 60%;
    background-repeat: no-repeat;
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
    background: url(${iconAddFav});
    background-size: 60%;
    background-repeat: no-repeat;
  }

  .penguin-image-container {
    box-shadow: 0 3px 6px #666;
    padding: 10px 10px 150px 10px;
    margin-bottom: 10px;
    border-radius: 5px 5px 5px 5px;
    margin: auto;
    text-align: center;
    width: 100%;
  }

  .penguins-container {
    border-radius: 8px;
    padding: 0 10px 15px;
    margin-top: 70px;
    text-align: center;
    width: 95%;
  }

  .penguin-datalist,
  .penguin-title {
    display: flex;
    height: 40px;
  }

  .bt-likes {
    width: 32px;
    height: 32px;
    background: url(${iconLike});
    background-repeat: no-repeat;
    padding: 0 0 0 0;
    position: relative;
    top: -140px;
    left: -10px;
  }

  .bt-save {
    color: white;
    background-color: rgb(29, 29, 29);
    font-size: 20px;
    font-weight: bold;
    height: 60px;
    border-radius: 15px;
  }

  .bt-register {
    color: white;
    background-color: rgb(29, 29, 29);
    padding: 14px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 20px;
    border-radius: 15px;
    align-items: center;
    margin: auto;
  }

  .link {
    margin: auto;
  }

  .submitContainer {
    display: flex;
    width: 100%;
  }

  .display-none {
    display: none;
  }

  .penguin-container {
    display: flex;
    margin-top: 80px;
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
    display: inline-block;
    background: #fff;
    padding: 0.5em;
    margin: 0 0 1.5em;
    max-height: 55vh;
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
    transform: rotate(2deg);
    transition: all 0.35s;
  }

  .item:nth-of-type(4n + 2) {
    transform: rotate(-2deg);
    transition: all 0.35s;
  }

  .item:nth-of-type(4n + 3) {
    transform: rotate(2deg);
    transition: all 0.35s;
  }

  .item:nth-of-type(4n + 4) {
    transform: rotate(-2deg);
    transition: all 0.35s;
  }

  .item:nth-of-type(4n + 5) {
    transform: rotate(2deg);
    transition: all 0.35s;
  }

  .item:hover {
    transform: rotate(1deg);
  }

  .imgPreview {
    width: 100px;
    height: 100px;
  }

  .image-button-add {
    margin-top: 10px;
    height: 60px;
    border: 0;
    background: none;
  }

  .parent-div {
    width: auto;
    height: 160px;
    margin: auto;
  }

  .register-parent-div {
    display: inline-block;
    position: relative;
    overflow: hidden;
    top: -360px;
    border: 0;
    width: 100%;
  }
  .register-parent-div input[type="file"] {
    left: 0;
    top: 0;
    opacity: 0;
    border: 0;
    position: absolute;
    font-size: 20px;
  }

  .btn-upload {
    width: 45px;
    height: 45px;
    color: #000;
    background: none;
    background-image: url(${iconEdit});
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10px;
    font-size: 22px;
    font-weight: bold;
    border: 0;
  }

  .btn-register-upload {
    color: #000;
    padding: 10px 25px;
    border-radius: 10px;
    font-size: 22px;
    font-weight: bold;
    background: none;
  }

  .bt-upload {
    color: black;
    border: 5px solid;
    background-color: white;
  }

  .form__title {
    margin: 32px 0;
    text-align: center;
    color: #002952;
  }

  .form__img-input-container {
    position: relative;
    margin: auto;
  }

  /* this class is used to hide the file input */
  .visually-hidden {
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }

  /* Adding the focus and focus-within styles for accessibility */
  input.visually-hidden:focus + label,
  input.visually-hidden:focus-within + label {
    outline: 8px solid rgba(0, 0, 0, 0.4);
  }

  /* The file input is a labeled control, and since we hid it, 
we're going to use its associated label to trigger it */

  .no-background-image {
    background-image: none;
  }

  .opacity-mid {
    opacity: 0.4;
  }

  .opacity-mid:hover {
    opacity: 1;
  }

  .form-img__file-label:hover {
    background-color: rgba(245, 245, 231, 0.5);
  }

  .form-img__file-label > img {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0.7;
    transform: translate(-50%, -50%);
  }

  .form-img__file-label:hover > img {
    opacity: 1;
  }

  /* The image element is going to be positioned under the 
label element, since the label is a see through, we're going 
to be able to see the preview of the image. */
`;

export default FormsStyles;
