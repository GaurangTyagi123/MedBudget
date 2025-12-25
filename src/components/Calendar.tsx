import { differenceInCalendarDays } from "date-fns";

type CalendarProps = {
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    days: number;
    setDays: React.Dispatch<React.SetStateAction<number>>;
    onClick: () => void;
    formatDate: (date: string) => string;
}
function Calendar({ date, setDate, days, setDays, onClick, formatDate }: CalendarProps) {
    return (
        <div className="flex flex-col self-center space-y-5">
            <input
                type="date"
                value={date}
                onChange={(e) => {
                    const diff = differenceInCalendarDays(e.target.value, Date.now());
                    if (diff <= 0) {
                        setDays(1)
                        setDate(formatDate(new Date().toDateString()))
                    }
                    else {
                        setDays(diff);
                        setDate(formatDate(new Date(e.target.value).toDateString()));

                    }
                }}
                placeholder="enter number of days"
                className="text-center capitalize outline focus:outline-red-800 outline-mb-secondary-200 rounded-xl"
            />
            <button
                onClick={onClick}
                className="bg-mb-primary-500 rounded-xl min-w-fit px-10 py-5 text-mb-secondary-100 text-center tracking-wide"
            >
                Calculate for {days || 1} days
            </button>
        </div>
    )
}

export default Calendar
