import { Badge } from "@/components/ui/badge";

type Props = {
  category: string;
};

export default function CategoryBadge({ category }: Props) {
  const blueClassName =
    "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  const greenClassName =
    "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
  const redClassName =
    "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
  const defaultClassName =
    "bg-gray-50 text-black dark:bg-gray-900 dark:text-white";

  const judgeClass = (category: string) => {
    if (category === "walking") return blueClassName;
    else if (category === "sleeping") return greenClassName;
    else if (category === "cute") return redClassName;
    else return defaultClassName;
  };

  return <Badge className={judgeClass(category)}>{category}</Badge>;
}
