import React from 'react'

function Button({ play, isPlaying }: { play: () => void, isPlaying: boolean }) {
    return (
        <div className='btn-container'>
            <div onClick={play} className={isPlaying ? 'btn-stop' : 'btn-play'}></div>
        </div>
    )
}
export default Button