import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import { setLocalStorage, getLocalStorage } from './utils/storage';
// import { testItems } from './data/testItems';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = getLocalStorage('myContacts');
    if (contacts?.length) {
      // contacts && contacts.length
      this.setState({ contacts });
      console.log('Load contacts');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate")
    // console.log("prevState", prevState);
    // console.log("currentState", this.state);
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      console.log('Update contacts');
      setLocalStorage('myContacts', contacts);
    }
  }

  alertError = userName => {
    alert(`${userName} is already in contacts!`);
  };

  checkNameInPhonebook = userName => {
    const { contacts } = this.state;
    return contacts.some(({ name }) => name.toLowerCase() === userName);
  };

  addContacts = (userName, userTel) => {
    const formattedUserTel = this.formatUserTel(userTel);

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
            number: formattedUserTel,
          },
          ...prevState.contacts,
        ],
      };
    });
  };

  formatUserTel(userTel) {
    // const tel = userTel.match(/\d/g);
    const tel = userTel.split('');
    // tel.splice(0, '', '+380 (');
    tel.splice(3, '', '-');
    tel.splice(6, '', '-');
    tel.splice(9, '', '-');
    return tel.join('');
  }

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
