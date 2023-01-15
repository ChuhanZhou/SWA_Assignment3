import { Position } from "./js/models/board";
import game_store from "./js/stores/gameStore"
import { Rules } from "./js/models/rules";
import { v4 as uuidv4 } from 'uuid';
import user_store from "./js/stores/userStore";
import user_action from "./js/actions/userAction";
import game_action from "./js/actions/gameAction";
const chalk = require("chalk");

let uuid = uuidv4()
let type_list = ["A", "B", "C"]
let size = [6, 6]
// let game = new Rules(5, type_list, size)


game_store.initGame(5, type_list, size)
let game = game_store.getBoard()

game.play(new Position(1, 0), new Position(1, 1))
game.play(new Position(0, 1), new Position(1, 1))
game.play(new Position(1, 1), new Position(1, 2))
game.play(new Position(2, 4), new Position(2, 5))
game.pause()
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
    // postGameData(game,user.id,token)
    game_action.getAllGameData(token)
    game_action.getGameData(6,token)
}

function getGames(){
    console.log(chalk.red("T_ARR"))
    let g_a = game_store.getGameArray()
    console.log(chalk.red("GAME ARR:",g_a.length))
}

function gatOneGame(){
    console.log(chalk.red("T_SIN"))
    let g = game_store.getSingleGame()
    console.log(chalk.red("SINGLE GAME:",g.getCompleted()))
}

function testError() {
    console.log(chalk.red("Error: " + user_store.getError()))
}



user_store.addLoginListener(testLogin)
game_store.addGameARRListener(getGames)
game_store.addGameInfoListener(gatOneGame)
// user_store.addLogoutListener(testLogout)
user_store.addErrorListener(testError)
// user_store.addLoginListener(testLogin)
//login("A", "111")
user_action.login("B", "111")