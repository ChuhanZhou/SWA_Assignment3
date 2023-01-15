import * as React from 'react'

import user_action from '../actions/userAction'
import user_store from '../stores/userStore'
import game_store from '../stores/gameStore'
import game_action from '../actions/gameAction'
import { Position, BoardListener,Piece,Board } from '../models/board';

var itemsSelected: Array<Position>;
export class GameBoard extends React.Component<{},{pieceList:Piece<string>[][],steps:number,points:number}> {
    constructor(props) {
      super(props)
       let type_list = ["A", "B", "C"]
        let size = [6, 6]
        game_store.initGame(10, type_list, size)
        let gameBoard = game_store.getBoard().getGameBoard()
        itemsSelected =[]

       this.state = {
         pieceList: gameBoard.piece_list,
         steps: game_store.getBoard().getOut_steps(),
         points: game_store.getBoard().getPoints()
       };

    }

      getPieces = game_store.getBoard().getGameBoard().piece_list.map((pieces,index) => {
        return pieces.map((piece,j)=>{
            var idt = 'borad-item'+piece.getPosition().getRow()+piece.getPosition().getCol()
            return (<button style={{}} className='board-item' id={idt} onClick={()=>clickItem(piece.getPosition())}>{piece.type}</button>)
        })       
        })

      render() {
        return (
            <div>
            <div>Steps left:  {this.state.steps}</div>
            <div>Total Score: {this.state.points}</div>
          <div>
             {this.getPieces}
          </div>
          </div>
        )
      }
}



function clickItem(position:Position){
    if(itemsSelected.length==1)
    {
        if(this.state.steps>0)
        {
            game_store.getBoard().play(itemsSelected[0],position)
            itemsSelected =[]
            this.setState.points = game_store.getBoard().getPoints()
            this.setState.steps = game_store.getBoard().getOut_steps()
        }else{
            game_action.postGameData(game_store.getBoard(),user_store.getUser().id,user_store.getToken())

        }
    }
    else{
        itemsSelected.push(position)
    }
    
}

function Game() {
    return (<GameBoard/>)
  }
  
  export default Game;