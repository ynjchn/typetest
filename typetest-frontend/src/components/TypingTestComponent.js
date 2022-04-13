import axios from 'axios'
import React, { useState, useRef, memo, useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import TyperService from '../services/TyperService'

const TypingTestComponent = () => {

    const wordBank = () => `he be to of and`
        .split(' ').sort(() => Math.random() > 0.5 ? 1 : -1) 

    const [userInput, setUserInput] = useState('')
    const[currWordIndex, setCurrWordIndex] = useState(0)
    const [correctWords, setCorrectWords] = useState([])
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [isTestFinished, setIsTestFinished] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [typers, setTypers] = useState([])
    const [username, setUsername] = useState('')
    const [speeds, setSpeeds] = useState([])
    const currWord = useRef(wordBank())
    const navigate = useNavigate();

    useEffect(() => {
        
        TyperService.getAllTypers().then((response) => {
            setTypers(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

    }, [])

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

    useEffect(() => {
        
        TyperService.getAllTypers().then((response) => {
            setTypers(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

    }, [])

    const addScore = (e) => {
        
        for(let i = 0; i < typers.length; i++) {
            let speeds = (typers[i].speeds)
            console.log(typers[i])
            console.log("speeds", speeds)
            if(typers[i].username === username) {
                console.log("match found")
                speeds.push(speed)
                const submittedTyper = {username, speeds}
                console.log(submittedTyper)
                console.log("speeds after", speeds)
                TyperService.updateTyper(typers[i].id, submittedTyper).then((response) => {
                    window.location.reload()
                }).catch(error => {
                    console.log(error)
                })
                return
            }
        }
        console.log("user not fouund")
        const speeds = [speed]
        const submittedTyper = {username, speeds}
        console.log("new user speed", speeds)
        console.log(submittedTyper)

        TyperService.createTyper(submittedTyper).then((response) =>{
            window.location.reload()
        }).catch(error => {
            console.log(error)
        })
        return
    }

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
                <input
                    className="username-input"
                    type="text"
                    placeholder="Enter name"
                    name = "username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                ></input>
                <button 
                    className="submit-button"
                    onClick = {(e) => addScore(e)}
                > 
                    Submit score
                </button>
                <p><a href="/"><button className="restart-button">Restart</button></a></p>
            </div>
        )
    }
}

export default TypingTestComponent
