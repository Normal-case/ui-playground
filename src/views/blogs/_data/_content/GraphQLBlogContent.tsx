import { Box, Heading, Text, Card, Flex, Code, Callout } from '@radix-ui/themes'

/**
 * "GraphQL: 무엇이고 언제 사용해야 할까?" 블로그 글 컨텐츠
 */
export function GraphQLBlogContent() {
  return (
    <Box className="space-y-8">
      {/* 서론 */}
      <Box>
        <Heading size="6" mb="4">
          GraphQL: 무엇이고 언제 사용해야 할까?
        </Heading>
        <Text size="3" color="gray" className="leading-relaxed">
          항상 RESTful API만 사용해왔다면, GraphQL이라는 단어를 들어봤을 때
          궁금증이 생길 수 있습니다. "REST API와 뭐가 다른가?", "왜
          사용하는가?", "실제로 더 나을까?" 같은 질문들 말이죠. 이 글에서는
          GraphQL이 무엇인지, REST API와 어떻게 다른지, 그리고 어떤 상황에서
          사용하면 좋은지 알아보겠습니다.
        </Text>
      </Box>

      {/* 1. GraphQL이란 무엇인가? */}
      <Box>
        <Heading size="5" mb="3">
          1. GraphQL이란 무엇인가?
        </Heading>

        <Text mb="4">
          GraphQL은 Facebook(현 Meta)에서 2015년에 개발한{' '}
          <strong>API를 위한 쿼리 언어</strong>이자 런타임입니다. 단순히
          데이터를 요청하는 것을 넘어서,{' '}
          <strong>클라이언트가 필요한 데이터의 구조를 정의</strong>할 수 있게
          해줍니다.
        </Text>

        <Card variant="surface" mb="4">
          <Heading size="3" mb="2">
            🎯 GraphQL의 핵심 특징
          </Heading>
          <Flex direction="column" gap="2">
            <Text>
              • <strong>선언적 데이터 페칭:</strong> 필요한 데이터를 정확히 요청
            </Text>
            <Text>
              • <strong>단일 엔드포인트:</strong> 보통{' '}
              <Code variant="ghost">/graphql</Code> 하나만 사용
            </Text>
            <Text>
              • <strong>강력한 타입 시스템:</strong> 모든 데이터가 타입으로
              정의됨
            </Text>
            <Text>
              • <strong>자기 문서화:</strong> 스키마 자체가 API 문서
            </Text>
          </Flex>
        </Card>

        <Heading size="4" mb="3">
          📊 간단한 예시로 이해하기
        </Heading>

        <Text mb="3">
          사용자 정보를 가져온다고 가정해봅시다. GraphQL에서는 이렇게
          요청합니다:
        </Text>

        <Box p="4" mb="4" className="bg-surface-code-dark rounded-lg">
          <Code size="2" variant="ghost" className="text-code whitespace-pre">
            {`query {
  user(id: "123") {
    username
    email
    posts {
      title
      createdAt
    }
  }
}`}
          </Code>
        </Box>

        <Text mb="3">응답은 요청한 구조 그대로 돌아옵니다:</Text>

        <Box p="4" mb="4" className="bg-surface-code-dark rounded-lg">
          <Code size="2" variant="ghost" className="text-code whitespace-pre">
            {`{
  "data": {
    "user": {
      "username": "john",
      "email": "john@example.com",
      "posts": [
        {
          "title": "GraphQL 배우기",
          "createdAt": "2024-01-15"
        }
      ]
    }
  }
}`}
          </Code>
        </Box>

        <Callout.Root color="blue">
          <Callout.Text>
            💡 <strong>핵심:</strong> 클라이언트가 원하는 필드만 선택해서 받을
            수 있습니다.
            <Code variant="ghost">email</Code>이 필요 없다면? 쿼리에서 제외하면
            됩니다!
          </Callout.Text>
        </Callout.Root>
      </Box>

      {/* 2. RESTful API와의 차이점 */}
      <Box>
        <Heading size="5" mb="3">
          2. RESTful API와의 차이점
        </Heading>

        <Text mb="4">
          REST API를 먼저 간략히 살펴보고, GraphQL과 비교해봅시다.
        </Text>

        {/* REST API 설명 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            📮 RESTful API의 특징
          </Heading>

          <Text mb="3">
            REST는 <strong>리소스 기반</strong>의 아키텍처입니다. 각 리소스는
            고유한 URL을 가지며, HTTP 메서드(GET, POST, PUT, DELETE)로 작업을
            수행합니다.
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-light rounded-lg">
            <Text size="2" weight="bold" mb="2" className="text-block">
              예시: 블로그 API
            </Text>
            <Code size="2" variant="ghost" className="whitespace-pre font-mono">
              {`GET  /api/users/123           // 사용자 정보
GET  /api/users/123/posts     // 사용자의 게시물 목록
GET  /api/posts/456           // 특정 게시물
POST /api/posts               // 게시물 생성
PUT  /api/posts/456           // 게시물 수정
DELETE /api/posts/456         // 게시물 삭제`}
            </Code>
          </Box>

          <Flex direction="column" gap="2">
            <Text size="2">
              ✅ <strong>장점:</strong> 직관적이고 이해하기 쉬움
            </Text>
            <Text size="2">
              ✅ <strong>장점:</strong> HTTP 캐싱 활용 가능
            </Text>
            <Text size="2">
              ✅ <strong>장점:</strong> 성숙한 생태계와 도구
            </Text>
            <Text size="2">
              ⚠️ <strong>단점:</strong> Over-fetching (불필요한 데이터 포함)
            </Text>
            <Text size="2">
              ⚠️ <strong>단점:</strong> Under-fetching (여러 번 요청 필요)
            </Text>
            <Text size="2">
              ⚠️ <strong>단점:</strong> 엔드포인트 증가로 관리 복잡
            </Text>
          </Flex>
        </Card>

        {/* GraphQL vs REST 비교 */}
        <Card variant="surface" mb="4">
          <Heading size="4" mb="3">
            ⚖️ 실전 비교: 같은 데이터를 가져올 때
          </Heading>

          <Text mb="3" weight="bold">
            시나리오: 사용자 이름과 최근 게시물 3개의 제목만 필요
          </Text>

          {/* REST 방식 */}
          <Box mb="4">
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-red-600 dark:text-red-400"
            >
              ❌ REST API 방식
            </Text>

            <Box p="3" mb="2" className="bg-surface-code-dark rounded-md">
              <Text size="2" className="text-code mb-1">
                1️⃣ 사용자 정보 요청:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`GET /api/users/123

응답:
{
  "id": "123",
  "username": "john",      // ✅ 필요
  "email": "john@...",     // ❌ 불필요
  "bio": "...",            // ❌ 불필요
  "avatar": "...",         // ❌ 불필요
  "createdAt": "...",      // ❌ 불필요
  ...
}`}
              </Code>
            </Box>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text size="2" className="text-code mb-1">
                2️⃣ 게시물 목록 요청:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`GET /api/users/123/posts?limit=3

응답:
[
  {
    "id": "1",
    "title": "...",        // ✅ 필요
    "content": "...",      // ❌ 불필요
    "likes": 42,           // ❌ 불필요
    "comments": [...],     // ❌ 불필요
    ...
  }
]`}
              </Code>
            </Box>

            <Callout.Root color="red">
              <Callout.Text>
                ⚠️ <strong>문제점:</strong>
                <br />
                • 2번의 HTTP 요청 필요 (네트워크 비용 증가)
                <br />
                • 필요하지 않은 데이터가 많이 포함됨 (Over-fetching)
                <br />• 응답 크기가 커짐 (대역폭 낭비)
              </Callout.Text>
            </Callout.Root>
          </Box>

          {/* GraphQL 방식 */}
          <Box>
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-green-600 dark:text-green-400"
            >
              ✅ GraphQL 방식
            </Text>

            <Box p="3" mb="2" className="bg-surface-code-dark rounded-md">
              <Text size="2" className="text-code mb-1">
                1️⃣ 단일 요청:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`POST /graphql

query {
  user(id: "123") {
    username           // 필요한 것만!
    posts(limit: 3) {
      title            // 필요한 것만!
    }
  }
}

응답:
{
  "data": {
    "user": {
      "username": "john",
      "posts": [
        { "title": "..." },
        { "title": "..." },
        { "title": "..." }
      ]
    }
  }
}`}
              </Code>
            </Box>

            <Callout.Root color="green">
              <Callout.Text>
                ✅ <strong>장점:</strong>
                <br />
                • 1번의 HTTP 요청으로 해결
                <br />
                • 정확히 필요한 데이터만 받음
                <br />
                • 응답 크기가 작음
                <br />• 중첩된 데이터를 한 번에 가져옴
              </Callout.Text>
            </Callout.Root>
          </Box>
        </Card>

        {/* 핵심 차이점 표 */}
        <Card variant="surface">
          <Heading size="4" mb="3">
            📋 핵심 차이점 비교
          </Heading>

          <Box
            p="3"
            className="overflow-x-auto bg-gray-50 dark:bg-gray-900 rounded"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-2 px-3">항목</th>
                  <th className="text-left py-2 px-3">REST API</th>
                  <th className="text-left py-2 px-3">GraphQL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">엔드포인트</td>
                  <td className="py-2 px-3">
                    여러 개 (<Code variant="ghost">/users</Code>,{' '}
                    <Code variant="ghost">/posts</Code>)
                  </td>
                  <td className="py-2 px-3">
                    보통 하나 (<Code variant="ghost">/graphql</Code>)
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">데이터 구조</td>
                  <td className="py-2 px-3">서버가 결정</td>
                  <td className="py-2 px-3">클라이언트가 선택</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">Over-fetching</td>
                  <td className="py-2 px-3">자주 발생 ❌</td>
                  <td className="py-2 px-3">없음 ✅</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">Under-fetching</td>
                  <td className="py-2 px-3">여러 요청 필요 ❌</td>
                  <td className="py-2 px-3">한 번에 해결 ✅</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">HTTP 메서드</td>
                  <td className="py-2 px-3">GET, POST, PUT, DELETE</td>
                  <td className="py-2 px-3">주로 POST (또는 GET)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">타입 시스템</td>
                  <td className="py-2 px-3">선택적 (Swagger 등)</td>
                  <td className="py-2 px-3">필수 (스키마)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">캐싱</td>
                  <td className="py-2 px-3">HTTP 캐싱 자동 ✅</td>
                  <td className="py-2 px-3">클라이언트 측 구현 필요 ⚠️</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-semibold">버전 관리</td>
                  <td className="py-2 px-3">
                    <Code variant="ghost">/v1</Code>,{' '}
                    <Code variant="ghost">/v2</Code> 필요
                  </td>
                  <td className="py-2 px-3">필드 추가/deprecated로 해결</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold">학습 곡선</td>
                  <td className="py-2 px-3">낮음 ✅</td>
                  <td className="py-2 px-3">높음 ⚠️</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Card>
      </Box>

      {/* 3. GraphQL의 보안 고려사항 */}
      <Box>
        <Heading size="5" mb="3">
          3. GraphQL의 보안 고려사항 ⚠️
        </Heading>
        <Text mb="4">
          GraphQL의 유연성은 강력하지만, 동시에 새로운 보안 취약점을 만들 수
          있습니다. 클라이언트가 자유롭게 쿼리를 작성할 수 있다는 것은,{' '}
          <strong>악의적인 사용자가 서버에 공격을 시도할 수 있다</strong>는
          의미이기도 합니다.
        </Text>
        <Callout.Root color="red" mb="4">
          <Callout.Text>
            🚨 <strong>중요:</strong> GraphQL을 사용할 때는 REST보다 더 많은
            보안 조치가 필요합니다. 특히 공개 API나 웹 애플리케이션에서는 반드시
            아래 내용들을 고려해야 합니다.
          </Callout.Text>
        </Callout.Root>
        {/* 보안 이슈 1: 쿼리 복잡도 공격 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            🔴 1. 쿼리 깊이/복잡도 공격 (DoS)
          </Heading>

          <Text mb="3">
            <strong>문제:</strong> 클라이언트가 엄청나게 깊거나 복잡한 쿼리를
            보내서 서버를 마비시킬 수 있습니다.
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Text size="2" weight="bold" mb="2" className="text-code">
              ❌ 악의적인 쿼리 예시:
            </Text>
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`query MaliciousQuery {
  user {
    posts {
      comments {
        author {
          posts {
            comments {
              author {
                posts {
                  # 계속 중첩... 서버 과부하!
                }
              }
            }
          }
        }
      }
    }
  }
}`}
            </Code>
          </Box>

          <Callout.Root color="amber" mb="3">
            <Callout.Text>
              ⚠️ 이런 쿼리 하나로 서버가 수백만 개의 데이터를 조회하게 되어
              서버가 다운될 수 있습니다.
            </Callout.Text>
          </Callout.Root>

          <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Text size="2" weight="bold" mb="2">
              ✅ 해결 방법:
            </Text>
            <Flex direction="column" gap="2">
              <Text size="2">
                • <strong>쿼리 깊이 제한:</strong> 최대 중첩 깊이를 5~7단계로
                제한
              </Text>
              <Text size="2">
                • <strong>복잡도 점수 계산:</strong> 각 필드에 비용을 할당하고
                총 비용 제한
              </Text>
              <Text size="2">
                • <strong>타임아웃:</strong> 쿼리 실행 시간 제한 (예: 30초)
              </Text>
              <Text size="2">
                • <strong>페이지네이션 강제:</strong> 리스트는 최대 100개까지만
              </Text>
            </Flex>
          </Box>
        </Card>
        {/* 보안 이슈 2: 인증/인가 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            🔴 2. 필드 레벨 인증/인가의 복잡성
          </Heading>

          <Text mb="3">
            <strong>문제:</strong> REST는 엔드포인트 단위로 권한을 관리하지만,
            GraphQL은 <strong>필드 단위</strong>로 권한을 관리해야 합니다.
          </Text>

          <Flex gap="3" mb="3" direction={{ initial: 'column', md: 'row' }}>
            <Box className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Text size="2" weight="bold" mb="2" className="text-block">
                REST의 권한 관리
              </Text>
              <Code size="2" variant="ghost" className="whitespace-pre">
                {`// 엔드포인트 단위
if (!isAdmin) {
  return 403
}
// 간단!`}
              </Code>
            </Box>

            <Box className="flex-1 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <Text size="2" weight="bold" mb="2" className="text-block">
                GraphQL의 권한 관리
              </Text>
              <Code size="2" variant="ghost" className="whitespace-pre">
                {`// 필드마다 체크
user: {
  email: () => {
    if (!isOwner) 
      throw Error()
  }
}
// 복잡!`}
              </Code>
            </Box>
          </Flex>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Text size="2" weight="bold" mb="2" className="text-code">
              ❌ 실수하기 쉬운 예시:
            </Text>
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`type User {
  id: ID!
  username: String!
  email: String!          # 누구나 볼 수 있음 ❌
  password: String!       # 큰 문제! ❌❌❌
  creditCard: String!     # 민감 정보 노출 ❌
}

// 사용자가 이런 쿼리를 보내면?
query {
  user(id: "123") {
    password      # 리졸버에서 막지 않으면 노출됨!
    creditCard
  }
}`}
            </Code>
          </Box>

          <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Text size="2" weight="bold" mb="2">
              ✅ 해결 방법:
            </Text>
            <Flex direction="column" gap="2">
              <Text size="2">
                • <strong>민감한 필드는 스키마에서 제외:</strong> password는
                절대 노출 금지
              </Text>
              <Text size="2">
                • <strong>모든 리졸버에 권한 체크:</strong> 각 필드마다 검증
              </Text>
              <Text size="2">
                • <strong>디렉티브 활용:</strong>{' '}
                <Code variant="ghost">@auth(requires: ADMIN)</Code> 같은
                데코레이터
              </Text>
              <Text size="2">
                • <strong>타입 분리:</strong> PublicUser, PrivateUser 등으로
                구분
              </Text>
            </Flex>
          </Box>
        </Card>
        {/* 보안 이슈 3: Introspection */}
        <Card mb="4">
          <Heading size="4" mb="3">
            🔴 3. Introspection으로 인한 스키마 노출
          </Heading>

          <Text mb="3">
            <strong>문제:</strong> GraphQL은 기본적으로 전체 스키마 구조를
            조회할 수 있는 Introspection 기능을 제공합니다. 공격자가 이를 통해
            API 구조를 파악할 수 있습니다.
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Text size="2" weight="bold" mb="2" className="text-code">
              ❌ 공격자가 할 수 있는 것:
            </Text>
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`query IntrospectionQuery {
  __schema {
    types {
      name
      fields {
        name
        type { name }
      }
    }
  }
}

// 결과: 모든 타입, 필드, 관계 정보 획득
// → 취약점 탐색에 활용 가능`}
            </Code>
          </Box>

          <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Text size="2" weight="bold" mb="2">
              ✅ 해결 방법:
            </Text>
            <Flex direction="column" gap="2">
              <Text size="2">
                • <strong>프로덕션에서 Introspection 비활성화</strong> (필수!)
              </Text>
              <Text size="2">• 개발/스테이징 환경에서만 활성화</Text>
              <Text size="2">• 인증된 사용자만 Introspection 허용 (옵션)</Text>
            </Flex>
          </Box>
        </Card>
        {/* 보안 이슈 4: Rate Limiting */}
        <Card mb="4">
          <Heading size="4" mb="3">
            🔴 4. Rate Limiting의 어려움
          </Heading>

          <Text mb="3">
            <strong>문제:</strong> 단일 엔드포인트를 사용하므로 요청 수 기반
            제한이 의미 없습니다. 간단한 쿼리와 복잡한 쿼리의 비용이 다르기
            때문입니다.
          </Text>

          <Flex gap="3" mb="3" direction={{ initial: 'column', md: 'row' }}>
            <Box className="flex-1 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Text size="2" weight="bold" mb="2" className="text-block">
                간단한 쿼리
              </Text>
              <Code size="2" variant="ghost" className="whitespace-pre">
                {`query {
  user(id: "1") {
    username
  }
}
# 비용: 낮음`}
              </Code>
            </Box>

            <Box className="flex-1 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Text size="2" weight="bold" mb="2" className="text-block">
                복잡한 쿼리
              </Text>
              <Code size="2" variant="ghost" className="whitespace-pre">
                {`query {
  users(limit: 1000) {
    posts {
      comments
    }
  }
}
# 비용: 매우 높음`}
              </Code>
            </Box>
          </Flex>

          <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Text size="2" weight="bold" mb="2">
              ✅ 해결 방법:
            </Text>
            <Flex direction="column" gap="2">
              <Text size="2">
                • <strong>복잡도 기반 제한:</strong> 쿼리 복잡도 점수를 누적하여
                제한
              </Text>
              <Text size="2">
                • <strong>시간 윈도우:</strong> 1분 동안 총 1000 복잡도까지만
                허용
              </Text>
              <Text size="2">
                • <strong>사용자별 제한:</strong> 인증된 사용자마다 다른 제한
                적용
              </Text>
            </Flex>
          </Box>
        </Card>
        {/* 보안 이슈 5: 웹 환경에서의 노출 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            🔴 5. 웹 환경에서의 스키마/쿼리 노출
          </Heading>

          <Text mb="3">
            <strong>현실:</strong> 웹 애플리케이션에서 프론트엔드→백엔드 GraphQL
            통신은 사실상 <strong>공개</strong>입니다.
          </Text>

          <Box
            p="3"
            mb="3"
            className="bg-amber-50 dark:bg-amber-900/20 rounded-lg"
          >
            <Text size="2" weight="bold" mb="2">
              ⚠️ 사용자가 볼 수 있는 것:
            </Text>
            <Flex direction="column" gap="2">
              <Text size="2">
                • <strong>개발자 도구 → Network 탭:</strong> 모든 GraphQL 쿼리
                확인 가능
              </Text>
              <Text size="2">
                • <strong>프론트엔드 소스 코드:</strong> 번들링되어도 쿼리는
                그대로 노출
              </Text>
              <Text size="2">
                • <strong>직접 API 호출:</strong> Postman이나 curl로 쿼리 전송
                가능
              </Text>
            </Flex>
          </Box>

          <Callout.Root color="blue" mb="3">
            <Callout.Text>
              💡 <strong>핵심:</strong> 스키마 구조가 노출되어도{' '}
              <strong>권한 관리가 제대로 되어있으면 안전</strong>합니다.
              클라이언트는 신뢰하지 않고, 모든 검증은 서버에서!
            </Callout.Text>
          </Callout.Root>

          <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Text size="2" weight="bold" mb="2">
              ✅ 대응 방법:
            </Text>
            <Flex direction="column" gap="2">
              <Text size="2">• 웹 앱은 "공개 API"처럼 취급하고 보안 설계</Text>
              <Text size="2">• 모든 리졸버에서 인증/인가 철저히 검증</Text>
              <Text size="2">• Introspection은 반드시 비활성화</Text>
              <Text size="2">• 쿼리 복잡도 제한 및 Rate Limiting 적용</Text>
            </Flex>
          </Box>
        </Card>
      </Box>

      {/* 4. HTTP 캐싱을 사용할 수 없는 문제 */}
      <Box>
        <Heading size="5" mb="3">
          4. HTTP 캐싱을 사용할 수 없는 문제 🚫
        </Heading>

        <Text mb="4">
          GraphQL의 또 다른 큰 단점은{' '}
          <strong>HTTP 캐싱을 활용하기 어렵다</strong>는 점입니다. REST
          API에서는 브라우저가 자동으로 처리해주던 캐싱을 GraphQL에서는 직접
          구현해야 합니다.
        </Text>

        {/* HTTP 캐싱이란? */}
        <Card mb="4">
          <Heading size="4" mb="3">
            💾 HTTP 캐싱이란?
          </Heading>

          <Text mb="3">
            HTTP 캐싱은 이전에 받았던 응답을 브라우저, CDN, 프록시 서버에
            저장해두었다가{' '}
            <strong>
              같은 요청이 오면 서버에 가지 않고 저장된 데이터를 사용
            </strong>
            하는 메커니즘입니다.
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Text size="2" weight="bold" mb="2" className="text-block">
              ✅ REST API의 HTTP 캐싱 (자동):
            </Text>
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`// 첫 번째 요청
GET /api/users/123

→ 서버 응답 (200ms 소요):
HTTP/1.1 200 OK
Cache-Control: max-age=3600  // 1시간 캐싱
ETag: "abc123"

{ "id": "123", "username": "john" }

// 두 번째 요청 (1시간 이내)
GET /api/users/123

→ 브라우저가 캐시 사용 (1ms 소요!) 🚀
→ 서버 요청 안 함!`}
            </Code>
          </Box>

          <Callout.Root color="green">
            <Callout.Text>
              ✅ <strong>장점:</strong> 개발자가 아무것도 하지 않아도 브라우저,
              CDN, 프록시가 자동으로 캐싱 처리!
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* GraphQL에서 HTTP 캐싱이 어려운 이유 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            ❌ GraphQL에서 HTTP 캐싱이 어려운 3가지 이유
          </Heading>

          {/* 이유 1: 단일 엔드포인트 */}
          <Box mb="3">
            <Text size="2" weight="bold" mb="2">
              1️⃣ 단일 엔드포인트 문제
            </Text>

            <Flex gap="3" mb="2" direction={{ initial: 'column', md: 'row' }}>
              <Box className="flex-1 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Text size="2" weight="bold" mb="1" className="text-block">
                  REST
                </Text>
                <Code size="2" variant="ghost" className="whitespace-pre">
                  {`/api/users/123  ← 고유 URL
/api/users/456  ← 다른 URL
/api/posts/789  ← 또 다른 URL

각 URL마다 캐싱 가능! ✅`}
                </Code>
              </Box>

              <Box className="flex-1 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Text size="2" weight="bold" mb="1" className="text-block">
                  GraphQL
                </Text>
                <Code size="2" variant="ghost" className="whitespace-pre">
                  {`/graphql  ← 항상 같은 URL
/graphql  ← 항상 같은 URL
/graphql  ← 항상 같은 URL

URL이 같아서 구분 불가! ❌`}
                </Code>
              </Box>
            </Flex>

            <Text size="2" color="gray">
              HTTP 캐시는 URL을 키로 사용하는데, GraphQL은 모든 요청의 URL이
              같아서 구분할 수 없습니다.
            </Text>
          </Box>

          {/* 이유 2: POST 요청 사용 */}
          <Box mb="3">
            <Text size="2" weight="bold" mb="2">
              2️⃣ POST 요청 사용 문제
            </Text>

            <Box p="3" mb="2" className="bg-surface-code-light rounded-md">
              <Text size="2" mb="2" className="text-block">
                <strong>REST:</strong> GET 요청 사용 → 자동 캐싱 ✅
              </Text>
              <Code size="2" variant="ghost" className="whitespace-pre">
                {`GET /api/users/123
→ 브라우저가 자동으로 캐싱`}
              </Code>
            </Box>

            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Text size="2" mb="2" className="text-code text-block">
                <strong>GraphQL:</strong> POST 요청 사용 → 캐싱 안 됨 ❌
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`POST /graphql
Content-Type: application/json

{
  "query": "query { user(id: \\"123\\") { username } }"
}
→ POST는 기본적으로 캐싱되지 않음!`}
              </Code>
            </Box>

            <Text size="2" color="gray" mt="2">
              POST 요청은 서버에 데이터를 변경하는 요청으로 간주되어 HTTP 캐시가
              적용되지 않습니다.
            </Text>
          </Box>

          {/* 이유 3: 요청 본문이 다름 */}
          <Box>
            <Text size="2" weight="bold" mb="2">
              3️⃣ 요청 본문(Body)이 매번 다름
            </Text>

            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`// 요청 1
POST /graphql
{ "query": "{ user(id: \\"123\\") { username } }" }

// 요청 2 (필드만 추가)
POST /graphql
{ "query": "{ user(id: \\"123\\") { username email } }" }

// 문제: URL은 같지만 내용이 다름
// HTTP 캐시는 URL만 보므로 구분 못함!`}
              </Code>
            </Box>
          </Box>
        </Card>

        {/* 실제 영향 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            📊 실제 성능 영향
          </Heading>

          <Flex gap="4" direction={{ initial: 'column', md: 'row' }}>
            {/* REST 시나리오 */}
            <Box className="flex-1">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-green-600 dark:text-green-400"
              >
                ✅ REST + HTTP 캐싱
              </Text>
              <Box
                p="3"
                className="bg-green-50 dark:bg-green-900/20 rounded-lg"
              >
                <Flex direction="column" gap="2">
                  <Text size="2">첫 로딩: 1초</Text>
                  <Text size="2">같은 페이지 재방문: 0.01초 (캐시) 🚀</Text>
                  <Text size="2">뒤로가기: 즉시 (캐시)</Text>
                  <Text size="2">CDN 캐시 히트율: 90%</Text>
                  <Text
                    size="2"
                    weight="bold"
                    className="text-green-600 dark:text-green-400"
                  >
                    → 서버 비용 절감!
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* GraphQL 시나리오 */}
            <Box className="flex-1">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-red-600 dark:text-red-400"
              >
                ❌ GraphQL (HTTP 캐싱 없음)
              </Text>
              <Box p="3" className="bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Flex direction="column" gap="2">
                  <Text size="2">첫 로딩: 1초</Text>
                  <Text size="2">같은 페이지 재방문: 0.8초 (서버 요청)</Text>
                  <Text size="2">뒤로가기: 0.5초 (재렌더링)</Text>
                  <Text size="2">CDN 캐시: 사용 불가</Text>
                  <Text
                    size="2"
                    weight="bold"
                    className="text-red-600 dark:text-red-400"
                  >
                    → 서버 비용 증가!
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Flex>

          <Callout.Root color="amber" mt="3">
            <Callout.Text>
              ⚠️ 매번 서버로 요청이 가므로 네트워크 비용, 서버 부하, 사용자 대기
              시간이 모두 증가합니다.
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* 해결 방법 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            🔧 GraphQL에서의 해결 방법
          </Heading>

          <Text mb="3">
            HTTP 캐싱을 못 쓰니까,{' '}
            <strong>클라이언트 측에서 직접 캐싱을 구현</strong>해야 합니다.
          </Text>

          {/* Apollo Client */}
          <Box mb="3">
            <Text size="2" weight="bold" mb="2">
              1️⃣ Apollo Client (가장 인기)
            </Text>

            <Box p="3" mb="2" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()  // 수동 캐싱!
})

