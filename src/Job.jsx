/** @format */

import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const Job = ({ job }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Card className='mb-3'>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <div
            style={{
              width: '100%',
              overflow: 'hidden'
            }}>
            <Card.Title>
              {job.title} -{' '}
              <span className='text-muted font-weight-light'>
                {job.company}{' '}
              </span>
            </Card.Title>
            <Card.Subtitle className='text-muted mb-2'>
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant='secondary' className='mr-2'>
              {job.type}
            </Badge>
            <Badge variant='secondary'>{job.location}</Badge>
            <div
              style={{
                wordBreak: 'break-all',
                overflow: 'hidden'
              }}>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={job.how_to_apply}
              />
            </div>
          </div>
          <img
            className='d-none d-md-block'
            height='50'
            src={job.company_logo}
            alt={job.company}
          />
        </div>
        <Card.Text>
          <Button onClick={() => setOpen((prewOpen) => !prewOpen)}>
            {isOpen ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={isOpen}>
          <div className='mt-4'>
            <ReactMarkdown remarkPlugins={[gfm]} children={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default Job;
