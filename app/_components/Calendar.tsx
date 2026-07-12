import { CalendarProps } from "@/types";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";



function Calendar({ days, setDays, ref, formatDate }: CalendarProps) {

    const [date, setDate] = useState(() => formatDate(new Date().toDateString()));
    function submitHandler() {
        if (ref.current) {
            ref.current.requestSubmit();
        }
    }
    return (
        <div className="flex flex-col self-center space-y-5 print:hidden">
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
                className="w-64 h-10 px-5 text-center capitalize outline focus:outline-red-800 outline-mb-secondary-200 rounded-xl"
            />
            <button
                onClick={submitHandler}
                type="submit"
                className="bg-mb-primary-500 rounded-xl min-w-fit px-10 py-5 text-mb-secondary-100 text-center tracking-wide shadow-2xl shadow-mb-secondary-500 transition-transform active:translate-y-0.5 hover:translate-y-[-0.5px] cursor-pointer"
            >
                Calculate for {days || 1} days
            </button>
        </div>
    )
}

export default Calendar