import { motion } from "framer-motion"

function ToggleButton({setOpen}) {
  return (
    <button onClick={() => setOpen((prev) => !prev)} className="w-[50px] h-[50px] rounded-full fixed top-[25px] left-[25px] border-none cursor-pointer">
        <svg width="35" height="23" viewBox="-13 0 35 23" > 
          <motion.path strokeWidth="3" stroke="black" strokeLinecap="round" variants={{
            closed : {d : "M 2 2.5 L 20 2.5"},
            open : {d : "M 3 16.5 L 17 2.5"}
          }} />
          
          <motion.path strokeWidth="3" stroke="black" strokeLinecap="round" d={"M 2 10.5 L 20 10.5"} variants={{
            closed : {opacity : 1},
            open : {opacity : 0}
          }} />
          
          <motion.path strokeWidth="3" stroke="black" strokeLinecap="round" variants={{
            closed : {d : "M 2 18.5 L 20 18.5"},
            open : {d : "M 18 16.5 L 2 2.5"}
          }} />
          
        </svg>
    </button>
  )
}

export default ToggleButton
