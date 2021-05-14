import { NodeSchema } from '../interfaces/bcd';

/**
 * Get big_map ptr
 * @param name name of the big_map
 * @param storage Contract storage
 */
export const getBigMapPtrByName = (name: string, storage: NodeSchema): number => {
  return storage.children?.filter((o) => o.name === name && o.type === 'big_map')[0]
    .value as unknown as number;
};
