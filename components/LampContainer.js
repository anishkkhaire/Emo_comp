// Utility function to combine class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * LampContainer Component
 * 
 * A modern lamp effect container component with animated light beams and glowing effects.
 * Creates a dramatic lighting atmosphere perfect for hero sections, landing pages, and showcases.
 * 
 * IMPORTANT DEPENDENCIES:
 * - This component requires Framer Motion to be loaded in your HTML:
 *   <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
 * 
 * USAGE:
 * <LampContainer>
 *   <h1>Your content here</h1>
 * </LampContainer>
 * 
 * PROPS:
 * @param {ReactNode} children - Content to display inside the lamp container
 * @param {string} className - Additional CSS classes to apply to the container
 * 
 * FEATURES:
 * - Animated conic gradients that create lamp beam effects
 * - Smooth entrance animations using Framer Motion
 * - Responsive design that works on different screen sizes
 * - Dark background with cyan/blue light effects
 * - Content positioned in the center with proper z-indexing
 * 
 * CUSTOMIZATION:
 * - Modify CSS variables in index.html to change colors
 * - Adjust motion properties for different animation timings
 * - Change gradient colors by modifying the from-cyan-500 and to-cyan-500 classes
 * - Modify blur effects by adjusting blur-2xl and blur-3xl classes
 * 
 * STYLING NOTES:
 * - Uses absolute positioning for complex layering effects
 * - Implements custom CSS masks for seamless blending
 * - Content area is positioned with negative translate for proper centering
 * - Background uses slate-950 for deep dark theme
 */
function LampContainer({ className, moodColor = "cyan" }) {
    try {
        // Access Framer Motion from global window object
        const { motion } = window.Motion;
        
        // Define mood-based colors
        const moodColors = {
          joy: { from: 'from-yellow-500', to: 'to-orange-500', glow: 'bg-yellow-500' },
          sadness: { from: 'from-blue-500', to: 'to-cyan-500', glow: 'bg-blue-500' },
          anger: { from: 'from-red-500', to: 'to-pink-500', glow: 'bg-red-500' },
          fear: { from: 'from-purple-500', to: 'to-indigo-500', glow: 'bg-purple-500' },
          surprise: { from: 'from-pink-500', to: 'to-rose-500', glow: 'bg-pink-500' },
          neutral: { from: 'from-gray-500', to: 'to-slate-500', glow: 'bg-gray-500' }
        };
        
        const colors = moodColors[moodColor] || { from: 'from-cyan-500', to: 'to-cyan-500', glow: 'bg-cyan-500' };

        return (
            <div data-name="lamp-container" className={cn(
                "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full pointer-events-none",
                className
            )}>
                <div data-name="lamp-inner-container" className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
                    <motion.div
                        data-name="lamp-left-gradient"
                        initial={{ opacity: 0.5, width: "15rem" }}
                        whileInView={{ opacity: 1, width: "30rem" }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                        style={{
                            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                        }}
                        className={`absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic ${colors.from} via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]`}
                    >
                        <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                        <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                    </motion.div>
                    <motion.div
                        data-name="lamp-right-gradient"
                        initial={{ opacity: 0.5, width: "15rem" }}
                        whileInView={{ opacity: 1, width: "30rem" }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                        style={{
                            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                        }}
                        className={`absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent ${colors.to} text-white [--conic-position:from_290deg_at_center_top]`}
                    >
                        <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                        <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                    </motion.div>
                    <div data-name="lamp-blur-bg" className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
                    <div data-name="lamp-blur-overlay" className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                    <div data-name="lamp-glow-large" className={`absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full ${colors.glow} opacity-50 blur-3xl`}></div>
                    <motion.div
                        data-name="lamp-glow-small"
                        initial={{ width: "8rem" }}
                        whileInView={{ width: "16rem" }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                        className={`absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full ${colors.glow} blur-2xl`}
                    ></motion.div>
                    <motion.div
                        data-name="lamp-line"
                        initial={{ width: "15rem" }}
                        whileInView={{ width: "30rem" }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                        className={`absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] ${colors.glow}`}
                    ></motion.div>
                    <div data-name="lamp-top-mask" className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LampContainer error:', error);
        reportError(error);
        return null;
    }
}

