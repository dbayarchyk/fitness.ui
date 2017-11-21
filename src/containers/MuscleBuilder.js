import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, gql, withApollo } from 'react-apollo';
import FontAwesome from 'react-fontawesome';
import { toastr } from 'react-redux-toastr';

import withLoading from '../utils/withLoading';
import MuscleBuilder from '../components/MuscleBuilder/MuscleBuilder';
import { loadavg } from 'os';
import { Progress } from 'reactstrap';
const MuscleBuilderWithLoading = withLoading(MuscleBuilder);

const muscleQuery = gql`
  query muscleQuery($id: ID!) {
    muscle(_id: $id) {
      _id,
      name,
      group,
    }
  }
`;

const addMuscleMutation = gql`
  mutation addMuscleMutation($data: MuscleInput!) {
    addMuscle(data: $data) {
      _id,
      name,
      group,
    }
  }
`;

const updateMuscleMutation = gql`
  mutation updateMuscleMutation($id: ID!, $data: MuscleInput!) {
    updateMuscle(_id: $id, data: $data) {
      _id,
      name,
      group,
    }
  }
`;

class MuscleBuilderContainer extends Component {
  static propTypes = {
    addMuscle: PropTypes.func.isRequired,
    updateMuscle: PropTypes.func.isRequired,
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    isLoading: false,
    muscle: {
      _id: null,
      name: '',
      group: '',
    },
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.fetchMuscle(this.props.match.params.id)
    }
  }

  fetchMuscle(id) {
    this.setState({ isLoading: true });

    this.props.client.query({
      query: muscleQuery,
      variables: { id },
    })
      .then(({ data: { muscle }, loading }) => this.setState({
        isLoading: loading,
        muscle,
      }));
  }

  onFieldChange = ({ name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      muscle: {
        ...prevState.muscle,
        [name]: value,
      },
    }));
  }

  createMuscle = () => {
    this.setState({ isLoading: true });

    const { __typename, ...data } = this.state.muscle;

    this.props.addMuscle({
      variables: {
        data,
      },
    })
      .then(({ data: { addMuscle } }) => {
        toastr.success('Muscle has been created');
        this.props.history.replace(`muscle-builder/${addMuscle._id}`);
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        toastr.error('Muscle has not been created');
      });
  }

  updateMuscle = () => {
    this.setState({ isLoading: true });

    const { __typename, ...data } = this.state.muscle;

    this.props.updateMuscle({
      variables: {
        id: this.state.muscle._id,
        data,
      },
    })
      .then(({ data: { updateMuscle } }) => {
        this.setState({ 
          isLoading: false,
          muscle: updateMuscle,
        });
        toastr.success('Muscle has been updated');
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        toastr.error('Muscle has not been updated');
      });
  }

  render() {
    const toolbarActions = [
      {
        icon: <FontAwesome name="floppy-o" />,
        title: 'Save',
        onClick: this.state.muscle._id ? this.updateMuscle : this.createMuscle,
      },
    ];

    return (
      <MuscleBuilderWithLoading
        isLoading={this.state.isLoading}
        {...this.state.muscle}
        toolbarActions={toolbarActions}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

export default compose(
  graphql(addMuscleMutation, { name: 'addMuscle' }),
  graphql(updateMuscleMutation, { name: 'updateMuscle' }),
)(withApollo(MuscleBuilderContainer));