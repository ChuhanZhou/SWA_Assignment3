var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import user_action from '../actions/userAction';
import user_store from '../stores/userStore';
var UserLogin = /** @class */ (function (_super) {
    __extends(UserLogin, _super);
    function UserLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserLogin.prototype.render = function () {
        return (React.createElement("form", { className: 'loginForm' },
            React.createElement("div", null, "Username : "),
            React.createElement("input", { id: 'username' }),
            React.createElement("div", null, "Password : "),
            React.createElement("input", { id: 'password' }),
            React.createElement("label", { id: 'errorRL' }),
            React.createElement("div", null,
                React.createElement(UserLoginAndRegister, null))));
    };
    return UserLogin;
}(React.Component));
var username = undefined;
var password = undefined;
var error = undefined;
var UserLoginAndRegister = /** @class */ (function (_super) {
    __extends(UserLoginAndRegister, _super);
    function UserLoginAndRegister(props) {
        var _this = _super.call(this, props) || this;
        username = document.getElementById('username');
        password = document.getElementById('password');
        error = document.getElementById('errorRL');
        user_store.addLoginListener(function () { console.log("login successed"); });
        user_store.addErrorListener(hasError);
        return _this;
    }
    UserLoginAndRegister.prototype.render = function () {
        return (React.createElement("div", { className: 'loginForm' },
            React.createElement("button", { type: 'button', id: 'btnL', onClick: function () { return loginUser(); } }, "Login"),
            React.createElement("button", { type: 'button', id: 'btnR', onClick: function () { return registerUser(); } }, "Register")));
    };
    return UserLoginAndRegister;
}(React.Component));
function loginUser() {
    console.log("login");
    console.log(username.value);
    user_action.login(username.value, password.value);
}
function registerUser() {
    user_action.register(username.value, password.value);
    console.log("resgister");
}
function hasError() {
    //error.textContent = user_store.getError();
    console.log("error");
}
var MapStateToProps = function () {
    return {
        username: user_store.getUser().username,
        password: user_store.getUser().password,
        error: user_store.getError(),
        userInfo: user_store.getUser().profile
    };
};
var MapUserActionToProps = function () {
    console.log("use function");
    return {
        loginU: function () { return user_action.login(user_store.getUser().username, user_store.getUser().password); },
        registerU: function () { return user_action.register(user_store.getUser().username, user_store.getUser().password); },
        logout: function () { return user_action.logout(user_store.getToken()); },
        updateProfile: function (e) {
            var old = user_store.getUser();
            var profile = e.target.value;
            old.setProfile(profile);
            user_action.updateUserInfo(old, user_store.getToken());
        },
        changePassword: function (e1, e2) {
            var oldPassword = e1.target.value;
            var newPassword = e2.target.value;
            var old = user_store.getUser();
            if (old.isTruePassword(oldPassword)) {
                old.changePassword(oldPassword, newPassword);
            }
            else {
                old.changePassword(newPassword, oldPassword);
            }
            user_action.updateUserInfo(old, user_store.getToken());
        },
    };
};
function Hello() {
    return (React.createElement(UserLogin, null));
}
export default Hello;
//# sourceMappingURL=view_new.js.map