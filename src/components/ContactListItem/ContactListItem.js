import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { CSSTransition } from "react-transition-group";

function ContactListItem({ name, id, number, onClick}) {
  return (<>
          <li key={id} className={styles.item}>
            <p className={styles.name}>{name}</p>
            <p className={styles.number}>{number}</p>
            
      <CSSTransition 
        in={true}
        appear={true}
              timeout={1000}
              classNames="button"
              unmountOnExit>
            <button
              type='button'
              onClick={onClick}
              className={styles.button}>
              <AiOutlineClose fill="white" />
        </button>
        </CSSTransition>
          </li>
        
    </>
  );
};/*{state => {
        console.log(state);
        return (
        */
        

ContactListItem.defaultProps = {
  number: '',
  name: '',
  id: ''
};

ContactListItem.propTypes = {
  number: PropTypes.string,
  name: PropTypes.string,
    id: PropTypes.string
};

export default ContactListItem;