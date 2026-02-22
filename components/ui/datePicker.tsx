import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";

type Props = {
  date: Date;
  onSelectDate: (date: Date | undefined) => void;
};

export default function DatePicker({
  date,
  onSelectDate,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
        >
          {date ? (
            format(date, "PPP", { locale: ja })
          ) : (
            <span>日付を選択</span>
          )}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => onSelectDate(value)}
          defaultMonth={date}
          locale={ja}
        />
      </PopoverContent>
    </Popover>
  );
}
