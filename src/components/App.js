import React, { Component } from 'react';
import Layout from './Layout/Layout';
import ContactList from './ContactList/ContactList'
import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import AlertError from "./AlertError/AlertError";
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
    alert: false,
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
    //this.setState(state => ({ alert: false}));
    console.log(this.state.alert);
    localStorage.getItem('contacts');
    this.contactId = shortid.generate();
    const contact = {
      id: this.contactId,
      name,
      number,
    };
    if (contact.name !== '') {
      if (this.state.contacts.find(contact => contact.name === name)) {
        console.log('Контакт уже существует! Нужна анимация!');
        this.setState(state => ({ alert: true}));
        console.log(this.state.alert);
       // this.setState(state => ({ showContactFilter: !state.showContactFilter }));
       // toast.error('Contact is already exist');
        return;
      }
      else {
        this.setState(prevState => {
          return {

            contacts: [contact, ...prevState.contacts],
          }
        });
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
    const { contacts, filter, showContactFilter, alert } = this.state;
    
    const visibleContacts = this.getVisibleContacts();

    return (
      <Layout >
        <ContactForm
          onSubmit={this.formSubmitHandler}
        />
        
        <ToastContainer position="top-right"
          autoClose={2500}
          hideProgressBar={false} />
        
        <CSSTransition in={alert}
          classNames="alert"
          timeout={2500}
          unmountOnExit>
          {state => {
            return (
              <CSSTransition in={alert} timeout={2500} unmountOnExit>
                <AlertError />
              </CSSTransition>)
          }}
        </CSSTransition>

        <CSSTransition
            in={contacts.length > 0}
            classNames='filter'
            timeout={2500}
            unmountOnExit>
              <ContactFilter
              onChange={this.changeFilter}
              value={filter}>
              </ContactFilter>
        </CSSTransition>

        {contacts.length > 0 &&
            <ContactList
              onRemoveContact={this.removeContact}
              contacts={visibleContacts} />     
        }
        </Layout>
    )
  }
}