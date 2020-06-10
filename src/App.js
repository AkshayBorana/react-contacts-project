import React, {
  Component
} from 'react';
import {
  ListContacts
} from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {

  state = {
    contacts: []
  }


  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }));
      })
  }

  removeContact = (contact) => {
    this.setState((currState) => ({
      contacts: currState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }));

    ContactsAPI.remove(contact);
  }

  createContact = (newContact) => {
    ContactsAPI.create(newContact).then((contact) => {
      this.setState((currState) => ({
        contacts: currState.contacts.concat([contact])
      }));
    });
  }

  render() {
    return (
      <div>

        <Route exact path="/" render={() => (
          <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
        />
        )}/>

        <Route path="/create" render={({ history }) => (
          <CreateContact onCreateContact={(contact) => {
            this.createContact(contact);
            // redirects to the home router.
            history.push("/");
          }} />
        )} />

      </div>
    );
  }
}

export default App;





// {
//   "id": "karen",
//   "name": "Karen Isgrigg",
//   "handle": "karen_isgrigg",
//   "avatarURL": "http://localhost:5001/karen.jpg"
// },
// {
//   "id": "richard",
//   "name": "Richard Kalehoff",
//   "handle": "richardkalehoff",
//   "avatarURL": "http://localhost:5001/richard.jpg"
// },
// {
//   "id": "tyler",
//   "name": "Tyler McGinnis",
//   "handle": "tylermcginnis",
//   "avatarURL": "http://localhost:5001/tyler.jpg"
// }
