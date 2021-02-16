import React from 'react';
import '../../stylesheets/animation.css';
import styles from "./AlertError.module.css";

const AlertError = ({text}) => (
    <>
        <div className={styles.alert}>
            {text}
        </div>
    </>
);

export default AlertError;