import React from "react";

const Button = ({children, theme, change, style, ...buttonProps}) => {
    require('./Button.css')
    return (
        <button 
                className={theme + " CTA-Button"} 
                style={style}
                onChange={change}
                {...buttonProps}
                >
            {children}
        </button>
    );
}

export default Button;