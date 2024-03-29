import React from "react";
import "./Button.css"

const Button = ({children, theme, change, style}) => {
    return (
        <button 
                className={theme} 
                style={style}
                onChange={change}
                >
            {children}
        </button>
    );
}

export default Button;