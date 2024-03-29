import React from "react";

const Amenity = ({children, style}) => {
    require('./Amenity.css')
    return (
        <div 
            className="amenity" 
            style = {style}>
                
            {children}
        </div>
    );
}

export default Amenity;