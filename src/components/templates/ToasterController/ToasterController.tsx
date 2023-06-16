import { useContext } from "react";
import { ToasterContext } from "../../../context/Toaster/ToasterContext";
import { Toaster } from "../../molecules/Toaster/Toaster";

export const ToasterController = () => {
  //

  const { toasters, remove } = useContext(ToasterContext);

  // render
  return (
    <>
      {toasters.slice(0, 3).map((_, index) => (
        <Toaster
          key={_.id}
          index={index}
          time={3000}
          start={index === 0}
          message={_.message}
          subject={{
            icon: _.subject.icon,
            text: _.subject.text,
          }}
          onComplete={() => remove(_.id)}
        />
      ))}
    </>
  );
};
