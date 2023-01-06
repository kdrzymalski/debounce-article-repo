import {useEffect, useMemo, useState} from 'react'
import debounce from 'lodash.debounce';

const ComponentWithDebounceOptimized = () => {
  const [inputValue, setInputValue] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    return () => {
      handleInputChange.cancel();
    }
  }, []);

  const handleInputChange = useMemo(() => debounce(async (event) => {
    setInputValue(event.target.value)
    // Imagine very heavy request
    const response = await fetch("http://localhost:3000/suggestions")
    const data = await response.json()
    const filteredSuggestions = data.filter(({content}) => content.includes(event.target.value))
    setSuggestions(filteredSuggestions)
  }, 400), [])

  return (
    <>
      <h2>Optimized Debounce Example</h2>
      <input onChange={handleInputChange} /><br/>
      {inputValue !== null && suggestions.length === 0  && (<>No Matches</>)}
      {inputValue !== null && inputValue.length !== 0 && suggestions.map(({id, content}) => (
            <span key={id}>{content}</span>
      ))}
    </>
  )
}

export default ComponentWithDebounceOptimized
