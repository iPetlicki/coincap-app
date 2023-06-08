import React from 'react';
import sad from '../../Assets/Images/sad-error.svg'

const NotFoundPge = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10% auto'}}>
            <h1>Error</h1>
            <img src={sad} alt='' width='200px' height='200px'/>
            <h4>The Page you are looking for doesnt exist or an other error occurred</h4>
        </div>
    )
}

export default NotFoundPge