import { useContext } from "react";
import { Toaster, ToasterContext } from "../../context/Toaster/ToasterContext";

export const useToaster = () => {
  //
  const { add } = useContext(ToasterContext);

  const start = (params: {
    type: Toaster["type"];
    message: Toaster["message"];
    subject: Toaster["subject"];
  }) => {
    // add toaster
    add({
      message: params.message,
      type: params.type,
      subject: params.subject,
    });
  };

  // return
  return {
    start,
  };
};
