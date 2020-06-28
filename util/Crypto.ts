import SimpleCrypto, { PlainData } from "simple-crypto-js";

export const Encrypt = (data: string): string => {
  let simpleCrypto = new SimpleCrypto("some-unique-key");
  return simpleCrypto.encrypt(data);
};

export const Decrypt = (data: string): PlainData => {
  let simpleCrypto = new SimpleCrypto("some-unique-key");
  let dec = simpleCrypto.decrypt(data);
  return dec;
};
