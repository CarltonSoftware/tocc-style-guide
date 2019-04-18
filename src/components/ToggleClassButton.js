import React from 'react';

class ToggleClassButton extends React.Component {

  toggleClass(event) {
    const target = event.target.dataset.target;
    const $target = document.getElementById(target);
    event.target.classList.toggle('is-active');
    $target.classList.toggle('is-active');
  }

  render() {
    return (
      <a href="#" role="button" className={ this.props.className } onClick={ this.toggleClass } data-target={ this.props.target }>
        { this.props.children }
      </a>
    );
  }
}

export default ToggleClassButton;