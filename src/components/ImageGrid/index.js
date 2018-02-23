import React from "react";

import "./image-grid.scss";

const ImageGrid = (props) => (
  <div className="image-grid" { ...props }>
    {props.children.map((child) =>
      <div className='image-grid-item'>
        {child}
      </div>
    )}
  </div>
);

export default ImageGrid;
