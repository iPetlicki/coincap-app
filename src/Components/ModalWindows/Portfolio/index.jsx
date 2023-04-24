import React from 'react';
import styles from "../../../Assets/Styles/portfolio.module.css";

const Portfolio = ({portfolioActive, setPortfolioActive}) => {
    const storage = Object.entries(localStorage);

    return (

            <div className={portfolioActive ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setPortfolioActive(false)}>
                <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storage.map((assets, id) =>
                                <tr key={assets[0]}>
                                    <td>{assets[0]}</td>
                                    <td>{assets[1]}</td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

    );
};

export default Portfolio;