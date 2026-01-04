import { Alert } from 'react-bootstrap'

export default function ErrorState ({ message }) {
  return (
    <Alert variant="danger">
      {message || 'Something went wrong'}
    </Alert>
  )
}
