import { Spinner } from 'react-bootstrap'

export default function LoadingState () {
  return (
    <div className="d-flex justify-content-center py-4">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}
