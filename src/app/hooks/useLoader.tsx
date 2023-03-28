import { useEffect, useState } from "react";

const useLoader = () => {

  const [isShown, setIsShown] = useState(false);
  const waitBeforeShow = 1000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);

    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown;
}

export default useLoader;