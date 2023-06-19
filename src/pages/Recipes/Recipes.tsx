import { ReactNode, useEffect, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { Space } from "../../components/atoms/Space/Space";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { ModalController } from "../../layouts/ModalController/ModalController";
import { CreateRecipe } from "./modals/CreateRecipe";
import { Recipe } from "../../model/model";
import { APIDeleteRecipe, APIGetRecipes } from "../../api/recipe/recipe.api";
import { IconButton } from "../../components/molecules/IconButton/IconButton";
import { useToaster } from "../../hooks/Toaster/Toaster";

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [mode, setMode] = useState<"CREATE" | "LIST" | "UPDATE">("LIST");
  const [categories, setCategories] = useState<string[]>([]);

  // controllers
  const toaster = useToaster();

  useEffect(() => {
    recipes?.forEach((recipe) => {
      setCategories((prev) => {
        console.log(
          "SETTING CATEGORIES from",
          recipes,
          "TO",
          Array.from(new Set<string>(prev).add(recipe.category))
        );
        return Array.from(new Set<string>(prev).add(recipe.category));
      });
    });
  }, [recipes]);

  const fetchRecipes = () => {
    APIGetRecipes()
      .then((recipes) => setRecipes(recipes))
      .catch((err) => console.error("ERR", err));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onClose = (type: "success" | "close" | "error") => {
    // fetch if success
    if (type === "success") fetchRecipes();
    // close modal
    setMode("LIST");
  };

  const onDeleteRecipe = (recipe: Recipe) => {
    // fetch
    APIDeleteRecipe(recipe.id)
      .then(
        () => {
          // success toaster
          toaster.start({
            type: "success",
            message: "ricetta eliminata correttamente",
            subject: {
              icon: "👍",
              text: `${recipe.name}`,
            },
          });
          // refetch
          fetchRecipes();
        }
        // fetch api
      )
      .catch(() =>
        // error toaster
        toaster.start({
          type: "error",
          message: "errore durante la cancellazione della ricetta",
          subject: { icon: "❗️", text: `${recipe.name}` },
        })
      );
  };

  return (
    <>
      <PageWithNavigation
        title="RICETTE"
        action={
          <IconButton
            variant="fill"
            icon={<PlusIcon />}
            onClick={() => setMode("CREATE")}
          >
            Crea
          </IconButton>
        }
      >
        {/* content */}
        <Space type="simple" direction="y" value={28} />

        {categories.map((category) => (
          <Section label={category} key={category}>
            {recipes
              ?.filter((recipe) => recipe.category === category)
              .map((recipe, index) => (
                <RecipeCard
                  key={index}
                  name={recipe.name}
                  category={recipe.category}
                  description={recipe.description}
                  difficulty={recipe.difficulty}
                  food={recipe.food}
                  nutritional_values={recipe.nutritional_values}
                  time={recipe.time}
                  onDelete={() => onDeleteRecipe(recipe)}
                />
              ))}
          </Section>
        ))}
      </PageWithNavigation>

      {/* modals */}
      <ModalController open={mode === "CREATE"}>
        <CreateRecipe
          onClose={(type: "success" | "close" | "error") => {
            onClose(type);
          }}
        />
      </ModalController>
    </>
  );
};

const Section = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <>
      {/* label */}
      <div className="flex justify-start items-center">
        <Space type="simple" direction="x" value={4} />
        <span className="uppercase text-[14px] font-bold text-[#566A7E]">
          {label}
        </span>
      </div>
      {/* content */}
      <Space type="simple" direction="y" value={7} />
      <div className="flex flex-col gap-[7px]">{children}</div>
      <Space type="simple" direction="y" value={14} />
    </>
  );
};
