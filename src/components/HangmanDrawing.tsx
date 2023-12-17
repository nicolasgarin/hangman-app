import hang from "../assets/hang.svg";
import { BiSolidSkull } from "react-icons/bi";
import { FaHatCowboy } from "react-icons/fa";
import { FaBone } from "react-icons/fa";
import { GiCowboyBoot } from "react-icons/gi";

type HangmanDrawingProps = {
  numberOfGuesses: number,
  isWinner: boolean,
  isLoser: boolean
}

export function HangmanDrawing({ numberOfGuesses, isWinner, isLoser }: HangmanDrawingProps) {

  const HEAD = (
    <div className="head">
      <div className={`skull ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
        <BiSolidSkull />
      </div>
      <div className={`hat ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
        <FaHatCowboy />
      </div>
    </div>
  )

  const BODY = (
    <div className={`bone body ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
      <FaBone />
    </div>
  )

  const RIGHT_ARM = (
    <div className={`bone right-arm ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
      <FaBone />
    </div>
  )

  const LEFT_ARM = (
    <div className={`bone left-arm ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
      <FaBone />
    </div>
  )

  const RIGHT_LEG = (
    <div className="leg">
      <div className={`bone right-leg ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
        <FaBone />
      </div>
      <div className={`boot right-boot ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
        <GiCowboyBoot />
      </div>
    </div>
  )

  const LEFT_LEG = (
    <div className="leg">
      <div className={`bone left-leg ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
        <FaBone />
      </div>
      <div className={`boot left-boot ${isWinner ? 'win' : isLoser ? 'lose' : null}`}>
        <GiCowboyBoot />
      </div>
    </div>
  )

  const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

  return (
    <>
      <div className="hangman-drawing">
        <img className="hang" src={hang} />
        <div className="hang-body">
          {isWinner ? BODY_PARTS : BODY_PARTS.slice(0, numberOfGuesses)}
        </div>
      </div>
    </>
  )
}