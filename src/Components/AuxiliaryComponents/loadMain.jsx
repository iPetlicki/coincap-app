import React from 'react';
import loading from "../../Assets/Images/loading_main.gif";

const LoadMain = () => {
    return (
        <div>
            <img style={{display:'block', margin: '180px auto'}} src={loading} alt=''/>
        </div>
    );
};

export default LoadMain;