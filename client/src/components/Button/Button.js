import React from "react";
import styles from "./Button.module.css"

const Button = ({children, theme, change, style, ...buttonProps}) => {
    return (
        <button 
                className={[styles["CTA-Button"], styles[theme]].join(' ')} 
                style={style}
                onChange={change}
                {...buttonProps}
                >
            {children}
        </button>
    );
}

export default Button;