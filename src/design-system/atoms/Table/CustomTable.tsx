import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

export interface CustomTableProps {
  dataList: any[];
}

export const CustomTable: React.FC<CustomTableProps> = ({ dataList, ...props }) => {
  const keysList = Object.keys(dataList[0]);
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          {keysList.map((item) => (
            <TableCell key={item}>{item}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataList.map((row, i) => (
          <TableRow key={i}>
            {keysList.map((item, index) => (
              <TableCell key={index}>{row[item]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
