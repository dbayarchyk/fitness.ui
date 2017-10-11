import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';

import Spinner from '../../common/Spinner/Spinner';
import EditableField from './components/EditableField/EditableField';
import './AccountTab.css';

const getUserData = gql`
  query user($id: ID!) {
    user(_id: $id) {
      email,
      name,
      surname,
      age,
      weight,
      height,
      purpose
    }
  }
`;

const updateUser = gql`
  mutation updateUser($id: ID!, $data: UserInput!) {
    updateUser(_id: $id, data: $data) {
      email,
      name,
      surname,
      age,
      weight
    }
  }
`;

const PURPOSE_VALUES = {
  INCREASE_MUSCLE_MASS: 'Increase muscle mass',
  INCREASE_MUSCLE_STRENGTH: 'Increase muscle strength',
  WEIGHT_LOSS: 'Weight Loss',
  CREATING_A_BODY_RELIEF: 'Creating a body relief',
  MAINTAINING_THE_FORM_ALREADY_ACHIEVED: 'Maintaining the form already achieved',
};

const PUPROSES = [
  {
    title: 'Increase muscle mass',
    value: 'INCREASE_MUSCLE_MASS',
  },
  {
    title: 'Increase muscle strength',
    value: 'INCREASE_MUSCLE_STRENGTH',
  },
  {
    title: 'Weight Loss',
    value: 'WEIGHT_LOSS',
  },
  {
    title: 'Creating a body relief',
    value: 'CREATING_A_BODY_RELIEF',
  },
  {
    title: 'Maintaining the form already achieved',
    value: 'MAINTAINING_THE_FORM_ALREADY_ACHIEVED',
  }
];

class AccountTab extends Component {
  onFieldChange = field => {
    let data = {};
    Object.assign(data, this.props.data.user, { [field.name]: field.value });
    delete data.__typename;

    this.props.mutate({
      variables: {
        id: this.props.userID,
        data: data
      }
    })
      .then(() => this.props.data.refetch())
  }

  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading}/>
    } else return (
      <div className="account">
        <Row>
          <Col xs="12" sm="12" md="6" className="no-float">
            <Card block className="account___data">
              <CardTitle>Your data</CardTitle>
              <CardText>
                <div className="account__data__field">
                  <div className="account__data__field__key">
                    E-mail
                  </div>
                  <div className="account__data__field__value">
                    <EditableField
                      input={{
                        type: "email",
                        value: this.props.data.user.email,
                        placeholder: "email",
                        name: "email"
                      }}
                      onSubmit={this.onFieldChange.bind(this)}
                    >
                      {this.props.data.user.email}
                    </EditableField>
                  </div>
                </div>
                <div className="account__data__field">
                  <div className="account__data__field__key">
                    Name
                  </div>
                  <div className="account__data__field__value">
                    <EditableField
                      input={{
                        type: "text",
                        value: this.props.data.user.name,
                        placeholder: "Name",
                        name: "name"
                      }}
                      onSubmit={this.onFieldChange}
                    >
                      {this.props.data.user.name}
                    </EditableField>
                  </div>
                </div>
                <div className="account__data__field">
                  <div className="account__data__field__key">
                    Surname
                  </div>
                  <div className="account__data__field__value">
                    <EditableField
                      input={{
                        type: "text",
                        value: this.props.data.user.surname,
                        placeholder: "Surname",
                        name: "surname"
                      }}
                      onSubmit={this.onFieldChange}
                    >
                      {this.props.data.user.surname}
                    </EditableField>
                  </div>
                </div>
                <div className="account__data__field">
                  <div className="account__data__field__key">
                    Age
                  </div>
                  <div className="account__data__field__value">
                    <EditableField
                      input={{
                        type: "number",
                        value: this.props.data.user.age,
                        placeholder: "Age",
                        name: "age"
                      }}
                      onSubmit={this.onFieldChange}
                    >
                      {this.props.data.user.age}
                    </EditableField>
                  </div>
                </div>
                <div className="account__data__field">
                  <div className="account__data__field__key">
                    Weight
                  </div>
                  <div className="account__data__field__value">
                    <EditableField
                      input={{
                        type: "number",
                        value: this.props.data.user.weight,
                        placeholder: "Weight",
                        name: "weight"
                      }}
                      onSubmit={this.onFieldChange}
                    >
                      {this.props.data.user.weight}
                    </EditableField>
                  </div>
                </div>
                <div className="account__data__field">
                  <div className="account__data__field__key">
                    Height
                  </div>
                  <div className="account__data__field__value">
                    <EditableField
                      input={{
                        type: "number",
                        value: this.props.data.user.height,
                        placeholder: "Height",
                        name: "height"
                      }}
                      onSubmit={this.onFieldChange}
                    >
                      {this.props.data.user.height}
                    </EditableField>
                  </div>
                </div>
                <div className="account__data__field">
                  <div className="account__data__field__key">
                    Purpose
                  </div>
                  <div className="account__data__field__value">
                    <EditableField
                      input={{
                        type: "select",
                        value: this.props.data.user.purpose,
                        placeholder: "Purpose",
                        name: "purpose",
                        children: PUPROSES.map((purpose, index) => <option value={purpose.value} key={index}>{purpose.title}</option>)
                      }}
                      onSubmit={this.onFieldChange}
                    >
                      {PURPOSE_VALUES[this.props.data.user.purpose]}
                    </EditableField>
                  </div>
                </div>
              </CardText>
            </Card>
          </Col>

          {/* <Col xs="12" sm="12" md="6" className="no-float">
            <Card block>
              Training Plan
            </Card>
          </Col> */}
        </Row>
      </div>
    )
  }
}

const AccountTabWithData = graphql(getUserData, {
  options: ({ userID }) => ({
    variables: {
      id: userID
    }
  })
})(AccountTab);

const AccountTabWithDataAndMutations = graphql(updateUser)(AccountTabWithData);

const mapStateToProps = state => ({
  userID: state.auth.currentUser._id
});

export default connect(mapStateToProps)(AccountTabWithDataAndMutations);
