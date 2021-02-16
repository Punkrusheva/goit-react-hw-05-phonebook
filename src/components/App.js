import React, { Component } from 'react';
import Layout from './Layout/Layout';
import ContactList from './ContactList/ContactList'
import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import AlertError from "./AlertError/AlertError";
import shortid from 'shortid';
import { CSSTransition } from "react-transition-group";
import "../stylesheets/animation.css";

export default class App extends Component {
  state = {
    filter: '',
    contacts: [],
    alert: false,
    alertText: '',
  }
 
  componentDidMount() {
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
    const afertFalse = () => {
      this.setState(state => ({ alert: false }))};
    localStorage.getItem('contacts');
    this.contactId = shortid.generate();
    const contact = {
      id: this.contactId,
      name,
      number,
    };
    if (contact.name !== '') {
      if (this.state.contacts.find(contact => contact.name === name)) {
        this.setState(state => ({ alert: true, alertText: 'Contact is already exist'}));
        console.log(this.state.alert);
        setTimeout(afertFalse, 2500);       
      }
      else {
        this.setState(prevState => {
          return {

            contacts: [contact, ...prevState.contacts],
          }
        });
      };
    } else {
      this.setState(state => ({ alert: true, alertText: 'Contact details empty'}));
        console.log(this.state.alert);
        setTimeout(afertFalse, 2500); }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
   
  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, filter, alert, alertText} = this.state;
    
    const visibleContacts = this.getVisibleContacts();

    return (
      <Layout >
        <ContactForm
          onSubmit={this.formSubmitHandler}
        />
                
        <CSSTransition in={alert}
          classNames="alert"
          timeout={250}
          unmountOnExit>
          {stage => {
            console.log(stage); console.log(alert);
            return (
              <CSSTransition
                in={stage === 'entered'}
                classNames="alert"
                timeout={250}  >
                <AlertError text={alertText}/>
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