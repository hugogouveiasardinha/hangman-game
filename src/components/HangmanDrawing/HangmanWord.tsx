import './HangmanWord.scss'

type HangmanWordProps = {
  guessedLetters: string[]
  nameToGuess: string
}

export function HangmanWord({ guessedLetters, nameToGuess}:HangmanWordProps) {

return (
    <div className="Word">
      {nameToGuess.split("").map((letter, index) => (
        <span className="Letter" key={index}>
          <span className={guessedLetters.includes(letter) ? "visible" : ""}>{letter}</span>
        </span>
      ))}
    </div>
)
}