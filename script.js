const GAME_BOARD='gameBoard'
const CELL='cell'
const FIELD='field'
const GAME_NAME='gameName'
const MAP_DIMENSIONS='mapDimensions'
const DIMENSIONS_CONTAINER="dimensionsContainer"
const NEW_GAME="startGame"
const RESET_GAME="resetGame"
const NEXT_MOVE="nextMove"
const START_AUTO_GAME="startAutoGame"
const STOP_AUTO_GAME="stopAutoGame"

const startGameBtn=document.getElementById(NEW_GAME)
const resetGameBtn=document.getElementById(RESET_GAME)
const nextMoveBtn=document.getElementById(NEXT_MOVE)
const startAutoGameBtn=document.getElementById(START_AUTO_GAME)
const stopAutoGameBtn=document.getElementById(STOP_AUTO_GAME)
const map=document.getElementById(GAME_BOARD)
const gameName = document.getElementById(GAME_NAME)
const mapDimensions = document.getElementById(MAP_DIMENSIONS)
const dimensionsContainer=document.getElementById(DIMENSIONS_CONTAINER)

let mapDimensionsVal=0

let fieldsArr=[]

const getDimensionsValueFromInput=()=>{
    mapDimensionsVal=Number(mapDimensions.value)
}

const addRemoveCell=e=>{
    const i= Number(e.target.getAttribute('i'))
    const j= Number(e.target.getAttribute('j'))

    if(e.target.classList.contains(CELL)){
        e.target.classList.remove(CELL)
        fieldsArr[i][j]=false
    }else{
        e.target.className+= ' ' + CELL
        fieldsArr[i][j]=true
    }  
}

const mapGenerator=()=>{
    const mapHeight=map.clientHeight/mapDimensionsVal + 'px'
    for(let i=0;i<mapDimensionsVal;++i){
        for(let j=0;j<mapDimensionsVal;j++){  
            const div=document.createElement(`div`)
            div.className=FIELD
            div.setAttribute("i",i)
            div.setAttribute("j",j)
            div.style.flexBasis=100/mapDimensionsVal +'%'
            div.style.height= mapHeight
            div.addEventListener('click',addRemoveCell)
            
            map.append(div)
        }
        
    } 
}


const nextMove=()=>{
    
    const newFieldsState=Array.from(Array(mapDimensionsVal), () => new Array(mapDimensionsVal).fill(false))
  
    const allFields=document.querySelectorAll(".field");
    
    allFields.forEach(item=>{
        if(item.classList.contains(CELL)){
            item.classList.remove(CELL)
        }
    })

    for(let i=0;i<mapDimensionsVal;++i){
        let neighborCount=0
        for(let j=0;j<mapDimensionsVal;++j){

            if(i-1>=0){
                if(fieldsArr[i-1][j]===true){
                    neighborCount++;
                } 
                if(j-1>=0){
                    if(fieldsArr[i-1][j-1]===true){
                        neighborCount++;
                    } 
                }
                if(j+1<mapDimensionsVal){
                    if(fieldsArr[i-1][j+1]===true){
                        neighborCount++;
                    } 
                } 
            }

            if(i+1<mapDimensionsVal){
                if(fieldsArr[i+1][j]===true){
                    neighborCount++;
                } 
                if(j-1>=0){
                    if(fieldsArr[i+1][j-1]===true){
                        neighborCount++;
                    } 
                }
                if(j+1<mapDimensionsVal){
                    if(fieldsArr[i+1][j+1]===true){
                        neighborCount++;
                    } 
                } 
            }

            if(fieldsArr[i][j+1]===true){
                neighborCount++;
            }

            if(fieldsArr[i][j-1]===true){
                neighborCount++;
            }

            if((neighborCount===3||neighborCount===2)&& fieldsArr[i][j]===true){
                newFieldsState[i][j]=true
            }else if(neighborCount===3){
                newFieldsState[i][j]=true
            }
        }    
    }

    for(let i=0;i<mapDimensionsVal;++i){
        for(let j=0;j<mapDimensionsVal;++j){
            const fieldItem=document.querySelector(`[i="${i}"][j="${j}"]`)
            if(newFieldsState[i][j]===true){
                fieldItem.classList.add(CELL)
            }
        }
    }
    console.log("oryginal:")
    console.log(fieldsArr)
    console.log("kopia:")
    console.log(newFieldsState)
    fieldsArr=newFieldsState
}

const newGame=()=>{
    if(mapDimensionsVal>=3 && mapDimensionsVal<=65){
        map.style.visibility="visible"
        startAutoGameBtn.style.visibility="visible"
        stopAutoGameBtn.style.visibility="visible"
        resetGameBtn.style.visibility="visible"
        nextMoveBtn.style.visibility="visible"
        startGameBtn.style.visibility="hidden"        
        
        gameName.style.visibility="hidden"
        dimensionsContainer.style.visibility="hidden"
        fieldsArr=Array.from(Array(mapDimensionsVal), () => new Array(mapDimensionsVal).fill(false))
        mapGenerator()
    }
    else{
        alert("Map is too small or too big, type value between three or sixty-five")
    }
}

const resetGame=()=>{
    map.innerHTML=''
    map.style.visibility="hidden"
    resetGameBtn.style.visibility="hidden"
    nextMoveBtn.style.visibility="hidden"
    startAutoGameBtn.style.visibility="hidden"
    stopAutoGameBtn.style.visibility="hidden"
    startGameBtn.style.visibility="visible"
    gameName.style.visibility="visible"
    dimensionsContainer.style.visibility="visible"
}

const startAutoGame=()=>{
    setInterval(nextMove,1000)
}

const stopAutoGame=()=>{
    clearInterval()
}

startGameBtn.addEventListener('click',newGame)
resetGameBtn.addEventListener('click',resetGame)
nextMoveBtn.addEventListener('click',nextMove)
mapDimensions.addEventListener('change',getDimensionsValueFromInput)
startAutoGameBtn.addEventListener('click',startAutoGame)
stopAutoGameBtn.addEventListener('click',stopAutoGame)
