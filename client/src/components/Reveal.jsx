// components/Reveal.jsx
import { motion } from "framer-motion";

const Reveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default Reveal;
