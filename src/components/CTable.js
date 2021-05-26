import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, ButtonGroup } from '@material-ui/core';
import imageApi from '../api/image';
import TileImage from './TileImage';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const getSize = (s) => {
  return s >= 1024 * 1024
    ? `${(s / (1024 * 1024)).toFixed(2)} MB`
    : s >= 1024
    ? `${(s / 1024).toFixed(2)} KB`
    : `${s} B`;
};

export default function BasicTable({ data, delPic, handleShowImage }) {
  const classes = useStyles();

  const handleDelete = async (name, id) => {
    delPic(name);
    await imageApi.deleteImage(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">Uploded</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Dimension</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Thumbnail</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <Typography>{row.name}</Typography>
              </TableCell>
              <TableCell align="right">
                {new Date(row.uploaded).toLocaleString()}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.dimension}</TableCell>
              <TableCell align="right">{getSize(row.size)}</TableCell>
              <TableCell align="right">
                <div style={{ height: 100, width: 100 }}>
                  <TileImage src={row.thumbnail} />
                  {/* <img
                    src={row.thumbnail}
                    alt={''}
                    style={{ height: '100%', width: 'auto' }}
                  ></img> */}
                </div>
              </TableCell>
              <TableCell align="right">
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
