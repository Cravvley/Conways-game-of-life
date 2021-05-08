const GAME_BOARD='gameBoard'
const CELL='cell'
const FIELD='field'
const GAME_NAME='gameName'
const MAP_DIMENSIONS='mapDimensions'
const DIMENSIONS_CONTAINER="dimensionsContainer"
const NEW_GAME="startGame"
const RESET_GAME="resetGame"

const startGameBtn=document.getElementById(NEW_GAME)
const resetGameBtn=document.getElementById(RESET_GAME)
const map=document.getElementById(GAME_BOARD)
const gameName = document.getElementById(GAME_NAME)
const mapDimensions = document.getElementById(MAP_DIMENSIONS)
const dimensionsContainer=document.getElementById(DIMENSIONS_CONTAINER)

let mapDimensionsVal=0

const fieldsArr=[];

const getDimensionsValueFromInput=()=>{
    mapDimensionsVal=Number(mapDimensions.value)
}

const addRemoveCell=e=>{
    if(e.target.classList.contains(CELL)){
        e.target.classList.remove(CELL)
    }else{
        e.target.className+= ' ' + CELL
    }  
}

const mapGenerator=()=>{
    const mapHeight=map.clientHeight/mapDimensionsVal + 'px'
    for(let i=0;i<mapDimensionsVal*mapDimensionsVal;++i){
        const div=document.createElement(`div`)
        div.className=FIELD
        div.style.flexBasis=100/mapDimensionsVal +'%'
        div.style.height= mapHeight
        div.addEventListener('click',addRemoveCell)
        map.append(div)
    } 
}

const newGame=()=>{
    if(mapDimensionsVal>=3 && mapDimensionsVal<=65){
        map.style.visibility="visible"
        resetGameBtn.style.visibility="visible"
        startGameBtn.style.visibility="hidden"
        gameName.style.visibility="hidden"
        dimensionsContainer.style.visibility="hidden"
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
    startGameBtn.style.visibility="visible"
    gameName.style.visibility="visible"
    dimensionsContainer.style.visibility="visible"
}

startGameBtn.addEventListener('click',newGame)
resetGameBtn.addEventListener('click',resetGame)
mapDimensions.addEventListener('change',getDimensionsValueFromInput)
