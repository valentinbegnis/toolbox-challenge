import { Table } from 'react-bootstrap'

export default function FilesTable ({ data }) {
  const rows = []
  for (const fileObj of data) {
    for (const line of fileObj.lines) {
      rows.push({
        file: fileObj.file,
        ...line
      })
    }
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={`${r.file}-${r.hex}-${idx}`}>
            <td>{r.file}</td>
            <td>{r.text}</td>
            <td>{r.number}</td>
            <td><code>{r.hex}</code></td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center text-muted py-4">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}
