import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ filterValue, onFilterInputChange }) => {
  return (
    <div className={s.filterWrapper}>
      <label className={s.filterLabel} htmlFor="idFilter">
        Find contacts by name{' '}
      </label>
      <input
        autoComplete="off"
        id="idFilter"
        className={s.input}
        name="filter"
        value={filterValue}
        onChange={e => onFilterInputChange(e)}
      />
    </div>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onFilterInputChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  filterValue: '',
};

export default Filter;
