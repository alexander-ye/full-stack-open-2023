import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('');

  return {
    props: { 
      type,
      value,
      onChange
    },
    reset
  }
}


// Building your own Hooks lets you extract component logic into reusable functions.
// RULES FOR HOOKS

// Don’t call Hooks inside loops, conditions, or nested functions. 
// Instead, always use Hooks at the top level of your React function.

// Don’t call Hooks from regular JavaScript functions. Instead, you can:
// Call Hooks from React function components.
// Call Hooks from custom Hooks