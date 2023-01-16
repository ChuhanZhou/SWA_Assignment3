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
import Gameboard from "./game";
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
var timer
export class ShowHome extends React.Component<{},{username:string,password:string,profile:string,scores:Score[],Profiledispaly:string, passdispaly:string}> {
    constructor(props){
      super(props)
      this.state = {
        username : user_store.getUser().getUsername(),
        password : user_store.getUser().password,
        profile : user_store.getUser().getProfile(),
        scores : user_store.getUser().getHighScores(),
        Profiledispaly: 'none',
        passdispaly: 'none'
    }




    

    timer = setInterval(() => {
        this.setState({
          username : user_store.getUser().getUsername(),
          password : user_store.getUser().password,
          profile : user_store.getUser().getProfile(),
          scores : user_store.getUser().getHighScores(),
        })
    }, 1000)
 
    
      user_store.addLogoutListener(()=>{console.log("logout")}) 
      user_store.addUserInfoListener(()=>{
        console.log("userInfo changed")
        //username =user_store.getUser().getUsername();
        //password =  user_store.getUser().password;
        //profile =  user_store.getUser().getProfile();
        //updateUserInfo()
      })

      
    }

    componentDidMount():void{
      OldPassword = document.getElementById('oldP') as HTMLInputElement;
      NewPassword = document.getElementById('newP') as HTMLInputElement;
      error = document.getElementById('errorP') as HTMLLabelElement;
      textarea = document.getElementById('textarea') as HTMLTextAreaElement;
    }

    startGame(){
      ReactDOM.render(<Gameboard/>, document.getElementById('root'));
      clearTimeout(timer)
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
      if (OldPassword.value==this.state.password){
        old.changePassword(this.state.password,NewPassword.value)
        user_action.updateUserInfo(old,user_store.getToken())
          this.setState({
            username : user_store.getUser().getUsername(),
            password : user_store.getUser().password,
            profile : user_store.getUser().getProfile(),
            passdispaly : 'none'
          })
      }else{
          //old.changePassword(getNewPassword().value,getOldPassword().value)
          error.textContent = "the old password is not correct"
          console.log("the old password is not correct")
      }
      
    }

    changePro(){
      let old = user_store.getUser()
      old.setProfile(textarea.value)
      console.log(textarea.value)
      user_action.updateUserInfo(old,user_store.getToken())
        this.setState({
          username : user_store.getUser().getUsername(),
          password : user_store.getUser().password,
          profile : user_store.getUser().getProfile(),
          Profiledispaly : 'none'
        })
    }

    
    

    render() {return (<div className='userIn'>
    <div>Hi! {this.state.username}</div>
    <div>Description : {this.state.profile}</div>

    <textarea id='textarea' style={{display:this.state.Profiledispaly}}></textarea>
    <button type='button' style={{display:this.state.Profiledispaly}} onClick={()=>this.changePro()}>save</button>

    <div>Scores : </div>
    <div><table>
            <tbody>
                {this.state.scores.map((value:Score,index:number)=>{
      return (<tr key={index}>
        <td>{value.score}</td>
        <td>{value.getCreateTime().toLocaleDateString()}</td>
        <td>{value.getCreateTime().toLocaleTimeString()}</td>
    </tr>)
    })}
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
    <button type='button' onClick={()=>this.startGame()}>Start Game</button>
</div>)}
    
    
  }


  function logout()
  {
    user_action.logout(user_store.getToken());
    ReactDOM.render(<View/>, document.getElementById('root'));
  }


  function Home() {
    return (<ShowHome/>)
  }
  
  export default Home;


