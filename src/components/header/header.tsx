import * as React from "react";
import classNames from "classnames";

import "./header.css";

export type HeaderProps = {
    editMode: boolean;
    onTabClick: (tab: "settings" | "game") => void;
};

export const Header = (props: HeaderProps) => {
    const { editMode, onTabClick } = props;

    const createClassnames = (isSettingsTab: boolean) => classNames(
        "header-tab",
        { active: isSettingsTab === editMode },
    );

    return (
        <div className="header">
            <div className={createClassnames(false)}
                onClick={() => onTabClick("game")}>
                GAME
            </div>
            <div
                className={createClassnames(true)}
                onClick={() => onTabClick("settings")}
            >
                SETTINGS
            </div>
        </div>
    );
};
