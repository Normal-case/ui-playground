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

function Age() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <div>
      <label htmlFor="age" className="mb-1 block text-sm font-medium">
        나이 *
      </label>
      <input
        id="age"
        type="number"
        {...register('age', {
          required: '나이는 필수입니다',
          min: {
            value: 18,
            message: '18세 이상만 가입 가능합니다',
          },
          max: {
            value: 100,
            message: '올바른 나이를 입력해주세요',
          },
        })}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        placeholder="18"
      />
      {errors.age?.message && (
        <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
      )}
    </div>
  )
}

export default Age
