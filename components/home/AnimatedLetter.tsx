
import React from 'react'

interface AnimatedLetterProps {
    letterClass: string;
    strArray: Array<string>;
    idx: number;
}

const AnimatedLetter = ({ letterClass, strArray, idx }: AnimatedLetterProps) => {
    return (
        <span>
            {
                strArray.map((char, i) => (
                    <span key={char + i} className={`${letterClass} _${i + idx}`}>
                        {char}
                    </span>
                ))
            }
        </span>
    )
}

export default AnimatedLetter