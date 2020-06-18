import React from "react"
import Carousel from 'react-material-ui-carousel'
import image1 from "../../images/image1.jpg"
import image2 from "../../images/image2.jpg"
import image3 from "../../images/image3.jpg"

function ImageCarousel(props)
{
    var items = [
        {
            description: "Jamboree 2017",
            src: image1
        },
        {
            description: "Camp de formation national 2018",
            src: image2
        },
        {
            description: "Levée des couleurs castor",
            src: image3
        }
    ]
 
    return (
        <Carousel className="carousel-public">
            {
                items.map( item => <img src={item.src} alt={image1.description} /> )
            }
        </Carousel>
    )
}
 
export default ImageCarousel;