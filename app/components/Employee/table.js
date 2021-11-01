// @flow

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
// import 'react-table/react-table.css';

function filterCaseInsensitive(filter, row) {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id].toLowerCase()) === filter.value.toLowerCase()
    : true;
}

const Table = ({
  data,
  defaultPageSize = 10,
  pages,
  defaultFilterMethod = filterCaseInsensitive,
  manual,
  minRows = 0,
  ...rest
}) => (
  <Fragment>
    <style>{`
        .rt-resizable-header:focus {
          outline:0;
        }
        .tableHeaderSearch > .input{
            width: 100%;
          }
      `}</style>
    <ReactTable
      data={data}
      pages={manual && pages}
      manual={manual}
      defaultPageSize={
        data.length < defaultPageSize ? data.length : defaultPageSize
      }
      minRows={minRows}
      showPagination
      defaultFilterMethod={defaultFilterMethod}
      {...rest}
    />
  </Fragment>
);

Table.propTypes = {
  data: PropTypes.array,
  pages: PropTypes.number,
  defaultPageSize: PropTypes.number,
  defaultFilterMethod: PropTypes.func,
  manual: PropTypes.bool,
  minRows: PropTypes.number,
};

export default Table;
