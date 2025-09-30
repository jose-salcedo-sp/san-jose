import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import type { DateRange } from "react-day-picker"
import { useState } from "react"

type DatePickerProps = { date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }

export function DatePicker({ date, setDate }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Escoja una fecha</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
        </Popover>
    )
}

type DateRangePickerProps = { dateRange: DateRange | undefined, setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>> }

export function DateRangePicker({ dateRange, setDateRange }: DateRangePickerProps) {
    const today = new Date();
    const defaultDate: DateRange = {
        from: today,
        to: addDays(today, 5),
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const handleApply = () => {
        if (dateRange) {
            setDateRange(dateRange);
        }
        setIsPopoverOpen(false);
    };
    const handleReset = () => {
        setDateRange(defaultDate);
        setIsPopoverOpen(false);
    };
    const handleSelect = (selected: DateRange | undefined) => {
        setDateRange({
            from: selected?.from || undefined,
            to: selected?.to || undefined,
        });
    };
    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    mode="input"
                    placeholder={!dateRange?.from && !dateRange?.to}
                    className="w-[250px]"
                >
                    <CalendarIcon />
                    {dateRange?.from ? (
                        dateRange.to ? (
                            <>
                                {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                            </>
                        ) : (
                            format(dateRange.from, 'LLL dd, y')
                        )
                    ) : (
                        <span>Escoja un rango</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    autoFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    showOutsideDays={false}
                    selected={dateRange}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                />
                <div className="flex items-center justify-end gap-1.5 border-t border-border p-3">
                    <Button variant="outline" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button onClick={handleApply}>Apply</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}