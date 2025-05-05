import {seededRandomColor} from "@/app/lib/seededRandomColor";
import {motion, useAnimation} from "framer-motion";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

const EmployeeCard = ({employee}) => {
  const bgColor = seededRandomColor(employee.fullName);
  const controls = useAnimation();
  const {ref, inView} = useInView({triggerOnce: true});
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    if (inView && !overlay) {
      controls.start({
        clipPath: "inset(100% 0% 0% 0%)",
        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      });
    } else if (inView && overlay) {
      controls.start({
        clipPath: "inset(0% 0% 0% 0%)",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    } else {
      controls.set({clipPath: "inset(0% 0% 0% 0%)"});
    }
  }, [inView, controls, overlay]);

  return (
    <motion.div
      ref={ref}
      onClick={() => setOverlay(prev => !prev)}
      className="my-5 mx-2 w-5/12 md:w-1/5 relative overflow-hidden cursor-pointer"
    >
      <div className="relative z-0">
        <motion.img
          className=" w-full h-auto rounded-lg mb-3 object-cover"
          src={employee.thumbnail}
          alt={employee.fullName}
        />
        <motion.div
          animate={controls}
          initial={false}
          style={{
            backgroundColor: bgColor,
            clipPath: "inset(0% 0% 0% 0%)",
          }}
          className="opacity-80 rounded-lg absolute top-0 left-0 w-full h-full z-10"
        >
          {overlay && (
            <p className="p-1 text-xs md:text-base">{employee.description}</p>
          )}
        </motion.div>
      </div>
      <div className="mt-2">
        <h3 className="font-bold md:text-xl">{employee.fullName}</h3>
        <p>{employee.role}</p>
      </div>
    </motion.div>
  );
};

export default EmployeeCard;
