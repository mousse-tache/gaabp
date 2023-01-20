import React from "react";

type Size = "small" | "medium" | "large";

type Props = {
    children: any,
    className: string,
    size: Size
};

const Button = ({children, className, size, ...props} : Props) => {
    return (
        <button className={`${className} ${getSizeClasses(size)} bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded`} {...props}>
            {children}
        </button>
    );
};

const getSizeClasses = (size) => {
    return size;
};

export default Button;