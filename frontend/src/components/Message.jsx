import { Alert } from 'react-bootstrap';

import React from 'react'

export const Message = ({variant, children}) => {

  return (
    <Alert variant={variant} className='rounded py-2 text-sm text-white'>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
    variant: 'info',
};

export default Message;