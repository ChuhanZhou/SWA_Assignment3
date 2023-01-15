import user_action from './js/actions/userAction';
import user_store from './js/stores/userStore';
var a = 0;
function testLogin() {
    console.log("login");
    console.log("Token: " + user_store.getToken());
    console.log(user_store.getUser());
    console.log("Error: " + user_store.getError());
}
function testLogout() {
    console.log("logout");
    console.log("Token: " + user_store.getToken());
    console.log(user_store.getUser());
    console.log("Error: " + user_store.getError());
    user_action.login("B", "222");
}
function testUserInfo() {
    console.log("user_info");
    console.log("Token: " + user_store.getToken());
    console.log(user_store.getUser());
    console.log("Error: " + user_store.getError());
    if (a == 0) {
        var old = user_store.getUser();
        if (old.isTruePassword("111")) {
            old.changePassword("111", "222");
        }
        else {
            old.changePassword("222", "111");
        }
        user_action.updateUserInfo(old, user_store.getToken());
        a = 1;
    }
    else {
        user_action.logout(user_store.getToken());
        a = 0;
    }
}
function testError() {
    console.log("error");
    console.log("Token: " + user_store.getToken());
    console.log(user_store.getUser());
    console.log("Error: " + user_store.getError());
}
user_store.addLoginListener(testLogin);
user_store.addLogoutListener(testLogout);
user_store.addUserInfoListener(testUserInfo);
user_store.addErrorListener(testError);
user_action.login("B", "222");
//# sourceMappingURL=test.js.map