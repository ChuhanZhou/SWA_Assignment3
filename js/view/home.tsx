import * as React from 'react'

import user_action from '../actions/userAction'
import user_store from '../stores/userStore'
import game_store from '../stores/gameStore'
import { User } from '../models/user';
import { render } from 'react-dom'
import {Link,useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Score } from '../models/score';


var OldPassword = undefined;
var NewPassword = undefined;
var error = undefined;
var textarea = undefined;

export class ShowHome extends React.Component<{},{username:string,password:string,profile:string,Profiledispaly:string,passdispaly:string}>{
    constructor(props){
      super(props)
      this.state = { username: user_store.getUser().getUsername(),
      password: user_store.getUser().password,
      profile: user_store.getUser().getProfile(),
      Profiledispaly: 'none',
      passdispaly: 'none'
      }

      OldPassword = document.getElementById('oldP') as HTMLInputElement;
      NewPassword = document.getElementById('newP') as HTMLInputElement;
      error = document.getElementById('errorP') as HTMLLabelElement;
      textarea = document.getElementById('textarea') as HTMLTextAreaElement;
     
      user_store.addLogoutListener(()=>{console.log("logout")}) 
      user_store.addUserInfoListener(()=>{console.log("userInfo changed")})
    }

    getScores=user_store.getUser().getHighScores().map((value:Score,index:number)=>{
      return (<tr>
        <td>{value.score}</td>
        <td>{value.create_time}</td>
    </tr>)
    })
    

    render() {return (<div className='userIn'>
    <div>Hi! {this.state.username}</div>
    <div>Description : {this.state.profile}</div>

    <textarea id='textarea' style={{display:this.state.Profiledispaly}}></textarea>
    <button type='button' style={{display:this.state.Profiledispaly}} onClick={()=>ChangePro}>save</button>

    <div>Scores : </div>
    <div><table>
            <tbody>
                {this.getScores}
            </tbody>
        </table></div>
    <button type='button' onClick={()=>toChangePr()}>EditDescription</button>
    <button type='button' onClick={()=>toChangePa()}>Change password</button>

    <div style={{display:this.state.passdispaly}}>Old password : </div><input id='oldP' style={{display:this.state.passdispaly}}></input>
    <div style={{display:this.state.passdispaly}}>New password : </div><input id='newP' style={{display:this.state.passdispaly}}></input>
    <label id='errorP' style={{display:'none',color:'red'}}></label>    
    <button type='button' style={{display:'none'}} onClick={()=>toChangePa()}>save</button>

    <button type='button' onClick={()=>ChangeP()}>Change password</button>
    <button type='button' onClick={()=>logout()}>Logout</button>
    <br/>
    <button type='button' onClick={()=>startGame()}>Start Game</button>
</div>)}
    
    
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
    this.props.history.push({ pathname: '/view_new'})
  }

  function toChangePa(){
    this.state.passdispaly = 'block'

  }

  function toChangePr(){
    this.state.Profiledispaly = 'block'

  }

  function ChangeP(){
    let old = user_store.getUser()
    if (old.isTruePassword(getOldPassword().value)){
      old.changePassword(getOldPassword().value,getNewPassword().value)
      this.state.passdispaly = 'none'
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
    this.state.Profiledispaly = 'none'
  }

  function startGame(){
    this.props.history.push({ pathname: '/game' })
  }

  function Home() {
    return (<ShowHome/>)
  }
  
  export default Home;


