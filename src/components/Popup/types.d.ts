export interface PopupProps {
  hand: string;
  mode: boolean;
  closePopup: () => void;
  openPopup: () => void;
  navigateMain: (isHorizontal: boolean) => void;
}