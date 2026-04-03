import { Metadata } from "next";
import Header from "../ui/Header";

export const metadata: Metadata = {
    title: 'Sign in'
}

export default function Page(){
    return (
        <Header/>
    );
}