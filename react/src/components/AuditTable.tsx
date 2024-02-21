import React, { useMemo } from 'react';
import styled from 'styled-components';
import { groupBy } from 'lodash-es';
import type { Email } from '../types/Email';
import RecipientsDisplay from './RecipientsDisplay';
import DateDisplay from './DateDisplay';
import TimeDisplay from './TimeDisplay';

type AuditTableProps = {
  emails: Email[];
};

function AuditTable({ emails, ...rest }: AuditTableProps) {
  const emailsByDate = useMemo(
    () =>
      groupBy<Email>(emails, ({ datetime }) =>
        new Date(datetime).toLocaleDateString()
      ),
    [emails]
  );

  return (
    <StyledTable {...rest}>
      <thead>
        <tr>
          <th>Sender</th>
          <th>Recipients</th>
          <th>Subject</th>
          <th className="align-right">Date</th>
          <th className="align-right">Time</th>
        </tr>
      </thead>
      {Object.entries(emailsByDate).map(([datetime, emailGroup]) => (
        <tbody key={datetime}>
          {emailGroup.map(({ id, from, to: recipients, subject, datetime }) => (
            <tr key={id}>
              <td>{from}</td>
              <td id='RecepientDisplayData'>
                <RecipientsDisplay recipients={recipients} />
              </td>
              <td>{subject}</td>
              <td className="align-right">
                <DateDisplay datetime={datetime} />
              </td>
              <td className="align-right">
                <TimeDisplay datetime={datetime} />
              </td>
            </tr>
          ))}
        </tbody>
      ))}
    </StyledTable>
  );
}

const StyledTable = styled.table`
  table-layout: fixed;
  border: var(--border-style);
  border-spacing: 0;
  width: 100%;
  text-align: left;

  th,
  td {
    border: var(--border-style);
    padding: 5px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 34px;
    box-sizing: border-box;
    position: relative;
  }


  th {
    &:nth-child(1) {
      width: 20%;
    }
    &:nth-child(2) {
      width: 30%;
    }
    &:nth-child(3) {
      width: 50%;
    }
    &:nth-child(4) {
      width: 90px;
    }
    &:nth-child(5) {
      width: 70px;
    }
  }

  tbody:nth-child(even) {
    background-color: #ddd;
  }

  .align-right {
    text-align: right;
  }
  
  .remainigEmail
  {
    background-color: blue;
    height: 12px;
    width:12px;
    border-radius: 50%;
    display:inline-flex;
    align-items: center;
    justify-content: center;
    padding:5px;
    color:#fff;
    font-size:small;
    font-weight:bold;;
    position:absolute;
    right:0;
    text-align:center;
    
  }
  #RecepientDisplayData
  {
    

  }

  /* Add a class to control the display of recipients based on td width */
  .truncated-recipients {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default AuditTable;
