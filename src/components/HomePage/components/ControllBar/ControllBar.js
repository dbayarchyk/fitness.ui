import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import Accordion from '../../../common/Accordion/Accordion';
import NAV_MENU_ITEMS from '../../constants/navMenuItems';

import './ControllBar.css';

const MenuItemButton = (props) => (
  <Button {...props} color="secondary" block>{props.title}</Button>
);

const ControllBar = ({ match }) => (
  <div className="controll-bar">
    {
      NAV_MENU_ITEMS.map(menuItem => {
        return menuItem.children && menuItem.children.length
          ? (
            <Accordion
              key={menuItem.title}
              trigger={<MenuItemButton title={menuItem.title}/>}
              children={menuItem.children.map(child => (
                <Link key={child.title} to={`${match.url}${child.routeTo}`}>
                  <MenuItemButton title={child.title}/>
                </Link>
              ))}
              activeClassName="btn-secondary"
            />
          )
          : (
              <Link key={menuItem.title} to={`${match.url}${menuItem.routeTo}`}>
                <MenuItemButton title={menuItem.title}/>
              </Link>
            )
      })
    }
  </div>
);

export default ControllBar;
