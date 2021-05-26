import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { TableContainer, TableHead, Paper } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';

import useApi from './hooks/useApi';
import imageApi from './api/image';
import TileImage from './components/TileImage';
import { OverlayLoading } from './components/Loading';
import { getSize } from './imageHelper';

export default function CTable({ data, delPic, handleShowImage, loading }) {
  const sendApi = useApi(imageApi.deleteImage);

  const handleDelete = async (name, id) => {
    const res = await sendApi.request(id);
    if (res.ok) delPic(name);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ position: 'relative', height: '100%' }}
    >
      {(sendApi.loading || loading) && <OverlayLoading />}
      <Table style={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="center">Uploded</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Dimension</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Thumbnail</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">
                {new Date(row.uploaded).toLocaleString()}
              </TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.dimension}</TableCell>
              <TableCell align="center">{getSize(row.size)}</TableCell>
              <TableCell align="center">
                <TileImage src={row.thumbnail} />
              </TableCell>
              <TableCell align="center">
                <ButtonGroup
                  orientation="vertical"
                  color="primary"
                  variant="text"
                >
                  <Button onClick={() => handleDelete(row.name, row.id)}>
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleShowImage(row.name, row.id, row.type)}
                  >
                    Show
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
