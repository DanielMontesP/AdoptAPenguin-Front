import { IPenguin } from "../types/penguin/penguinInterfaces";

export const newPenguinFormData = (idUser: string): IPenguin => {
  const formData = {
    id: "",
    name: "",
    category: "",
    likes: 1,
    likers: [`${idUser}`],
    favs: [`${idUser}`],
    description: "",
    image: "",
    imageBackup: "",
    imageResized: "",
  };
  return formData;
};

export const blankFormData: IPenguin = {
  id: "",
  name: "",
  category: "",
  likes: 1,
  likers: [],
  favs: [],
  description: "",
  image: "",
  imageBackup: "",
  imageResized: "",
};
