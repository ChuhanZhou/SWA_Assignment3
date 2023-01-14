import { Position } from "./js/models/board";
import gamestore from "./js/stores/gameStore"
import { Rules } from "./js/models/rules";
import { v4 as uuidv4 } from 'uuid';
import game_action from "./js/actions/gameAction"
import user_store from "./js/stores/userStore";
import user_action from "./js/actions/userAction";
const chalk = require("chalk");

let uuid = uuidv4()
let type_list = ["A", "B", "C"]
let size = [6, 6]
// let game = new Rules(5, type_list, size)


gamestore.initGame(5, type_list, size)
let game = gamestore.getBoard()
game.play(new Position(1, 0), new Position(1, 1))
game.play(new Position(0, 1), new Position(1, 1))
game.play(new Position(1, 1), new Position(1, 2))
game.play(new Position(2, 4), new Position(2, 5))
//game.pause()
game.play(new Position(2, 2), new Position(3, 2))


let user
let token = ""

function testLogin() {
    token = user_store.getToken()
    user = user_store.getUser()
    if (user_store.getError() != "") {
        console.log(chalk.red("Error: " + user_store.getError()))
    }
    console.log(chalk.cyan("User ID", user.id, " | Token", token))
    // getAllGameData(user.id, token)
    game_action.postGameData(game,user.id,token)
}

function testError() {
    console.log(chalk.red("Error: " + user_store.getError()))
}

user_store.addLoginListener(testLogin)
// user_store.addLogoutListener(testLogout)
user_store.addErrorListener(testError)
// user_store.addLoginListener(testLogin)
//login("A", "111")
user_action.login("B", "111")