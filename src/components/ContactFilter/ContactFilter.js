import React from 'react';
import styles from './ContactFilter.module.css';

const ContactFilter = ({ value, onChange }) => (
    <>
        <label
            className={styles.label}>
          <input
                type='text'
                value={value}
                onChange={onChange}
                name='filter'
                className={styles.input}
                placeholder='Enter contact name'
            />
        </label>
    </>
);

export default ContactFilter;