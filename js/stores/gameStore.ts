import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import actionTypes from "../actions/actionTypes";
import { Rules } from "../models/rules";
import { Game } from "../models/game";

const event_type = {
    ERROR: "ERROR",
    GAME_INFO: "GAME_INFO",
    GAME_POST: "GAME_POST",
    GAME_ARR:"GAME_ARR"
};
let board;
let error_info = "";
let single_game;
let gameArray = new Array<Game>
class GameStore extends EventEmitter {

    addGameInfoListener(callback: any) {
        this.on(event_type.GAME_INFO, callback);
    }
    removeGameInfoListener(callback: any) {
        this.removeListener(event_type.GAME_INFO, callback);
    }

    addGameARRListener(callback: any) {
        this.on(event_type.GAME_ARR, callback);
    }
    removeGameARRListener(callback: any) {
        this.removeListener(event_type.GAME_ARR, callback);
    }

    addGamePostListener(callback: any) {
        this.on(event_type.GAME_POST, callback);
    }
    removeGamePostListener(callback: any) {
        this.removeListener(event_type.GAME_POST, callback);
    }
    addErrorListener(callback: any) {
        this.on(event_type.ERROR, callback);
    }

    removeErrorListener(callback: any) {
        this.removeListener(event_type.ERROR, callback);
    }

    emitChange(type: string) {
        this.emit(type);
    }

    initGame(out_steps: number, type_list: Array<string>, size: Array<number>) {
        board = new Rules(out_steps, type_list, size)
        board.initBoard()
    }

    getBoard(): Rules {
        return board;
    }

    getGameArray(): Array<Game>{
        return gameArray;
    }

    getSingleGame():Game{
        return single_game;
    }
    
    
}

const gamestore = new GameStore()
dispatcher.register((action: any) => {
    switch (action.actionTypes) {
        case actionTypes.ERROR:
            error_info = action.info;
            gamestore.emitChange(event_type.ERROR);
            break;
        case actionTypes.GAME_ARR:
            console.log(">>GAME_ARR<<",action.g_array)
            gameArray = action.g_array;
            let game_info = action.info;
            gamestore.emitChange(event_type.GAME_ARR);
            break;
        case actionTypes.GAME_INFO:
            console.log(">>GAME_INFO<<",action.info)
            single_game = new Game(action.user_id, action.score)
            single_game.id = action.id;
            single_game.completed = action.completed;
            //console.log(">>GAME_INFO_DONE<<",single_game.completed,action.completed)
            gamestore.emitChange(event_type.GAME_INFO);
            break;
        case actionTypes.GAME_POST:
            let game_post = action.GAME_POST;
            gamestore.emitChange(event_type.GAME_POST);
            break;
        default:
            break;
    }
})

export default gamestore;