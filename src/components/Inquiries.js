import React from 'react';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

const Inquiries = () => {
  const inquiries = useSelector(state => state.inquiryReducer.inquiries);

  return (
    <div>
      <ListGroup>
      {inquiries.map((item) => (
        <ListGroup.Item className="inquiry" key={Math.floor(Math.random() * 100000000)}>{item.message}</ListGroup.Item>
      ))
      }

      </ListGroup>
      
    
    </div>
  );
};

export default Inquiries;
