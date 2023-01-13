import React, { FC } from "react";

const category = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};

export const Categories: FC<CategoriesProps> = React.memo(
  ({ categoryId, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {category.map((pizza, i) => {
            return (
              <li
                key={i}
                onClick={() => onClickCategory(i)}
                className={categoryId === i ? "active" : ""}
              >
                {pizza}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
