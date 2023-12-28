//import React from 'react'

type HeaderProps = {
  score: number
}

export default function Header({ score }: HeaderProps) {
  return (
    <div className='header d-flex align-items-center'>
      <div className='container d-flex justify-content-between'>
        <div className='logo'>The Hang Man Game</div>
        <div className='score'>Score: {score}</div>
      </div>
    </div>
  )
}
