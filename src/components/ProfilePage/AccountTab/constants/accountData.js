import React from 'react';

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
    title: 'Maintaining the form already achieved',
    value: 'MAINTAINING_THE_FORM_ALREADY_ACHIEVED',
  }
];

export default (data, onFieldChange) => [
  {
    key: 'E-mail',
    editableField: {
      input: {
        type: "email",
        value: data.email,
        placeholder: "email",
        name: "email"
      },
      onSubmit: onFieldChange,
      children: data.email
    }  
  },
  {
    key: 'Name',
    editableField: {
      input: {
        type: "text",
        value: data.surname,
        placeholder: "Surname",
        name: "surname"
      },
      onSubmit: onFieldChange,
      children: data.name
    }
  },
  {
    key: 'Surname',
    editableField: {
      input: {
        type: "text",
        value: data.name,
        placeholder: "Name",
        name: "name"
      },
      onSubmit: onFieldChange,
      children: data.name
    }
  },
  {
    key: 'Age',
    editableField: {
      input: {
        type: "number",
        value: data.age,
        placeholder: "Age",
        name: "age"
      },
      onSubmit: onFieldChange,
      children: data.age
    }
  },
  {
    key: 'Weight',
    editableField: {
      input: {
        type: "number",
        value: data.weight,
        placeholder: "Weight",
        name: "weight"
      },
      onSubmit: onFieldChange,
      children: data.weight
    }
  },
  {
    key: 'Height',
    editableField: {
      input: {
        type: "number",
        value: data.height,
        placeholder: "Height",
        name: "height"
      },
      onSubmit: onFieldChange,
      children: data.height
    }
  },
  {
    key: 'Purpose',
    editableField: {
      input: {
        type: "select",
        value: data.purpose,
        placeholder: "Purpose",
        name: "purpose",
        children: PUPROSES.map((purpose, index) => <option value={purpose.value} key={index}>{purpose.title}</option>)
      },
      onSubmit: onFieldChange,
      children: PURPOSE_VALUES[data.purpose]
    }
  }
]
