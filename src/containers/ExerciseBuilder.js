import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, gql, withApollo } from 'react-apollo';
import FontAwesome from 'react-fontawesome';
import { toastr } from 'react-redux-toastr';

import withLoading from '../utils/withLoading';
import ExerciseBuilder from '../components/ExerciseBuilder/ExerciseBuilder';

const ExerciseBuilderWithLoading = withLoading(ExerciseBuilder);

const exerciseQuery = gql`
  query exerciseQuery($id: ID!) {
    exercise(_id: $id) {
      _id,
      name,
      avatarUrl,
      photos,
      muscules {
        _id,
        name,
        group,
      },
      description,
      video,
      complexity,
    }
  }
`;

const addExerciseMutation = gql`
  mutation addExerciseMutation($data: ExerciseInput!) {
    addExercise(data: $data) {
      _id,
      name,
      avatarUrl,
      photos,
      muscules {
        _id,
        name,
        group,
      },
      description,
      video,
      complexity,
    }
  }
`;

const updateExerciseMutation = gql`
  mutation updateExerciseMutation($id: ID!, $data: ExerciseInput!) {
    updateExercise(_id: $id, data: $data) {
      _id,
      name,
      avatarUrl,
      photos,
      muscules {
        _id,
        name,
        group,
      },
      description,
      video,
      complexity,
    }
  }
`;

class ExerciseBuilderCOntainer extends Component {
  static propTypes = {
    addExercise: PropTypes.func.isRequired,
    updateExercise: PropTypes.func.isRequired,
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    isLoading: false,
    exercise: {
      _id: null,
      name: '',
      avatarUrl: '',
      photos: [],
      muscules: [],
      description: '',
      video: '',
      complexity: 0,
    },
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.fetchExercise(this.props.match.params.id)
    }
  }

  fetchExercise(id) {
    this.setState({ isLoading: true });

    this.props.client.query({
      query: exerciseQuery,
      variables: { id },
    })
      .then(({ data: { exercise }, loading }) => this.setState({
        isLoading: loading,
        exercise,
      }))
      .catch(err => this.setState({ isLoading: false }));
  }

  onFieldChange = ({ name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      exercise: {
        ...prevState.exercise,
        [name]: value,
      },
    }));
  }

  onRemoveMuscle = (muscleId) => {
    this.setState(prevState => ({
      ...prevState,
      exercise: {
        ...prevState.exercise,
        muscules: prevState.exercise.muscules.filter(muscule => muscule._id !== muscleId),
      },
    }));
  }

  onAddNewMuscle = (newMuscle) => {
    this.setState(prevState => ({
      ...prevState,
      exercise: {
        ...prevState.exercise,
        muscules: [...prevState.exercise.muscules, newMuscle],
      },
    }));

    this.addMuscleRef.close();
  }

  createExercise = () => {
    this.setState({ isLoading: true });

    const { __typename, ...data } = this.state.exercise;

    this.props.addExercise({
      variables: {
        data: {
          ...data,
          muscules: data.muscules.map(({ __typename, ...muscule }) => muscule),
        },
      },
    })
      .then(({ data: { addExercise} }) => {
        toastr.success('Exercise has been created');
        this.props.history.replace(`exercise-builder/${addExercise._id}`);
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        toastr.error('Exercise has not been created');
      });
  }

  updateExercise = () => {
    this.setState({ isLoading: true });

    const { __typename, ...data } = this.state.exercise;

    this.props.updateExercise({
      variables: {
        id: this.state.exercise._id,
        data: {
          ...data,
          muscules: data.muscules.map(({ __typename, ...muscule }) => muscule),
        },
      },
    })
      .then(({ data: { updateExercise } }) => {
        this.setState({ 
          isLoading: false,
          exercise: updateExercise,
        });
        toastr.success('Exercise has been updated');
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        toastr.error('Exercise has not been updated');
      });
  }

  render() {
    const toolbarActions = [
      {
        icon: <FontAwesome name="floppy-o" />,
        title: 'Save',
        onClick: this.state.exercise._id ? this.updateExercise : this.createExercise,
      },
    ];

    return (
      <ExerciseBuilderWithLoading
        isLoading={this.state.isLoading}
        {...this.state.exercise}
        toolbarActions={toolbarActions}
        onFieldChange={this.onFieldChange}
        onRemoveMuscle={this.onRemoveMuscle}
        onAddNewMuscle={this.onAddNewMuscle}
        addMuscleRef={(addMuscleRef) => { this.addMuscleRef = addMuscleRef }}
      />
    );
  }
}

export default compose(
  graphql(addExerciseMutation, { name: 'addExercise' }),
  graphql(updateExerciseMutation, { name: 'updateExercise' }),
)(withApollo(ExerciseBuilderCOntainer));