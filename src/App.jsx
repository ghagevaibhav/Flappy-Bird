import {useEffect, useState} from 'react'
import './App.css'

const BIRD_SIZE = 20;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 500;
const GAME_DIFFICULTY_GAP = 120;
const OBSTACLE_WIDTH = 50;

function App() {
    const [startGame, setStartGame] = useState(false);
    const [birdPosition, setBirdPosition] = useState(250);
    const [obstacleHeight, setObstacleHeight] = useState(100);
    const [obstacleLeftPosition, setObstacleLeftPosition] = useState(GAME_WIDTH - OBSTACLE_WIDTH);
  const [score, setScore] = useState(0);
    useEffect(() => {
        let interval = null;
        if(startGame) {
            interval = setInterval(() => {
                if(obstacleLeftPosition > -OBSTACLE_WIDTH) {
                    setObstacleLeftPosition(obstPos => obstPos - 10);
                } else {
                    setObstacleLeftPosition(GAME_WIDTH - OBSTACLE_WIDTH);
                    setObstacleHeight(Math.floor(Math.random() * (GAME_HEIGHT - GAME_DIFFICULTY_GAP)));
                    setScore(score => score + 1);
                }
            }, 24);
        }
        return () => clearInterval(interval);
    },[startGame, obstacleLeftPosition])
    useEffect(() => {
        if(startGame) {
            const collidedWithUpperObstacle = birdPosition < obstacleHeight;
            const collidedWithLowerObstacle = birdPosition > obstacleHeight + GAME_DIFFICULTY_GAP;
            if(obstacleLeftPosition < BIRD_SIZE && (collidedWithUpperObstacle || collidedWithLowerObstacle)) {
                setStartGame(false);
                // make your fall here
            }
        }
    },[startGame, obstacleLeftPosition, birdPosition, obstacleHeight])
    useEffect(() => {
        let interval = null;
        if(startGame) {
            interval = setInterval(() => {
                if(birdPosition < GAME_HEIGHT - BIRD_SIZE) {
                    setBirdPosition(birdPosition => birdPosition + 4);
                }
            }, 24);
        }
        return () => clearInterval(interval);
    },[startGame, birdPosition])
    const bottomObstacleHeight = GAME_HEIGHT - (obstacleHeight + GAME_DIFFICULTY_GAP);
  return (
    <div className="App">
     <div
         onClick={
             () => {
                 const newBirdPosition = birdPosition - 50
                    if(newBirdPosition > 0) {
                        setBirdPosition(birdPosition => birdPosition - 50);
                    } else {
                        setBirdPosition(0);
                    }
             }
         }
         style={{
             overflow: 'hidden',
         position: 'relative',
         "backgroundColor": "blue",
         width: `${GAME_HEIGHT}px`,
         height: `${GAME_WIDTH}px`,
     }}>
         <div style={{
                position: 'absolute',
                top: `${0}px`,
                left: `${obstacleLeftPosition}px`,
                width: `${OBSTACLE_WIDTH}px`,
                height: `${obstacleHeight}px`,
                backgroundColor: 'green'
         }} />
         <div
             style={{
                 position: 'absolute',
                 top: `${obstacleHeight + GAME_DIFFICULTY_GAP}px`,
                 left: `${obstacleLeftPosition}px`,
                 width: `${OBSTACLE_WIDTH}px`,
                 height: `${bottomObstacleHeight}px`,
                 backgroundColor: 'green'
             }}
         />
         {/** Bird */}
         <div style={{
             position: "absolute",
             backgroundColor: "red",
             width: `${BIRD_SIZE}px`,
             height: `${BIRD_SIZE}px`,
             borderRadius: "50%",
             top: `${birdPosition}px`,
         }} />
     </div>
        {score}
        <button onClick={() => {setStartGame(true)}}>Start Game</button>
    </div>
  )
}

export default App






































// import { useEffect, useState } from "react";
// import "./App.css";

// const Bird_size = 20;
// const Game_Height = 500;
// const Game_Width = 500;
// const Game_Difficulty_Gap = 120;
// const obstacle_Width = 50;

// function App() {
//   const [startGame, setStartGame] = useState(false);
//   const [birdPosition, setBirdPosition] = useState(250);
//   const [obstacleHeight, setObstacleHeight] = useState(100);
//   const [obstacleLeftPosition, setObstacleLeftPosition] = useState(Game_Width - obstacle_Width);
//   const [score, setScore] = useState(0);
//   useEffect(() => {
//     let interval = null;
//     if (startGame) {
//       interval = setInterval(() => {
//         if (obstacleLeftPosition > -Obstacle_Width) {
//           setObstacleLeftPosition(ObstPosition => ObstPosition - 10);
//         }
//         else {
//           setObstacleLeftPosition(Game_Width - obstacle_Width);
//           setObstacleHeight(Math.floor(Math.random() * (Game_Height - Game_Difficulty_Gap)));
//           setScore(score=> score + 1);
//         }
//       }, 24);
//     }
//     return () => clearInterval(interval);
//   }, [startGame, obstacleLeftPosition]);
//   useEffect(() => {
//     if(startGame){
//       const CollidedWithUpperObstacle = birdPosition < obstacleHeight;
//       const CollidedWithLowerObstacle = birdPosition > obstacleHeight + Game_Difficulty_Gap;
//       if(obstacleLeftPosition < Bird_size && (CollidedWithLowerObstacle || CollidedWithUpperObstacle)){
//         setStartGame(false);
//         // setScore(0);
//       }
//     }
//   }, [startGame, obstacleLeftPosition, birdPosition, obstacleHeight]);
//   useEffect(() => {
//     let interval = null;
//     if (startGame) {
//       interval = setInterval(() => {
//         if (birdPosition < Game_Height - Bird_size) {
//           setBirdPosition(birdPosition => birdPosition + 4);
//         }
//       }, 24);
//     }
//     return () => clearInterval(interval);
//   }, [startGame, birdPosition]); 

//   const bottomObstacleHeight = Game_Height - (obstacleHeight + Game_Difficulty_Gap);

//   return (
//     <div className="App">
//       <div
//         onClick={
//           () => {
//           const newBirdPosition = birdPosition - 50;
//           if (newBirdPosition > 0) {
//             setBirdPosition( birdPosition => birdPosition - 50 );
//           } else {
//             setBirdPosition(0);
//           }
//         }}
//         style={{
//           overflow: "hidden",
//           position: "relative",
//           backgroundColor: "yellowgreen",
//           width: `${Game_Height}px`,
//           height: `${Game_Width}px`,
//         }}>
//         <div style={{
//           position: "absolute",
//           top: `${0}px`,
//           left: `${obstacleLeftPosition}px`,
//           width: `${obstacle_Width}px`,
//           height: `${obstacleHeight}px`,
//           backgroundColor: "black",
//         }} />
//         <div style={{
//           position: "absolute",
//           top: `${obstacleHeight + Game_Difficulty_Gap}px`,
//           left: `${obstacleLeftPosition}px`,
//           width: `${obstacle_Width}px`,
//           height: `${bottomObstacleHeight}px`,
//           backgroundColor: "black",
//         }} />
//         <div
//           style={{
//             position: "absolute",
//             backgroundColor: "yellow",
//             width: `${Bird_size}px`,
//             height: `${Bird_size}px`,
//             borderRadius: "50%",
//             top: `${birdPosition}px`,
//           }}/>
//       </div>
//       {score}
//       <button onClick={() => {setStartGame(true)}}>Start Game</button>
//     </div>
//   )
// }

// export default App;
