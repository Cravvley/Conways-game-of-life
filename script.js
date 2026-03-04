const GAME_BOARD='gameBoard'
const CELL='cell'
const FIELD='field'
const GAME_NAME='gameName'
const MAP_DIMENSIONS='mapDimensions'
const START_SCREEN="startScreen"
const NEW_GAME="startGame"
const RESET_GAME="resetGame"
const NEXT_MOVE="nextMove"
const START_AUTO_GAME="startAutoGame"
const STOP_AUTO_GAME="stopAutoGame"
const RANDOM_MAP_FILL="randomMapFill"
const HOW_MANY_MOVES_AT_ONCE_CONTIANER="howManyMovesAtOnceContainer"
const HOW_MANY_MOVES_AT_ONCE_INPUT="howManyMovesAtOnceInput"

const startGameBtn=document.getElementById(NEW_GAME)
const resetGameBtn=document.getElementById(RESET_GAME)
const nextMoveBtn=document.getElementById(NEXT_MOVE)
const startAutoGameBtn=document.getElementById(START_AUTO_GAME)
const stopAutoGameBtn=document.getElementById(STOP_AUTO_GAME)
const map=document.getElementById(GAME_BOARD)
const gameName = document.getElementById(GAME_NAME)
const mapDimensions = document.getElementById(MAP_DIMENSIONS)
const startScreenEl=document.getElementById(START_SCREEN)
const howManyMovesAtOnceContainer=document.getElementById(HOW_MANY_MOVES_AT_ONCE_CONTIANER)
const howManyMovesAtOnceInput=document.getElementById(HOW_MANY_MOVES_AT_ONCE_INPUT)

let mapDimensionsVal=0
let intervalId
let fieldsArr=[]
let generationCount=0

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

