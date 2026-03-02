import { Badge } from "@/components/ui/badge";

type Props = {
  genre: string;
};

export default function GenreBadge({ genre }: Props) {
  const blueClassName =
    "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  const greenClassName =
    "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
  const redClassName =
    "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
  const defaultClassName =
    "bg-gray-50 text-black dark:bg-gray-900 dark:text-white";

  const judgeClass = (genre: string) => {
    if (genre === "walking") return blueClassName;
    else if (genre === "sleeping") return greenClassName;
    else if (genre === "cute") return redClassName;
    else return defaultClassName;
  };

  return (
    <Badge className={judgeClass(genre)}>{genre}</Badge>
  );
}
