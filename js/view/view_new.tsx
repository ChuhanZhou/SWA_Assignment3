import * as React from 'react';
import * as ReactDOM from 'react-dom';
import user_action from '../actions/userAction';
import user_store from '../stores/userStore';
import { User } from '../models/user';
ReactDOM.render(
  <div>1</div>,document.getElementById('root')
);

const loginUser : React.FC<Props> = (props) => {
    const { username,password,loginU,error } = props
    return (<form className='loginForm'>
        <div>Username : </div><input className='username' value={username}></input>
        <div>Password : </div><input className='password' value={password}></input>
        <label className='error'></label>
        <button onClick={()=>loginU}>Login</button>
        </form>)
}

const registerUser : React.FC<Props> = (props) => {
    const { username,password,registerU,error } = props
    return (<form className='loginForm'>
        <div>Username : </div><input className='username' value={username}></input>
        <div>Password : </div><input className='password' value={password}></input>
        <label className='error'></label>
        <button onClick={()=>registerU}>Register</button>
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
  updateProfile: (profile:React.ChangeEvent<HTMLTextAreaElement>)=>void
  changePassword: (old_password:React.ChangeEvent<HTMLInputElement>,new_password:React.ChangeEvent<HTMLInputElement>)=>void
}
type Props = IUserStateProps & IUserActionProps

const mapStateToProps = (): IUserStateProps => {
    return {
      username: user_store.getUser().username,
      password: user_store.getUser().password,
      error: user_store.getError(),
      userInfo: user_store.getUser()
    }
  }

  const mapUserActionToProps = (): IUserActionProps => {
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

user_store.addLoginListener(mapUserActionToProps)
user_store.addLogoutListener(mapUserActionToProps)
user_store.addUserInfoListener(mapUserActionToProps)
user_store.addErrorListener(mapUserActionToProps)

