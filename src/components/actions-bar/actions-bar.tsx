import * as React from "react";

import "./actions-bar.css";

export interface IAction {
    action: () => void;
    label: string;
}
export type ActionsBarProps = {
    actions: IAction[];
}

export const ActionsBar = (props: ActionsBarProps) => {
    const { actions } = props;

    return <div className="actions-bar">
        {actions
            .map((a, i) =>
                <input
                    key={i}
                    type="button"
                    value={a.label}
                    onClick={a.action}
                />)
        }
    </div>
}
