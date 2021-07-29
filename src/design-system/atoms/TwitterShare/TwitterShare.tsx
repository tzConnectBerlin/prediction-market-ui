import React from 'react';
import Button from '../Button';

export const TwitterShare = () => {
  return (
    <div>
      <a
        className="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=I%20did%20something!"
        data-size="large"
      >
        Tweet
      </a>
    </div>
  );
};
