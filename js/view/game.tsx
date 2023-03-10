import * as React from 'react'

import user_action from '../actions/userAction'
import user_store from '../stores/userStore'
import game_store from '../stores/gameStore'
import game_action from '../actions/gameAction'
import { Position, BoardListener,Piece,Board } from '../models/board';
import {Game} from '../models/game'
import Home from "./home";
import * as ReactDOM from 'react-dom'
//import './style.css'

var itemsSelected: Array<Position>;
export class GameBoard extends React.Component<{},{pieceList:Piece<string>[][],steps:number,points:number,rank:Array<Game>,showgame:string,showrank:string}> {
    constructor(props) {
      super(props)
       let type_list = ["A", "B", "C","D","E"]
        let size = [5, 5]
        game_store.initGame(10, type_list, size)
        itemsSelected =[]

       this.state = {
         pieceList: game_store.getBoard().getGameBoard().piece_list,
         steps: game_store.getBoard().getOut_steps(),
         points: game_store.getBoard().getPoints(),
         rank : game_store.getGameArray(),
         showgame: 'block',
         showrank: 'none'
       };

    
    game_store.addGameInfoListener(()=>{
        console.log("game info changed")

    })

    game_store.addGameARRListener(()=>{
        let gameA =game_store.getGameArray()
        console.log("game ARP changed"+gameA.length)
        gameA.forEach(ele=>{
            console.log(ele.getScore())
        })
        this.setState({
            rank : game_store.getGameArray()
            
        })
    })
}    

        clickItem(position:Position){
            if(this.state.steps<=0)
            {
                
                game_action.postGameData(game_store.getBoard(),user_store.getUser().id,user_store.getToken())
                game_action.getAllGameData(user_store.getToken())
                let user = user_store.getUser()
                user.addNewScore(this.state.points)
                user_action.updateUserInfo(user,user_store.getToken())
                this.setState({
                    showgame: 'none',
                    showrank:'block',
                    rank: game_store.getGameArray()
                })
            }
        else{
            if(itemsSelected.length==1)
                {
                    game_store.getBoard().play(itemsSelected[0],position)
                    itemsSelected =[]
                    this.setState({
                        pieceList: game_store.getBoard().getGameBoard().piece_list,
                        points : game_store.getBoard().getPoints(),
                        steps : game_store.getBoard().getOut_steps(),
                        rank: game_store.getGameArray()
                    })
        
                }
            else{
                itemsSelected.push(position)
                this.setState({
                    points : game_store.getBoard().getPoints(),
                    steps : game_store.getBoard().getOut_steps()
                })
          }

        }
    }
        
        back(){
            ReactDOM.render(<Home/>, document.getElementById('root'));
        }

      render() {
        return (
            <div>
                <div className='game' style={{display:this.state.showgame}}>
            <div>Steps left:  {this.state.steps}</div>
            <div>Total Score: {this.state.points}</div>
          <div className='board' style={{width:'550px',height:'550px', position:'absolute',backgroundColor: 'antiquewhite',marginLeft:'400px',marginTop:'100px'}}>
          {this.state.pieceList.map((pieces,index) => {
                return pieces.map((piece,j)=>{
                    var idt = 'borad-item'+piece.getPosition().getRow()+piece.getPosition().getCol()
                    return (<button style={{float: 'left',
                        width:'100px',
                        height:'100px',
                        backgroundColor:'rgb(229, 229, 229)',
                        textAlign:'center',
                        lineHeight:'100px',
                        border:'1px solid #fff'}} key={j} className='board-item' id={idt} onClick={()=>this.clickItem(piece.getPosition())}>{piece.type}</button>)
        })       
        })}
          </div>
          
          </div>
          <div className='rank' style={{display:this.state.showrank}}>
            <div>Congratulations! your score is {this.state.points}</div>
            <br/>
            <div>Top 10 RANK</div>
          <table>
          <thead>
        <tr><th>Id</th><th>Score</th></tr>
      </thead>
            <tbody> 
            {this.state.rank.map((games,index) => {
                return (<tr key={index}>
                    <td>{games.getUser_id()}</td>
                    <td>{games.getScore()}</td>
                </tr>)      
        })}</tbody>
        </table>
        <button onClick={()=>this.back()}>BACK</button>
        </div>
          </div>
        )
    } 
}


function Gameboard() {
    return (<GameBoard/>)
  }
  
  export default Gameboard;