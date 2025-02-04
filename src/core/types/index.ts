export interface ValidationType {
  field: string;
  constraint: string[] | string;
}

export interface SuccessResponse<T> {
  data?: T;
}

export interface ErrorResponse {
  error?: {
    name: string;
    message: string;
    validationErrors?: ValidationType[];
    statusCode: number;
  };
}

export interface BaseListFilter {
  page: string;
  limit: string;
  search: string;
}

export type AllInterfaceString<T> = {
  [K in keyof T]: string;
};
