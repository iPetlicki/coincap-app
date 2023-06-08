import React, {useEffect} from 'react';
import styles from './../Assets/Styles/upArrow.module.css'
import topArrow from '../Assets/Images/top-arrow.svg'

const UpArrow = () => {
    useEffect(() => {
        const myButton = document.getElementById("myBtn")
        window.onscroll = function() {scrollFunction()}
        function scrollFunction() {
            if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
                myButton.style.display = "block"
                myButton.style.display = "block"
            } else {
                myButton.style.display = "none"
            }
        }
    }, [])
    function topFunction() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    return (
        <div className={styles.arrow} id={'myBtn'} onClick={() => topFunction()}>
            <img src={topArrow} alt=''/>
        </div>
    );
};

export default UpArrow;