import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

import { AiOutlineClose } from 'react-icons/ai';

function ContactList({ contacts, onRemoveContact }) {
  return (
    <ul className={styles.contactList}>
      {
        contacts.map(({ name, id, number}) => (
          <li key={id} className={styles.item}>
            <p className={styles.name}>{name}</p>
            <p className={styles.number}>{number}</p>
            <button
              type='button'
              onClick={() => onRemoveContact(id)}
              className={styles.button}>
              <AiOutlineClose fill="white"/>
            </button>
            <section className={styles.actions}>
            </section>
          </li>
        ))
      }
    </ul>
  );
}

ContactList.defaultProps = {
  number: '',
  name: '',
  id: ''
};

ContactList.propTypes = {
  number: PropTypes.string,
  name: PropTypes.string,
  id : PropTypes.string
};

export default ContactList;