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

function Gender() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">성별 *</label>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="male"
            {...register('gender', {
              required: '성별을 선택해주세요',
            })}
            className="mr-2"
          />
          남성
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="female"
            {...register('gender', {
              required: '성별을 선택해주세요',
            })}
            className="mr-2"
          />
          여성
        </label>
      </div>
      {errors.gender?.message && (
        <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
      )}
    </div>
  )
}

export default Gender
