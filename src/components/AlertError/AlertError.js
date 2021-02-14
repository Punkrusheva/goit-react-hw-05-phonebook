import React from 'react';
import '../../stylesheets/animation.css';
import styles from "./AlertError.module.css";

const AlertError = () => (
    <>
        <div className={styles.alert}>
            Contact is already exist
        </div>
    </>
);

export default AlertError;