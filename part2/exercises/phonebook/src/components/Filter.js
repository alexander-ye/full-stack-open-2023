import React, {useState} from 'react';

const Filter = ({searchName, setSearchName}) => {
  return (
    <div>filter shown with 
        <input 
          value={searchName} 
          onChange={(ev) => setSearchName(ev.target.value || '')}/>
      </div>
  )
}

export default Filter;