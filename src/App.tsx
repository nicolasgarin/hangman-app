import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./components/HangmanDrawing"
import { HangmanWord } from "./components/HangmanWord"
import { Keyboard } from "./components/Keyboard"
import words from "./wordList.json"
import './App.scss'
import Header from "./layout/Header"
import Footer from "./layout/Footer"


function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  return (
    <>
      <Header />
      <div className="main">
        <div className="container main-container">
          <div className="row">
            <div className="col-4">
              <div className="cosotexto">
                {isWinner && "Winner! - Refresh to try again"}
                {isLoser && "Nice Try - Refresh to try again"}
              </div>
              <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            </div>
            <div className="col-8 r-side">
              <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
              />
              <div className="keyboard-container">
                <Keyboard
                  disabled={isWinner || isLoser}
                  activeLetters={guessedLetters.filter(letter =>
                    wordToGuess.includes(letter)
                  )}
                  inactiveLetters={incorrectLetters}
                  addGuessedLetter={addGuessedLetter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App