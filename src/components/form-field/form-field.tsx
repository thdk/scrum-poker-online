import * as React from 'react';
import classNames from 'classnames';

import './form-field.css';
import { PropsWithChildren, ReactNode } from 'react';

export type FormFieldProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
};

export const FormField = (
  props: FormFieldProps | PropsWithChildren<{ component: ReactNode; label: string; type: string }>,
) => {
  const {
    component,
    label,
    type,
    ...inputProps
  } = {
    component: undefined,
    ...props,
  };

  const styles = classNames('form-field', `form-field-${type}`);
  return (
    <div className={styles}>
      {label
        ? (
          <div className="form-field-label">
            {label}
          </div>
        )
        : null}
      <div className="form-field-input">
        {component || <input {...inputProps} type={type} />}
      </div>
    </div>
  );
};
