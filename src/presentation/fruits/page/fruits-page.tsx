"use client";
import { CategoryTab } from "@/presentation/fruits/components/category-tab";
import { fruitsAndVeggies } from "@/data/domain/fruit.domain";
import { FruitSelect } from "@/presentation/fruits/components/fruit-select";
import { useMemo, useState } from "react";
const fruits: fruitsAndVeggies[] = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

export const FruitsPage = () => {
  const [selected, setSelected] = useState<Record<string, fruitsAndVeggies>>(
    {}
  );

  const [inputValue, setInputValue] = useState("");

  const handleSelect = (item: fruitsAndVeggies) => {
    setSelected((prev) => ({
      ...prev,
      [item.name]: item,
    }));
  };

  const selectedFruits = Object.values(selected).filter((item) => {
    console.log("Filtering fruits...");
    return item.type === "Fruit";
  });

  const selectedVegetables = Object.values(selected).filter((item) => {
    console.log("Filtering vegetables...");
    return item.type === "Vegetable";
  });

  return (
    <div className="flex gap-2 p-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
      />
      <FruitSelect data={fruits} selected={selected} onSelect={handleSelect} />
      <CategoryTab data={selectedFruits} title="Fruits" />
      <CategoryTab data={selectedVegetables} title="Vegetables" />
    </div>
  );
};
