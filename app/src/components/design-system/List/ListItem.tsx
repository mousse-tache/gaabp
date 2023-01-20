import React from "react";

const ListItem = ({children, ...props} : any) => {
    return (
        <li {...props}>
            {children}
        </li>
    );
};

export default ListItem;