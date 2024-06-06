import { motion } from "framer-motion"

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

const Link = () => {
    const items = [
        "Home",
        "Search",
        "Products",
        "Contact",
        "About",
    ]
  return (
    <motion.div variants={variants} className="absolute w-full h-full flex flex-col items-center justify-center gap-[20px]">
      {items.map((item) => {
        return (
            <motion.a variants={itemVariants} whileHover={{scale : 1.1}} whileTap={{scale : 0.95}} className="text-xl hover:scale-105" href={`/${item.toLowerCase()}`} key={item}>{item}</motion.a>
        )
      })}
    </motion.div>
  )
}

export default Link
