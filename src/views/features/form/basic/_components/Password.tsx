import { useFormContext } from 'react-hook-form'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  age: number
  gender: string
  terms: boolean
}

function Password() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <div>
      <label htmlFor="password" className="mb-1 block text-sm font-medium">
        비밀번호 *
      </label>
      <input
        id="password"
        type="password"
        {...register('password', {
          required: '비밀번호는 필수입니다',
          minLength: {
            value: 8,
            message: '최소 8자 이상 입력해주세요',
          },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*\d)/,
            message: '영문과 숫자를 포함해야 합니다',
          },
        })}
        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:placeholder:text-gray-500"
        placeholder="••••••••"
      />
      {errors.password?.message && (
        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
      )}
    </div>
  )
}

export default Password
