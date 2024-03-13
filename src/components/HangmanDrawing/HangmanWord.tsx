import './HangmanWord.scss'

export function HangmanWord() {
    const word = "test";
    const guessedLetters= ["t", "s"]
return (
    <div className="Word">
      {word.split("").map((letter, index) => (
        <span className="Letter" key={index}>
          <span className={guessedLetters.includes(letter) ? "visible" : ""}>{letter}</span>
        </span>
      ))}
    </div>
)
}