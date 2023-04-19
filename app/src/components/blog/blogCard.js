import Img from "gatsby-image";
import moment from "moment";

import { Typography } from "@material-ui/core";
import { graphql, Link, useStaticQuery } from "gatsby";

import Card from "../design-system/Card/Card";

import "./blogCard.css";

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
  `);

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />;
};

const BlogCard = ({ article }) => {
  const { title, path, date, thumbnail } = article;
  const formattedDate = moment(date).format("YYYY-MM-DD");

  return (
    <Card className="blog-card">
      <Link to={path} className="blog-card-link">
        <div>
          <div className="thumbnail">
            {thumbnail ? <Img fluid={thumbnail} /> : <DefaultThumbnail />}
          </div>
        </div>
        <div>
          <Typography>{title}</Typography>
          publié le {formattedDate}
        </div>
      </Link>
    </Card>
  );
};

export default BlogCard;
