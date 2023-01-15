import * as React from 'react'

import user_action from '../actions/userAction'
import user_store from '../stores/userStore'
import game_store from '../stores/gameStore'
import { User } from '../models/user';
import { render } from 'react-dom'
import {Link,useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Score } from '../models/score';
import View from "./view_new";
import Game from "./game";
import * as ReactDOM from 'react-dom'


var OldPassword = undefined;
var NewPassword = undefined;
var error = undefined;
var textarea = undefined;

var username:string;
var password:string;
var profile:string;
var Profiledispaly= 'none';
var passdispaly= 'none'

export class ShowHome extends React.Component {
    constructor(props){
      super(props)
 
      OldPassword = document.getElementById('oldP') as HTMLInputElement;
      NewPassword = document.getElementById('newP') as HTMLInputElement;
      error = document.getElementById('errorP') as HTMLLabelElement;
      textarea = document.getElementById('textarea') as HTMLTextAreaElement;
     
      user_store.addLogoutListener(()=>{console.log("logout")}) 
      user_store.addUserInfoListener(()=>{
        console.log("userInfo changed")
        updateUserInfo()
      })

      
    }

    getScores=user_store.getUser().getHighScores().map((value:Score,index:number)=>{
      return (<tr>
        <td>{value.score}</td>
        <td>{value.create_time}</td>
    </tr>)
    })
    

    render() {return (<div className='userIn'>
    <div>Hi! {username}</div>
    <div>Description : {profile}</div>

    <textarea id='textarea' style={{display:Profiledispaly}}></textarea>
    <button type='button' style={{display:Profiledispaly}} onClick={()=>ChangePro}>save</button>

    <div>Scores : </div>
    <div><table>
            <tbody>
                {this.getScores}
            </tbody>
        </table></div>
    <button type='button' onClick={()=>toChangePr()}>EditDescription</button>
    <button type='button' onClick={()=>toChangePa()}>Change password</button>

    <div style={{display:passdispaly}}>Old password : </div><input id='oldP' style={{display:passdispaly}}></input>
    <div style={{display:passdispaly}}>New password : </div><input id='newP' style={{display:passdispaly}}></input>
    <label id='errorP' style={{display:passdispaly,color:'red'}}></label>    
    <button type='button' style={{display:passdispaly}} onClick={()=>ChangeP()}>save</button>

    <button type='button' onClick={()=>logout()}>Logout</button>
    <br/>
    <button type='button' onClick={()=>startGame()}>Start Game</button>
</div>)}
    
    
  }

  function updateUserInfo(){
    username =user_store.getUser().getUsername();
    password =  user_store.getUser().password;
    profile =  user_store.getUser().getProfile();
    console.log(username)
  }

  function getOldPassword(){
    if (OldPassword==null){
      OldPassword = document.getElementById('oldP') as HTMLInputElement;
    }
    return OldPassword
  }

  function getNewPassword(){
    if (NewPassword==null){
      NewPassword = document.getElementById('newP') as HTMLInputElement;
    }
    return NewPassword
  }

  function getNewProfile(){
    if (textarea==null){
      textarea = document.getElementById('textarea') as HTMLTextAreaElement;
    }
    return textarea
  }

  function logout()
  {
    user_action.logout(user_store.getToken());
    ReactDOM.render(<View/>, document.getElementById('root'));
  }

  function toChangePa(){
    passdispaly = 'block'

  }

  function toChangePr(){
    Profiledispaly = 'block'

  }

  function ChangeP(){
    let old = user_store.getUser()
    if (old.isTruePassword(getOldPassword().value)){
      old.changePassword(getOldPassword().value,getNewPassword().value)
      passdispaly = 'none'
    }else{
        old.changePassword(getNewPassword().value,getOldPassword().value)
        error.textContent = "the old password is not correct"
    }
    user_action.updateUserInfo(old,user_store.getToken())
  }

  function ChangePro(){
    let old = user_store.getUser()
    old.setProfile(getNewProfile().textContent)
    user_action.updateUserInfo(old,user_store.getToken())
    Profiledispaly = 'none'
  }

  function startGame(){
    //ReactDOM.render(<Game/>, document.getElementById('root'));
  }

  function Home() {
    return (<ShowHome/>)
  }
  
  export default Home;


