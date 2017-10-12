import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Button,
  InputGroup,
  InputGroupButton
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './EditableField.css';

class EditableField extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    isEditMode: false,
    inputValue: this.props.input.value
  }

  switchEditMode = isEditMode => this.setState(prevState => ({
    isEditMode: typeof isEditMode === 'undefined' ? !prevState.isEditMode : isEditMode
  }));

  onInputChange = e => this.setState({ inputValue : e.target.value });

  onSubmit = () => {
    this.props.onSubmit({ name: this.props.input.name, value: this.state.inputValue });
    this.switchEditMode();
  }

  onCancel = () => {
    this.setState({ inputValue: this.props.input.value });
    this.switchEditMode();
  }

  render() {
    return (
      <div className="editable-field">
        {
          this.state.isEditMode
            ? (
                <InputGroup>
                  <Input {...this.props.input} value={this.state.inputValue} onChange={this.onInputChange}/>
                  <InputGroupButton>
                    <Button color="success" onClick={this.onSubmit}>
                      <FontAwesome name='check'/>
                    </Button>
                  </InputGroupButton>
                  <InputGroupButton>
                    <Button color="primary" onClick={this.onCancel}>
                      <FontAwesome name='close'/>
                    </Button>
                  </InputGroupButton>
                </InputGroup>
            )
            : this.props.children
        }

        {
          !this.state.isEditMode
            ? (
              <Button color="link" className="editable-field__edit-button" onClick={() => this.switchEditMode()}>
                <FontAwesome name='pencil'/>
              </Button>
            )
            : null
        }
      </div>
    )
  }
}

export default EditableField;
