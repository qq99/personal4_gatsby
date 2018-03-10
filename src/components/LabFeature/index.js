import React from "react";
import Link from "gatsby-link";
import AnnotatedImage from "../AnnotatedImage";

const LabFeature = (props) => (
  <div className="lab-feature">
    <div className="lab-image">
      <Link to={ props.to }>
        <AnnotatedImage>
          { props.image ? props.image : "" }
        </AnnotatedImage>
      </Link>
    </div>
    <div className='lab-description'>
      <h1 className="page-subtitle">{props.title}</h1>
      <p>{props.description}</p>
      <p style={{
        display: props.status ? "block" : "none",
      }}
      >Status: {props.status}
      </p>
      <p>
        <Link to={ props.to }>Learn more...</Link>
      </p>
    </div>
  </div>
);

export default LabFeature;
