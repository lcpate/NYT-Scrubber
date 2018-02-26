import React from "react";

export const Header = ({ fluid, children }) =>
    <div className={`header${fluid ? "-fluid" : ""}`}>
        {children}
    </div>;