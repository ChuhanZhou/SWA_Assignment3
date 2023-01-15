import * as React from 'react'

import user_action from '../actions/userAction'
import user_store from '../stores/userStore'
import { User } from '../models/user';
import * as ReactDOM from 'react-dom'
import {render} from 'react-dom'
import {Link, Router} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Home from "./home";

var username = undefined;
var password = undefined;
var error = undefined;

class UserLoginAndRegister extends React.Component{
    constructor(props){
      super(props)
      user_store.addLoginListener(loginSuccessed) 
      user_store.addErrorListener(updateError)
    }

    componentDidMount(): void {
      username = document.getElementById('username') as HTMLInputElement;
      password = document.getElementById('password') as HTMLInputElement;
      error = document.getElementById('errorRL') as HTMLLabelElement;
    }

    render() {return (
      <form className='loginForm'>
        <div>Username : </div><input id='username'></input>
        <div>Password : </div><input id='password'></input>
        <label id='errorRL' style={{color:'red'}}></label>    
        <button type='button' id='btnL' onClick={()=>loginUser()}>Login</button>
        <button type='button' id='btnR' onClick={()=>registerUser()}>Register</button>
      </form>
    )}
    
    
  }

function loginUser(){
  user_action.login(username.value,password.value);
}

function registerUser(){
  user_action.register(username.value,password.value);
}

function updateError(){
  error.textContent = user_store.getError();
}

function loginSuccessed(){
  updateError()
  user_store.removeAllListeners()
  ReactDOM.render(<Home/>, document.getElementById('root'));
}

function Hello() {
  return (<UserLoginAndRegister/>)
}

export default Hello;