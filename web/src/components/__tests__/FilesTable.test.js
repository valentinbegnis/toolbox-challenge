import { render, screen } from '@testing-library/react'
import FilesTable from '../FilesTable'

test('renders empty state when no rows', () => {
  render(<FilesTable data={[]} />)
  expect(screen.getByText(/No data available/i)).toBeInTheDocument()
})

test('renders rows from files data', () => {
  const data = [
    {
      file: 'test1.csv',
      lines: [{ text: 'A', number: 1, hex: '70ad29aacf0b690b0467fe2b2767f765' }]
    }
  ]
  render(<FilesTable data={data} />)
  expect(screen.getByText('test1.csv')).toBeInTheDocument()
  expect(screen.getByText('A')).toBeInTheDocument()
  expect(screen.getByText('1')).toBeInTheDocument()
})

test('renders multiple rows from different files', () => {
  const data = [
    {
      file: 'test1.csv',
      lines: [
        { text: 'A', number: 1, hex: '70ad29aacf0b690b0467fe2b2767f765' }
      ]
    },
    {
      file: 'test2.csv',
      lines: [
        { text: 'B', number: 2, hex: 'd33a8ca5d36d3106219f66f939774cf5' }
      ]
    }
  ]

  render(<FilesTable data={data} />)

  expect(screen.getByText('test1.csv')).toBeInTheDocument()
  expect(screen.getByText('test2.csv')).toBeInTheDocument()
  expect(screen.getByText('A')).toBeInTheDocument()
  expect(screen.getByText('B')).toBeInTheDocument()
})
