import React from "react";
import { useDispatch } from "react-redux"
import { searchByText } from "../reducers/filterReducer";

const SearchFilterForm = () => {
  const dispatch = useDispatch();

  const onChange = (ev) => {
    ev.preventDefault();
    const content = ev.target.value.toLowerCase();
    dispatch(searchByText(content))
  }

  return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <h3>Search</h3><input onChange={onChange} style={{ marginLeft: '6px', height: '1.2rem' }} />
  </div>
}

export default SearchFilterForm;