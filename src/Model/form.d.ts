import { typeOfId } from "Config";

export interface IField {
  title: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  options?: IFieldOption[];
  readonly?: boolean;
}

export interface IFieldOption {
  value: string;
  label: string;
}

export type IFieldValues = {
  [propName: string]: string | undefined;
};

export interface IFile {
  id: typeOfId;
  size: number;
  name: string;
  type: string;
  uri: string;
  createdAt: string;
}

export interface IError {
  [ket: string]: string;
}

export type IAttachment = File | IFile;
