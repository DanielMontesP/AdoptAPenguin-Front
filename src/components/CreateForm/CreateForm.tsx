import { ChangeEvent, FormEvent, useState } from "react";
import { wrongAction } from "../Modals/Modals";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  createFavThunk,
  editPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { useNavigate } from "react-router-dom";
import { blankFormData, cleanArray, resizeFile } from "../../utils/utils";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
interface Props {
  penguin: IPenguin;
}

let modFields = [""];
let imageAdded = false;

const CreateForm = ({ penguin }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isCreate = document.location.href.includes("create");

  const { user } = useAppSelector((state) => state);
  const { headerLastTitle } = useAppSelector((state) => state.ui);

  const [formData, setFormData] = useState(blankFormData);

  const processCreate = (type: string) => {
    const newFormData = new FormData();
    const isNew = type === "New";

    newFormData.append("name", formData.name);
    newFormData.append("category", formData.category);
    newFormData.append("likes", JSON.stringify(1));
    newFormData.append(
      "likers",
      isNew ? user.id : JSON.stringify(formData.likers)
    );
    newFormData.append("favs", isNew ? user.id : JSON.stringify(formData.favs));
    newFormData.append("image", formData.image);
    newFormData.append("imageBackup", formData.imageBackup);
    newFormData.append("description", formData.description);

    dispatch(createFavThunk(newFormData));
  };

  const processEdit = () => {
    modFields = cleanArray(modFields);
    const newFormData = new FormData();

    if (imageAdded) {
      newFormData.append("_id", formData.id);
      newFormData.append("name", formData.name);
      newFormData.append("category", formData.category);
      newFormData.append("image", formData.image);
      newFormData.append("imageBackup", formData.imageBackup);
      newFormData.append("imageResized", formData.imageResized);
      newFormData.append("description", formData.description);
    }
    dispatch(
      editPenguinThunk(
        imageAdded ? newFormData : formData,
        "Update fields: " + modFields.join(", ")
      )
    );
  };

  const [{ alt, src }, setImg] = useState({
    src: formData.image,
    alt: "Add photo",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.preventDefault();

    setFormData({
      ...(formData.id ||
      formData.image ||
      formData.name ||
      formData.category ||
      formData.description
        ? formData
        : penguin),
      [event.target.id]: event.target.value,
      id: penguin.id,
    });

    modFields.push(event.target.id);
  };

  const handleImg = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files?.[0];
      const image = await resizeFile(file);

      setFormData({
        ...(formData.id || image ? formData : penguin),
        image: event.target.files?.[0],
        imageBackup: "",
        imageResized: image,
      });

      setImg({
        src: URL.createObjectURL(event.target.files[0]),
        alt: event.target.files[0].name,
      });

      modFields.push(event.target.id);
      imageAdded = true;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    try {
      if (isCreate) {
        processCreate("New");
      } else {
        processEdit();
      }

      setFormData(blankFormData);

      let navigateTo = "";

      switch (headerLastTitle) {
        case "Favourites":
          navigateTo = "/penguins/favs";
          break;
        case "Home":
          navigateTo = "/penguins";
          break;
        case "Likes":
          navigateTo = "/penguins/likes";
          break;
        default:
          navigateTo = "/penguins";
      }

      navigate(navigateTo);
    } catch (error) {
      wrongAction("Error:" + error);
    }
  };

  const HidderBackground = imageAdded ? " opacity-mid" : "";

  const classImage =
    penguin.imageBackup || src.toString()
      ? "form-img__img-preview-Hidden"
      : "form-img__img-preview";

  return (
    <div className="container">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form-create"
      >
        <div className="image-container">
          <div className="form__img-input-container">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="photo"
              className="visually-hidden"
              onChange={handleImg}
              placeholder="image-input"
            />
            <img
              src={src.toString() || penguin.imageBackup.toString()}
              alt={alt}
              className={`${classImage}`}
            />
            <label
              htmlFor="photo"
              className={`form-img__file-label${HidderBackground}`}
            />
          </div>
        </div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name || penguin.name}
          autoComplete="off"
          onChange={handleInputChange}
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          placeholder="Category"
          value={formData.category || penguin.category}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <label htmlFor="likes">Likes</label>
        <input
          id="likes"
          type="number"
          placeholder="Likes"
          value={formData.likes || penguin.likes}
          autoComplete="off"
          className="input-likes"
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          value={formData.description || penguin.description}
          autoComplete="off"
          className="input-description"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bt-save"
          placeholder="bt-save"
          value="Save"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
