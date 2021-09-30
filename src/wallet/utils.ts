import secp256k1 from 'secp256k1';
import sodium from 'libsodium-wrappers';
import { hex2buf, b58cencode } from '@taquito/utils';

interface WalletInfo {
  secretKey: string;
  address: string;
}

const publicKeyHash = async (key: any) => {
  await sodium.ready;
  return b58cencode(sodium.crypto_generichash(20, key), new Uint8Array([6, 161, 161]));
};

const getSecretKey = (key: any) => {
  return b58cencode(key, new Uint8Array([17, 162, 224, 201]));
};

export const getAddressAndSecretKey = async (key: any): Promise<WalletInfo> => {
  const hexKey = hex2buf(key);
  const publicKey = secp256k1.publicKeyCreate(hexKey);
  const secretKey = getSecretKey(hexKey);
  const address = await publicKeyHash(publicKey);
  return {
    secretKey,
    address,
  };
};
