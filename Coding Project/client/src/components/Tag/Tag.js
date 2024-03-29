import React from "react";

const Tag = ({children, style}) => {
    require('./Tag.css')
    return (
        <div 
            className="tag" 
            style = {style}>
                
            {children}
        </div>
    );
}

export default Tag;