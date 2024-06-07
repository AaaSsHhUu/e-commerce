import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
    open : {
        transition : {
          staggerChildren : 0.1,
        },
    },
    closed : {
        transition : {
          staggerChildren : 0.05,
          staggerDirection : -1
        }
    }
}

const itemVariants = {
  open : {
      y : 0,
      opacity : 1
  },
  closed : {
      y : 50,
      opacity : 0
  },
}

const Links = () => {
  return (
    <motion.div variants={variants} className="absolute w-full h-full flex flex-col items-center justify-center gap-[20px]">
        <Link className="text-xl hover:scale-105" to="/">Home</Link>
        <Link className="text-xl hover:scale-105" to="/products">Products</Link>
        <Link className="text-xl hover:scale-105" to="/contacts">Contacts</Link>
        <Link className="text-xl hover:scale-105" to="/about">About</Link>
        <Link className="sm:hidden text-xl hover:scale-105" to="/search">Search</Link>
    </motion.div>
  )
}

export default Links
