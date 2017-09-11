import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Card,
  CardBlock,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';

import './Training.css';
import CounterContainer from '../Counter/CounterContainer';

const Training = ({ exerciseAproaches = [], currentExerciseApproach = {}, isApproachStarted = false, isApproachStopped = false, startApproach, stopApproach, finishApproach, currentExerciseApproachIndex }) => (
  <div className="training">
    <Row>
      <Col xs="12" sm="12" md="8" lg="9" className="no-float">
        <Card block className="training__current-exercise">
          <CardTitle className="training__current-exercise__title">
            <div>
              Current Exercise: <Badge color="info">{currentExerciseApproach.exercise.name}</Badge>
            </div>
            
            <div className="training__current-exercise__title__buttons">
              {
                isApproachStarted && !isApproachStopped && <Button color="secondary" onClick={stopApproach}>Stop</Button>
              }
              {
                isApproachStarted && !isApproachStopped && <Button color="success" onClick={finishApproach}>Next</Button>
              }
            </div>
          </CardTitle>

          <Row style={{ alignItems: 'center'}}>
            <Col xs="12" sm="12" md="4" lg="3" className="no-float">
              <CardBlock> 
                <CounterContainer />
              </CardBlock>       
            </Col>

            <Col xs="12" sm="12" md="8" lg="9" className="no-float">
              <CardBlock className="training__current-exercise__info">
                <Row>
                  <Col xs="12" sm="12" md="6" lg="4" className="no-float">
                    <div className="training__current-exercise__info__avatar">
                      <img src={currentExerciseApproach.exercise.avatarUrl} className="training__current-exercise__info__avatar__img" />
                    </div>
                  </Col>

                  <Col xs="12" sm="12" md="6" lg="8" className="no-float">
                    <div className="training__current-exercise__info__description">
                      {currentExerciseApproach.exercise.description}
                    </div>
                  </Col>
                </Row>
              </CardBlock>
            </Col>
          </Row>

          {
            (!isApproachStarted || isApproachStopped) && <div className="training__start__button-container">
              <Button color="primary" onClick={startApproach}>
                {`${isApproachStopped ? 'Continue' : 'Start'} approach`}
              </Button>
            </div>
          }
        </Card>
      </Col>

      {
        !!exerciseAproaches.length && (
          <Col xs="12" sm="12" md="4" lg="3" className="no-float">
            <Card block className="training__exercises">
              <CardTitle className="training__exercises__title">
                Exercises for this training
              </CardTitle>

              <CardBlock className="training__exercises__list-container">
                <ListGroup className="training__exercises__list">
                  {
                    exerciseAproaches.map((exerciseAproache, index) => (
                      <ListGroupItem 
                        key={exerciseAproache.exercise._id} 
                        className={`
                          training__exercises__list__item 
                          ${currentExerciseApproachIndex < index ? 'training__exercises__list__item--completed' : ''}
                          ${currentExerciseApproachIndex === index ? 'training__exercises__list__item--current' : ''  }
                        `}
                      >
                        <div className="training__exercises__list__item__avatar-container">
                          <img src={exerciseAproache.exercise.avatarUrl} className="training__exercises__list__item__avatar"/>
                        </div>

                        <div className="training__exercises__list__item__name">
                          {exerciseAproache.exercise.name}
                        </div>

                        <div className="training__exercises__list__item__info">
                          {exerciseAproache.count}
                        </div>
                      </ListGroupItem>
                    ))
                  }
                </ListGroup>  
              </CardBlock>
            </Card>
          </Col>
        )
      }

    </Row>
  </div>
);


// TODO: add propTypes
Training.propTypes = {

}

export default Training;