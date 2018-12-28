import React, { useState, useContext, useEffect, useCallback } from 'react'
import { isEmail } from 'validator'
import styled from 'styled-components'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core'
import { AuthContext } from '../contexts/auth'

const Contents = styled.div`
  & {
    width: 40%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    margin-top: 10%;
    display: flex;
    flex-direction: column;
  }
`

const Tabs = styled.div`
  & {
    display: flex;
    height: 40px;
    padding-top: 40px;
  }
`

const TabButton = styled.div`
  & {
    flex: 1;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    color: ${({ active }) => (active ? '#5c666f' : 'rgba(92,102,111,0.6)')};
    box-shadow: 0 1px 0 0
      ${({ active }) => (active ? ' #5c666f' : 'rgba(92,102,111,0.2)')};
    cursor: pointer;
  }
`

const Form = styled.div`
  & {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
`

const InputForm = styled(FormControl)`
  && {
    margin: 15px;
  }
`

const Button = styled.div`
  & {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ mode, disabled }) =>
      disabled
        ? 'rgba(0, 0, 0, 0.26)'
        : mode === 'signin'
        ? '#2196f3'
        : '#e10050'};
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-top: 10px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')}
    opacity: ${({ disabled }) => (disabled ? '0.8' : '1')}

    &:hover {
      opacity: 0.8;
      font-weight: bold;
    }
  }
`

export default () => {
  const modes = { signin: 'signin', signup: 'signup' }
  const [mode, setMode] = useState(modes.signin)
  const { signin, signup } = useContext(AuthContext)

  // form用state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errors, setErrors] = useState({})

  const onEmailChange = useCallback(
    e => {
      if (e.target.value.length <= 0) {
        setErrors({ ...errors, email: 'Required.' })
      } else if (!isEmail(e.target.value)) {
        setErrors({ ...errors, email: 'Invalid Email.' })
      } else {
        delete errors.email
        setErrors(errors)
      }
      setEmail(e.target.value)
    },
    [email]
  )

  const onPasswordChange = useCallback(
    e => {
      if (e.target.value.length <= 0) {
        setErrors({ ...errors, password: 'Required.' })
      } else if (e.target.value.length < 6) {
        setErrors({ ...errors, password: 'Too Short.' })
      } else if (e.target.value.length > 20) {
        setErrors({ ...errors, password: 'Too Long.' })
      } else if (
        !/^[a-zA-Z0-9\+\-=@\^!#\$%&'\(\)\[\]\{\}\<\>\?_']+$/.test(
          e.target.value
        )
      ) {
        setErrors({ ...errors, password: 'Invalid Password.' })
      } else {
        delete errors.password
        setErrors(errors)
      }
      setPassword(e.target.value)
    },
    [password, passwordConfirm]
  )

  const onPasswordConfirmChange = useCallback(
    e => {
      delete errors.passwordConfirm
      setErrors(errors)
      setPasswordConfirm(e.target.value)
    },
    [password, passwordConfirm]
  )

  const onButtonClick = useCallback(
    () => {
      let currentErrors = errors
      if (email.length <= 0) {
        currentErrors = { ...currentErrors, email: 'Required.' }
      }
      if (password.length <= 0) {
        currentErrors = { ...currentErrors, password: 'Required.' }
      }
      if (mode === modes.signup && password !== passwordConfirm) {
        currentErrors = {
          ...currentErrors,
          passwordConfirm: 'Does not match the password.',
        }
      }
      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors)
        return
      }

      if (mode === modes.signin) {
        signin(email, password)
      } else {
        signup(email, password)
      }
    },
    [email, password, passwordConfirm, errors]
  )

  return (
    <Contents>
      <Tabs>
        <TabButton
          active={mode === modes.signin}
          onClick={() => setMode(modes.signin)}
        >
          Sign In
        </TabButton>
        <TabButton
          active={mode === modes.signup}
          onClick={() => setMode(modes.signup)}
        >
          Sign Up
        </TabButton>
      </Tabs>
      <Form>
        <InputForm
          error={'email' in errors && errors.email.length > 0}
          aria-describedby="email-error"
        >
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={onEmailChange}
          />
          <FormHelperText id="email-error">{errors.email}</FormHelperText>
        </InputForm>
        <InputForm
          error={'password' in errors && errors.password.length > 0}
          aria-describedby="password-error"
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
          <FormHelperText id="password-error">{errors.password}</FormHelperText>
        </InputForm>
        {mode === modes.signup && (
          <InputForm
            error={
              'passwordConfirm' in errors && errors.passwordConfirm.length > 0
            }
            aria-describedby="password-confirm-error"
          >
            <InputLabel htmlFor="password-confirm">Password Confirm</InputLabel>
            <Input
              id="password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={onPasswordConfirmChange}
            />
            <FormHelperText id="password-confirm-error">
              {errors.passwordConfirm}
            </FormHelperText>
          </InputForm>
        )}
      </Form>
      <Button
        mode={mode}
        disabled={Object.keys(errors).length > 0}
        onClick={onButtonClick}
      >
        {mode === modes.signin ? 'Sign In' : 'Sign Up'}
      </Button>
    </Contents>
  )
}
