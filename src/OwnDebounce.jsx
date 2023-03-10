import { useEffect, useMemo, useRef, useState } from 'react';

function debounce(callback, delay = 300) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const ComponentWithOwnDebounce = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    // Imagine very heavy request
    const response = await fetch('http://localhost:3000/suggestions');
    const data = await response.json();
    const filteredSuggestions = data.filter(({ content }) => content.includes(inputValue));
    setSuggestions(filteredSuggestions);
  };

  const ref = useRef(fetchSuggestions);

  useEffect(() => {
    ref.current = fetchSuggestions;
  }, [inputValue]);

  const debouncedCallback = useMemo(() => {
    const latestFetchSuggestionsFunction = () => {
      ref.current?.();
    };
    return debounce(latestFetchSuggestionsFunction, 400);
  }, []);

  const handleInputChange = async (event) => {
    setInputValue(event.target.value);
    debouncedCallback();
  };

  return (
    <>
      <h2>Own Debounce Example</h2>
      <input onChange={handleInputChange} />
      <br />
      {inputValue.length !== 0 && suggestions.length === 0 && <>No Matches</>}
      {inputValue.length !== 0 &&
        suggestions.map(({ id, content }) => <span key={id}>{content}</span>)}
    </>
  );
};

export default ComponentWithOwnDebounce;
