import React, { useEffect, useState } from "react";
import { fruitsAndVeggies } from "@/data/domain/fruit.domain";

export const FruitSelect = ({
  data,
  selected,
  onSelect,
}: {
  data: fruitsAndVeggies[];
  selected: Record<string, fruitsAndVeggies>;
  onSelect: (item: fruitsAndVeggies) => void;
}) => {
  return (
    <div>
      {data.map(
        (item) =>
          !selected[item.name] && (
            <div key={item.name} onClick={() => onSelect(item)}>
              {item.name}
            </div>
          )
      )}
    </div>
  );
};
