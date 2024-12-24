import { fruitsAndVeggies } from "@/data/domain/fruit.domain";
export const CategoryTab = ({
  data,
  title,
}: {
  data: fruitsAndVeggies[];
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-2 border-2 border-gray-300 rounded-md p-2">
      <div className="text-lg font-bold">{title}</div>
      <div className="flex flex-col gap-2">
        {data.map((item: fruitsAndVeggies, index: number) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};
