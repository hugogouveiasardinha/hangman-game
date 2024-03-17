import './HangmanKeyboard.scss'

const keys = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));

interface HangmanKeyboardProps {
    onKeyPress: (key: string) => void;
}

export function HangmanKeyboard({onKeyPress}: HangmanKeyboardProps) {

    const handleKeyPress = (key: string) => {
        onKeyPress(key)
    }
    return (
    <div className="Keyboard">
        {keys.map(key => {
            return (
                <button className="Key" onClick={() => handleKeyPress(key)}>{key}</button>
            )
        })}
    </div>
    )
}