// components/Reveal.jsx
import { motion } from "framer-motion";

const Reveal = ({ children, className = "" }) => (
  <motion.div
    className={`w-full ${className}`}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default Reveal;
