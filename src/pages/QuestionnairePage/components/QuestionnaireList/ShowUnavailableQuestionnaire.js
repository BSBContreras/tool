import React from 'react';

import Dialog from '../../../../components/Dialog';

export default function ShowUnavailableQuestionnaire({ handleClose, questionnaire }) {
  return (
    <Dialog
      title={questionnaire.name + " - This questionnaire is temporarily unavailable"}
      handleClose={handleClose}
      fullWidth
    >
      
    </Dialog>
  )
}