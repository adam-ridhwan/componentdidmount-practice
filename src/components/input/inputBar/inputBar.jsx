import './inputBar.styles.css';

const InputBar = ({ debouncedChangeHandler }) => (
  <input
    type='text'
    onChange={debouncedChangeHandler}
    placeholder='Search for user'
  />
);

export default InputBar;
