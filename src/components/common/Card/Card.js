import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardImg,
  CardTitle,
} from 'reactstrap';

import './Card.css';

const FCard = ({ className, header, img, body, footer }) => (
  <Card className={`f-card ${className}`}>
    {
      header &&
      <CardHeader className="f-card__header">
        <CardTitle {...header.title} className={`f-card__header__title ${header.title.className}`} />

        {header.rightButton && <Button {...header.rightButton} className={`f-card__header__title__button ${header.rightButton.className}`} />}
      </CardHeader>
    }

    {
      img &&
      <div className="f-card__img-container">
        <CardImg {...img} className={`f-card__img ${img.className}`} />
      </div>
    }

    { body && <div {...body} className={`f-card__body ${body.className}`} /> }

    { footer && <CardFooter {...footer} /> }
  </Card>
);

FCard.propTypes = {
  className: PropTypes.string,
  header: PropTypes.shape({
    title: PropTypes.object,
    className: PropTypes.string,
    rightButton: PropTypes.object,
  }),
  img: PropTypes.object,
  body: PropTypes.object,
  footer: PropTypes.object,
};

FCard.defaultProps = {
  className: '',
  header: PropTypes.shape({
    title: {},
    className: PropTypes.string,
    rightButton: null,
  }),
  img: null,
  body: null,
  footer: null,
};

export default FCard;
