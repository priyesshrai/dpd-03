import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { CandidateRow } from '../../../../types';
import Link from 'next/link';

type CandidateListProps = {
  candidateList: GridRowsProp;
  loading: boolean;
  UpdateUserData: (row: CandidateRow) => void;
};

export default function CandidateList({ candidateList, loading }: CandidateListProps) {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Sr. No', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', width: 200, sortable: true },
    { field: 'email', headerName: 'Email', width: 280 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Link
          href={`/admin/user/update/${params?.row?.slug}`}
          className="btn-edit"
          target='_blank'
        >
          Update
        </Link>
      ),
    },
    {
      field: 'profile',
      headerName: 'Profile',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Link
          href={`/public/user/${params?.row?.slug}`}
          className="btn-edit"
          target='_blank'
        >
          View Profile
        </Link >
      ),
    },
  ];




  return (
    <div className='component-common' style={{ padding: 0 }}>
      <AnimatePresence mode='wait'>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
        >
          {
            loading ?
              (<div className='edit-loading'>
                <LargeSpinner />
              </div>) : ""
          }
          <Box sx={{ width: '100%', height: 640 }}>
            <DataGrid
              showToolbar
              loading={loading}
              rows={candidateList}
              columns={columns}
              rowSelection={false}
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
