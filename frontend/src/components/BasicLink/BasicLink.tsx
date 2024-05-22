import React from 'react';
import styles from './BasicLink.module.css'

type LinkProps = {
  newPath: string;
  text: string;
  className: string;
};

const Link: React.FC<LinkProps> = ({ newPath, text, className }) => {
  return (
    <a href={newPath} className={`${styles[className]}`}>
      {text}
    </a>
  );
};

export default Link;