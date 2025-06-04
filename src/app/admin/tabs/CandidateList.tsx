import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

type CandidateListProps = {
  candidateList: GridRowsProp;
  loading: boolean;
};

export default function CandidateList({ candidateList, loading }: CandidateListProps) {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', width: 200, sortable: true },
    { field: 'email', headerName: 'Email', width: 280 },
  ];

  return (
    <div className='component-common' style={{ padding: 0 }}>
      <AnimatePresence mode='wait'>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >

          <Box sx={{ width: '100%' }}>
            <DataGrid
              sx={{ height: 600 }}
              loading={loading}
              rows={candidateList}
              columns={columns}
              pagination
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </Box>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
