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

function Terms() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>()

  return (
    <div>
      <label className="flex items-start">
        <input
          type="checkbox"
          {...register('terms', {
            required: '이용약관에 동의해주세요',
          })}
          className="mr-2 mt-1"
        />
        <span className="text-sm">
          이용약관 및 개인정보처리방침에 동의합니다 *
        </span>
      </label>
      {errors.terms?.message && (
        <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>
      )}
    </div>
  )
}

export default Terms
