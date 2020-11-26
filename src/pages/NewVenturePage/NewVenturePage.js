import React from 'react';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import useForm from '../../hooks/useForm';

import './NewVenturePage.scss';

const NewVenturePage = () => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );

  const ventureNewSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div className="new-venture-page">
      <form onSubmit={ventureNewSubmitHandler}>
        <Input
          element="input"
          id="title"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          error="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          rows={3}
          id="description"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          error="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="address"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          error="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD VENTURE
        </Button>
      </form>
    </div>
  );
};

export default NewVenturePage;
