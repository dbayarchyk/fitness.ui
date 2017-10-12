import React from 'react';
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardImg,
  CardTitle
} from 'reactstrap';

import './Card.css';

const FCard = ({ className, header, img, body, footer }) => (
  <Card className={`f-card ${className}`}>
    {
      header && <CardHeader className="f-card__header">
        <CardTitle {...header.title} className={`f-card__header__title ${header.title.className}`}/>

        {header.rightButton && <Button {...header.rightButton} className={`f-card__header__title__button ${header.rightButton.className}`}/>}
      </CardHeader>
    }

    {
      img && <div className="f-card__img-container">
        <CardImg {...img} className={`f-card__img ${img.className}`}/>
      </div>
    }

    { body && <div {...body} className={`f-card__body ${body.className}`}/> }

    { footer && <CardFooter {...footer}/> }
  </Card>
);

export default FCard;