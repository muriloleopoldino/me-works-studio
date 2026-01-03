import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const AdminFloatingButton = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (user) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-40 group"
      title={user ? "Acessar painel administrativo" : "Login administrativo"}
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.2 : 0.1,
        }}
        className="absolute inset-0 rounded-full bg-primary blur-lg"
      />

      {/* Button */}
      <motion.div
        animate={{
          y: isHovered ? -5 : 0,
        }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-2xl flex items-center justify-center cursor-pointer border-2 border-primary/30 hover:border-primary/50 transition-colors"
      >
        <motion.div
          animate={{
            rotate: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {user ? (
            <Shield className="w-7 h-7 text-primary-foreground" />
          ) : (
            <LogIn className="w-7 h-7 text-primary-foreground" />
          )}
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
        className="absolute right-20 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none"
      >
        {user ? "Painel Admin" : "Login Admin"}
      </motion.div>

      {/* Pulse Animation (only for authenticated users) */}
      {user && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full border-2 border-primary"
        />
      )}
    </motion.button>
  );
};
