import React from 'react';

import Dialog from '../../../../components/Dialog';

export default function ShowUnavailableQuestionnaire({ handleClose, questionnaire }) {
  return (
    <Dialog
      title={questionnaire.name + " - The questionnaire is being used by an evaluation"}
      handleClose={handleClose}
      fullWidth
    >
      
    </Dialog>
  )
}