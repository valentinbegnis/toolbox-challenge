import { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilesData } from '../store/filesSlice'
import FilesTable from '../components/FilesTable'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { Form } from 'react-bootstrap'

export default function FilesPage () {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((s) => s.files)

  const [search, setSearch] = useState('')
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      dispatch(fetchFilesData(''))
      return
    }

    const timeout = setTimeout(() => {
      dispatch(fetchFilesData(search))
    }, 400)

    return () => clearTimeout(timeout)
  }, [search, dispatch])

  const totalLines = data.reduce((acc, f) => acc + f.lines.length, 0)

  return (
    <Container className="py-4">
      <div className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <h1 className='fs-2 mb-1'>Toolbox Challenge</h1>
            <div className="text-muted">
              Search and visualize CSV data
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6} lg={4}>
            <Form.Control
              type="search"
              placeholder="Search by file name (e.g. test1)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fs-4 mb-0">Files</h3>
              <Badge bg="secondary">{totalLines} lines</Badge>
            </div>

            {loading && <LoadingState />}
            {error && <ErrorState message={error} />}
            {!loading && !error && <FilesTable data={data} />}
          </Col>
        </Row>
      </div>
    </Container>
  )
}
