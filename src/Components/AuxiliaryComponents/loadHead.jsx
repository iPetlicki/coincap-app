import React from 'react';
import loading from "../../Assets/Images/loading_head.gif";

const LoadHead = () => {
    return (
            <div>
                <img style={{display:'block', margin: '0 auto'}} src={loading} alt=''/>
            </div>
    )
}

export default LoadHead