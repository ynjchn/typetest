import React, { useState, useRef, memo, useEffect } from 'react'
import {Link} from "react-router-dom"

const TypingTestComponent = () => {

    const wordBank = () => `he be to of and a in that have I it for not on with as you do at this but his by from they we say her she or an will my one all would there their  what so up out if about who get which go me when make can like time no just him know take people into year`
        .split(' ').sort(() => Math.random() > 0.5 ? 1 : -1) 

    const [userInput, setUserInput] = useState('')
    const[currWordIndex, setCurrWordIndex] = useState(0)
    const [correctWords, setCorrectWords] = useState([])
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [isTestFinished, setIsTestFinished] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [speed, setSpeed] = useState(0)
    const currWord = useRef(wordBank())

    function checkInput(value) {
        
        if(!isTimeRunning && currWordIndex < currWord.current.length) {
            setIsTimeRunning(true)
        } 


        if(value.endsWith(' ')) {

            if(currWordIndex >= currWord.current.length - 1) {
                setIsTimeRunning(false)
                setIsTestFinished(true)
                const minutes = timeElapsed/60
                const numberCorrect = correctWords.filter(Boolean).length
                setSpeed(Math.round(numberCorrect/minutes))
                console.log(speed)
                return <p>{speed}</p>
            }
            setCurrWordIndex(index => index + 1)
            setUserInput('')

            const word = value.trim()
            
            setCorrectWords(data => {
                const newRes = [...data]
                newRes[currWordIndex] = word === currWord.current[currWordIndex]
                return newRes 
            })
            
        } else {
            setUserInput(value)
        }

    }

    function Word(props) {

        const { text, active, correct } = props

        if(correct === true) {
            return <span className="correct">{text} </span>
        }
        if(correct === false) {
            return <span className="incorrect">{text} </span>
        }
        if(active) {
            return <span className="active">{text} </span>
        }

        return <span className = "inactive">{text} </span>
    }
    // Word = React.memo(Word)

    useEffect(() => {
        let id
        if(isTimeRunning) {
            id = setInterval(() => {
              setTimeElapsed(oldTime => oldTime + 1)
            }, 1000)
        } else if(!isTimeRunning) {
            return
        }

        return () => {
            clearInterval(id)
        }
    }, [isTimeRunning])
    
    console.log(isTimeRunning)
    if(!isTestFinished) {
        return (
            <div className="maincontent">
                <div className = "test-area">
                    {currWord.current.map((word, index) => {
                        return <Word 
                                text={word} 
                                active={index === currWordIndex}
                                correct={correctWords[index]}
                                />
                    })}
                    {/* <p>{currWordIndex} {currWord.current.length} </p> */}
                    <input 
                        className="test-input"
                        type="text" 
                        value={userInput}
                        onChange={(e) => checkInput(e.target.value)}
                        autoFocus
                    /> 
                </div>
            </div>
        )
    } else if(isTestFinished) {
        return (
            <div className="maincontent">
                <p>{speed} WPM </p>
                <a href="/"><button className="restart-button">Restart</button></a>
            </div>
        )
    }
}

export default TypingTestComponent