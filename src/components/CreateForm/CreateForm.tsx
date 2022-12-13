import { ChangeEvent, FormEvent, useState } from "react";
import { wrongAction } from "../Modals/Modals";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  createFavThunk,
  editPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { useNavigate } from "react-router-dom";
import {
  cleanArray,
  resizeFile,
} from "../../functions/sysHandlers/sysHandlers";
import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import {
  blankFormData,
  newPenguinFormData,
} from "../../app/redux/initializers/iniPenguins";

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
  const isEdit = headerTitle.includes("Edit");

  const initialFormData = () => {
    if (isCreate) {
      return newPenguinFormData(user.id);
    } else if (isEdit) {
      return penguin;
    } else {
      return blankFormData;
    }
  };

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

    setFormData({ ...penguin, id: penguin.id });
    const newFormData = new FormData();

    newFormData.append("id", penguin.id);
    newFormData.append("name", formData.name || penguin.name);
    newFormData.append("category", formData.category || penguin.category);
    newFormData.append("likes", JSON.stringify(penguin.likes));
    newFormData.append("likers", JSON.stringify(penguin.likers));
    newFormData.append("favs", JSON.stringify(penguin.favs));
    newFormData.append("image", formData.image);
    newFormData.append("imageBackup", formData.imageBackup);
    newFormData.append("imageResized", formData.imageResized);
    newFormData.append(
      "description",
      formData?.description || penguin.description
    );

    dispatch(
      editPenguinThunk(newFormData, "Update fields: " + modFields.join(", "))
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

    isEdit
      ? setFormData({
          ...penguin,
          [event.target.id]: event.target.value,
          id: penguin.id,
        })
      : setFormData({
          ...formData,
          [event.target.id]: event.target.value,
        });

    modFields.push(event.target.id);
  };

  const handleImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setImageAdded(true);

    if (file) {
      const imageResized = await resizeFile(file);

      setFormData({
        ...(isCreate || isEdit ? formData : penguin),
        image: file,
        imageResized: imageResized,
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
    <div className="create-container">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form-create"
        title="form-create"
      >
        <div className="image-container">
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
