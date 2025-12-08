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

function Email() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <div>
      <label htmlFor="email" className="mb-1 block text-sm font-medium">
        이메일 *
      </label>
      <input
        id="email"
        type="email"
        {...register('email', {
          required: '이메일은 필수입니다',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '올바른 이메일 형식이 아닙니다',
          },
        })}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        placeholder="example@email.com"
      />
      {errors.email?.message && (
        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
      )}
    </div>
  )
}

export default Email
