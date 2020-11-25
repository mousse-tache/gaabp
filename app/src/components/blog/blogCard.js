import { Card, CardContent, Typography } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import moment from "moment";
import "./blogCard.css";

const BlogCard = ({article}) => {
    const { html, title, path, date } = article;
    const formattedDate = moment(date).format("YYYY-MM-DD");

    return (
        <Card className="blog-card">
            <CardContent>
                <Link to={path}>
                    <Typography>
                        {title}
                    </Typography>
                </Link> 
                publié le {formattedDate}
            </CardContent>
            
        </Card>
    )
};

export default BlogCard;