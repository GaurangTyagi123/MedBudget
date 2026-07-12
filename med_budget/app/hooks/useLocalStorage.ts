"use client";

import { useEffect } from "react";
import { useUserContext } from "../_providers/UserProvider";

export default function useLocalStorage(key: string) {
    const { patientName,setPatientname,email,setEmail } = useUserContext();

    useEffect(() => {
        switch (key) {
            case "patientName":
                setPatientname(localStorage.getItem(key) ?? "");
                break;
            case "email":
                setEmail(localStorage.getItem(key) ?? "");
                break;
            default:
                ;
        }
    }, [key,setPatientname,setEmail]);

    switch (key) {
        case "patientName":
            return patientName;
        case "email":
            return email;
        default:
            return "";
    }
}