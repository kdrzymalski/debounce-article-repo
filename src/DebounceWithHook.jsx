import { useState } from 'react';
import { useDebounce } from './hooks/useDebounce.ts';

const ComponentWithHookDebounce = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    // Imagine very heavy request
    const response = await fetch('http://localhost:3000/suggestions');
    const data = await response.json();
    const filteredSuggestions = data.filter(({ content }) => content.includes(inputValue));
    setSuggestions(filteredSuggestions);
  };

  const debouncedCallback = useDebounce(async () => {
    await fetchSuggestions();
  }, 400);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

    debouncedCallback();
  };

  return (
    <>
      <h2>Hook Debounce Example</h2>
      <input onChange={handleInputChange} />
      <br />
      {inputValue.length !== 0 && suggestions.length === 0 && <>No Matches</>}
      {inputValue.length !== 0 &&
        suggestions.map(({ id, content }) => <span key={id}>{content}</span>)}
    </>
  );
};

export default ComponentWithHookDebounce;
