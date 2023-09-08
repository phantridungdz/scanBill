export interface DragTextArrayProps {
  visible: boolean;
  fontSize: number;
  fontFamily: string;
  color: string;
  key: number;
  text: string;
}

export interface ImageInterface {
  path: string;
  width: number;
  height: number;
  visible?: boolean;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  key?: number;
  text?: string;
}

export interface NotificationType {
  title: string;
  handleOnClick: (setListImage?: any) => void;
}

export enum HandType {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}
