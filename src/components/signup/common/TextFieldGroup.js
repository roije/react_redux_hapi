/**
 * Created by roije on 2/9/17.
 */
import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error ,type, onChange, checkUserExists}) => {
  return(
    <div>
      <div className={classnames("form-group", {'has-error': error})}>
        <label className="control-label">{label}</label>
        <input
          type={type}
          onBlur={checkUserExists}
          name={field}
          className="form-control"
          value={value}
          onChange={onChange}
        />
        {error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
}

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default  TextFieldGroup;