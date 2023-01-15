import dispatcher from "../dispatcher";
import actionTypes from "./actionTypes";
import { User } from '../models/user';
var host = 'http://localhost:9090/';
var XMLHttpRequest = require('xhr2');
var UserAction = /** @class */ (function () {
    function UserAction() {
    }
    UserAction.prototype.register = function (username, password) {
        var xhr = new XMLHttpRequest();
        var url = host + 'users';
        var send_data = JSON.stringify(new User(username, password));
        console.log("[POST] url: " + url + " data: " + send_data);
        var login = this.login;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 201) {
                    var info = JSON.parse(xhr.responseText);
                    var new_user = new User(info.username, info.password, info.id, info.admin, info.profile, info.high_scores);
                    console.log(new_user);
                    login(username, password);
                }
                else {
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "the username already exists",
                    });
                }
            }
        };
        xhr.send(send_data);
    };
    UserAction.prototype.login = function (username, password) {
        var xhr = new XMLHttpRequest();
        var url = host + 'login';
        var send_data = JSON.stringify(new User(username, password));
        console.log("[POST] url: " + url + " data: " + send_data);
        var getUserInfo = this.getUserInfo;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var info = JSON.parse(xhr.responseText);
                    var token = info.token;
                    var userId = info.userId;
                    dispatcher.dispatch({
                        actionTypes: actionTypes.LOGIN,
                        token: token,
                        id: userId
                    });
                    getUserInfo(userId, token);
                }
                else {
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "wrong username or password",
                    });
                }
            }
        };
        xhr.send(send_data);
    };
    UserAction.prototype.logout = function (token) {
        var xhr = new XMLHttpRequest();
        var url = host + 'logout?token=' + token;
        console.log("[POST] url: " + url);
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    dispatcher.dispatch({
                        actionTypes: actionTypes.LOGOUT,
                    });
                }
                else {
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "wrong token",
                    });
                }
            }
        };
        xhr.send();
    };
    UserAction.prototype.getUserInfo = function (id, token) {
        var xhr = new XMLHttpRequest();
        var url = host + 'users/' + id + "?token=" + token;
        console.log("[GET] url: " + url);
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var info = JSON.parse(xhr.responseText);
                    var user = new User(info.username, info.password, info.id, info.admin, info.profile, info.high_scores);
                    dispatcher.dispatch({
                        actionTypes: actionTypes.USER_INFO,
                        user: user,
                    });
                }
                else {
                    console.log("wrong id");
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "wrong id or token",
                    });
                }
            }
        };
        xhr.send();
    };
    UserAction.prototype.updateUserInfo = function (user, token) {
        var xhr = new XMLHttpRequest();
        var url = host + 'users/' + user.id + "?token=" + token;
        var send_data = JSON.stringify(user);
        console.log("[PATCH] url: " + url + " data: " + send_data);
        var getUserInfo = this.getUserInfo;
        xhr.open("PATCH", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    getUserInfo(user.id, token);
                }
                else {
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "wrong token",
                    });
                }
            }
        };
        xhr.send(send_data);
    };
    return UserAction;
}());
export { UserAction };
var user_action = new UserAction();
export default user_action;
//# sourceMappingURL=userAction.js.map