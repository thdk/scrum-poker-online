import * as React from 'react';
import { HTMLProps } from 'react';

import './content.css';
import classNames from 'classnames';

export const Content = (props: HTMLProps<HTMLDivElement>) => {
  const { className, children, ...restProps } = props;

  const styles = classNames(className, 'content');

  return (
    <div className={styles} {...restProps}>
      {children}
    </div>
  );
};
