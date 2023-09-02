import React from 'react'
import TotalScore from './TotalScore'
import NumberSelector from './NumberSelector';
import styled from 'styled-components'
import RollDice from './RollDice';
import { useState } from 'react';
import { Button, OutLineButton } from '../styled/Button'
import Rules from './Rules';

const GamePlay = () => {
  const [score, setScore]= useState(0);
  const [selectedNumber,setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [error,setErorr] = useState("");
   const [showRules, setshowRules] = useState(false)

  const generateRandomNumber = (min , max) =>{
    return Math.floor(Math.random() * ((max - min)+1)) + 0;
   } ;
    
   const rollDice= ()=>{
    if (!selectedNumber){
      setErorr("You are not selected any number");
      return;
    }
    const randomNumber = generateRandomNumber(1,7);
    setCurrentDice((prev) => randomNumber);
        
 
    if(selectedNumber ==randomNumber){
      setScore((prev)=>prev+randomNumber)
    }else{
      setScore((prev)=>prev-randomNumber)
    }
    setSelectedNumber(undefined);
   };
      
   const resetScore=() =>{
    setScore(0);
   }
  return (
    <MainContainer>
      <div className='top_section'>
            <TotalScore score={score}/>
            <NumberSelector 
            setErorr={setErorr}
            error={error} 
            selectedNumber={selectedNumber}
            setSelectedNumber={setSelectedNumber}
            />
      </div>
      <RollDice 
      currentDice={currentDice}
      rollDice={rollDice}
      />
      <div className="btn">
        <OutLineButton onClick={resetScore}>Reset</OutLineButton>
        <Button onClick={() =>setshowRules((prev)=>!prev)}>
        {
          showRules ? "Hide" : "show"
        } Rules</Button>

      </div>
      {showRules && <Rules />}
    </MainContainer>
  )
}

export default GamePlay;

const MainContainer = styled.div`
padding-top: 70px;
.top_section{
  display: flex;
  justify-content: space-around;
  align-items: end;
}
.btn{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  }
`;
