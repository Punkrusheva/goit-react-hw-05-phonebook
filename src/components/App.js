import React, { Component } from 'react';
import Layout from './Layout/Layout';
import ContactList from './ContactList/ContactList'
import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import shortid from 'shortid';

export default class App extends Component {
  state = {
    filter: '',
    contacts: [
     // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
     // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
     // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
     // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  }
 
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
      if (this.state.contacts.find(contact => contact.name === name))
      { alert(`${contact.name} is already in contacts`); }
      else {
        console.log(this.state.contacts);
        this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, contact],
          }
        });
      };
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
}

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
}

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
  }
  
  render() {
    const { contacts, filter } = this.state;
    
    const visibleContacts = this.getVisibleContacts();


    return (
        <Layout >
          <ContactForm
            onSubmit={this.formSubmitHandler}
         />

          {contacts.length > 0 &&
            <>
            <ContactFilter
              onChange={this.changeFilter}
              value={filter}>
            </ContactFilter>  
          
            <ContactList
              onRemoveContact={this.removeContact}
              contacts={visibleContacts} />
            </>}
        </Layout>
    )
  }
}