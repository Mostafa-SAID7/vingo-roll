import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: string; // ISO string format
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Date & Time Picker Component
 * Uses shadcn Popover + Calendar for consistent UI
 * Returns ISO datetime string
 */
export function DateTimePicker({
  value,
  onChange,
  placeholder = "Select date & time",
  disabled = false,
  className,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(value ? new Date(value) : undefined);
  const [hours, setHours] = useState<string>(value ? format(new Date(value), "HH") : "09");
  const [minutes, setMinutes] = useState<string>(value ? format(new Date(value), "mm") : "00");

  const handleDateSelect = (date: Date | undefined) => {
    setTempDate(date);
  };

  const handleConfirm = () => {
    if (tempDate) {
      const dateTime = new Date(tempDate);
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      onChange(dateTime.toISOString());
      setOpen(false);
    }
  };

  const displayValue = value ? format(new Date(value), "MMM dd, yyyy 'at' HH:mm") : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn("w-full justify-start text-left font-normal", className)}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {displayValue || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          {/* Calendar */}
          <CalendarComponent
            mode="single"
            selected={tempDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />

          {/* Time Picker */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <div className="mt-3 flex gap-2">
              {/* Hours */}
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Hours</label>
                <Input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => {
                    const val = Math.min(23, Math.max(0, parseInt(e.target.value) || 0));
                    setHours(String(val).padStart(2, "0"));
                  }}
                  className="mt-1 h-8 text-center"
                />
              </div>

              {/* Separator */}
              <div className="flex items-end pb-1">:</div>

              {/* Minutes */}
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Minutes</label>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  step="15"
                  value={minutes}
                  onChange={(e) => {
                    const val = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
                    setMinutes(String(val).padStart(2, "0"));
                  }}
                  className="mt-1 h-8 text-center"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleConfirm} disabled={!tempDate}>
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
