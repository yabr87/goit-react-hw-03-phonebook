import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  alertError = userName => {
    alert(`${userName} is already in contacts!`);
  };

  checkNameInPhonebook = userName => {
    const { contacts } = this.state;
    return contacts.some(({ name }) => name.toLowerCase() === userName);
  };

  addContacts = (userName, userTel) => {
    if (this.checkNameInPhonebook(userName)) {
      this.alertError(userName);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [
          {
            id: nanoid(4),
            name: userName,
            number: userTel,
          },
          ...prevState.contacts,
        ],
      };
    });
  };

  deleteContacts = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fiteredContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase().trim();
    const fiteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return fiteredContacts.sort((a, b) => a.name.localeCompare(b.name));
  };

  render() {
    return (
      <div className="AppWrapper">
        <h1>Phonebook</h1>
        <ContactForm addContacts={this.addContacts} />

        <h2>Contacts</h2>
        <Filter
          filterValue={this.state.filter}
          onFilterInputChange={this.onInputChange}
        />
        <ContactList
          contacts={this.fiteredContacts()}
          deleteContacts={this.deleteContacts}
        />
      </div>
    );
  }
}

export default App;
