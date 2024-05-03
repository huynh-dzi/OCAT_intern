import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';
import { AssessmentService } from '../../services/AssessmentService';
export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      console.log(await AssessmentService.getList());
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);

  const handleDelete = async (id) => {
    await AssessmentService.delete(id);
    const newAssessments = assessments.filter(assessment => assessment.id !== id);
    setAssessments(newAssessments);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: `Assessment`,
        columns: [
          {
            Header: `Cat Name`,
            accessor: `catName`,
          },
          {
            Header: `DOB`,
            accessor: `catDateOfBirth`,
          },
          {
            Header: `Score`,
            accessor: `score`,
          },
          {
            Header: `Risk Level`,
            accessor: `riskLevel`,
          },
          {
            Cell: ({ value }) =>
              <Button variant="danger" onClick={() => handleDelete(value)}>Delete</Button>,
            Header: `Delete`,
            accessor: `id`,
          },
        ],
      },
    ],
    []
  );

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: Array.isArray(assessments) ? assessments : [] });

  return (
    <div>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th {...column.getHeaderProps()}>{column.render(`Header`)}</th>)}
            </tr>)}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
