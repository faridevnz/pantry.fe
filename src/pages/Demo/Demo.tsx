import { PlusIcon } from "../../assets/icons/PlusIcon";
import { Space } from "../../components/atoms/Space/Space";
import { Button } from "../../components/atoms/Button/Button";
import { IconButton } from "../../components/molecules/IconButton/IconButton";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { useToaster } from "../../hooks/Toaster/Toaster";

// useEffect(() => {
//   const today = new Date().valueOf();
//   const day_millis = 24 * 60 * 60 * 1000;
//   console.log("ieri", new Date(today - day_millis * 1));
//   console.log("oggi", new Date(today));
//   console.log("domani", new Date(today + day_millis * 1));
//   console.log("dopo domani", new Date(today + day_millis * 2));
// }, []);

export const Demo = () => {
  const toaster = useToaster();

  const onToaster = () => {
    toaster.start({
      type: "success",
      message: "creazione in corso ... attendere",
      subject: {
        icon: "🥩",
        text: "Bistecche di Vitello",
      },
    });
  };

  return (
    <PageWithNavigation>
      <Space type="simple" direction="y" value={28} />
      <Button variant="fill">Toaster</Button>
      <Space type="simple" direction="y" value={7} />
      <Button variant="link">Button</Button>
      <Space type="simple" direction="y" value={7} />
      <IconButton variant="fill" icon={<PlusIcon />}>
        Button
      </IconButton>
      <Space type="simple" direction="y" value={7} />
      <IconButton
        variant="link"
        icon={<PlusIcon style={{ color: "rgb(0, 153, 255)" }} />}
        onClick={onToaster}
      >
        Button
      </IconButton>
    </PageWithNavigation>
  );
};
