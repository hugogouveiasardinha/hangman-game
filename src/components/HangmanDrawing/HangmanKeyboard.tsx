import './HangmanKeyboard.scss'

const keys = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));

interface HangmanKeyboardProps {
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter:string) => void

}

export function HangmanKeyboard({activeLetters, inactiveLetters, addGuessedLetter, onKeyPress}: HangmanKeyboardProps) {

  
    return (
    <div className="Keyboard">
        {keys.map(key => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)
            return (
                <button 
                onClick={() => addGuessedLetter(key)} 
                className={`Key ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                disabled={isInactive || isActive}
                >{key}</button>
            )
        })}
    </div>
    )
}