import React from 'react'

class StandardPage extends React.Component {
  render() {
    const classes = ['page-content']
    if (this.props.twoColumn) { classes.push('two-column-grid') }

    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}

export default StandardPage
