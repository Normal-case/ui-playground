import { useForm, FormProvider } from 'react-hook-form'
import { useState } from 'react'
import UserName from './_components/UserName'
import Email from './_components/Email'
import Password from './_components/Password'
import ConfirmPassword from './_components/ConfirmPassword'
import Age from './_components/Age'
import Gender from './_components/Gender'
import Terms from './_components/Terms'

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

  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  const onSubmit = (data: FormData) => {
    console.log('This is Form Data:', data)
    setSubmittedData(data)
  }

  const onReset = () => {
    reset()
    setSubmittedData(null)
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
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

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            </form>
          </FormProvider>
        </div>

        {/* Result Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">제출된 데이터</h2>
          {submittedData ? (
            <div className="space-y-3">
              <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
                <pre className="overflow-auto text-sm">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>사용자 이름:</strong> {submittedData.username}
                </p>
                <p>
                  <strong>이메일:</strong> {submittedData.email}
                </p>
                <p>
                  <strong>나이:</strong> {submittedData.age}세
                </p>
                <p>
                  <strong>성별:</strong>{' '}
                  {submittedData.gender === 'male'
                    ? '남성'
                    : submittedData.gender === 'female'
                      ? '여성'
                      : '기타'}
                </p>
                <p>
                  <strong>약관 동의:</strong>{' '}
                  {submittedData.terms ? '동의함' : '동의하지 않음'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              폼을 작성하고 제출하면 여기에 결과가 표시됩니다.
            </p>
          )}

          {/* Features */}
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
            <h3 className="mb-3 font-semibold">주요 기능</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✅ 실시간 유효성 검사</li>
              <li>✅ 커스텀 에러 메시지</li>
              <li>✅ 비밀번호 일치 확인</li>
              <li>✅ 이메일 형식 검증</li>
              <li>✅ 나이 범위 검증</li>
              <li>✅ 필수 항목 체크</li>
              <li>✅ 폼 초기화 기능</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
