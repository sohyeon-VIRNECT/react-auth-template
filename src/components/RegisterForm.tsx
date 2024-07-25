import { FormValues } from '@models/register'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z
  .object({
    email: z
      .string()
      .regex(
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
        '이메일 형식을 확인해주세요',
      ),
    password: z
      .string()
      .min(8, { message: '비밀번호를 8글자 이상 입력해주세요' }),
    passwordConfirm: z
      .string()
      .min(8, { message: '비밀번호를 8글자 이상 입력해주세요' }),
    nickname: z
      .string()
      .min(2, { message: '닉네임을 2글자 이상 입력해주세요' }),
  })
  .required()
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onChange' })

  const onSubmit = (data: FormValues) => {
    // @TODO: 회원가입 처리
    console.log('회원가입', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>회원가입</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" {...register('nickname')} />
        {errors.nickname && <p>{errors.nickname.message}</p>}
      </div>
      <button type="submit" disabled={isValid === false}>
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
