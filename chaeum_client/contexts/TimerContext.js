import React, { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const categoryList = [
    "😱 수학키움반",
    "응용과 개발",
    "과학 A팀",
    "🧠 파이팅",
  ];
  const [activeCategory, setActiveCategory] = useState(categoryList[0]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        setIsRunning,
        elapsed,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
