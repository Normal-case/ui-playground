import { Container, Text, Box } from '@radix-ui/themes'
import { FeaturesSidebar } from './_components/FeaturesSidebar'

export default function FeaturesPage() {
  return (
    <Container size="4" className="py-8">
      {/* Grid Layout: 8:2 */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Main Content - 8/10 */}
        <Box className="lg:col-span-8">
          <Text>메인 콘텐츠 영역입니다.</Text>
        </Box>

        {/* Sidebar - 2/10 */}
        <Box className="lg:col-span-2">
          <FeaturesSidebar />
        </Box>
      </div>
    </Container>
  )
}
