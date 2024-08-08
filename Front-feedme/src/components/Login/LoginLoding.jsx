import React from 'react';
import { motion } from "framer-motion";
import "./LoginLoding.css";

const LoginLoding = () => {
  return (
    <div className="LoginLoding">
      <div className="wrap">
        <motion.div
          className="box"
          animate={{ scale: [1, 1.5, 1.1] }}
          transition={{ duration: 3, times: [0, 0.2, 1] }}
        >
          Loding
        </motion.div>
      </div>
    </div>  
  );
};

export default LoginLoding;