import { IPenguin } from "../app/redux/types/penguin/penguinInterfaces";

export const mockPenguin: IPenguin = {
  id: "idPenguin1",
  name: "penguin1",
  category: "category1",
  likes: 0,
  likers: ["idUser1", "id2"],
  favs: ["idUser1", "id2"],
  image: "image1",
  imageBackup: "sadsadasd.jpg",
  imageResized: "ImageBackup.jpg",
  // imageOpenai: "",
  description: "description1",
};

export const mockEmptyDataPenguin: IPenguin = {
  id: "",
  name: "",
  category: "",
  likes: 0,
  likers: [""],
  favs: [""],
  image: "",
  imageBackup: "",
  imageResized: "",
  // imageOpenai: "",
  description: "",
};

export const mockPenguinsEmpty: IPenguin[] = [
  {
    id: "",
    name: "",
    category: "",
    likes: 0,
    likers: [""],
    favs: [""],
    image: "",
    imageBackup: "",
    imageResized: "",
    // imageOpenai: "",
    description: "",
  },
];
export const mockPenguins: IPenguin[] = [
  {
    id: "idPenguin1",
    name: "penguin1",
    category: "category1",
    likes: 0,
    likers: ["idUser1", "id2"],
    favs: ["idUser1", "id2"],
    image: "image1",
    imageBackup: "sadsadasd.jpg",
    imageResized: "ImageBackup.jpg",
    // imageOpenai: "",
    description: "description1",
  },
  {
    id: "idPenguin2",
    name: "Penguin2",
    category: "Penguin",
    likes: 1,
    likers: ["idUser1"],
    favs: ["idUser1"],
    image: "image.jpg",
    imageBackup: "ImageBackup.jpg",
    imageResized: "ImageBackup.jpg",
    // imageOpenai: "",
    description: "Cal is a penguin",
  },
];
