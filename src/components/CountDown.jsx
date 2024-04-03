"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = ({ date }) => {
  const intervalRef = useRef(null);

  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleCountdown = useCallback(() => {
    const end = date;

    const now = new Date();

    const distance = +end - +now;

    const days = Math.floor(distance / DAY);
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.floor((distance % MINUTE) / SECOND);

    setRemaining({
      days,
      hours,
      minutes,
      seconds,
    });
  }, [setRemaining, date]);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, [handleCountdown]);

  return (
    <div className=" max-w-5xl  flex items-center ">
      <CountdownItem num={remaining.days} text="days" />
      <CountdownItem num={remaining.hours} text="hours" />
      <CountdownItem num={remaining.minutes} text="minutes" />
      <CountdownItem num={remaining.seconds} text="seconds" />
    </div>
  );
};

const CountdownItem = ({ num, text }) => {
  return (
    <div className="font-mono w-1/4 sm:w-1/6 h-12  flex flex-col gap-1  items-start justify-start  ">
      <div className="w-full text-center relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={num}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block text-small  text-white  text-start"
          >
            {num}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm  font-light text-slate-400">
        {text}
      </span>
    </div>
  );
};

export default ShiftingCountdown;
