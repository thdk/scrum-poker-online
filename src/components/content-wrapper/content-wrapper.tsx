import * as React from 'react';
import { HTMLProps } from 'react';

import './content-wrapper.css';
import classNames from 'classnames';

export const ContentWrapper = (props: HTMLProps<HTMLDivElement>) => {
  const { className, children, ...restProps } = props;

  const styles = classNames(className, 'content-wrapper');

  return (
    <div className={styles} {...restProps}>
      {children}
    </div>
  );
};
