"use strict";
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
exports.__esModule = true;
var events_1 = require("events");
var dispatcher_1 = require("../dispatcher");
var actionTypes_1 = require("../actions/actionTypes");
var rules_1 = require("../models/rules");
var game_1 = require("../models/game");
var event_type = {
    ERROR: "ERROR",
    GAME_INFO: "GAME_INFO",
    GAME_POST: "GAME_POST",
    GAME_ARR: "GAME_ARR"
};
var board;
var error_info = "";
var single_game;
var gameArray = new Array;
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
    GameStore.prototype.addGameARRListener = function (callback) {
        this.on(event_type.GAME_ARR, callback);
    };
    GameStore.prototype.removeGameARRListener = function (callback) {
        this.removeListener(event_type.GAME_ARR, callback);
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
        board = new rules_1.Rules(out_steps, type_list, size);
        board.initBoard();
    };
    GameStore.prototype.getBoard = function () {
        return board;
    };
    GameStore.prototype.getGameArray = function () {
        return gameArray;
    };
    GameStore.prototype.getSingleGame = function () {
        return single_game;
    };
    return GameStore;
}(events_1.EventEmitter));
var gamestore = new GameStore();
dispatcher_1["default"].register(function (action) {
    switch (action.actionTypes) {
        case actionTypes_1["default"].ERROR:
            error_info = action.info;
            gamestore.emitChange(event_type.ERROR);
            break;
        case actionTypes_1["default"].GAME_ARR:
            console.log(">>GAME_ARR<<", action.g_array);
            gameArray = action.g_array;
            var game_info = action.info;
            gamestore.emitChange(event_type.GAME_ARR);
            break;
        case actionTypes_1["default"].GAME_INFO:
            console.log(">>GAME_INFO<<", action.info);
            single_game = new game_1.Game(action.user_id, action.score);
            single_game.id = action.id;
            single_game.completed = action.completed;
            //console.log(">>GAME_INFO_DONE<<",single_game.completed,action.completed)
            gamestore.emitChange(event_type.GAME_INFO);
            break;
        case actionTypes_1["default"].GAME_POST:
            var game_post = action.GAME_POST;
            gamestore.emitChange(event_type.GAME_POST);
            break;
        default:
            break;
    }
});
exports["default"] = gamestore;
