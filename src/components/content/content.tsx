import * as React from "react";
import { HTMLProps } from "react";

import "./content.css";
import classNames from "classnames";

export const Content = (props: HTMLProps<HTMLDivElement>) => {
    const { className, ...restProps } = props;

    const styles = classNames(className, "content");

    return <div className={styles} {...restProps}>
        {props.children}
    </div>;
}