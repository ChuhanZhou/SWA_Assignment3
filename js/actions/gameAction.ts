//const chalk = require("chalk");
import dispatcher from "../dispatcher";
import { Game } from "../models/game";
import { Rules } from "../models/rules";
import actionTypes from "./actionTypes";

var host = 'http://localhost:9090/'
var XMLHttpRequest = require('xhr2');

class GameAction {
    getAllGameData(token: string) {
        let gameArray = new Array<Game>
        var xhr = new XMLHttpRequest();
        let url = host + 'games' + "?token=" + token;
        console.log("Requesting: ", url);

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let info = xhr.responseText;
                    let size = JSON.parse(info).length;
                    console.log("Info: ", info, "\nLength: ", size)
                    JSON.parse(info).forEach(obj => {
                        let game = new Game(obj.user, obj.score)
                        game.setCompleted(obj.completed)
                        game.setId(obj.id)
                        gameArray.push(game)
                    });
                    gameArray.sort((a, b) => b.getScore() - a.getScore())
                    gameArray = gameArray.slice(0, 10)
                    dispatcher.dispatch({
                        actionTypes: actionTypes.GAME_ARR,
                        g_array: gameArray,
                    });
                } else {
                    console.log("Wrong id/token")
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "wrong id or token",
                        g_array: null,
                    });
                }
            }
        }
        xhr.send();
    }

    getGameData(id: number, token: string) {
        var xhr = new XMLHttpRequest();
        let url = host + 'games/' + id + "?token=" + token;
        console.log("Requesting: ", url);

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let info = xhr.responseText;
                    let JSON_info = JSON.parse(info);
                    console.log("Single Game: ", info)
                    dispatcher.dispatch({
                        actionTypes: actionTypes.GAME_INFO,
                        info: info,
                        user_id: JSON_info.user,
                        id: JSON_info.id,
                        score: JSON_info.score,
                        completed: JSON_info.completed
                    });
                } else {
                    console.log("Wrong id/token")
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "wrong id or token",
                    });
                }
            }
        }
        xhr.send();
    }

    postGameData(rule: Rules, user_id: number, token: string) {
        let game_id
        let score = rule.getPoints()
        let _game = new Game(user_id, score)
        var xhr = new XMLHttpRequest();
        var s_xhr = new XMLHttpRequest();
        let s_url = host + 'games/' + "?token=" + token;

        let is_paused = rule.getPausingStatus()
        let is_ended = rule.getEndingStatus()


        if (is_paused) {
            console.log("This game is Paused, ES: ", is_ended, " PS: ", is_paused, "Score: ", _game.getScore())
            _game.setScore(0)
            _game.setCompleted(false)
        }
        else {
            _game.setCompleted(true)
        }

        // console.log(chalk.blue("Posting: ", url, "ES: ", is_ended, " PS: ", is_paused, " ID: ", _game.id, "Score: ",_game.score));
        let payload = JSON.stringify(_game)

        console.log("Posting sxhr: ", s_url);

        s_xhr.open("POST", s_url, true);
        s_xhr.setRequestHeader("Content-Type", "application/json");

        s_xhr.onreadystatechange = function () {
            if (s_xhr.readyState == 4) {
                if (s_xhr.status == 200 || s_xhr.status == 201) {
                    let info = s_xhr.responseText;
                    const data = JSON.parse(info);
                    game_id = data.id;
                    console.log("Generation Compelete: ", " Game ID: ", game_id)
                    dispatcher.dispatch({
                        actionTypes: actionTypes.GAME_POST,
                        info: info,
                    });
                    let url = host + 'games/' + game_id + "?token=" + token;
                    console.log("Posting: ", url, "\nPayload: ", payload);
                    xhr.open("PATCH", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                let info = xhr.responseText;
                                console.log("Info: ", info)
                                dispatcher.dispatch({
                                    actionTypes: actionTypes.GAME_POST,
                                    info: info,
                                });
                            } else {
                                console.log(xhr.status, " Wrong id/token")
                                dispatcher.dispatch({
                                    actionTypes: actionTypes.ERROR,
                                    info: "Wrong id or token",
                                });
                            }
                        }
                    }
                    xhr.send(payload);

                } else {
                    console.log(s_xhr.status, " Wrong id/token")
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "Wrong id or token",
                    });
                }
            }
        }



        s_xhr.send();

    }
}

const game_action = new GameAction();
export default game_action;