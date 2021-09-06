import * as React from 'react';
import { Identicon, IdenticonProps } from '../../atoms/Identicon';

export interface CardAvatarProps {
  title?: string;
  /**
   * market ipfs hash
   */
  hash?: string;
  /**
   * Icon url to use
   */
  iconURL?: string;

  iconSize?: IdenticonProps['iconSize'];

  iconType?: IdenticonProps['type'];
}

/**
 * TODO: Refactor identicon or move to a separate folder
 *
 */
export const CardAvatar: React.FC<CardAvatarProps> = ({
  title,
  hash,
  iconURL,
  iconSize,
  iconType,
}) => {
  return (
    <Identicon
      seed={hash ?? title ?? ''}
      url={iconURL}
      iconSize={iconSize}
      type={iconType}
      alt={hash ?? title ?? 'market-card'}
    />
  );
};
