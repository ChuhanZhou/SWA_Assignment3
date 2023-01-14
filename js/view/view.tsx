import * as React from 'react'

import {UserAction} from '../actions/userAction'
import {UserStore} from '../stores/userStore'
import { User } from '../models/user';
import { render } from 'react-dom'
import {Link} from 'react-router-dom'

function userLogin(p: Props) {
  const { username,password,loginU,userInfo} = p
  return (<Link to={{ pathname: '/home', state : { userInfo} }}/>)
}

function registerUS(){
  registerUser;
}

const loginUser : React.FC<Props> = (props) => {
    const { username,password,loginU,error } = props
    return (<form className='loginForm'>
        <div>Username : </div><input className='username' value={username}></input>
        <div>Password : </div><input className='password' value={password}></input>
        <label className='error'></label>
        <button onClick={userLogin}>Login</button>
        </form>)
}

const registerUser : React.FC<Props> = (props) => {
    const { username,password,registerU,error } = props
    return (<form className='loginForm'>
        <div>Username : </div><input className='username' value={username}></input>
        <div>Password : </div><input className='password' value={password}></input>
        <label className='error'></label>
        <button onClick={registerU}>Register</button>
        </form>)
}

interface IUserStateProps {
    username: string
    password: string
    error: string
    userInfo: User
  }

  interface IUserActionProps {
    loginU: (username:string,password:string) => void
    registerU: (username:string,password:string) => void
    logout: (token:string)=>void
    updateProfile: (user:User,token:string)=>void
    changePassword: (user:User,token:string)=>void
  }
  type Props = IUserStateProps & IUserActionProps


const mapStateToProps = (state: UserStore): IUserStateProps => {
    const { user } = state
    return {
      username: user.getUser().username,
      password: user.geUser().password,
      error: user.getError(),
      userInfo: user.getUser()
    }
  }

  const mapUserActionToProps = (userAction: UserAction,state: UserStore): IUserActionProps => {
    const { user } = state
    return {  
        loginU: () => userAction.login(user.getUser().username,user.geUser().password),
        registerU: () => userAction.register(user.getUser().username,user.geUser().password),
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

UserStore.addLoginListener(mapUserActionToProps)
UserStore.addLogoutListener(mapUserActionToProps)
UserStore.addUserInfoListener(mapUserActionToProps)
UserStore.addErrorListener(mapUserActionToProps)

export default registerUS;
