import React, {useState} from 'react';
import personService from '../services/persons';

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
              personService.edit(persons.find(person => person.name === newName).id, {name: newName, number: newNumber})
              .then(editedPerson => {
                setPersons(persons.map(person => person.id === editedPerson.id ? editedPerson : person))
                setNewName('')
                setNewNumber('')
              }).catch(error => {
                console.log(error)
              })
            }
          }
          else if (newName.trim() !== '' && newNumber.trim() !== '') {
            personService.addNew({name: newName, number: newNumber})
            .then(newPerson => {
              setPersons(persons.concat(newPerson))
              setNewName('')
              setNewNumber('')
            }).catch(error => {
              console.log(error)
            })
            
          }
        }}
      >
        <div>
          name: <input
          
          value={newName}
          onChange={(ev) => {
            setNewName(ev.target.value || '')}}
          />
        </div>
        <div>
          number: <input
          
          value={newNumber}
          onChange={(ev) => setNewNumber(ev.target.value || '')}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm;