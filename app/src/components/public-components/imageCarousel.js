import React from "react"
import Carousel from 'react-material-ui-carousel'
import image1 from "../../images/image1.jpg"
import image2 from "../../images/image2.jpg"
import image3 from "../../images/image3.jpg"

const ImageCarousel = () => {
    var items = [
        {
            description: "Jamboree 2017",
            src: image1,
            key:1
        },
        {
            description: "Camp de formation national 2018",
            src: image2,
            key:2
        },
        {
            description: "Levée des couleurs castor",
            src: image3,
            key:3
        }
    ]
 
    return (
        <Carousel 
        className="carousel-public" 
        navButtonsAlwaysVisible={true}
        navButtonsAlwaysInvisible={false}
        indicators={true}
        interval={6000}
        timeout={1000} >
            {
                items.map( item => <img src={item.src} alt={item.description} loading="lazy" key={item.key} /> )
            }
        </Carousel>
    )
}
 
export default ImageCarousel;