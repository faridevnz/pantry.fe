import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { Subject } from "rxjs";

// observable
export const $toaster = new Subject<{
  type: ToasterType;
  message: string;
  subject: {
    icon: string;
    text: string;
  };
}>();

// types
export type ToasterType = "success" | "error" | "info";
export type Toaster = {
  id: string;
  type: ToasterType;
  subject: {
    icon: string;
    text: string;
  };
  message: string;
  time: number;
};

// context
export const ToasterContext = createContext<{
  add: (params: {
    type: ToasterType;
    subject: {
      icon: string;
      text: string;
    };
    message: string;
  }) => void;
  remove: (id: string) => void;
  toasters: Toaster[];
}>({ toasters: [] } as any);

// provider
export const ToasterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //
  const [toasters, setToasters] = useState<Toaster[]>([]);

  // subscribe to observable
  useEffect(() => {
    const sub = $toaster.subscribe((config) => {
      onAddToaster({
        message: config.message,
        type: config.type,
        subject: {
          icon: config.subject.icon,
          text: config.subject.text,
        },
      });
    });
    // reset
    return () => sub.unsubscribe();
  }, []);

  const onAddToaster = (params: {
    type: ToasterType;
    subject: {
      icon: string;
      text: string;
    };
    message: string;
  }) => {
    setToasters((prev) => {
      return [
        ...prev,
        {
          id: String(Math.random() * 1000),
          subject: {
            icon: params.subject.icon,
            text: params.subject.text,
          },
          message: params.message,
          time: 500,
          type: params.type,
        },
      ];
    });
  };

  const onRemoveToaster = (id: string) => {
    setToasters((prev) => {
      return [...prev.filter((toaster) => toaster.id !== id)];
    });
  };

  // render
  return (
    <ToasterContext.Provider
      value={{ add: onAddToaster, remove: onRemoveToaster, toasters }}
    >
      {children}
    </ToasterContext.Provider>
  );
};
