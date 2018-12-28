import React, { useContext, Fragment } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Checkbox,
  Divider,
} from '@material-ui/core'
import styled from 'styled-components'
import { TodosContext } from '../contexts/todos'

const Contents = styled.div`
  & {
    flex: 1;
    border-top: 1px solid #ddd;
    margin-top: 10px;
    padding: 10px;
  }
`

const EmptyMessage = styled.div`
  & {
    font-size: 18px;
    color: #aaa;
    padding: 10px;
  }
`

const Text = styled(ListItemText)`
  && {
    opacity: ${({ completed }) => (completed ? '0.9' : '1.0')};
    text-decoration: ${({ completed }) =>
      completed ? 'line-through' : 'none'};
  }
`

export default () => {
  const { todos, update, remove } = useContext(TodosContext)
  return (
    <Contents>
      {todos.length === 0 ? (
        <EmptyMessage>No todos...</EmptyMessage>
      ) : (
        <List>
          {todos.map(todo => (
            <Fragment key={`${todo.docId}--fragment`}>
              <ListItem key={`${todo.docId}--list`}>
                <Checkbox
                  checked={todo.isComplete}
                  onClick={() => {
                    update({
                      docId: todo.docId,
                      text: todo.text,
                      isComplete: !todo.isComplete,
                    })
                  }}
                />
                <Text primary={todo.text} completed={todo.isComplete} />
                <ListItemSecondaryAction>
                  <Button
                    color="default"
                    onClick={() => {
                      remove({ docId: todo.docId })
                    }}
                  >
                    Delete
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider key={`${todo.docId}--divider`} />
            </Fragment>
          ))}
        </List>
      )}
    </Contents>
  )
}
