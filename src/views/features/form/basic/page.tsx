import { useForm, FormProvider } from 'react-hook-form'
import UserName from './_components/Username'
import Email from './_components/Email'
import Password from './_components/Password'
import ConfirmPassword from './_components/ConfirmPassword'
import Age from './_components/Age'
import Gender from './_components/Gender'
import Terms from './_components/Terms'
import FormButtons from './_components/FormButtons'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  age: number
  gender: string
  terms: boolean
}

export default function BasicFormPage() {
  const methods = useForm<FormData>({
    mode: 'onChange',
  })

  const { handleSubmit, reset } = methods

  const onSubmit = (data: FormData) => {
    console.log('This is Form Data:', data)
  }

  const onReset = () => {
    reset()
  }

  return (
    <div className="mx-auto p-6">
      <div className="grid gap-6">
        {/* Form Section */}
        <div className="rounded-lg p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">회원가입 폼</h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <UserName />
              <Email />
              <Password />
              <ConfirmPassword />
              <Age />
              <Gender />
              <Terms />
              <FormButtons onReset={onReset} />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