// 첫 번째 쿼리
const { data } = await client.query({
  query: GET_USER,
  variables: { id: "123" }
})  // 서버 요청

// 두 번째 쿼리 (같은 데이터)
const { data } = await client.query({
  query: GET_USER,
  variables: { id: "123" }
})  // 캐시에서 가져옴!`}
              </Code>
            </Box>

            <Flex direction="column" gap="2">
              <Text size="2">✅ 메모리에 데이터 캐싱</Text>
              <Text size="2">✅ 정규화된 캐시 (같은 객체 재사용)</Text>
              <Text size="2">⚠️ 라이브러리 추가 필요 (번들 크기 증가)</Text>
              <Text size="2">⚠️ 복잡한 설정 및 학습 곡선</Text>
            </Flex>
          </Box>

          {/* 정규화된 캐싱 */}
          <Box mb="3">
            <Text size="2" weight="bold" mb="2">
              2️⃣ 정규화된 캐싱 (Normalized Cache)
            </Text>

            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`// 쿼리 1
query {
  user(id: "123") {
    id
    username
  }
}
// 캐시: { User:123: { id: "123", username: "john" } }

// 쿼리 2 (다른 쿼리지만 같은 사용자)
query {
  post(id: "1") {
    author {
      id        # 123
      username  # 캐시에서 가져옴! ✅
    }
  }
}
// author는 User:123을 참조 → 서버 요청 안 함!`}
              </Code>
            </Box>

            <Text size="2" color="gray" mt="2">
              같은 객체를 여러 쿼리에서 공유하여 효율적으로 캐싱합니다.
            </Text>
          </Box>

          {/* Persisted Queries */}
          <Box>
            <Text size="2" weight="bold" mb="2">
              3️⃣ Persisted Queries (부분 해결)
            </Text>

            <Box p="3" mb="2" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`// 쿼리를 미리 서버에 등록하고 ID로 호출
GET /graphql?queryId=abc123&variables={"id":"123"}

→ 이제 URL이 달라짐!
→ HTTP 캐싱 가능! ✅`}
              </Code>
            </Box>

            <Flex direction="column" gap="2">
              <Text size="2">✅ HTTP 캐싱 사용 가능</Text>
              <Text size="2">⚠️ 쿼리를 미리 등록해야 함</Text>
              <Text size="2">⚠️ 동적 쿼리 불가 (유연성 상실)</Text>
            </Flex>
          </Box>
        </Card>

        {/* 비교 */}
        <Card variant="surface">
          <Heading size="4" mb="3">
            ⚖️ REST vs GraphQL 캐싱 비교
          </Heading>

          <Flex gap="4" direction={{ initial: 'column', md: 'row' }}>
            {/* REST */}
            <Box className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Text size="2" weight="bold" mb="2">
                REST HTTP 캐싱
              </Text>
              <Flex direction="column" gap="2">
                <Text size="2">✅ 자동으로 동작</Text>
                <Text size="2">✅ 브라우저, CDN, 프록시 지원</Text>
                <Text size="2">✅ 설정 거의 불필요</Text>
                <Text size="2">✅ 메모리+디스크 캐싱</Text>
                <Text size="2">✅ 전 세계 CDN 활용</Text>
                <Text
                  size="2"
                  weight="bold"
                  className="text-green-600 dark:text-green-400"
                >
                  개발자 노력: 거의 없음
                </Text>
              </Flex>
            </Box>

            {/* GraphQL */}
            <Box className="flex-1 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Text size="2" weight="bold" mb="2">
                GraphQL 클라이언트 캐싱
              </Text>
              <Flex direction="column" gap="2">
                <Text size="2">⚠️ 직접 구현 필요</Text>
                <Text size="2">⚠️ 라이브러리 추가 (번들 크기↑)</Text>
                <Text size="2">⚠️ 복잡한 설정</Text>
                <Text size="2">⚠️ 메모리 캐싱만</Text>
                <Text size="2">⚠️ CDN 활용 어려움</Text>
                <Text
                  size="2"
                  weight="bold"
                  className="text-amber-600 dark:text-amber-400"
                >
                  개발자 노력: 많음
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Callout.Root color="blue" mt="3">
            <Callout.Text>
              💡 <strong>정리:</strong> REST는 HTTP 캐싱이 무료로 제공되지만,
              GraphQL은 클라이언트 측 캐싱을 직접 구현해야 하고 HTTP 캐싱만큼
              효율적이지 않습니다.
            </Callout.Text>
          </Callout.Root>
        </Card>
      </Box>

      {/* 5. 그럼에도 GraphQL을 사용하면 좋은 점 */}
      <Box>
        <Heading size="5" mb="3">
          5. 그럼에도 GraphQL을 사용하면 좋은 점 ✨
        </Heading>

        <Text mb="4">
          지금까지 GraphQL의 단점들을 많이 다뤘지만, 이런 단점들에도 불구하고
          많은 회사들이 GraphQL을 선택하는 이유가 있습니다. 제대로 사용하면 개발
          생산성과 사용자 경험을 크게 향상시킬 수 있기 때문입니다.
        </Text>

        {/* 장점 1: Over-fetching, Under-fetching 해결 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            ✅ 1. Over-fetching과 Under-fetching 문제 해결
          </Heading>

          <Text mb="3">
            <strong>필요한 데이터만 정확히 요청</strong>할 수 있어 네트워크
            효율성이 크게 향상됩니다.
          </Text>

          {/* Over-fetching */}
          <Box mb="3">
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-purple-600 dark:text-purple-400"
            >
              📦 Over-fetching 해결
            </Text>

            <Flex gap="3" direction={{ initial: 'column', md: 'row' }}>
              <Box className="flex-1 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Text size="2" weight="bold" mb="1" className="text-block">
                  ❌ REST
                </Text>
                <Code size="2" variant="ghost" className="whitespace-pre">
                  {`GET /api/users/123

// 이름만 필요한데...
{
  "id": "123",
  "username": "john",  ✅
  "email": "...",      ❌
  "bio": "...",        ❌
  "avatar": "...",     ❌
  "address": {...},    ❌
  "settings": {...}    ❌
}
// 불필요한 데이터 과다`}
                </Code>
              </Box>

              <Box className="flex-1 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Text size="2" weight="bold" mb="1" className="text-block">
                  ✅ GraphQL
                </Text>
                <Code size="2" variant="ghost" className="whitespace-pre">
                  {`query {
  user(id: "123") {
    username  # 필요한 것만!
  }
}

// 응답
{
  "user": {
    "username": "john"
  }
}
// 딱 필요한 것만!`}
                </Code>
              </Box>
            </Flex>
          </Box>

          {/* Under-fetching */}
          <Box>
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-purple-600 dark:text-purple-400"
            >
              🔄 Under-fetching 해결
            </Text>

            <Flex gap="3" direction={{ initial: 'column', md: 'row' }}>
              <Box className="flex-1 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Text size="2" weight="bold" mb="1" className="text-block">
                  ❌ REST
                </Text>
                <Code size="2" variant="ghost" className="whitespace-pre">
                  {`// 사용자와 게시물이 필요
GET /api/users/123
GET /api/users/123/posts
GET /api/posts/1/comments

// 3번의 요청! 🐌
// 각각 200ms씩 = 600ms`}
                </Code>
              </Box>

              <Box className="flex-1 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Text size="2" weight="bold" mb="1" className="text-block">
                  ✅ GraphQL
                </Text>
                <Code size="2" variant="ghost" className="whitespace-pre">
                  {`query {
  user(id: "123") {
    username
    posts {
      title
      comments { content }
    }
  }
}

// 1번의 요청! 🚀
// 200ms`}
                </Code>
              </Box>
            </Flex>
          </Box>

          <Callout.Root color="green" mt="3">
            <Callout.Text>
              💡 <strong>실제 효과:</strong> 모바일 환경에서는 네트워크 요청
              횟수가 줄어들어 배터리 소모와 데이터 사용량이 크게 감소합니다.
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* 장점 2: 단일 요청으로 복잡한 데이터 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            ✅ 2. 단일 요청으로 복잡한 데이터 구조 가져오기
          </Heading>

          <Text mb="3">
            <strong>중첩된 관계</strong>를 한 번에 가져올 수 있어 복잡한 UI를
            구성하기 쉽습니다.
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-code text-block"
            >
              예시: 대시보드 화면
            </Text>
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`query Dashboard {
  currentUser {
    username
    avatar
    unreadNotifications {
      count
      items {
        type
        message
        createdAt
      }
    }
  }
  recentPosts(limit: 5) {
    title
    author { username }
    likesCount
    commentsCount
  }
  trending {
    tags { name }
    users { username }
  }
}

// 한 번의 요청으로 대시보드 전체 데이터 완성! 🎯`}
            </Code>
          </Box>

          <Callout.Root color="blue">
            <Callout.Text>
              ✨ REST였다면 최소 5~10번의 API 호출이 필요했을 데이터를 단 1번에
              가져옵니다.
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* 장점 3: 강력한 타입 시스템 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            ✅ 3. 강력한 타입 시스템과 자동 완성
          </Heading>

          <Text mb="3">
            GraphQL 스키마는 <strong>강타입 언어</strong>처럼 동작하여 개발
            경험을 크게 향상시킵니다.
          </Text>

          <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-code text-block"
            >
              스키마 정의:
            </Text>
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`type User {
  id: ID!           # 필수
  username: String! # 필수
  email: String     # 선택적
  age: Int
  posts: [Post!]!   # Post 배열 (필수)
}

type Post {
  id: ID!
  title: String!
  author: User!
}`}
            </Code>
          </Box>

          <Flex direction="column" gap="2" mb="3">
            <Text size="2">
              ✅ <strong>IDE 자동 완성:</strong> VS Code에서 필드명을 자동으로
              제안
            </Text>
            <Text size="2">
              ✅ <strong>컴파일 타임 오류 검출:</strong> 잘못된 필드 요청 시
              즉시 발견
            </Text>
            <Text size="2">
              ✅ <strong>타입 생성:</strong> GraphQL Code Generator로 TypeScript
              타입 자동 생성
            </Text>
            <Text size="2">
              ✅ <strong>리팩토링 안전:</strong> 필드명 변경 시 모든 사용 위치
              추적 가능
            </Text>
          </Flex>

          <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Text size="2" weight="bold" mb="2" className="text-block">
              실제 개발 경험:
            </Text>
            <Code size="2" variant="ghost" className="whitespace-pre">
              {`// TypeScript + GraphQL
const { data } = useQuery(GET_USER)

// data.user. 까지 타이핑하면
// → username, email, posts 등이 자동 완성!
// → 타입이 보장되어 런타임 에러 없음 ✅`}
            </Code>
          </Box>
        </Card>

        {/* 장점 4: 자기 문서화 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            ✅ 4. 자기 문서화 (Self-Documenting)
          </Heading>

          <Text mb="3">
            스키마 자체가 <strong>살아있는 문서</strong>가 되어 별도의 API
            문서를 작성할 필요가 없습니다.
          </Text>

          <Flex gap="3" mb="3" direction={{ initial: 'column', md: 'row' }}>
            <Box className="flex-1 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <Text size="2" weight="bold" mb="2">
                ⚠️ REST API
              </Text>
              <Flex direction="column" gap="2">
                <Text size="2">• Swagger/OpenAPI 별도 작성</Text>
                <Text size="2">• 문서와 실제 코드 불일치 가능</Text>
                <Text size="2">• 문서 업데이트 잊어버림</Text>
                <Text size="2">• 수동 유지보수 필요</Text>
              </Flex>
            </Box>

            <Box className="flex-1 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Text size="2" weight="bold" mb="2">
                ✅ GraphQL
              </Text>
              <Flex direction="column" gap="2">
                <Text size="2">• 스키마 = 문서</Text>
                <Text size="2">• 항상 코드와 동기화</Text>
                <Text size="2">• GraphQL Playground 자동 생성</Text>
                <Text size="2">• 별도 유지보수 불필요</Text>
              </Flex>
            </Box>
          </Flex>

          <Box p="3" className="bg-surface-code-dark rounded-md">
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-code text-block"
            >
              GraphQL Playground 예시:
            </Text>
            <Code size="2" variant="ghost" className="text-code whitespace-pre">
              {`# Playground에 접속하면 자동으로 제공되는 것들:

✅ 모든 타입, 필드, 인자 목록
✅ 각 필드의 설명 (description)
✅ 필수/선택 여부
✅ 반환 타입
✅ Deprecation 정보
✅ 예제 쿼리
✅ 실시간 쿼리 테스트`}
            </Code>
          </Box>

          <Callout.Root color="purple" mt="3">
            <Callout.Text>
              💡 프론트엔드 개발자가 백엔드 개발자에게 "이 API 어떻게 써요?"라고
              물어볼 필요가 없습니다. Playground만 열어보면 됩니다!
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* 장점 5: 프론트엔드 개발 속도 향상 */}
        <Card mb="4">
          <Heading size="4" mb="3">
            ✅ 5. 프론트엔드 개발 속도 대폭 향상
          </Heading>

          <Text mb="3">
            <strong>프론트엔드 개발자가 자율적</strong>으로 필요한 데이터를
            정의할 수 있어 개발 속도가 빨라집니다.
          </Text>

          {/* REST 개발 프로세스 */}
          <Box mb="3">
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-red-600 dark:text-red-400"
            >
              ❌ REST API 개발 프로세스
            </Text>
            <Box p="3" className="bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Flex direction="column" gap="2">
                <Text size="2">
                  1. 프론트: "이 화면에 이런 데이터 필요해요"
                </Text>
                <Text size="2">
                  2. 백엔드: "네, API 만들어드릴게요" (1~2일 소요)
                </Text>
                <Text size="2">3. 프론트: "아, 이 필드도 필요한데..."</Text>
                <Text size="2">
                  4. 백엔드: "그럼 다시 수정할게요" (추가 1일)
                </Text>
                <Text size="2">
                  5. 프론트: "저기... 이 필드는 필요 없는데 응답이 너무 커요..."
                </Text>
                <Text
                  size="2"
                  weight="bold"
                  className="text-red-600 dark:text-red-400"
                >
                  → 왕복 커뮤니케이션으로 시간 지연 ⏰
                </Text>
              </Flex>
            </Box>
          </Box>

          {/* GraphQL 개발 프로세스 */}
          <Box mb="3">
            <Text
              size="2"
              weight="bold"
              mb="2"
              className="text-green-600 dark:text-green-400"
            >
              ✅ GraphQL 개발 프로세스
            </Text>
            <Box p="3" className="bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Flex direction="column" gap="2">
                <Text size="2">
                  1. 백엔드: 스키마 정의 (User, Post 타입 등)
                </Text>
                <Text size="2">
                  2. 프론트: 필요한 필드만 선택해서 쿼리 작성
                </Text>
                <Text size="2">
                  3. 프론트: "아, 이 필드도 필요하네?" → 쿼리에 추가
                </Text>
                <Text size="2">
                  4. 프론트: "이 필드 불필요하네?" → 쿼리에서 제거
                </Text>
                <Text
                  size="2"
                  weight="bold"
                  className="text-green-600 dark:text-green-400"
                >
                  → 백엔드 변경 없이 프론트에서 즉시 조정 가능! 🚀
                </Text>
              </Flex>
            </Box>
          </Box>

          <Callout.Root color="green">
            <Callout.Text>
              🎯 <strong>핵심:</strong> 백엔드 개발자를 기다릴 필요 없이
              프론트엔드 개발자가 자율적으로 작업할 수 있어 전체 개발 속도가
              2~3배 빨라집니다.
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* 보너스 장점들 */}
        <Card variant="surface">
          <Heading size="4" mb="3">
            🎁 추가 장점들
          </Heading>

          <Flex direction="column" gap="3">
            <Box>
              <Text weight="bold" mb="1">
                6. 버전 관리 불필요
              </Text>
              <Text size="2" color="gray" ml="2">
                필드를 추가하거나 <Code variant="ghost">@deprecated</Code>로
                표시하면 되어 <Code variant="ghost">/v1</Code>,{' '}
                <Code variant="ghost">/v2</Code> 같은 버전 관리가 필요 없습니다.
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                7. 실시간 기능 (Subscription)
              </Text>
              <Text size="2" color="gray" ml="2">
                WebSocket 기반 구독으로 실시간 채팅, 알림, 라이브 업데이트를
                쉽게 구현할 수 있습니다.
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                8. 다양한 클라이언트 지원
              </Text>
              <Text size="2" color="gray" ml="2">
                웹, iOS, Android 각각 다른 데이터가 필요해도 하나의 GraphQL
                API로 모두 대응 가능합니다.
              </Text>
            </Box>

            <Box>
              <Text weight="bold" mb="1">
                9. 뛰어난 개발 도구
              </Text>
              <Text size="2" color="gray" ml="2">
                Apollo DevTools, GraphQL Playground, GraphiQL 등 강력한 디버깅
                도구가 풍부합니다.
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>

      {/* 최종 정리 */}
      <Box>
        <Card
          variant="surface"
          className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20"
        >
          <Heading size="4" mb="3">
            🎯 최종 정리: GraphQL을 선택해야 할까?
          </Heading>

          <Flex direction="column" gap="3">
            <Box>
              <Text
                weight="bold"
                mb="2"
                className="text-green-600 dark:text-green-400"
              >
                ✅ GraphQL을 추천하는 경우:
              </Text>
              <Flex direction="column" gap="1" ml="2">
                <Text size="2">• 복잡한 데이터 관계가 많은 애플리케이션</Text>
                <Text size="2">
                  • 여러 플랫폼(웹/모바일)에서 다른 데이터 요구사항
                </Text>
                <Text size="2">• 프론트엔드 개발 속도가 중요한 경우</Text>
                <Text size="2">• 실시간 기능이 필요한 경우</Text>
                <Text size="2">• 타입 안정성이 중요한 프로젝트</Text>
              </Flex>
            </Box>

            <Box>
              <Text
                weight="bold"
                mb="2"
                className="text-amber-600 dark:text-amber-400"
              >
                ⚠️ REST가 더 나은 경우:
              </Text>
              <Flex direction="column" gap="1" ml="2">
                <Text size="2">• 간단한 CRUD 애플리케이션</Text>
                <Text size="2">• HTTP 캐싱을 적극 활용해야 할 때</Text>
                <Text size="2">• 파일 업로드/다운로드가 주요 기능</Text>
                <Text size="2">
                  • 팀이 GraphQL 학습에 투자할 시간이 없을 때
                </Text>
                <Text size="2">• 보안 설정에 리소스를 투입하기 어려울 때</Text>
              </Flex>
            </Box>

            <Box
              p="4"
              mt="2"
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200 dark:border-purple-800"
            >
              <Text
                weight="bold"
                className="text-purple-600 dark:text-purple-400 text-block"
              >
                💡 핵심 메시지
              </Text>
              <Text size="2" mt="2">
                GraphQL은 <strong>강력하지만 책임도 큰 도구</strong>입니다. 보안
                설정, 캐싱 구현 등의 초기 비용을 감수할 수 있고, 복잡한 데이터
                요구사항이 있다면 GraphQL이 큰 가치를 제공합니다. 하지만 단순한
                프로젝트라면 REST의 단순함이 더 나을 수 있습니다.
              </Text>
              <Text size="2" mt="2" weight="bold">
                프로젝트의 요구사항과 팀의 역량을 고려하여 현명하게 선택하세요!
                🚀
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>

      {/* 6. GraphQL 상세 스펙 */}
      <Box>
        <Heading size="5" mb="3">
          6. GraphQL 상세 스펙 📚
        </Heading>

        <Text mb="4">
          이제 GraphQL이 실제로 어떻게 동작하는지 구조를 이해해봅시다. GraphQL은
          크게 <strong>Server(백엔드)</strong>와{' '}
          <strong>Client(프론트엔드)</strong>로 나뉘며, 각각 중요한 역할을
          담당합니다.
        </Text>

        {/* Server 파트 */}
        <Box mb="6" mt="6">
          <Heading size="4" mb="4" className="text-blue-600 dark:text-blue-400">
            🖥️ Server 파트 (백엔드)
          </Heading>

          {/* Schema */}
          <Card mb="4">
            <Heading size="4" mb="3">
              1️⃣ Schema (스키마) - API의 설계도
            </Heading>

            <Text mb="3">
              스키마는 GraphQL API의 <strong>모든 타입과 관계</strong>를
              정의합니다. 클라이언트가 무엇을 요청할 수 있는지 명시하는
              계약서입니다.
            </Text>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                기본 타입 정의:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`# 스칼라 타입 (기본 타입)
type User {
  id: ID!              # 고유 식별자 (필수)
  username: String!    # 문자열 (필수)
  age: Int             # 정수 (선택)
  isActive: Boolean!   # 불리언 (필수)
  rating: Float        # 실수 (선택)
  createdAt: DateTime! # 커스텀 스칼라
}

# 관계 정의
type Post {
  id: ID!
  title: String!
  content: String!
  author: User!        # User 타입 참조
  tags: [String!]!     # 문자열 배열
  comments: [Comment!]! # Comment 배열
}

type Comment {
  id: ID!
  content: String!
  author: User!
  post: Post!
}`}
              </Code>
            </Box>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                진입점 정의 (Root Types):
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`# 읽기 작업
type Query {
  # 단일 조회
  user(id: ID!): User
  post(id: ID!): Post
  
  # 리스트 조회
  users(
    limit: Int = 10     # 기본값 10
    offset: Int = 0
    orderBy: String
  ): [User!]!
  
  # 검색
  search(keyword: String!): SearchResult!
}

# 쓰기 작업
type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

# 실시간 구독
type Subscription {
  userCreated: User!
  postUpdated(postId: ID!): Post!
}`}
              </Code>
            </Box>

            <Flex direction="column" gap="2">
              <Text size="2">
                ✅ <strong>Query:</strong> 데이터 읽기 (GET과 유사)
              </Text>
              <Text size="2">
                ✅ <strong>Mutation:</strong> 데이터 쓰기 (POST/PUT/DELETE와
                유사)
              </Text>
              <Text size="2">
                ✅ <strong>Subscription:</strong> 실시간 구독 (WebSocket)
              </Text>
            </Flex>
          </Card>

          {/* Resolver */}
          <Card mb="4">
            <Heading size="4" mb="3">
              2️⃣ Resolver (리졸버) - 실제 데이터 가져오기
            </Heading>

            <Text mb="3">
              리졸버는 <strong>각 필드의 데이터를 실제로 가져오는 함수</strong>
              입니다. 스키마는 "무엇을", 리졸버는 "어떻게" 정의합니다.
            </Text>

            <Callout.Root color="amber" mb="3">
              <Callout.Text>
                ⚠️ <strong>중요:</strong> 클라이언트가 Query를 작성하면, 서버의
                Resolver가 실제로 실행됩니다. Query는 단순히 요청일 뿐, 실행은
                Resolver가 담당합니다!
              </Callout.Text>
            </Callout.Root>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                리졸버 구조 (Node.js 예시):
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`const resolvers = {
  // Query 리졸버
  Query: {
    user: (parent, args, context, info) => {
      // args.id를 사용해 사용자 조회
      return db.users.findById(args.id)
    },
    
    users: (parent, args, context, info) => {
      const { limit, offset } = args
      return db.users.find().limit(limit).skip(offset)
    }
  },
  
  // Mutation 리졸버
  Mutation: {
    createUser: (parent, args, context, info) => {
      // 권한 체크
      if (!context.user) {
        throw new Error('인증 필요')
      }
      
      // 데이터 생성
      return db.users.create(args.input)
    }
  },
  
  // 타입 리졸버 (관계 해결)
  User: {
    posts: (parent, args, context, info) => {
      // parent는 User 객체
      return db.posts.findByUserId(parent.id)
    }
  }
}`}
              </Code>
            </Box>

            <Box
              p="3"
              mb="3"
              className="bg-green-50 dark:bg-green-900/20 rounded-lg"
            >
              <Text size="2" weight="bold" mb="2">
                📊 리졸버의 4가지 매개변수:
              </Text>
              <Flex direction="column" gap="2">
                <Text size="2">
                  • <strong>parent:</strong> 부모 리졸버의 결과 (중첩 시 사용)
                </Text>
                <Text size="2">
                  • <strong>args:</strong> 클라이언트가 전달한 인자
                </Text>
                <Text size="2">
                  • <strong>context:</strong> 모든 리졸버가 공유하는 데이터
                  (인증 정보 등)
                </Text>
                <Text size="2">
                  • <strong>info:</strong> 쿼리 메타데이터 (선택적 사용)
                </Text>
              </Flex>
            </Box>

            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                리졸버 실행 순서:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`// 클라이언트 쿼리
query {
  user(id: "123") {    // 1️⃣ Query.user 리졸버 실행
    username           //    → User 객체 반환
    posts {            // 2️⃣ User.posts 리졸버 실행
      title            //    → Post 배열 반환
      author {         // 3️⃣ Post.author 리졸버 실행
        username       //    → User 객체 반환
      }
    }
  }
}

// 각 필드마다 리졸버가 순차적으로 실행됩니다!`}
              </Code>
            </Box>
          </Card>

          {/* Input Types */}
          <Card mb="4">
            <Heading size="4" mb="3">
              3️⃣ Input Types - 뮤테이션 입력 정의
            </Heading>

            <Text mb="3">
              뮤테이션에서 복잡한 데이터를 전달할 때는{' '}
              <strong>Input 타입</strong>을 사용합니다.
            </Text>

            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`# Input 타입 정의
input CreateUserInput {
  username: String!
  email: String!
  password: String!
  age: Int
}

input UpdateUserInput {
  username: String      # 선택적
  email: String
  age: Int
}

# 뮤테이션에서 사용
type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}

# 클라이언트 사용
mutation {
  createUser(input: {
    username: "john"
    email: "john@example.com"
    password: "secret"
  }) {
    id
    username
  }
}`}
              </Code>
            </Box>
          </Card>

          {/* Subscription */}
          <Card>
            <Heading size="4" mb="3">
              4️⃣ Subscription - 실시간 구독
            </Heading>

            <Text mb="3">
              Subscription은 <strong>WebSocket</strong>을 통해 서버에서
              클라이언트로 실시간 데이터를 푸시합니다.
            </Text>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                서버 측 (Node.js + PubSub):
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

