import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const { handleSubmit } = useForm();
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  const Select = React.forwardRef(({ label, onChange, option1, option2 }, ref) =>
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Select ref={ref} onChange={onChange}>
        <option value="1">{option1}</option>
        <option value="2">{option2}</option>
      </Form.Select>
      <br />
    </>);

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <h1>Cat Behavioral Instrument</h1>
    <h3>Cat Details</h3>
    <Form.Group>
      <Form.Label>Cat Name</Form.Label>
      <Form.Control type="text" />
    </Form.Group>
    <br />

    <Form.Group>
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control type="date" placeholder="DOB" />
    </Form.Group>
    <br />

    <h3>Questions and Responses</h3>
    <Select
      label="Previous contact with the Cat Judicial System"
      option1="Yes"
      option2="No"
    />
    <Select
      label="Physical altercations with other cats"
      option1="0-3 altercations"
      option2="3+ altercations"
    />
    <Select
      label="Physical altercations with owner (scratching, biting, etc...)"
      option1="0-10 altercations"
      option2="10+ altercations"
    />
    <Select
      label="Plays well with dogs"
      option1="Yes"
      option2="No"
    />
    <Select
      label="Hisses at strangers"
      option1="Yes"
      option2="No"
    />
    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
