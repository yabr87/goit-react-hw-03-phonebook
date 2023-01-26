import Button from 'components/Button';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const ContactForm = ({ addContacts }) => {
  const onFormSabmit = e => {
    e.preventDefault();
    const userName = e.currentTarget.name.value.toLowerCase();
    const userTel = e.currentTarget.number.value;
    addContacts(userName, userTel);
    e.currentTarget.reset();
  };

  return (
    <form className={s.form} autoComplete="off" onSubmit={e => onFormSabmit(e)}>
      <label className={s.label} htmlFor="contactsName">
        Name
      </label>
      <input
        className={s.input}
        id="contactsName"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={s.label} htmlFor="contactsTel">
        Number
      </label>
      <input
        className={s.input}
        id="contactsTel"
        type="tel"
        name="number"
        pattern="\d*"
        title="The phone number must be ten digits. e.g. 0970066415"
        minLength="10"
        maxLength="10"
        required
      />

      <Button text="Add contact" type="submit" />
    </form>
  );
};

ContactForm.propTypes = {
  addContacts: PropTypes.func.isRequired,
};

export default ContactForm;
