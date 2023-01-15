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

//var username:string;
//var password:string;
//var profile:string;
//var Profiledispaly= 'none';
//var passdispaly= 'none'

export class ShowHome extends React.Component<{},{username:string,password:string,profile:string,Profiledispaly:string, passdispaly:string}> {
    constructor(props){
      super(props)
      this.state = {
        username : user_store.getUser().getUsername(),
        password : user_store.getUser().password,
        profile : user_store.getUser().getProfile(),
        Profiledispaly: 'none',
        passdispaly: 'none'
    }

    setInterval(() => {
        this.setState({
          username : user_store.getUser().getUsername(),
          password : user_store.getUser().password,
          profile : user_store.getUser().getProfile()
        })
    }, 1000)
 
      OldPassword = document.getElementById('oldP') as HTMLInputElement;
      NewPassword = document.getElementById('newP') as HTMLInputElement;
      error = document.getElementById('errorP') as HTMLLabelElement;
      textarea = document.getElementById('textarea') as HTMLTextAreaElement;
     
      user_store.addLogoutListener(()=>{console.log("logout")}) 
      user_store.addUserInfoListener(()=>{
        console.log("userInfo changed")
        //username =user_store.getUser().getUsername();
        //password =  user_store.getUser().password;
        //profile =  user_store.getUser().getProfile();
        //updateUserInfo()
      })

      
    }

    toChangePro(){
      this.setState({
        username : user_store.getUser().getUsername(),
        password : user_store.getUser().password,
        profile : user_store.getUser().getProfile(),
        Profiledispaly : 'block'
      })
    }

    toChangePa(){
      this.setState({
        username : user_store.getUser().getUsername(),
        password : user_store.getUser().password,
        profile : user_store.getUser().getProfile(),
        passdispaly : 'block'
      })
    }

    changeP(){
      let old = user_store.getUser()
      if (getOldPassword().value==this.state.password){
        old.changePassword(this.state.password,getNewPassword().value)
        user_action.updateUserInfo(old,user_store.getToken())
          this.setState({
            username : user_store.getUser().getUsername(),
            password : user_store.getUser().password,
            profile : user_store.getUser().getProfile(),
            passdispaly : 'none'
          })
      }else{
          //old.changePassword(getNewPassword().value,getOldPassword().value)
          getError().textContent = "the old password is not correct"
          console.log("the old password is not correct")
      }
      
    }

    changePro(){
      let old = user_store.getUser()
      old.setProfile(getNewProfile().value)
      console.log(getNewProfile().value)
      user_action.updateUserInfo(old,user_store.getToken())
        this.setState({
          username : user_store.getUser().getUsername(),
          password : user_store.getUser().password,
          profile : user_store.getUser().getProfile(),
          Profiledispaly : 'none'
        })
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
    <button type='button' style={{display:this.state.Profiledispaly}} onClick={()=>this.changePro()}>save</button>

    <div>Scores : </div>
    <div><table>
            <tbody>
                {this.getScores}
            </tbody>
        </table></div>
    <button type='button' onClick={()=>this.toChangePro()}>EditDescription</button>
    <button type='button' onClick={()=>this.toChangePa()}>Change password</button>

    <div style={{display:this.state.passdispaly}}>Old password : </div><input id='oldP' style={{display:this.state.passdispaly}}></input>
    <div style={{display:this.state.passdispaly}}>New password : </div><input id='newP' style={{display:this.state.passdispaly}}></input>
    <label id='errorP' style={{color:'red'}}></label>    
    <button type='button' style={{display:this.state.passdispaly}} onClick={()=>this.changeP()}>save</button>

    <button type='button' onClick={()=>logout()}>Logout</button>
    <br/>
    <button type='button' onClick={()=>startGame()}>Start Game</button>
</div>)}
    
    
  }

 //function updateUserInfo(){
 //  username =user_store.getUser().getUsername();
 //  password =  user_store.getUser().password;
 //  profile =  user_store.getUser().getProfile();
 //  console.log(username)
 //}

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

  function getError(){
    if (error==null){
      error = document.getElementById('errorP') as HTMLLabelElement;
    }
    return error
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
    setInterval(() => {
      this.setState({
        username : user_store.getUser().getUsername(),
        password : user_store.getUser().password,
        profile : user_store.getUser().getProfile(),
        passdispaly : 'block'
      })
  }, 1000)
    

  }

  function toChangePr(){
    setInterval(() => {
      this.setState({
        username : user_store.getUser().getUsername(),
        password : user_store.getUser().password,
        profile : user_store.getUser().getProfile(),
        Profiledispaly : 'block'
      })
  }, 1000)
    
  }

  function ChangeP(){
    let old = user_store.getUser()
    if (old.isTruePassword(getOldPassword().value)){
      old.changePassword(getOldPassword().value,getNewPassword().value)
        this.setState({
          username : user_store.getUser().getUsername(),
          password : user_store.getUser().password,
          profile : user_store.getUser().getProfile(),
          passdispaly : 'none'
        })
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
    setInterval(() => {
      this.setState({
        username : user_store.getUser().getUsername(),
        password : user_store.getUser().password,
        profile : user_store.getUser().getProfile(),
        Profiledispaly : 'none'
      })
  }, 1000)
  }

  function startGame(){
    ReactDOM.render(<Game/>, document.getElementById('root'));
  }

  function Home() {
    return (<ShowHome/>)
  }
  
  export default Home;


