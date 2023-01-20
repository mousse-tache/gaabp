import React from "react";

const List = ({children, ...props} : any) => {
    return (
        <ul {...props}>
            {children}
        </ul>
    );
};

export default List;