const player = (name,symbol) => {
    
    //Player Name
    this.name = name;
    //Player Move
    //Player Symbol
    this.symbol = symbol;
    return {name,symbol};
}



const gameBoard = (function (){
    //Gameboard Array
    let currentBoard = ['','','','','','','','','',''];
    playerOne = player('Player One','X');
    playerTwo = player('Player Two','O');
    let currentPlayer = playerTwo;
    //Checks for wins
    const gameWon = () => {

        if(gameBoard.currentBoard[4]!=''){
            if((gameBoard.currentBoard[4]==gameBoard.currentBoard[0] && gameBoard.currentBoard[4]==gameBoard.currentBoard[8])){
                return true;
            }
            if((gameBoard.currentBoard[4]==gameBoard.currentBoard[2] && gameBoard.currentBoard[4]==gameBoard.currentBoard[6])){
                return true;
            }
            if((gameBoard.currentBoard[4]==gameBoard.currentBoard[1] && gameBoard.currentBoard[4]==gameBoard.currentBoard[7])){
                return true;
            }
            if((gameBoard.currentBoard[4]==gameBoard.currentBoard[3] && gameBoard.currentBoard[4]==gameBoard.currentBoard[5])){
                return true;
            }
            
        }

        if(gameBoard.currentBoard[0]!=''){
            if(gameBoard.currentBoard[0]==gameBoard.currentBoard[1] && gameBoard.currentBoard[0]==gameBoard.currentBoard[2]){
                return true;
            }
            if(gameBoard.currentBoard[0]==gameBoard.currentBoard[3] && gameBoard.currentBoard[0]==gameBoard.currentBoard[6]){
                return true;
            }
        }

        if(gameBoard.currentBoard[8]!=''){
            if((gameBoard.currentBoard[8]==gameBoard.currentBoard[2] && gameBoard.currentBoard[8]==gameBoard.currentBoard[5])){
                return true;
            }
            if((gameBoard.currentBoard[8]==gameBoard.currentBoard[7] && gameBoard.currentBoard[8]==gameBoard.currentBoard[6])){
                return true;
            }
        }

    }

    const gameDraw = () => {
        let notEmpty=0;
        for(let i=0; i<gameBoard.currentBoard.length; i++){
            if(gameBoard.currentBoard[i]!=''){
                notEmpty++;
            }
        }
        if(notEmpty==9){
            return true;
        }
    }

    const newMove = () =>{
        const positionToggle = document.querySelectorAll('.position');
        positionToggle.forEach((positon) => positon.addEventListener('click',_addSymbol));
        
        if(gameWon()){
            const body = document.querySelector('body');
            const winDiv = document.createElement('div');
            winDiv.setAttribute('id','message');
            winDiv.setAttribute('class','winningMessage');
            winDiv.textContent = `CONGRAGULATIONS ${currentPlayer.name.toUpperCase()} YOU WON!!!`;
            body.appendChild(winDiv);

            const container = document.querySelector('#container');
            container.style.pointerEvents = 'none';

        }

        if(gameDraw()&&gameWon()!=true){
            const body = document.querySelector('body');
            const winDiv = document.createElement('div');
            winDiv.setAttribute('id','message');
            winDiv.setAttribute('class','drawMessage');
            winDiv.textContent = `IT IS A DRAW`;
            body.appendChild(winDiv); 

            const container = document.querySelector('#container');
            container.style.pointerEvents = 'none';
        }
        displayController.displayBoard();
        _playerToggle();
        
    }

    const _addSymbol = (e) => {
        let id=e.target.id;
        for(let i=0;i<gameBoard.currentBoard.length;i++){
            if(id==`position${i}`){
                if(currentPlayer.symbol=='X'){
                    if(gameBoard.currentBoard[i]!=''){
                        _playerToggle();
                        return;
                    }
                    gameBoard.currentBoard[i]='X';
                }
                
                if(currentPlayer.symbol=='O'){
                    if(gameBoard.currentBoard[i]!=''){
                        _playerToggle();
                        return;
                    }
                    gameBoard.currentBoard[i]='O';
                }
            }
        }

    }

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
    
    const reset = () => {
        gameBoard.currentBoard = ['','','','','','','','','',''];
        if(document.querySelector('#message')){
            document.getElementById('message').remove();
        }
        displayController.displayBoard();
        const container = document.querySelector('#container');
        container.style.pointerEvents = 'auto';
    }

    const resetButton = document.querySelector('#restart');
    resetButton.addEventListener('click',reset);
    return{currentBoard,newMove,playerOne,playerTwo};
})();

const displayController = (function (){

    const playerNameChange = (e) =>{
        if(e.target.id=='playerOneName'){
            gameBoard.playerOne.name = prompt('What is player one\'s name','Player One');
            _displayPlayerName();
        }
        if(e.target.id=='playerTwoName'){
            gameBoard.playerTwo.name = prompt('What is player two\'s name','Player Two');
            _displayPlayerName();
        }
    }
    
    const _displayPlayerName = () => {
        const nameOne = document.getElementById('nameOne');
        const nameTwo = document.getElementById('nameTwo');

        nameOne.textContent=gameBoard.playerOne.name;
        nameTwo.textContent=gameBoard.playerTwo.name;
    }
    
    
    const displayBoard = ()=>{
        const positions = document.querySelectorAll('.position');
        _displayPlayerName();
        _fillBoard(positions);
    };

    const _fillBoard = (position) =>{
        for(let i = 0; i<position.length;i++){
            position[i].textContent = gameBoard.currentBoard[i];
        }
    };

    const nameChange = document.querySelectorAll('.name');
    nameChange.forEach(button => button.addEventListener('click',playerNameChange));
    return {displayBoard};
})();



gameBoard.newMove();
const updateCheck = document.querySelectorAll('.position');
updateCheck.forEach((positon,i) => positon.addEventListener('click',gameBoard.newMove));



