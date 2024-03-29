import React from "react";
import './InputBox.css';

const InputBox = ({features, change, style}) => {
    return (
        <div className='standard-input-box'>
            <input id= {features.id}
                    name= {features.name}
                    type= {features.text}
                    placeholder= {features.placeholder}
                    onChange={change}
                    style={style}/>
        </div>
    );
}

export default InputBox;