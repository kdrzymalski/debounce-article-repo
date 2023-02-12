import { useState } from 'react';
import debounce from 'lodash.debounce';

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = debounce(async (event) => {
    setInputValue(event.target.value);
    // Imagine very heavy request
    const response = await fetch('http://localhost:3000/suggestions');
    const data = await response.json();
    const filteredSuggestions = data.filter(({ content }) => content.includes(event.target.value));
    setSuggestions(filteredSuggestions);
  }, 400);

  return (
    <>
      <h2>Broken ControlledInput</h2>
      <input onChange={handleInputChange} value={inputValue} />
      <br />
      {inputValue.length !== 0 && suggestions.length === 0 && <>No Matches</>}
      {inputValue.length !== 0 &&
        suggestions.map(({ id, content }) => <span key={id}>{content}</span>)}
    </>
  );
};

export default ControlledInput;
