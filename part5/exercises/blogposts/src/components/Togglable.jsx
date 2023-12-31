import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // the useImperativeHandle function is a React hook, that is used for defining functions in a component,
  // which can be invoked from outside of the component
  // useImperativeHandle hook to make its toggleVisibility function available outside of the component
  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));

  return (
    <div className="showHideContent">
      <div style={hideWhenVisible} className='hideWhenVisible'>
        <button className="showButton" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='showWhenVisible'>
        {props.children}
        <button className="hideButton" onClick={toggleVisibility}>{props.cancelLabel || 'cancel'}</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
