import { IPenguin } from "../app/redux/types/penguin/penguinInterfaces";

export const mockPenguin: IPenguin = {
  _id: "idPenguin",
  id: "idPenguin",
  name: "penguin1",
  category: "category1",
  likes: 0,
  likers: ["id", "id2"],
  favs: ["id", "id2"],
  image: "image1",
  imageBackup: "sadsadasd.jpg",
  imageResized: "ImageBackup.jpg",
  description: "description1",
};

export const mockEmptyDataPenguin: IPenguin = {
  _id: "idPenguin",
  id: "",
  name: "",
  category: "",
  likes: 0,
  likers: [""],
  favs: [""],
  image: "",
  imageBackup: "",
  imageResized: "",
  description: "",
};

export const mockPenguinsEmpty: IPenguin[] = [
  {
    _id: "idPenguin",
    id: "",
    name: "",
    category: "",
    likes: 0,
    likers: [""],
    favs: [""],
    image: "",
    imageBackup: "",
    imageResized: "",
    description: "",
  },
];
export const mockPenguins: IPenguin[] = [
  {
    _id: "idPenguin",
    id: "id",
    name: "penguin1",
    category: "category1",
    likes: 0,
    likers: ["id", "id2"],
    favs: ["id", "id2"],
    image: "image1",
    imageBackup: "sadsadasd.jpg",
    imageResized: "ImageBackup.jpg",
    description: "description1",
  },
  {
    _id: "idPenguin",
    id: "2",
    name: "Penguin2",
    category: "Penguin",
    likes: 1,
    likers: ["penguin1"],
    favs: ["penguin1"],
    image: "image.jpg",
    imageBackup: "ImageBackup.jpg",
    imageResized: "ImageBackup.jpg",
    description: "Cal is a penguin",
  },
];
