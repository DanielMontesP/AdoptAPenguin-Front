import { ChangeEvent, FormEvent, useState } from "react";
import { wrongAction } from "../Modals/Modals";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  createFavThunk,
  editPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { useNavigate } from "react-router-dom";
import { cleanArray } from "../../functions/sysHandlers/sysHandlers";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import { newPenguinFormData } from "../../app/redux/initializers/iniPenguins";
interface Props {
  penguin: IPenguin;
}

let modFields = [""];

const CreateForm = ({ penguin }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state);
  const { headerTitle } = useAppSelector((state) => state.ui);

  const isCreate = headerTitle.includes("New");

  const initialFormData = isCreate ? newPenguinFormData(user.id) : penguin;

  const [formData, setFormData] = useState(initialFormData);
  const [imageAdded, setImageAdded] = useState(false);

  const processCreate = (type: string) => {
    const newFormData = new FormData();

    newFormData.append("name", formData.name);
    newFormData.append("category", formData.category);
    newFormData.append("likes", JSON.stringify(1));
    newFormData.append("likers", user.id);
    newFormData.append("favs", user.id);
    newFormData.append("image", formData.image);
    newFormData.append("imageBackup", formData.imageBackup);
    newFormData.append("imageResized", formData.imageResized);
    newFormData.append("description", formData.description);

    dispatch(createFavThunk(newFormData));
  };

  const processEdit = (imageAdded: boolean) => {
    modFields = cleanArray(modFields);

    let newFormData = new FormData();

    newFormData.append("id", formData.id);
    newFormData.append("name", formData.name);
    newFormData.append("category", formData.category);
    newFormData.append("description", formData?.description);
    newFormData.append("image", formData.image);
    newFormData.append("imageBackup", formData.imageBackup);
    newFormData.append("imageResized", formData.imageResized);

    dispatch(
      editPenguinThunk(
        imageAdded ? newFormData : formData,
        formData.id || penguin.id,
        "Update fields: " + modFields.join(", ")
      )
    );
  };

  const [{ alt, src }, setImg] = useState({
    src: formData.imageBackup || formData.image || penguin.imageBackup,
    alt: "Add photo",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.preventDefault();

    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });

    modFields.push(event.target.id);
  };

  const handleImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setImageAdded(true);

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      setImg({
        src: URL.createObjectURL(file),
        alt: file.name,
      });

      modFields.push(event.target.id);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    try {
      if (isCreate) {
        processCreate("New");

        navigate(`/penguins/favs`);
      } else {
        processEdit(imageAdded);

        navigate(`/detail/${formData.id || penguin.id}`);
      }
    } catch (error) {
      wrongAction("Error:" + error);
    }
  };

  const pathImage = src.toString() || penguin.imageBackup.toString();

  const penguinImage = pathImage;

  const HidderBackground = formData.image !== "" ? " opacity-mid" : "";

  const classImage =
    penguin.imageBackup || src.toString()
      ? "form-img__img-preview-Hidden"
      : "form-img__img-preview";

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className="form-create"
      title="form-create"
    >
      <div className="form-image">
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          id="photo"
          className="visually-hidden"
          onChange={handleImg}
          placeholder="image-input"
        />
        <label
          htmlFor="photo"
          className={`form-img__file-label${HidderBackground}`}
        >
          <img src={penguinImage} alt={alt} className={`${classImage}`} />
        </label>
      </div>
      <div className="form-fields">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name || penguin.name}
          autoComplete="off"
          onChange={handleInputChange}
          className="form-input"
        />

        <label className="form-label" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          type="text"
          placeholder="Category"
          value={formData.category || penguin.category}
          autoComplete="off"
          onChange={handleInputChange}
          className="form-input"
        />

        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          value={formData.description || penguin.description}
          autoComplete="off"
          className="form-text-description"
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="form-bt-save"
          placeholder="bt-save"
          value="Save"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
