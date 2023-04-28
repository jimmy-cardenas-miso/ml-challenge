import { Header } from "./components/Header";
import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function Root(props) {
    return <BrowserRouter>
        <Header/>
    </BrowserRouter>
}
