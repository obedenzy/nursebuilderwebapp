'use client';

import { motion, AnimatePresence } from"motion/react";
import { usePathname } from"next/navigation";
import { useEffect, useState } from"react";

export default function MotionWrapper({
 children,
}: {
 children: React.ReactNode;
}) {
 const pathname = usePathname();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 setMounted(true);
 }, []);

 if (!mounted) {
 return <>{children}</>;
 }

 return (
 <AnimatePresence mode="wait">
 <motion.div
 key={pathname}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3, ease:"easeInOut" }}
 >
 {children}
 </motion.div>
 </AnimatePresence>
 );
}
