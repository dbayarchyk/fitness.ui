import React from 'react';
import PropTypes from 'prop-types';
import { Table as BTable } from 'reactstrap';

import './Table.css';

const getClickAndDblClickHandler = (onClick, onDblClick) => {
  let clickCount = 0;

  return (event, item) => {
    clickCount++;

    if (clickCount === 1) {
      setTimeout(() => {
        if (clickCount === 1) {
          onClick(event, item);
        } else {
          onDblClick(event, item);
        }

        clickCount = 0;
      }, 150);
    }
  }
}

const Table = ({
  columns,
  items,
  onRowClick,
  onRowDblClick,
  isSelected,
  showNumber,
  striped,
  hover,
  responsive
}) => (
  <BTable striped={striped} hover={hover} responsive={responsive} bordered className="table">
    <thead className="table__header">
      <tr className="table__row">
        {
          showNumber && <th className="table__column--center">#</th>
        }
        {
          columns.map(column => (
            <th
              key={column.name}
              className={`table__column ${column.class}`}
            >
              {column.title}
            </th>
          ))
        }
      </tr>
    </thead>

    <tbody className="table__body">
      {
        items.map((item, number) => (
          <tr
            key={item._id}
            className={`table__row ${isSelected(item) && 'table__row--selected'}`}
            onClick={event => getClickAndDblClickHandler(onRowClick, onRowDblClick)(event, item)}
          >
            {
              showNumber && <th className="table__column--center">{number + 1}</th>
            }
            {
              columns.map(column => (
                <td
                  key={column.name}
                  className={`table__column ${column.class}`}
                >
                  {
                    column.renderItemValue
                      ? column.renderItemValue(item[column.name], item)
                      : item[column.name]
                  }
                </td>
              ))
            }
          </tr>
        ))
      }
    </tbody>
  </BTable>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    class: PropTypes.string,
    renderItemValue: PropTypes.func,
  })),
  items: PropTypes.array,
  onRowClick: PropTypes.func,
  onRowDblClick: PropTypes.func,
  isSelected: PropTypes.func,
  showNumber: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
};

Table.defaultProps = {
  columns: [],
  items: [],
  onRowClick: () => {},
  onRowDblClick: () => {},
  isSelected: () => false,
  showNumber: true,
  striped: false,
  hover: true,
  responsive: true,
};

export default Table;