"use client"

import toast from "react-hot-toast";
import { storeUser } from "../_lib/actions";
import { useUserContext } from "../_providers/UserProvider"
// import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

function NotificationForm() {
    const { patientName, setEmail, email } = useUserContext();
    useEffect(() => {
        setEmail(localStorage.getItem(`email-${patientName}`) ?? "");

    },[setEmail,patientName])

    return (
        <form className='m-auto h-[70vh] flex flex-col items-center justify-evenly' action={(formData:FormData) => {
            storeUser(formData);
            localStorage.setItem(`email-${patientName}`,String(formData.get("email")))
            toast.success("Email verified")
        }}>
            <h1 className="text-4xl uppercase tracking-widest font-extralight">Verify your Email</h1>
            <div className="flex flex-col items-center justify-center gap-y-4">
                <input type="email" name="email" id="email" placeholder="Enter your email" defaultValue={email} className="text-center w-80 h-10 outline outline-mb-primary-200 focus:outline-mb-primary-500 rounded-lg" />
                <input type="hidden" name="patientName" defaultValue={patientName} onChange={(e)=>setEmail(e.target.value)} />
                <button className="w-32 h-10 bg-mb-primary-500 text-white rounded-md shadow-xl shadow-mb-secondary-500 transition-transform hover:translate-y-0.5 cursor-pointer" type="submit">Verify</button>
            </div>
        </form>
    )
}

export default NotificationForm
