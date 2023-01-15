import { v4 as uuidv4 } from 'uuid';
var chalk = require("chalk");
var Game = /** @class */ (function () {
    function Game(user_id, score) {
        this.completed = false;
        this.user = user_id;
        this.score = score;
    }
    Game.prototype.getId = function () {
        return this.id;
    };
    Game.prototype.setId = function (value) {
        this.id = value;
    };
    Game.prototype.generate_id = function () {
        this.id = uuidv4();
        console.log(chalk.green("[Game_obj] created UUID for game: ", this.id));
    };
    Object.defineProperty(Game.prototype, "userId", {
        get: function () {
            return this.user;
        },
        set: function (value) {
            this.user = value;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.getScore = function () {
        return this.score;
    };
    Game.prototype.setScore = function (value) {
        this.score = value;
    };
    Game.prototype.getCompleted = function () {
        return this.completed;
    };
    Game.prototype.setCompleted = function (value) {
        this.completed = value;
    };
    return Game;
}());
export { Game };
//# sourceMappingURL=game.js.map