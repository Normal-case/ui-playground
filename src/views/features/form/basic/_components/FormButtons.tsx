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

interface FormButtonsProps {
  onReset: () => void
}

function FormButtons({ onReset }: FormButtonsProps) {
  const {
    formState: { isValid },
  } = useFormContext<FormData>()

  return (
    <div className="flex gap-3 pt-4">
      <button
        type="submit"
        disabled={!isValid}
        className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
      >
        제출
      </button>
      <button
        type="button"
        onClick={onReset}
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        초기화
      </button>
    </div>
  )
}

export default FormButtons
