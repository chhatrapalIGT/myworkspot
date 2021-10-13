import React from 'react';
import { Redirect } from 'react-router';
import { parse } from "query-string";

export default function CallBack({location}) {
    const hash = location.hash;
    const response = parse(hash);
    if (response && response.error) {
        alert(response.error_description);
        return <Redirect to="/auth" />
    } else {
        sessionStorage.setItem("AccessToken",JSON.stringify(response));
        return <Redirect to="/" />
    }
}
