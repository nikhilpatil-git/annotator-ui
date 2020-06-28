import { Encrypt, Decrypt } from "./Crypto";

export const SaveDataInLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, Encrypt(data));
};

export const GetDataFromLocalStorage = (key: string): string | null => {
  let data = localStorage.getItem(key);
  return data && Decrypt(data).toString();
};

export const ClearLocalStorageByKey = (key: string) => {
  localStorage.removeItem(key);
};

export const ClearLocalStorage = () => {
  localStorage.clear();
};
