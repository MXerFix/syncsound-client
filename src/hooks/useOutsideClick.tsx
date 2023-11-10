import { useState, useEffect, useRef } from 'react';

const useOutsideClick = (initialValue: any) => {
  const [isActive, setIsActive] = useState(initialValue);
  const ref = useRef<any>(null);

  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return { ref, isActive, setIsActive };
};

export default useOutsideClick;