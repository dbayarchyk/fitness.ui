import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

export default function (ComposedComponent, inProp) {
  const WithTransition = (props) => {
    return (
      <Transition in={!!props[inProp]} timeout={duration}>
        {(state) => (
          <ComposedComponent {...props} style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}/>
        )}
      </Transition>
    );
  };

  return WithTransition;
}
