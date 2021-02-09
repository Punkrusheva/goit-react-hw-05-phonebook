import React, {Component} from 'react';
import shortid from 'shortid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
 
  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
   
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
    
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <h2>Phonebook</h2>
      <form className={styles.box} onSubmit={this.handleSubmit} >
        <label htmlFor={this.nameInputId} className={styles.name}>
          Name
          <input
            type='text'
            name='name'
            id={this.nameInputId}
            value={this.state.name}
            onChange={this.handleChange}
            className={styles.input}
            placeholder='Enter contact name' />
        </label>
        <label htmlFor={this.numberInputId} className={styles.number}>
          Number
          <input
            type='text'
            name='number'
            id={this.numberInputId}
            value={this.state.number}
            onChange={this.handleChange}
            className={styles.input}
            placeholder='Enter contact number' />
        </label>
        <button type='submit' className={styles.button}>
          Add contact
            </button>
        </form>
        </>
    );
  }
}

export default ContactForm;