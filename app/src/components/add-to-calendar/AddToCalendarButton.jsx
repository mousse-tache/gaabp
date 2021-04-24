import React from "react";
import { Button, List } from "@material-ui/core";
import AddToCalendarHOC from 'react-add-to-calendar-hoc';

import "./add-to-calendar-button.scss";

const AddToCalendarButton = ({className, event, ...props}) => {
    const AddToCalendar = AddToCalendarHOC(Button, List);

    return (
        <AddToCalendar 
        className={`add-to-calendar-button ${className}`} 
        {...props} 
        linkProps={{className: 'add-to-calendar-link'}} 
        buttonText="Ajouter au calendrier" 
        event={event}
         />
    );
};

export default AddToCalendarButton;