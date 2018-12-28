import React, { useContext, useState, useCallback } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import { AuthContext } from '../contexts/auth'
import { TodosContext } from '../contexts/todos'

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

const SignoutButton = styled(Button)`
  && {
    margin: 5px 5px 5px 20px;
  }
`

export default () => {
  const { signout } = useContext(AuthContext)
  const { add } = useContext(TodosContext)
  const [input, setInput] = useState('')

  const addTodo = useCallback(
    () => {
      add(input)
      setInput('')
    },
    [input]
  )

  return (
    <Contents>
      <Input
        id="add-todo"
        label="Todo Name"
        placeholder="Enter new todo"
        value={input}
        onChange={e => setInput(e.target.value)}
        fullWidth
      />
      <AddButton color="primary" onClick={addTodo}>
        Add
      </AddButton>
      <SignoutButton color="default" onClick={signout}>
        Sign Out
      </SignoutButton>
    </Contents>
  )
}
