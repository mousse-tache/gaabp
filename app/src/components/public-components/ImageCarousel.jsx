import React from "react";
import image1 from "@aabp/images/image1.jpg";

const ImageCarousel = () => {
    var item = {
        description: "Jamboree 2017",
        src: image1,
        key:1
    };
 
    return (
        <div className="title-image">
            <img src={item.src} width="600" alt={item.description} loading="lazy" key={item.key} />
        </div>
    );
};
 
export default ImageCarousel;