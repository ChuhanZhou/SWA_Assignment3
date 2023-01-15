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
import { Rules } from "../models/rules";
var event_type = {
    ERROR: "ERROR",
    GAME_INFO: "GAME_INFO",
    GAME_POST: "GAME_POST"
};
var board;
var error_info = "";
var game_info;
var game_post;
var GameStore = /** @class */ (function (_super) {
    __extends(GameStore, _super);
    function GameStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameStore.prototype.addGameInfoListener = function (callback) {
        this.on(event_type.GAME_INFO, callback);
    };
    GameStore.prototype.removeGameInfoListener = function (callback) {
        this.removeListener(event_type.GAME_INFO, callback);
    };
    GameStore.prototype.addGamePostListener = function (callback) {
        this.on(event_type.GAME_POST, callback);
    };
    GameStore.prototype.removeGamePostListener = function (callback) {
        this.removeListener(event_type.GAME_POST, callback);
    };
    GameStore.prototype.addErrorListener = function (callback) {
        this.on(event_type.ERROR, callback);
    };
    GameStore.prototype.removeErrorListener = function (callback) {
        this.removeListener(event_type.ERROR, callback);
    };
    GameStore.prototype.emitChange = function (type) {
        this.emit(type);
    };
    GameStore.prototype.initGame = function (out_steps, type_list, size) {
        board = new Rules(out_steps, type_list, size);
        board.initBoard();
    };
    GameStore.prototype.getBoard = function () {
        return board;
    };
    return GameStore;
}(EventEmitter));
var gamestore = new GameStore();
dispatcher.register(function (action) {
    switch (action.actionTypes) {
        case actionTypes.ERROR:
            error_info = action.info;
            gamestore.emitChange(event_type.ERROR);
            break;
        case actionTypes.GAME_INFO:
            game_info = action.GAME_INFO;
            gamestore.emitChange(event_type.GAME_INFO);
            break;
        case actionTypes.GAME_POST:
            game_post = action.GAME_POST;
            gamestore.emitChange(event_type.GAME_POST);
            break;
        default:
            break;
    }
});
export default gamestore;
//# sourceMappingURL=gameStore.js.map