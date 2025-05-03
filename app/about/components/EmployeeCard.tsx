import {seededRandomColor} from "@/app/lib/seededRandomColor";
import {motion, useAnimation} from "framer-motion";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

const EmployeeCard = ({employee}) => {
  const bgColor = seededRandomColor(employee.fullName);
  const controls = useAnimation();
  const {ref, inView} = useInView({triggerOnce: true});
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({
        clipPath: "inset(100% 0% 0% 0%)",
        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      });
    } else {
      controls.set({clipPath: "inset(0% 0% 0% 0%)"});
    }
  }, [inView, controls]);

  const toggleOverlay = () => {
    setOverlayVisible(prev => !prev);
  };

  const handleMouseEnter = () => setOverlayVisible(true);
  const handleMouseLeave = () => setOverlayVisible(false);

  return (
    <motion.div
      ref={ref}
      className="my-5 mx-2 w-5/12 md:w-1/5 relative overflow-hidden cursor-pointer"
      onClick={toggleOverlay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-0">
        <img
          className=" w-full h-auto rounded-lg mb-3 object-cover"
          src={employee.thumbnail}
          alt={employee.fullName}
        />

        <motion.div
          animate={{
            opacity: overlayVisible ? 0.8 : 0,
            clipPath: overlayVisible
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
          }}
          transition={{duration: 0.8, ease: "easeInOut"}}
          style={{
            backgroundColor: bgColor,
            pointerEvents: overlayVisible ? "auto" : "none",
          }}
          className="absolute top-0 left-0 w-full h-full z-10 px-2 py-3 text-sm flex items-center justify-center text-center rounded-lg text-black "
        >
          {overlayVisible && employee.description}
        </motion.div>
      </div>
      <motion.div
        animate={controls}
        initial={false}
        style={{
          backgroundColor: bgColor,
          clipPath: "inset(0% 0% 0% 0%)",
        }}
        className="rounded-lg absolute top-0 left-0 w-full h-[78%] md:h-[87%] z-10"
      />

      <div className="mt-2">
        <h3 className="font-bold md:text-xl">{employee.fullName}</h3>
        <p>{employee.role}</p>
      </div>
    </motion.div>
  );
};

export default EmployeeCard;
