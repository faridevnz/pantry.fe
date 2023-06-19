import { useContext } from "react";
import { Toaster, ToasterContext } from "../../context/Toaster/ToasterContext";

export const useToaster = () => {
  //
  const { add, update } = useContext(ToasterContext);

  const complete = (params: { id: string; outcome: "success" | "error" }) => {
    update({ id: params.id, outcome: params.outcome });
  };

  const start = (params: {
    type: Toaster["type"];
    message: Toaster["message"];
    subject: Toaster["subject"];
  }) => {
    // add toaster
    const id = add({
      message: params.message,
      type: params.type,
      subject: params.subject,
    });
    // return 'complete' callback to complete manually
    return { complete, id };
  };

  // return
  return {
    start,
  };
};
