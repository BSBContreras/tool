import React from 'react';
import { Typography } from '@material-ui/core';
import QuestionsHeader from '../components/QuestionsHeader';
import Question from './Question';

export default function Questions({ questions, questionnaire }) {
  return (
    <>
      {questionnaire.id
        ? <>
            <Typography variant="h5">
              {questionnaire.name}
            </Typography>
            <QuestionsHeader />
          </>
        : 'Please select a questionnaire on left side'}
      {questions.map(question => (
        <Question key={question.id} question={question} />
      ))}
    </>
  )
}