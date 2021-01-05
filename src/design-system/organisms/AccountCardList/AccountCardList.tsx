import React from 'react';
import { AccountCard, AccountCardProps } from '../../molecules/AccountCard';

export interface AccountCardListProps {
  /**
   * List of account cards to render
   */
  list: AccountCardProps[];
}

export const AccountCardList: React.FC<AccountCardListProps> = ({ list }) => {
  return (
    <>
      {list.map((item) => (
        <AccountCard key={item.address} {...item} />
      ))}
    </>
  );
};
