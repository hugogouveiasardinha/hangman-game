import './HangmanKeyboard.scss'

const keys = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));

interface HangmanKeyboardProps {
    disabled: boolean
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter:string) => void

}

export function HangmanKeyboard({activeLetters, inactiveLetters, addGuessedLetter, onKeyPress, disabled = false,}: HangmanKeyboardProps) {

  
    return (
    <div className="Keyboard">
        {keys.map(key => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)
            return (
                <button 
                onClick={() => addGuessedLetter(key)} 
                className={`Key ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                disabled={isInactive || isActive || disabled}
                >{key}</button>
            )
        })}
    </div>
    )
}