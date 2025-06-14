import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import LargeSpinner from '@/components/Spinner/LargeSpinner';
import { CandidateRow } from '../../../../types';
import Link from 'next/link';
import toast from 'react-hot-toast';

type CandidateListProps = {
  candidateList: GridRowsProp;
  loading: boolean;
  UpdateUserData: (row: CandidateRow) => void;
};

export default function CandidateList({ candidateList, loading }: CandidateListProps) {
  let defaultLink: string = "https://dreampathdevelopment/public/user/"
  const [shareLink, setShareLink] = useState<string>("")
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  async function handleCopy() {
    await navigator.clipboard.writeText(`https://dreampathdevelopment/public/user/${shareLink}`);
    toast.success("Link copied!");
  }
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
    {
      field: 'share',
      headerName: 'Share',
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className='share-btn' onClick={() => { (setShareLink(params?.row?.slug), setShowShareMenu(true)) }}>
            <i className="hgi hgi-stroke hgi-share-08"></i>
          </div>
        )
      }
      ,
    },
  ];

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const modalElement = containerRef.current?.querySelector('.share-card');
    if (modalElement && !modalElement.contains(e.target as Node)) {
      setShowShareMenu(false);
    }
  }
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);


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
      {
        showShareMenu ? (
          <div className='share-section' ref={containerRef} onClick={handleOutsideClick}>
            <div className="share-section-wraper">
              <div className="share-card">
                <div className="share-card-wraper">
                  <div className="share-close-btn">
                    <div onClick={() => setShowShareMenu(false)}>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="share-icons">
                    <Link
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(defaultLink + shareLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-icons-container wp">
                      <i className="hgi hgi-stroke hgi-whatsapp"></i>
                    </Link>

                    <Link
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(defaultLink + shareLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-icons-container lk">
                      <i className="hgi hgi-stroke hgi-linkedin-02"></i>
                    </Link>

                    <Link
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(defaultLink + shareLink)}&text=Check out this profile!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-icons-container tw">
                      <i className="hgi hgi-stroke hgi-twitter"></i>
                    </Link>

                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(defaultLink + shareLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-icons-container fb">
                      <i className="hgi hgi-stroke hgi-facebook-02"></i>
                    </Link>

                    <Link
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-icons-container in"
                      onClick={(e) => {
                        e.preventDefault();
                        toast("Instagram does not support direct link sharing. Copy the link and paste it in your post.");
                      }}>
                      <i className="hgi hgi-stroke hgi-instagram"></i>
                    </Link>
                  </div>

                  <div className="copy-link">
                    <input type="text" value={defaultLink + shareLink} readOnly />
                    <i className="hgi hgi-stroke hgi-copy-01" onClick={handleCopy}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : ""
      }
    </div>
  );
}
