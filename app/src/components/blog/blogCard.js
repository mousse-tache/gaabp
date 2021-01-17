import React from "react";
import moment from "moment";

import { Card, CardContent, Typography } from "@material-ui/core";
import { Link, useStaticQuery, graphql } from "gatsby";

import "./blogCard.css";

import Img from "gatsby-image"

const DefaultThumbnail = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "default-thumbnail.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
};

const BlogCard = ({article}) => {
    const { html, title, path, date, thumbnail } = article;
    const formattedDate = moment(date).format("YYYY-MM-DD");

    return (
        <Card className="blog-card">
            <CardContent>
                <Link to={path} className="blog-card-link">
                    <div>
                        <div className="thumbnail">
                            {thumbnail ? <Img fluid={thumbnail} />  : <DefaultThumbnail />}
                        </div>
                    </div>
                    <div>
                        <Typography>
                            {title}
                        </Typography>
                        publié le {formattedDate}
                    </div>
                </Link>
            </CardContent>
            
        </Card>
    )
};

export default BlogCard;