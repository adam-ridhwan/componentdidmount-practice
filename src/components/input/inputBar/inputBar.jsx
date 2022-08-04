import PropTypes from 'prop-types';

import './inputBar.styles.css';

const InputBar = ({ debouncedChangeHandler }) => (
  <input
    type='text'
    onChange={debouncedChangeHandler}
    placeholder='Search for user'
  />
);

InputBar.propTypes = {
  debouncedChangeHandler: PropTypes.func.isRequired,
};

export default InputBar;
