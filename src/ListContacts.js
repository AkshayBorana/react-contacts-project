import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class ListContacts extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ""
    }

    updateQuery = (event) => {

        this.setState(() => ({
            query: event.trim()
        }));

        if(this.state.query) {
            console.log(this.state.query);
        }
    }

    clearQuery = () => {
        this.updateQuery('');
    }

    render() {

        const { query } = this.state;
        const { contacts, onDeleteContact } = this.props;

        const showingContacts = query === '' ? contacts : contacts.filter(contact => {
            return contact.name.toLowerCase().includes(query.toLowerCase());
        })

        return (
            <div className="list-contacts">

            <div className="list-contacts-top">
                <input
                 className="search-contacts"
                 type="text"
                 placeholder="Search Contacts"
                 onChange={(event) => this.updateQuery(event.target.value)}
                 value={query}
                 />

                 <Link
                  to="/create"
                  className="add-contact"
                  >Add Contact</Link>
            </div>

            {showingContacts.length !== contacts.length && (
                <div className="showing-contacts">
                    <span>Now showing {showingContacts.length} of {contacts.length}</span>
                    <button onClick={this.clearQuery}>Show all</button>
                </div>
            )}

            <ol className = "contact-list" > {
                showingContacts.map((contact) => (
                    <li key={contact.id} className="contact-list-item">
                        <div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})`}}></div>
                        <div className="contact-details">
                            <p>{contact.name}</p>
                            <p>{contact.handle}</p>
                        </div>
                        <button className="contact-remove" onClick={() => onDeleteContact(contact)}></button>
                    </li>
                ))
              }
              </ol>
            </div>

        )
    }
}