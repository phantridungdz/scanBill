import { ImageInterface } from "../../screens/types";

export interface MenuProps {
  hand: string;
  mode: boolean;
  isOpen: boolean;
  cropImage: () => void;
  openGallery: () => void;
  handleOpenCloseMenu: () => void;
  saveImage: () => void;
  listImage: ImageInterface[];
  navigation?: any;
  setIsOpen?: any;
}