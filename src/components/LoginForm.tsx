import { FormValues } from '@models/signin'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
      '이메일 형식을 확인해주세요',
    )
    .required(),
  password: yup
    .string()
    .min(8, '비밀번호를 8글자 이상 입력해주세요')
    .required(),
})

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const onSubmit = (data: FormValues) => {
    // @TODO: 로그인 처리
    console.log('로그인', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>로그인</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" {...register('email')} />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" {...register('password')} />
      </div>
      <button type="submit" disabled={isValid === false}>
        로그인
      </button>
      <div>
        <p>
          아직 계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </form>
  )
}
