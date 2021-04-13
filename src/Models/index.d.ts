export interface ILoader {
  id: string;
  message?: string;
  type: string;
  purposeId?: number
}

export interface IError {
  code?: string;
  message?: string;
  type: string
  purposeId?: number
}