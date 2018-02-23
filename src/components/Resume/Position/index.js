import React from 'react'
import Link from 'gatsby-link'

import Subdued from '../../Typography/Subdued';

class Position extends React.Component {

  renderEmployers() {
    const { employers } = this.props;

    return employers.map(employer => {
      if (employer.website) {
        return (
          <a
          href={employer.website}
          target='_blank'>
            {employer.name}
          </a>
        );
      } else {
        return employer.name;
      }
    }).reduce((prev, curr) => [prev, ', ', curr]);
  }

  renderTimeframe() {
    const { start, stop } = this.props;
    if (start && stop) {
      return (
        <span>
          <br/>
          <Subdued>
            <span>{start}</span> &ndash; <span> {stop}</span>
          </Subdued>
        </span>
      );
    } else {
      return '';
    }
  }

  render() {
    const { jobTitle, start, stop } = this.props;

    return (
      <div>
        <p>
          <strong>{jobTitle}</strong> @ {this.renderEmployers()}
          {this.renderTimeframe()}
        </p>
      </div>
    );
  }
}

export default Position
