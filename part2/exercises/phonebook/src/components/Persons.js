import React from 'react';
import personsService from '../services/persons';

const Persons = ({searchName, persons, setPersons}) => {
  return <>
  {persons
        .filter(person => {
          return person.name.toLowerCase().includes(searchName.toLowerCase())})
        .map(person => {
          return (<Person key={person.name} person={person} persons={persons} setPersons={setPersons} />)
      })}
  </>
}

const Person = ({person, persons, setPersons}) => {
  return (
    <div key={person.name}>
      {person.name} {person.number}   <button onClick={() => {
        if (window.confirm(`Delete ${person.name}?`)) {
          personsService.remove(person.id)
            .then(() => {
              setPersons(persons.filter(elem => person.id !== elem.id))})
        }
      }}>delete</button>
    </div>
  )
}
export default Persons;
