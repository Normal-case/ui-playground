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

function ConfirmPassword() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormData>()

  const password = watch('password')

  return (
    <div>
      <label
        htmlFor="confirmPassword"
        className="mb-1 block text-sm font-medium"
      >
        비밀번호 확인 *
      </label>
      <input
        id="confirmPassword"
        type="password"
        {...register('confirmPassword', {
          required: '비밀번호 확인은 필수입니다',
          validate: value =>
            value === password || '비밀번호가 일치하지 않습니다',
        })}
        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:placeholder:text-gray-500"
        placeholder="••••••••"
      />
      {errors.confirmPassword?.message && (
        <p className="mt-1 text-sm text-red-500">
          {errors.confirmPassword.message}
        </p>
      )}
    </div>
  )
}

export default ConfirmPassword
