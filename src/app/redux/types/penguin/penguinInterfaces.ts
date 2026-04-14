export interface IPenguin {
  id: string;
  name: string;
  category: string;
  likes: number;
  likers: string[];
  favs: string[];
  image: string | File;
  imageBackup: string;
  imageResized: string;
  // Blob | MediaSource | void;
  // imageOpenai: Blob | MediaSource | any;
  description: string;
}

export interface IDetail {
  penguin: {
    id: string;
    name: string;
    category: string;
    likes: number;
    likers: string[];
    favs: string[];
    image: string;
    imageBackup: string;
    description: string;
  };
}

export interface IRegisterForm {
  id: string;
  name: string;
  category: string;
  favs: string[];
  likers: string[];
  likes: number;
  image: string | File;
  imageBackup: string;
  description: string;
}
