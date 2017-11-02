import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import moment from 'moment';

import { 
  CharacteristicField,
  CharacteristicKey,
  CharacteristicValue,
} from '../../common/CharacteristicField/CharacteristicField';
import FCard from '../../common/Card/Card';
import Spinner from '../../common/Spinner/Spinner';
import WeightChart from '../../WeightChart/WeightChart';
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
            <FCard 
              header={{ title: { children: 'Your characteristics' } }}

              body={{
                children: [
                  <CharacteristicField>
                    <CharacteristicKey>Age</CharacteristicKey>
                    <CharacteristicValue>{this.props.data.user.age}</CharacteristicValue>
                  </CharacteristicField>,

                  <CharacteristicField>
                    <CharacteristicKey>Height</CharacteristicKey>
                    <CharacteristicValue>{this.props.data.user.height} сm</CharacteristicValue>
                  </CharacteristicField>,

                  <CharacteristicField>
                    <CharacteristicKey>Weight</CharacteristicKey>
                    <CharacteristicValue>{this.props.data.user.weight} kg</CharacteristicValue>
                  </CharacteristicField>,

                  <CharacteristicField>
                    <CharacteristicKey>Body mass index</CharacteristicKey>
                    <CharacteristicValue>{this.props.data.user.bodyMassIndex}</CharacteristicValue>
                  </CharacteristicField>
                ]
              }}
            />
          </Col>

          <Col xs="12" sm="12" md="6" className="progress__card__column">
            <FCard
              header={{ title: { children: 'Your weight progress' }}}

              body={{ children: <WeightChart data={this.props.data.weightHistoryItems}/> }}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" className="progress__card__column">
              <FCard 
                header={{ title: { children: 'Your last 5 trainings' }}}

                body={{
                  children: <ListGroup>
                    {
                      this.props.data.trainingHistoryItems.map(trainingHistoryItem => (
                        <ListGroupItem key={trainingHistoryItem._id}>
                          <Link to={`/app/training/${trainingHistoryItem._id}`}>
                            {moment(trainingHistoryItem.date).format('Do MMMM YYYY h:mm a')}
                          </Link>
                        </ListGroupItem>
                      ))
                    }
                  </ListGroup>
                }}
              />
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
