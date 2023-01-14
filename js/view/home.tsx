import * as React from 'react'

import user_action from '../actions/userAction'
import user_store from '../stores/userStore'
import game_store from '../stores/gameStore'
import { User } from '../models/user';
import { render } from 'react-dom'
import {Link,useLocation} from 'react-router-dom'

interface stateType{
    userInfo: User;
}

const { state } = useLocation<stateType>();

const showUserInfo : React.FC<Props> = (props) => {
    const { username,logout,userInfo } = props
    return (<div className='userIn'>
                <div>Hi!{username}</div>
                <div>Description : {userInfo.getProfile}</div>
                <div>Scores : {userInfo.getHighScores}</div>
                <button onClick={}>EditDescription</button>
                <button onClick={}>Change password</button>
                <button onClick={logout}>Logout</button>
        </div>)
}

const editUserInfo : React.FC<Props> = (props) => {
    const { description,userInfo,updateProfile } = props
    return (<div className='userInEdit'>
        <div>Description :</div>
        <textarea value={description}></textarea>
        <button onClick={updateProfile}>Save</button>
        </div>)
}

const editPassword : React.FC<Props> = (props) => {
    const { username,password,userInfo,changePassword } = props
    return (<div className='userInEdit'>
        <div>Description :</div>
        <textarea ></textarea>
        <div>Old Password : </div><input className='password' value={password}></input>
        <div>New Password : </div><input className='password' value={password}></input>
        <button onClick={changePassword}>Save</button>
        </div>)
}



interface IUserStateProps {
    username: string
    password: string
    userInfo: User
    description: string
  }

  interface IUserActionProps {
    logout: (token:string)=>void
    updateProfile: (user:User,token:string)=>void
    changePassword: (user:User,token:string)=>void
  }
  type Props = IUserStateProps & IUserActionProps


const mapStateToProps = (state2: GameStore): IUserStateProps => {
    const { user } = state.userInfo
    return {
      username: user.username,
      password: user.password,
      userInfo: user,
      description: user.profile,
    }
  }

const mapUserActionToProps = (userAction: UserAction,state: UserStore): IUserActionProps => {
    const { user } = state
    return {  
        logout: () => userAction.logout(user.getUser().token),
        updateProfile: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            let old = user.getUser()
            const profile = e.target.value
            old.setProfile(profile)
            userAction.updateUserInfo(old,user.getToken())
        },
        changePassword: (e1: React.ChangeEvent<HTMLInputElement>,e2: React.ChangeEvent<HTMLInputElement>) => {
            const oldPassword = e1.target.value
            const newPassword = e2.target.value
            let old = user.getUser()
            if (old.isTruePassword(oldPassword)){
                old.changePassword(oldPassword,newPassword)
            }else{
                old.changePassword(newPassword,oldPassword)
            }
            userAction.updateUserInfo(old,user.getToken())
            
        },
    }
  }

UserStore.addUserInfoListener(mapUserActionToProps)
UserStore.addErrorListener(mapUserActionToProps)
