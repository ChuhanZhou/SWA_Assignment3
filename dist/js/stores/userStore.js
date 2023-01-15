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
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import actionTypes from "../actions/actionTypes";
import { User } from '../models/user';
var event_type = {
    ERROR: "ERROR",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    USER_INFO: "USER_INFO",
};
var user = new User("", "");
var token = "";
var error_info = "";
var UserStore = /** @class */ (function (_super) {
    __extends(UserStore, _super);
    function UserStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserStore.prototype.addLoginListener = function (callback) {
        this.on(event_type.LOGIN, callback);
    };
    UserStore.prototype.removeLoginListener = function (callback) {
        this.removeListener(event_type.LOGIN, callback);
    };
    UserStore.prototype.addLogoutListener = function (callback) {
        this.on(event_type.LOGOUT, callback);
    };
    UserStore.prototype.removeLogoutListener = function (callback) {
        this.removeListener(event_type.LOGOUT, callback);
    };
    UserStore.prototype.addUserInfoListener = function (callback) {
        this.on(event_type.USER_INFO, callback);
    };
    UserStore.prototype.removeUserInfoListener = function (callback) {
        this.removeListener(event_type.USER_INFO, callback);
    };
    UserStore.prototype.addErrorListener = function (callback) {
        this.on(event_type.ERROR, callback);
    };
    UserStore.prototype.removeErrorListener = function (callback) {
        this.removeListener(event_type.ERROR, callback);
    };
    UserStore.prototype.emitChange = function (type) {
        this.emit(type);
    };
    UserStore.prototype.getUser = function () {
        return user.copy();
    };
    UserStore.prototype.getToken = function () {
        return token;
    };
    UserStore.prototype.getError = function () {
        return error_info;
    };
    return UserStore;
}(EventEmitter));
var user_store = new UserStore();
dispatcher.register(function (action) {
    switch (action.actionTypes) {
        case actionTypes.LOGIN:
            token = action.token;
            user.id = action.id;
            user_store.emitChange(event_type.LOGIN);
            break;
        case actionTypes.LOGOUT:
            token = "";
            user = new User("", "");
            user_store.emitChange(event_type.LOGOUT);
            break;
        case actionTypes.USER_INFO:
            user = action.user;
            user_store.emitChange(event_type.USER_INFO);
            break;
        case actionTypes.ERROR:
            error_info = action.info;
            user_store.emitChange(event_type.ERROR);
            break;
        default:
            break;
    }
});
export default user_store;
//# sourceMappingURL=userStore.js.map