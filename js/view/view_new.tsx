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
      username = document.getElementById('username') as HTMLInputElement;
      password = document.getElementById('password') as HTMLInputElement;
      error = document.getElementById('errorRL') as HTMLLabelElement;
      
      user_store.addLoginListener(loginSuccessed) 
      user_store.addErrorListener(updateError)
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

function getUserName(){
  if (username==null){
    username = document.getElementById('username') as HTMLInputElement;
  }
  return username
}

function getPassword(){
  if (password==null){
    password = document.getElementById('password') as HTMLInputElement;
  }
  return password
}

function getError(){
  if (error==null){
    error = document.getElementById('errorRL') as HTMLLabelElement;
  }
  return error
}

function loginUser(){
  user_action.login(getUserName().value,getPassword().value);
}

function registerUser(){
  user_action.register(getUserName().value,getPassword().value);
}

function updateError(){
  getError().textContent = user_store.getError();
}

function loginSuccessed(){
  updateError()
  ReactDOM.render(<Home/>, document.getElementById('root'));
}

interface IUserStateProps {
    username?: string
    password?: string
    error?: string
    userInfo?: string
  }

interface IUserActionProps {
  loginU?: (username:string,password:string) => void
  registerU?: (username:string,password:string) => void
  logout?: (token:string)=>void
  updateProfile?: (profile:React.ChangeEvent<HTMLTextAreaElement>)=>void
  changePassword?: (old_password:React.ChangeEvent<HTMLInputElement>,new_password:React.ChangeEvent<HTMLInputElement>)=>void
}

type Props = IUserStateProps & IUserActionProps

const MapStateToProps = (): IUserStateProps => {
    return {
      username: user_store.getUser().username,
      password: user_store.getUser().password,
      error: user_store.getError(),
      userInfo: user_store.getUser().profile
    }
  }

  const MapUserActionToProps = (): IUserActionProps => {
    console.log("use function")
    return {  
        loginU: () => user_action.login(user_store.getUser().username,user_store.getUser().password),
        registerU: () => user_action.register(user_store.getUser().username,user_store.getUser().password),
        logout: () => user_action.logout(user_store.getToken()),
        updateProfile: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            let old = user_store.getUser()
            const profile = e.target.value
            old.setProfile(profile)
            user_action.updateUserInfo(old,user_store.getToken())
        },
        changePassword: (e1: React.ChangeEvent<HTMLInputElement>,e2: React.ChangeEvent<HTMLInputElement>) => {
            const oldPassword = e1.target.value
            const newPassword = e2.target.value
            let old = user_store.getUser()
            if (old.isTruePassword(oldPassword)){
                old.changePassword(oldPassword,newPassword)
            }else{
                old.changePassword(newPassword,oldPassword)
            }
            user_action.updateUserInfo(old,user_store.getToken())  
        },
    }
  }



function Hello() {
  return (<UserLoginAndRegister/>)
}

export default Hello;