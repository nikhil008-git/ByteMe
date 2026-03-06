import React, { useState } from "react";
import axios from "axios"
export default function userSnippetpanel() {
    const [snippet, setSnippet] = useState("")
    const getMap = async () => {
        const response = await axios.get('/api/snippetx', {
            withCredentials: true
        })
    }
    return (
        <>
        </>
    )
}