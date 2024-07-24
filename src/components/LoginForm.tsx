import { FormValues } from '@models/signin'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    // @TODO: 로그인 처리
    console.log('로그인', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>로그인</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            pattern: {
              value:
                /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
              message: '이메일 형식을 확인해주세요',
            },
            required: true,
          })}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            minLength: {
              value: 8,
              message: '비밀번호를 8글자 이상 입력해주세요',
            },
            required: true,
          })}
        />
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
