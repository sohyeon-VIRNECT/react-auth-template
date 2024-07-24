import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { FormValues } from '@models/register'
import { Link } from 'react-router-dom'

export default function RegisterForm() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // @TODO: 회원가입 처리
    console.log('회원가입', formValues)
  }

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])
  const isAvailableSubmit = Object.keys(errors).length === 0

  return (
    <form onSubmit={handleSubmit}>
      <h1>회원가입</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          required
        />
        {errors?.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          required
        />
        {errors?.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          onChange={handleChange}
          required
        />
        {errors?.passwordConfirm && <p>{errors.passwordConfirm}</p>}
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          onChange={handleChange}
          required
        />
        {errors?.nickname && <p>{errors.nickname}</p>}
      </div>
      <button type="submit" disabled={isAvailableSubmit === false}>
        회원가입
      </button>
      <div>
        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </form>
  )
}

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  const emailValidRegex =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/

  if (!formValues.email?.match(emailValidRegex)) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  if (formValues.passwordConfirm.length < 8) {
    errors.passwordConfirm = '비밀번호를 8글자 이상 입력해주세요'
  } else if (formValues.password !== formValues.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다'
  }

  if (formValues.nickname.length < 2) {
    errors.nickname = '닉네임을 2글자 이상 입력해주세요'
  }

  return errors
}
