import secp256k1 from 'secp256k1';
import sodium from 'libsodium-wrappers';
import { hex2buf, b58cencode } from '@taquito/utils';

const SECRET_KEY_PREFIX = new Uint8Array([17, 162, 224, 201]);
const PUBLIC_KEY_HASH_PREFIX = new Uint8Array([6, 161, 161]);

interface WalletInfo {
  secretKey: string;
  address: string;
}

const publicKeyHash = async (key: any) => {
  await sodium.ready;
  return b58cencode(sodium.crypto_generichash(20, key), PUBLIC_KEY_HASH_PREFIX);
};

const getSecretKey = (key: any) => {
  return b58cencode(key, SECRET_KEY_PREFIX);
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
