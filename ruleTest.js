"use strict";
exports.__esModule = true;
var board_1 = require("./js/models/board");
var gameStore_1 = require("./js/stores/gameStore");
var uuid_1 = require("uuid");
var userStore_1 = require("./js/stores/userStore");
var userAction_1 = require("./js/actions/userAction");
var gameAction_1 = require("./js/actions/gameAction");
var chalk = require("chalk");
var uuid = (0, uuid_1.v4)();
var type_list = ["A", "B", "C"];
var size = [6, 6];
// let game = new Rules(5, type_list, size)
gameStore_1["default"].initGame(5, type_list, size);
var game = gameStore_1["default"].getBoard();
game.play(new board_1.Position(1, 0), new board_1.Position(1, 1));
game.play(new board_1.Position(0, 1), new board_1.Position(1, 1));
game.play(new board_1.Position(1, 1), new board_1.Position(1, 2));
game.play(new board_1.Position(2, 4), new board_1.Position(2, 5));
game.pause();
game.play(new board_1.Position(2, 2), new board_1.Position(3, 2));
var user;
var token = "";
function testLogin() {
    token = userStore_1["default"].getToken();
    user = userStore_1["default"].getUser();
    if (userStore_1["default"].getError() != "") {
        console.log(chalk.red("Error: " + userStore_1["default"].getError()));
    }
    console.log(chalk.cyan("User ID", user.id, " | Token", token));
    // postGameData(game,user.id,token)
    gameAction_1["default"].getAllGameData(token);
    gameAction_1["default"].getGameData(6, token);
}
function getGames() {
    console.log(chalk.red("T_ARR"));
    var g_a = gameStore_1["default"].getGameArray();
    console.log(chalk.red("GAME ARR:", g_a.length));
}
function gatOneGame() {
    console.log(chalk.red("T_SIN"));
    var g = gameStore_1["default"].getSingleGame();
    console.log(chalk.red("SINGLE GAME:", g.getCompleted()));
}
function testError() {
    console.log(chalk.red("Error: " + userStore_1["default"].getError()));
}
userStore_1["default"].addLoginListener(testLogin);
gameStore_1["default"].addGameARRListener(getGames);
gameStore_1["default"].addGameInfoListener(gatOneGame);
// user_store.addLogoutListener(testLogout)
userStore_1["default"].addErrorListener(testError);
// user_store.addLoginListener(testLogin)
//login("A", "111")
userAction_1["default"].login("B", "111");
