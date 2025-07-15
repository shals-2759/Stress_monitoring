import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, content, image }) => {
  return (
    <motion.div
      className="dashboard-card"
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <h3>{title}</h3>
      {image && <img src={image} alt={title} className="card-image" />}
      <p>{content}</p>
    </motion.div>
  );
};

export default DashboardCard;
