/** @format */

import React from 'react';
import { Form, Col } from 'react-bootstrap';

const Search = ({ params, onParamsChange }) => {
  return (
    <Form className='mb-4'>
      <Form.Row className='align-items-end'>
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            value={params.description}
            name='description'
            type='text'
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            value={params.location}
            name='location'
            type='text'
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            onChange={onParamsChange}
            value={params}
            id='full-time'
            label='Only Full Time'
            type='checkbox'
            className='mb-2'
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default Search;
