import React, {useEffect, useState} from 'react';
import styles from '../../Assets/Styles/upArrow.module.css'
import topArrow from '../../Assets/Images/top-arrow.svg'

const UpArrow = () => {
   const [topButton, setTopButton] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setTopButton(true)
            } else  {
                setTopButton(false)
            }
        })
    }, [])
    const scrollUp = () => {
       window.scrollTo({
           top: 0,
           behavior: "smooth",

       })
    }

    return (
        <>
            {topButton && (
                <div className={styles.arrow} onClick={() => scrollUp()}>
                    <img src={topArrow} alt=''/>
                </div>
            )}
        </>
    )
}

export default UpArrow;