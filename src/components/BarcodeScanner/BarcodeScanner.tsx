import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef } from "react";

export const BarcodeScanner = ({
  onScann,
}: {
  onScann: (code: string) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader(new Map(), 1));

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment",
        },
      },
      videoRef.current,
      (result) => {
        if (result) onScann(result.getText());
      }
    );
    // reset
    return () => {
      reader.current.reset();
    };
  }, [videoRef]);

  return <video ref={videoRef} className="w-full" />;
};
