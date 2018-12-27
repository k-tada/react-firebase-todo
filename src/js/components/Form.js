import React, { useContext } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'

const Contents = styled.div`
  & {
    align-items: stretch;
    padding: 5px;
    display: flex;
  }
`

const Input = styled(TextField)`
  && {
    margin: 5px;
  }
`
const AddButton = styled(Button)`
  && {
    margin: 5px;
  }
`

export default () => {
  return (
    <Contents>
      <Input
        id="add-todo"
        label="Todo Name"
        placeholder="Enter new todo"
        fullWidth
      />
      <AddButton color="primary">Add</AddButton>
    </Contents>
  )
}
