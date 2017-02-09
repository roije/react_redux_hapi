/**
 * Created by roije on 2/9/17.
 */
import React from 'react'
import classnames from 'classnames';

class FlashMessage extends React.Component {

  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  render() {

    const { id, type, text} = this.props.message;

    return(
      <div className={classnames('alert', {
        'alert-success' : type === 'success',
        'alert-danger' : type === 'error'

      })}>
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
        {text}
      </div>
    )
  }
};

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired
}

export default FlashMessage;