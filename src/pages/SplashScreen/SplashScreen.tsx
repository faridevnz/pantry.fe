import { useEffect, useState } from "react";
import { ProgressBar } from "../../components/atoms/ProgressBar/ProgressBar";
import { Space } from "../../components/atoms/Space/Space";
import { useNavigate } from "react-router-dom";

export const SplashScreen = () => {
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ids: NodeJS.Timeout[] = [];
    ids.push(
      setTimeout(() => {
        setProgress(20);
        ids.push(
          setTimeout(() => {
            setProgress(70);
            ids.push(
              setTimeout(() => {
                setProgress(100);
                ids.push(
                  setTimeout(() => {
                    navigate("/pantry");
                  }, 1000)
                );
              }, 300)
            );
          }, 400)
        );
      }, 200)
    );
    // reset
    return () => {
      console.log("deleting", ids);
      ids.forEach((id) => clearTimeout(id));
    };
  }, [navigate]);

  return (
    <div className="w-full h-[100svh] flex flex-col justify-center items-center">
      <div className="text-[100px]">📦</div>
      <Space type="simple" direction="y" value={14} />
      <div className="flex w-full h-auto">
        {/* left space */}
        <Space type="combined" direction="x" spaces={[56, 28, 14]} />
        {/* bar */}
        <ProgressBar progress={progress} />
        {/* right space */}
        <Space type="combined" direction="x" spaces={[56, 28, 14]} />
      </div>
    </div>
  );
};