const resolvers = {
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED'])
    }
  },
  
  Mutation: {
    sendMessage: (parent, { chatId, content }, context) => {
      const message = {
        id: generateId(),
        chatId,
        content,
        sender: context.user
      }
      
      // DB에 저장
      db.messages.create(message)
      
      // 구독자들에게 알림
      pubsub.publish('MESSAGE_ADDED', {
        messageAdded: message
      })
      
      return message
    }
  }
}`}
              </Code>
            </Box>

            <Box p="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                클라이언트 측:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`subscription {
  messageAdded(chatId: "room-1") {
    id
    content
    sender {
      username
    }
  }
}

// WebSocket 연결 유지
// 새 메시지가 생성되면 자동으로 받음!`}
              </Code>
            </Box>

            <Callout.Root color="purple" mt="3">
              <Callout.Text>
                💡 <strong>사용 예시:</strong> 실시간 채팅, 알림, 주식 가격,
                스포츠 점수 등
              </Callout.Text>
            </Callout.Root>
          </Card>
        </Box>

        {/* Client 파트 */}
        <Box>
          <Heading
            size="4"
            mb="4"
            className="text-green-600 dark:text-green-400"
          >
            💻 Client 파트 (프론트엔드)
          </Heading>

          {/* Query 작성 */}
          <Card mb="4">
            <Heading size="4" mb="3">
              1️⃣ Query 작성 - 데이터 요청
            </Heading>

            <Text mb="3">
              클라이언트는 GraphQL 쿼리 언어로 필요한 데이터를 요청합니다.
            </Text>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                기본 쿼리:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`# 쿼리 이름 지정 (선택적)
query GetUserProfile {
  user(id: "123") {
    id
    username
    email
  }
}

# 중첩 쿼리
query GetUserWithPosts {
  user(id: "123") {
    username
    posts {
      title
      createdAt
    }
  }
}

# 여러 쿼리 동시 실행
query MultipleQueries {
  user1: user(id: "1") { username }
  user2: user(id: "2") { username }
  allPosts: posts { title }
}`}
              </Code>
            </Box>

            <Callout.Root color="blue">
              <Callout.Text>
                💡 쿼리 이름을 지정하면 디버깅과 로깅이 쉬워집니다!
              </Callout.Text>
            </Callout.Root>
          </Card>

          {/* Variables */}
          <Card mb="4">
            <Heading size="4" mb="3">
              2️⃣ Variables - 동적 값 전달
            </Heading>

            <Text mb="3">
              쿼리를 재사용하기 위해 <strong>변수</strong>를 사용합니다.
            </Text>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                변수 사용:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`# 쿼리 정의 (변수 선언)
query GetUser($userId: ID!, $includePosts: Boolean = false) {
  user(id: $userId) {
    username
    email
    posts @include(if: $includePosts) {
      title
    }
  }
}

# 변수 전달 (JSON)
{
  "userId": "123",
  "includePosts": true
}`}
              </Code>
            </Box>

            <Flex direction="column" gap="2">
              <Text size="2">
                ✅ <strong>타입 안정성:</strong> 변수 타입 지정 필수
              </Text>
              <Text size="2">
                ✅ <strong>재사용:</strong> 같은 쿼리, 다른 변수
              </Text>
              <Text size="2">
                ✅ <strong>보안:</strong> SQL Injection 방지
              </Text>
            </Flex>
          </Card>

          {/* Fragments */}
          <Card mb="4">
            <Heading size="4" mb="3">
              3️⃣ Fragments - 필드 재사용
            </Heading>

            <Text mb="3">
              Fragment는 <strong>재사용 가능한 필드 묶음</strong>입니다.
            </Text>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`# Fragment 정의
fragment UserBasicInfo on User {
  id
  username
  email
  avatar
}

fragment PostPreview on Post {
  id
  title
  excerpt
  createdAt
}

# Fragment 사용
query GetUserAndPosts {
  user(id: "123") {
    ...UserBasicInfo      # Fragment 재사용!
    posts {
      ...PostPreview      # Fragment 재사용!
      author {
        ...UserBasicInfo  # 또 재사용!
      }
    }
  }
}`}
              </Code>
            </Box>

            <Callout.Root color="green">
              <Callout.Text>
                ✨ 같은 필드 묶음을 여러 곳에서 사용할 때 매우 유용합니다!
              </Callout.Text>
            </Callout.Root>
          </Card>

          {/* Directives */}
          <Card>
            <Heading size="4" mb="3">
              4️⃣ Directives - 조건부 실행
            </Heading>

            <Text mb="3">
              Directive는 필드의 실행을 <strong>조건적으로 제어</strong>합니다.
            </Text>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                @include - 조건부 포함:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`query GetUser($withEmail: Boolean!) {
  user(id: "123") {
    username
    email @include(if: $withEmail)  # true일 때만 포함
  }
}

# 변수
{ "withEmail": true }  → email 포함
{ "withEmail": false } → email 제외`}
              </Code>
            </Box>

            <Box p="3" mb="3" className="bg-surface-code-dark rounded-md">
              <Text
                size="2"
                weight="bold"
                mb="2"
                className="text-code text-block"
              >
                @skip - 조건부 제외:
              </Text>
              <Code
                size="2"
                variant="ghost"
                className="text-code whitespace-pre"
              >
                {`query GetUser($skipPosts: Boolean!) {
  user(id: "123") {
    username
    posts @skip(if: $skipPosts) {  # true일 때 제외
      title
    }
  }
}

# 변수
{ "skipPosts": true }  → posts 제외
{ "skipPosts": false } → posts 포함`}
              </Code>
            </Box>

            <Text size="2" color="gray">
              이외에도 <Code variant="ghost">@deprecated</Code>,{' '}
              <Code variant="ghost">@auth</Code> 등 커스텀 디렉티브를 만들 수
              있습니다.
            </Text>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
