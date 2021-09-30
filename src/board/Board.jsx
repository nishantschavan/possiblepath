import React ,{useState} from 'react'
import "./Board.css";
import { useInterval } from '../lib/utils';
const BOARD_SIZE =5;

const Board = () => {

    const active = [];
    active.push(1);

    const [boardofmatrix, setboardofmatrix] = useState(createBoard(BOARD_SIZE));
    const [visitedcell,setVisitedcell] = useState(boardofmatrix[0][0]);
    const [initpos,setinitpos] = useState(0);

    const activeconst = new Set();
   
    const allpaths = [];

    const findpath=()=>{
        printMatrix(boardofmatrix,3,2,0,0);
        animateallpaths(allpaths);
    }

    useInterval(()=>{
        // findpath();
        // animateallpaths(allpaths);
    },500);

    const animateallpaths =(allpaths)=>{
        if(initpos<allpaths.length-1){
            setinitpos(initpos+1);
            setVisitedcell(boardofmatrix[allpaths[initpos].i][allpaths[initpos].j]);
            // console.log(boardofmatrix[allpaths[initpos].i][allpaths[initpos].j]);
        }
    }

    const printMatrixutil=(boardofmatrix,m,n,i,j,path,visited)=>{

        if(i<0 || j<0 || i>=m || j>=n || visited[i][j]) return ;

        if(i===m-1 && j===n-1){
            path.push(boardofmatrix[i][j]);
            path.pop();
            return ;
        }
        else{
            // if(isValid(boardofmatrix[i][j])){
                visited[i][j]=true;
                allpaths.push({i,j});
                path.push(boardofmatrix[i][j]);
                printMatrixutil(boardofmatrix,m,n,i+1,j,path,visited);
                printMatrixutil(boardofmatrix,m,n,i-1,j,path,visited);
                printMatrixutil(boardofmatrix,m,n,i,j-1,path,visited);
                printMatrixutil(boardofmatrix,m,n,i,j+1,path,visited);
                path.pop();
                visited[i][j]=false;
            // }
        }
    }

    const printMatrix =(boardofmatrix,m,n,i,j)=>{
        const visited = [];
        for(let i=0;i<BOARD_SIZE;i++){
            const rowvisited = [];
            for(let j=0;j<BOARD_SIZE;j++){
                rowvisited.push(false);
            }
            visited.push(rowvisited);
        }
        const path=[];
        printMatrixutil(boardofmatrix,m,n,i,j,path,visited);
    }

    return (
        <>
            <div className="board">
                {boardofmatrix.map((row,rowIdx)=>(
                    <div key={rowIdx} className="row">
                        {row.map((cell,cellIdx)=>{
                            let className = getClassName(
                                cell,
                                visitedcell,
                                activeconst,
                            );
                            if(className === "cell cell-orange"){
                                if(active.includes(cell)){
                                    className="cell cell-red";
                                }
                                else{
                                    console.log(activeconst);
                                    active.push(cell);
                                    activeconst.add(cell);
                                }
                            }
                            return <div key={cellIdx} className={className}>
                                {cell}
                            </div>;
                        })}
                    </div>
                ))}
            </div>
            <div className="btn">
                <button onClick={findpath}>Click</button>
            </div>
        </>
    );
 
}

const createBoard =(BOARD_SIZE)=>{
    let counter=1;
    const board=[];
    for(let i=0;i<BOARD_SIZE;i++){
        const row = [];
        for(let j=0;j<BOARD_SIZE;j++){
            row.push(counter++);
        }
        board.push(row);
    }
    return board;
}

const getClassName = (
    cell,
    visitedcell,
    activeconst
)=>{
    let className ='cell';
    if(activeconst.has(cell)){
        className= 'cell cell-red';
    }
    else if(cell === visitedcell){
        className ='cell cell-orange';
    }
    return className;
}



export default Board
