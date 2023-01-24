import PropTypes from 'prop-types';
import Button from 'components/Button';
import s from './ContactList.module.css';

const ContactList = ({ contacts, deleteContacts }) => {
  return (
    <ul className={s.contactList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={s.contactItem}>
            <span className={s.userName}>{name}:</span>
            <span className={s.usertel}>{number}</span>
            <Button
              text="delete"
              type="button"
              onBtnClick={() => deleteContacts(id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContacts: PropTypes.func.isRequired,
};

ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
