import './HangmanKeyboard.scss'

const keys = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));

export function HangmanKeyboard() {
    return (
    <div className="Keyboard">
        {keys.map(key => {
            return (
                <button className="Key">{key}</button>
            )
        })}
    </div>
    )
}