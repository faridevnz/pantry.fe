import { FC, ReactNode, useEffect, useState } from "react";

export type ModalControllerProps = {
  children: ReactNode;
  open: boolean;
};

export const ModalController: FC<ModalControllerProps> = ({
  children,
  open,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  return (
    <div
      className="w-full fixed h-[100svh] flex items-end backdrop-blur-[2px] transition-all"
      style={{ bottom: visible ? "0" : "-100svh" }}
    >
      <div className="w-full h-[94%] bg-[#F5F7F8] border-t-[1px] border-[#E0E5EA] flex justify-center items-center drop-shadow-[0px_-4px_50px_#00000010]">
        {visible ? children : null}
      </div>
    </div>
  );
};
