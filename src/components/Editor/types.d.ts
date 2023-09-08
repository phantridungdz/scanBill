export interface EditorTypes {
  editTextsArray: (
    prop: string,
    value: number | boolean | string | any,
  ) => void;
  editFontSize: (value: number) => void;
  addNewText: () => void;
}
