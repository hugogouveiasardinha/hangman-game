import './HangmanDrawing.scss'

const head = (
    <div className="Head" />
);

const body = (
    <div className="Body" />
);

const rightArm = (
    <div className="Right-arm" />
);

const leftArm = (
    <div className="Left-arm" />
);

const rightLeg = (
    <div className="Right-leg" />
);

const leftLeg = (
    <div className="Left-leg" />
);

const bodyParts = [head, body, rightArm, leftArm, rightLeg, leftLeg]

type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return (
        <div className="Drawing">
            {bodyParts.slice(0, numberOfGuesses)}
            <div className="Hang-stick" />
            <div className="Top-stick" />
            <div className="Pole-stick" />
            <div className="Base-stick" />
        </div>
    )

}