const mapGenerator=(random)=>{
    const mapHeight=map.clientHeight/mapDimensionsVal + 'px'
    for(let i=0;i<mapDimensionsVal;++i){
        for(let j=0;j<mapDimensionsVal;j++){  
            const div=document.createElement(`div`)
            div.className=FIELD

            if(random){
                if(Math.floor(Math.random()*5)===0){
                    div.classList.add(CELL)
                    fieldsArr[i][j]=true
                }
            }

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
    let howManyMoves=Math.max(1,Math.min(100,Number(howManyMovesAtOnceInput.value)||1))
   
    for(let i=0;i<howManyMoves;++i){
        const newFieldsState=Array.from(Array(mapDimensionsVal), () => new Array(mapDimensionsVal).fill(false))
        const allFields=document.querySelectorAll(".field");
    
        allFields.forEach(item=>{
            if(item.classList.contains(CELL)){
                item.classList.remove(CELL)
            }
        })
    
        let neighborCount=0
        for(let i=0;i<mapDimensionsVal;++i){
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
    
                if(j+1<mapDimensionsVal){
                    if(fieldsArr[i][j+1]===true){
                        neighborCount++;        
                    }
                }
    
                if(j-1>=0){
                    if(fieldsArr[i][j-1]===true){
                        neighborCount++;
                    }
                }
    
                if((neighborCount===3||neighborCount===2)&& fieldsArr[i][j]===true){
                    newFieldsState[i][j]=true
                }else if(neighborCount===3){
                    newFieldsState[i][j]=true
                }
    
                neighborCount=0
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
        if(invokeStopAutoGameIfNoChanges(fieldsArr,newFieldsState)){
            return
        }
        fieldsArr=newFieldsState
        generationCount++
        const counterEl=document.getElementById('generationCounter')
        if(counterEl) counterEl.textContent='Gen: '+generationCount
    }
}

const invokeStopAutoGameIfNoChanges=(original,newArr)=>{
    for(let i=0;i<mapDimensionsVal;++i){
        for(let j=0;j<mapDimensionsVal;++j){
            if(original[i][j]!=newArr[i][j]){
                return;
            }
        }
    }
    stopAutoGame()
    showGameOver()
}

const showGameOver=()=>{
    const overlay=document.getElementById('gameOverOverlay')
    const text=document.getElementById('gameOverText')
    if(overlay&&text){
        text.textContent='Simulation complete — no more changes'
        overlay.classList.add('visible')
        overlay.setAttribute('aria-hidden','false')
    }
}

const hideGameOver=()=>{
    const overlay=document.getElementById('gameOverOverlay')
    if(overlay){
        overlay.classList.remove('visible')
        overlay.setAttribute('aria-hidden','true')
    }
}

const showDimensionsError=(msg)=>{
    const el=document.getElementById('dimensionsError')
    const input=document.getElementById(MAP_DIMENSIONS)
    if(el){
        el.textContent=msg
        el.classList.add('visible')
    }
    if(input) input.classList.add('error')
}

const hideDimensionsError=()=>{
    const el=document.getElementById('dimensionsError')
    const input=document.getElementById(MAP_DIMENSIONS)
    if(el){
        el.textContent=''
        el.classList.remove('visible')
    }
    if(input) input.classList.remove('error')
}

const newGame=()=>{
    getDimensionsValueFromInput()
    hideDimensionsError()
    const val=Number(mapDimensions.value)
    if(val>=3 && val<=65){
        mapDimensionsVal=val
        generationCount=0
        const counterEl=document.getElementById('generationCounter')
        if(counterEl) counterEl.textContent='Gen: 0'
        const gameControls=document.getElementById('gameControls')
        if(gameControls) gameControls.style.visibility="visible"
        map.style.visibility="visible"
        startAutoGameBtn.style.visibility="visible"
        stopAutoGameBtn.style.visibility="visible"
        howManyMovesAtOnceContainer.style.visibility="visible"
        resetGameBtn.style.visibility="visible"
        nextMoveBtn.style.visibility="visible"
        if(startScreenEl) startScreenEl.style.display="none"
        howManyMovesAtOnceInput.value=1
        fieldsArr=Array.from(Array(mapDimensionsVal), () => new Array(mapDimensionsVal).fill(false))
        const isRand=document.getElementById("randomInput").checked;
        mapGenerator(isRand)
    }
    else{
        showDimensionsError('Enter a value between 3 and 65')
    }
}

const resetGame=()=>{
    hideGameOver()
    map.innerHTML=''
    const gameControls=document.getElementById('gameControls')
    if(gameControls) gameControls.style.visibility="hidden"
    map.style.visibility="hidden"
    resetGameBtn.style.visibility="hidden"
    nextMoveBtn.style.visibility="hidden"
    startAutoGameBtn.style.visibility="hidden"
    stopAutoGameBtn.style.visibility="hidden"
    howManyMovesAtOnceContainer.style.visibility="hidden"
    if(startScreenEl) startScreenEl.style.display="flex"
    clearInterval(intervalId);
}

const startAutoGame=()=>{
    intervalId=setInterval(nextMove,1000)
}

const stopAutoGame=()=>{
    clearInterval(intervalId)
}

const cycleTheme=()=>{
    const themes=['dark','matrix','coral','light']
    const current=document.body.dataset.theme||'dark'
    const idx=(themes.indexOf(current)+1)%themes.length
    document.body.dataset.theme=themes[idx]
}

startGameBtn.addEventListener('click',newGame)
resetGameBtn.addEventListener('click',()=>{ hideGameOver(); resetGame() })
document.getElementById('gameOverClose')?.addEventListener('click',hideGameOver)
document.getElementById('gameOverOverlay')?.addEventListener('click',e=>{
    if(e.target.id==='gameOverOverlay') hideGameOver()
})
document.getElementById('themeBtn')?.addEventListener('click',cycleTheme)
nextMoveBtn.addEventListener('click',nextMove)
mapDimensions.addEventListener('change',getDimensionsValueFromInput)
mapDimensions.addEventListener('input',()=>hideDimensionsError())
startAutoGameBtn.addEventListener('click',startAutoGame)
stopAutoGameBtn.addEventListener('click',stopAutoGame)