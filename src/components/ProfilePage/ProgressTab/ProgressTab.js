import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  CardTitle,
  CardBlock,
  CardText,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import Spinner from '../../common/Spinner/Spinner';
import WeightChart from './components/WeightChart/WeightChart';
import './ProgressTab.css';

const getUserData = gql`
  query user($id: ID!) {
    user(_id: $id) {
      height,
      weight,
      age,
      bodyMassIndex
    },
    weightHistoryItems(query: { userId: $id }) {
      date,
      weight
    },
    trainingHistoryItems(query: { userId: $id }) {
      _id,
      date,
      exerciseAproaches {
        _id,
        exercise {
          name
        },
        count
      }
    }
  }
`;

class ProgressTab extends Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
  };

  render() {
    return this.props.data.loading ? <Spinner isLoading={this.props.data.loading} /> : (
      <div>
        <Row>
          <Col xs="12" sm="12" md="6" className="progress__card__column">
            <Card block className="progress__card characteristics">
              <CardTitle className="characteristics__title">Your characteristics</CardTitle>
              <CardText>
                <div className="characteristics__field">
                  <div className="characteristics__field__key">
                    Age
                  </div>
                  <div className="characteristics__field__value">
                    {this.props.data.user.age}
                  </div>
                </div>
                <div className="characteristics__field">
                  <div className="characteristics__field__key">
                    Height
                  </div>
                  <div className="characteristics__field__value">
                    {this.props.data.user.height} сm
                  </div>
                </div>
                <div className="characteristics__field">
                  <div className="characteristics__field__key">
                    Weight
                  </div>
                  <div className="characteristics__field__value">
                    {this.props.data.user.weight} kg
                  </div>
                </div>
                <div className="characteristics__field">
                  <div className="characteristics__field__key">
                    Body mass index
                  </div>
                  <div className="characteristics__field__value">
                    {this.props.data.user.bodyMassIndex}
                  </div>
                </div>
              </CardText>
            </Card>
          </Col>

          <Col xs="12" sm="12" md="6" className="progress__card__column">
            <Card block className="progress__card">
              <CardTitle>Your weight progress</CardTitle>
              <WeightChart data={this.props.data.weightHistoryItems}/>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" className="progress__card__column">
            <Card block className="progress__card">
              <CardTitle>Your last 5 trainings</CardTitle>

              <ListGroup>
                {
                  this.props.data.trainingHistoryItems.map(trainingHistoryItem => (
                    <ListGroupItem key={trainingHistoryItem._id}>
                      <div>
                        {trainingHistoryItem.date}
                      </div>

                      <div>
                        {
                          trainingHistoryItem.exerciseAproaches.slice(0, 5).map(exerciseAproache => (
                            <span>
                              {`${exerciseAproache.exercise.name}: ${exerciseAproache.count}`}
                            </span>
                          ))
                        }
                      </div>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const ProgressTabWithData = graphql(getUserData, {
  options: ({ userID }) => ({
    variables: {
      id: userID
    },
    fetchPolicy: 'network-only'
  })
})(ProgressTab);

const mapStateToProps = state => ({
  userID: state.auth.currentUser._id
});

export default connect(mapStateToProps)(ProgressTabWithData);
