var chalk = require("chalk");
import dispatcher from "../dispatcher";
import { Game } from "../models/game";
import actionTypes from "./actionTypes";
var host = 'http://localhost:9090/';
var XMLHttpRequest = require('xhr2');
var GameAction = /** @class */ (function () {
    function GameAction() {
    }
    GameAction.prototype.getAllGameData = function (id, token) {
        var xhr = new XMLHttpRequest();
        var url = host + 'games' + "?token=" + token;
        console.log(chalk.blue("Requesting: ", url));
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var info = JSON.parse(xhr.responseText);
                    console.log(chalk.green("Info: ", info));
                    dispatcher.dispatch({
                        actionTypes: actionTypes.GAME_INFO,
                        info: info,
                    });
                }
                else {
                    console.log(chalk.bgRed("Wrong id/token"));
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "wrong id or token",
                    });
                }
            }
        };
        xhr.send();
    };
    GameAction.prototype.getGameData = function (id, token) {
        var xhr = new XMLHttpRequest();
        var url = host + 'games/' + id + "?token=" + token;
        console.log(chalk.blue("Requesting: ", url));
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var info = JSON.parse(xhr.responseText);
                    console.log(chalk.green("Info: ", info));
                    dispatcher.dispatch({
                        actionTypes: actionTypes.GAME_INFO,
                        info: info,
                    });
                }
                else {
                    console.log(chalk.bgRed("Wrong id/token"));
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "wrong id or token",
                    });
                }
            }
        };
        xhr.send();
    };
    GameAction.prototype.postGameData = function (rule, user_id, token) {
        var game_id;
        var score = rule.getPoints();
        var _game = new Game(user_id, score);
        var xhr = new XMLHttpRequest();
        var s_xhr = new XMLHttpRequest();
        var s_url = host + 'games/' + "?token=" + token;
        var is_paused = rule.getPausingStatus();
        var is_ended = rule.getEndingStatus();
        if (is_paused) {
            console.log(chalk.red("This game is Paused, ES: ", is_ended, " PS: ", is_paused, "Score: ", _game.getScore()));
            _game.setScore(0);
            _game.setCompleted(false);
        }
        else {
            _game.setCompleted(true);
        }
        // console.log(chalk.blue("Posting: ", url, "ES: ", is_ended, " PS: ", is_paused, " ID: ", _game.id, "Score: ",_game.score));
        var payload = JSON.stringify(_game);
        console.log(chalk.blue("Posting sxhr: ", s_url));
        s_xhr.open("POST", s_url, true);
        s_xhr.setRequestHeader("Content-Type", "application/json");
        s_xhr.onreadystatechange = function () {
            if (s_xhr.readyState == 4) {
                if (s_xhr.status == 200 || s_xhr.status == 201) {
                    var info = s_xhr.responseText;
                    var data = JSON.parse(info);
                    game_id = data.id;
                    console.log(chalk.green("Generation Compelete: ", " Game ID: ", game_id));
                    dispatcher.dispatch({
                        actionTypes: actionTypes.GAME_POST,
                        info: info,
                    });
                    var url = host + 'games/' + game_id + "?token=" + token;
                    console.log(chalk.blue("Posting: ", url, "\nPayload: ", payload));
                    xhr.open("PATCH", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                var info_1 = xhr.responseText;
                                console.log(chalk.green("Info: ", info_1));
                                dispatcher.dispatch({
                                    actionTypes: actionTypes.GAME_POST,
                                    info: info_1,
                                });
                            }
                            else {
                                console.log(chalk.bgRed(xhr.status, " Wrong id/token"));
                                dispatcher.dispatch({
                                    actionTypes: actionTypes.ERROR,
                                    info: "Wrong id or token",
                                });
                            }
                        }
                    };
                    xhr.send(payload);
                }
                else {
                    console.log(chalk.bgRed(s_xhr.status, " Wrong id/token"));
                    dispatcher.dispatch({
                        actionTypes: actionTypes.ERROR,
                        info: "Wrong id or token",
                    });
                }
            }
        };
        s_xhr.send();
    };
    return GameAction;
}());
var game_action = new GameAction();
export default game_action;
//# sourceMappingURL=gameAction.js.map