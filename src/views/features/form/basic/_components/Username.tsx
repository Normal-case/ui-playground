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

function UserName() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()
  return (
    <div>
      <label htmlFor="username" className="mb-1 block text-sm font-medium">
        사용자 이름 *
      </label>
      <input
        id="username"
        type="text"
        {...register('username', {
          required: '사용자 이름은 필수입니다',
          minLength: {
            value: 3,
            message: '최소 3자 이상 입력해주세요',
          },
          maxLength: {
            value: 20,
            message: '최대 20자까지 입력 가능합니다',
          },
        })}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        placeholder="username"
      />
      {errors.username?.message && (
        <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
      )}
    </div>
  )
}

export default UserName
