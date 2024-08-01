import React, { useState } from 'react';

function CreateForm({ setState, submitText, type }) {
  const [name, setName] = useState('');
  const [toggleForm, setToggleForm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    let value = name.trim();
    if (value === "") {
      setError('Name cannot be empty');
      return;
    }
    setState(value);
    setName('');
    setError('');
    setToggleForm(false); // Close the form after submission
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim() !== "") {
      setError('');
    }
  };

  const toggleFormState = () => {
    setToggleForm((prev) => !prev);
    setError(''); // Clear the error when toggling the form
  };

  return (
    <>
      {toggleForm ? (
        <div className='form'>
          <input
            type='text'
            placeholder={type === 'list' ? 'Enter a name for this list...' : 'Enter a name for this card...'}
            value={name}
            onChange={handleInputChange}
          />
          {error && <p className='error'>{error}</p>}
          <div>
            <button onClick={handleSubmit}>{submitText}</button>
            <button onClick={toggleFormState}>X</button>
          </div>
        </div>
      ) : (
        <p className='add-list' onClick={toggleFormState}>+ {submitText}</p>
      )}
    </>
  );
}

export default CreateForm;
