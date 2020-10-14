import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import axios from 'axios';
import { render } from 'react-dom';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialValues = {
    name: '',
    age: '',
    email: ''
}

const AddFriend = (props) => {
    // states
    const [formValues, handleChanges, resetForm, setValues] = useForm(initialValues);
    
    const { setFriends } = props

    //console.log("Props: ", props)

    //Helpers

    let history = useHistory();

    const postNewFriend = newFriend => {
        axiosWithAuth()
            .post('/friends', newFriend)
            .then((res) => {
                console.log('add friends: ', res)
                setFriends(res.data)
            })
            .catch((err) => {
                console.log('Error: ', err)
            })
    }

    //side-effects

  const submitValues = evt => {
    evt.preventDefault();
    const newFriend = {
      id: Math.random(),  
      name: formValues.name.trim(),
      age: formValues.age.trim(),
      email: formValues.email.trim(),
    };
    postNewFriend(newFriend);
    resetForm(initialValues);
  };

  return (
    <div>
            <h1>Add Friend</h1>
            <form className = 'team-form' onSubmit = {submitValues}>
                <label>Name: 
                    <input 
                        type = 'text'
                        name = 'name'
                        onChange = {handleChanges}
                        value = {formValues.name}
                        placeholder = 'enter name'
                    />
                </label>

                <label>Age: 
                    <input 
                        type = 'numer'
                        name = 'age'
                        onChange = {handleChanges}
                        value = {formValues.age}
                        placeholder = 'enter age'
                    />
                </label>

                <label>Email: 
                    <input 
                        type = 'email'
                        name = 'email'
                        onChange = {handleChanges}
                        value = {formValues.email}
                        placeholder = 'enter email'
                    />
                </label>

                <button>Submit</button>
            </form>
        </div>
  );
};

export default AddFriend;