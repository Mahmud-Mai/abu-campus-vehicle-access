import React, { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DataTable = ({ rowData, columnDefs }) => {
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({ sortable: true }), []);

  return (
    <Flex>
      <Box
        mx={'auto'}
        className="ag-theme-alpine"
        sx={{ width: '6xl', height: 700, textAlign: 'left' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        />
      </Box>
    </Flex>
  );
};

export default DataTable;
