import { ReactNode, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { Button } from "../../components/Button/Button";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { Space } from "../../components/Space/Space";
import { Recipe } from "../../api/recipe";
import { recipes as recipes_mock } from "../../components/RecipeCard/mock/recipes";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";

export const Recipes = () => {
  const [recipes] = useState<Recipe[]>(recipes_mock);

  return (
    <>
      <PageWithNavigation>
        <Space type="simple" direction="y" value={14} />
        {/* header */}
        <div className="w-full flex justify-between items-end">
          <span className="font-bold text-[38px] text-[#3E4954] leading-[38px]">
            RICETTE
          </span>
          <Button variant="fill" icon={<PlusIcon />}>
            Crea
          </Button>
        </div>
        {/* content */}
        <Space type="simple" direction="y" value={28} />
        <Section label="COLAZIONE">
          {recipes
            ?.filter((recipe) => recipe.category === "COLAZIONE")
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
              />
            ))}
          {/*  */}
        </Section>
        <Section label="PASTI">
          {recipes
            ?.filter((recipe) => recipe.category === "PASTI")
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
              />
            ))}
          {/*  */}
        </Section>
        <Section label="DOLCI">
          {recipes
            ?.filter((recipe) => recipe.category === "DOLCI")
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
              />
            ))}
          {/*  */}
        </Section>
      </PageWithNavigation>
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
