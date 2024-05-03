import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      altercationsCats: 0,
      altercationsOwner: 0,
      contactWithSystem: 0,
      hissesAtStrangers: 0,
      playsWellWithDogs: 0,
    },
  });
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const altercationsCats = watch(`altercationsCats`);
  const altercationsOwner = watch(`altercationsOwner`);
  const contactWithSystem = watch(`contactWithSystem`);
  const hissesAtStrangers = watch(`hissesAtStrangers`);
  const playsWellWithDogs = watch(`playsWellWithDogs`);

  const sum = parseInt(altercationsCats) +
  parseInt(altercationsOwner) +
  parseInt(contactWithSystem) +
  parseInt(hissesAtStrangers) +
  parseInt(playsWellWithDogs);

  setValue(`score`, sum);

  function riskLevel() {
    if (sum <= 1) {
      return `low`;
    } else if (sum >= 2 && sum <= 3) {
      return `medium`;
    }
    return `high`;
  }

  const risk = riskLevel();
  setValue(`riskLevel`, risk);

  const onSubmit = async (data) => {
    console.log(data);
    await AssessmentService.submit(data);
  };

  const Select = React.forwardRef(({ label, onChange, option1, option2 }, ref) =>
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Select ref={ref} onChange={onChange}>
        <option value="0">{option1}</option>
        <option value="1">{option2}</option>
      </Form.Select>
      <br />
    </>);

  return <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
    <h1>Cat Behavioral Instrument</h1>
    <input type="hidden" {...register(`instrumentType`)} value={1} />
    <h3>Cat Details</h3>
    <Form.Group>
      <Form.Label>Cat Name</Form.Label>
      <Form.Control type="text" {...register(`catName`)} />
    </Form.Group>
    <br />

    <Form.Group>
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control type="date" placeholder="DOB" {...register(`catDateOfBirth`)} />
    </Form.Group>
    <br />

    <h3>Questions and Responses</h3>
    <Select {...register(`contactWithSystem`)}
      onChange={e => setValue(`contactWithSystem`, parseInt(e.target.value))}
      label="Previous contact with the Cat Judicial System"
      option1="No"
      option2="Yes"
    />
    <Select {...register(`altercationsCats`)}
      onChange={e => setValue(`altercationsCats`, parseInt(e.target.value))}
      label="Physical altercations with other cats"
      option1="0-3 altercations"
      option2="3+ altercations"
    />
    <Select {...register(`altercationsOwner`)}
      onChange={e => setValue(`altercationsOwner`, parseInt(e.target.value))}
      label="Physical altercations with owner (scratching, biting, etc...)"
      option1="0-10 altercations"
      option2="10+ altercations"
    />
    <Select {...register(`playsWellWithDogs`)}
      onChange={e => setValue(`playsWellWithDogs`, parseInt(e.target.value))}
      label="Plays well with dogs"
      option1="Yes"
      option2="No"
    />
    <Select {...register(`hissesAtStrangers`)}
      onChange={e => setValue(`hissesAtStrangers`, parseInt(e.target.value))}
      label="Hisses at strangers"
      option1="No"
      option2="Yes"
    />

    <p>Risk Assessment: {sum}</p>
    <input type="hidden" {...register(`score`)} value={sum} />
    <p>Risk Level: {riskLevel()}</p>
    <input type="hidden" {...register(`riskLevel`)} value={riskLevel()} />

    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
