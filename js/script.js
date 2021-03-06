const player = (name,symbol) => {
    
    //Player Name
    this.name = name;
    //Player Move
    //Player Symbol
    this.symbol = symbol;
    return {name,symbol};
}

playerOne = player('Miguel','X');
playerTwo = player('Perez','O');
let currentPlayer = playerTwo;

const gameBoard = (function (){
    //Gameboard Array
    let currentBoard = ['','','','','','','','','',''];
    //Checks for wins
    const gameWon = () => {

        if(currentBoard[4]!=''){
            if((currentBoard[4]==currentBoard[0] && currentBoard[4]==currentBoard[8])){
                return true;
            }
            if((currentBoard[4]==currentBoard[2] && currentBoard[4]==currentBoard[6])){
                return true;
            }
            if((currentBoard[4]==currentBoard[1] && currentBoard[4]==currentBoard[7])){
                return true;
            }
            if((currentBoard[4]==currentBoard[3] && currentBoard[4]==currentBoard[5])){
                return true;
            }
            
        }

        if(currentBoard[0]!=''){
            if(currentBoard[0]==currentBoard[1] && currentBoard[0]==currentBoard[2]){
                return true;
            }
            if(currentBoard[0]==currentBoard[3] && currentBoard[0]==currentBoard[6]){
                return true;
            }
        }

        if(currentBoard[8]!=''){
            if((currentBoard[8]==currentBoard[2] && currentBoard[8]==currentBoard[5])){
                return true;
            }
            if((currentBoard[8]==currentBoard[7] && currentBoard[8]==currentBoard[6])){
                return true;
            }
        }

    }

    const gameDraw = () => {
        let notEmpty=0;
        for(let i=0; i<currentBoard.length; i++){
            if(currentBoard[i]!=''){
                notEmpty++;
            }
        }
        if(notEmpty==9){
            return true;
        }
    }
    return{currentBoard,gameWon,gameDraw};
})();

const displayController = (function (){
     //Displays gameboard array

    //Updates with every move
    const newMove = () =>{
        const positionToggle = document.querySelectorAll('.position');
        positionToggle.forEach((positon) => positon.addEventListener('click',_addSymbol));
        
        if(gameBoard.gameWon()){
            console.log(currentPlayer.name);
        }

        if(gameBoard.gameDraw()){
            console.log('It is a draw!');
        }
        _displayBoard(gameBoard);
        _playerToggle();
        
    }

    const _addSymbol = (e) => {
        let id=e.target.id;
        for(let i=0;i<gameBoard.currentBoard.length;i++){
            if(id==`position${i}`){
                if(currentPlayer.symbol=='X'){
                    if(gameBoard.currentBoard[i]!=''){
                        playerToggle();
                        return;
                    }
                    gameBoard.currentBoard[i]='X';
                }
                
                if(currentPlayer.symbol=='O'){
                    if(gameBoard.currentBoard[i]!=''){
                        playerToggle();
                        return;
                    }
                    gameBoard.currentBoard[i]='O';
                }
            }
        }

    }

    const _displayBoard = ()=>{
        const positions = document.querySelectorAll('.position');
        _fillBoard(positions);
    };

    const _fillBoard = (position) =>{
        for(let i = 0; i<position.length;i++){
            position[i].textContent = gameBoard.currentBoard[i];
        }
    };
    //Updates display on win
    const _playerToggle = () => {
        
        if(currentPlayer.symbol=='X'){
            playerTurn = 2;
        }else{
            playerTurn = 1;
        }

        if(playerTurn == 2){
            currentPlayer=playerTwo;
        }else{
            currentPlayer=playerOne;
        }
    }
    return {newMove};
})();



displayController.newMove();
const updateCheck = document.querySelectorAll('.position');
updateCheck.forEach((positon,i) => positon.addEventListener('click',displayController.newMove));

