import React, { Component } from 'react';
import Layout from './Layout/Layout';
import ContactList from './ContactList/ContactList'
import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import shortid from 'shortid';
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition } from "react-transition-group";
import "../stylesheets/animation.css";

export default class App extends Component {
  state = {
    filter: '',
    contacts: [],
    showContactFilter: false,
  }
 
  componentDidMount() {
    console.log('Загрузка страницы! Нужна анимация!');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    this.props.onChange(this.state);
  };
  
  formSubmitHandler = ({ name, number }) => {
    localStorage.getItem('contacts');
    this.contactId = shortid.generate();
    const contact = {
      id: this.contactId,
      name,
      number,
    };
    if (contact.name !== '') {
      if (this.state.contacts.find(contact => contact.name === name)) {
        toast.error('Contact is already exist');
        console.log('Контакт уже существует! Нужна анимация!');
        return;
      }
      else {
        this.setState(prevState => {
          return {

            contacts: [contact, ...prevState.contacts],
          }
        });
        console.log('Добавляем контакт! Нужна анимация!');
      };
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
   
  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    }); console.log('Контакт удален! Нужна анимация!');
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  toggleFilter = () => {
    this.setState(state => ({ showContactFilter: !state.showContactFilter }));
  };
  
  render() {
    const { contacts, filter, showContactFilter } = this.state;
    
    const visibleContacts = this.getVisibleContacts();

    return (
      <Layout >
        <ContactForm
          onSubmit={this.formSubmitHandler}
        />
        
        <ToastContainer position="top-right"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>

        {contacts.length > 0 &&
          <>
          <button type="button" onClick={this.toggleFilter}>
            {showContactFilter ? 'Hide' : "Show"} contacts filter
          </button>

          <CSSTransition
            in={showContactFilter}
            classNames='filter'
            timeout={500}
            unmountOnExit>
              <ContactFilter
              onChange={this.changeFilter}
              value={filter}>
              </ContactFilter>
          </CSSTransition>
          
          
            <ContactList
              onRemoveContact={this.removeContact}
              contacts={visibleContacts} />
                        
          </>}
        </Layout>
    )
  }
}