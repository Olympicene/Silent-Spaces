import React from "react";

const Button = ({children, theme, change, style}) => {
    require('./Button.css')
    return (
        <button 
                className={theme + " CTA-Button"} 
                style={style}
                onChange={change}
                >
            {children}
        </button>
    );
}

export default Button;