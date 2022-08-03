import React from "react";
import Guest from "../components/Guest";
import { observer } from "mobx-react-lite";


function GuestPage() {
    return (
        <div className="guest-wrapper">
            <div className="scrolling-image-container">
                <div className="scrolling-image">
                </div>
            </div>
            <Guest />
        </div>
    );
}

export default observer(GuestPage);