import { useState } from "react";
import { motion } from "framer-motion";
import Link from "./Link";
import ToggleButton from "./ToggleButton";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const variants = {
    open: {
      clipPath : "circle(1200px at 50px 50px)",
      transition : {
        type : "spring",
        stiffness : 20
      }
    },
    closed : {
      clipPath : "circle(20px at 50px 50px)",
      transition : {
        type : "spring",
        stiffness : 400,
        damping : 40
      }
    }
  };
  return (
    // sidebar
    <motion.div animate={open ? "open" : "closed"} className="flex flex-col items-center justify-center bg-white text-black">
      {/* bg */}
      <motion.div variants={variants} className="fixed left-0 top-0 bottom-0 w-[300px] bg-white">
        <Link />
      </motion.div>
      <ToggleButton setOpen={setOpen} />
    </motion.div>
  );
}

export default Sidebar;
