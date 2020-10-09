import * as React from "react";
import classNames from "classnames";

import "./form-field.css";

export type FormFieldProps = React.HTMLProps<HTMLInputElement> & {
    label?: string;
}

export const FormField = (props: FormFieldProps) => {
    const { label, ...inputProps } = props;

    const styles = classNames("form-field", "form-field-" + props.type);
    return <div className={styles}>
        {label
            ? <div className="form-field-label">
                {label}
            </div>
            : null
        }
        <div className="form-field-input">
            <input {...inputProps}></input>
        </div>
    </div>
};
