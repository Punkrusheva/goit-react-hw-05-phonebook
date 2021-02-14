import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import ContactListItem from "../ContactListItem/ContactListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../stylesheets/animation.css";

function ContactList({ contacts, onRemoveContact }) {
  return (
    <TransitionGroup component="ul" className={styles.contactList}>
      {contacts.map(({ name, id, number }) => (
        <CSSTransition key={id} timeout={250} classNames="item">
          <ContactListItem name={name} id={id} number={number} onClick={() => onRemoveContact(id)}>
          </ContactListItem>
          </CSSTransition>
        ))
      }
      </TransitionGroup>
  );
}

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string
  }
  ))
};

export default ContactList;
