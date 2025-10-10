import { useState, type ReactElement } from 'react'
import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Separator,
  Switch,
  Text,
  Theme,
} from '@radix-ui/themes'
import { MixerHorizontalIcon, MoonIcon, RocketIcon, SunIcon } from '@radix-ui/react-icons'

type FeatureIcon = typeof RocketIcon

type FeatureTile = {
  title: string
  description: string
  icon: FeatureIcon
  ctaLabel: string
  ctaHref: string
}

const featureTiles = [
  {
    title: 'Tailwind utilities ready to go',
    description:
      'Compose bespoke layouts with utility classes while Radix handles baseline accessibility and tokens.',
    icon: RocketIcon,
    ctaLabel: 'Tailwind docs',
    ctaHref: 'https://tailwindcss.com/docs/installation',
  },
  {
    title: 'Radix Themes building blocks',
    description:
      'Drop in accessible primitives, then fine-tune with design tokens that map cleanly to Tailwind.',
    icon: MixerHorizontalIcon,
    ctaLabel: 'Radix Themes docs',
    ctaHref: 'https://www.radix-ui.com/themes/docs/overview/getting-started',
  },
] satisfies FeatureTile[]

type ThemeAppearance = 'light' | 'dark'

function App(): ReactElement {
  const [appearance, setAppearance] = useState<ThemeAppearance>('dark')
  const [useGlass, setUseGlass] = useState(true)

  const isDark = appearance === 'dark'

  const pageClasses = [
    'min-h-screen px-4 py-16 transition-colors duration-300',
    isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900',
  ].join(' ')

  const heroClasses = [
    'flex flex-wrap items-start gap-6 rounded-3xl border p-8 shadow-xl transition-all duration-300',
    useGlass ? 'backdrop-blur-xl' : '',
    isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/80',
  ]
    .filter(Boolean)
    .join(' ')

  const cardSurface = [
    'h-full border transition-all duration-300',
    useGlass ? 'backdrop-blur-xl' : '',
    isDark ? 'border-white/10 bg-slate-900/70' : 'border-slate-200 bg-white',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Theme
      appearance={appearance}
      accentColor="violet"
      grayColor="slate"
      radius="large"
      scaling="105%"
    >
      <main className={pageClasses}>
        <Container size="3" className="mx-auto flex max-w-4xl flex-col gap-10">
          <div className={heroClasses}>
            <Flex direction="column" gap="2" className="max-w-lg">
              <Badge size="2" color="violet" radius="full" className="w-fit">
                UI playground kit
              </Badge>
              <Heading size="8" weight="bold">
                Tailwind + Radix, perfectly in sync
              </Heading>
              <Text size="4" color="gray">
                Use Tailwind utilities for layout and fine-grained control while Radix Themes delivers
                accessible, polished components out of the box.
              </Text>
              <Flex gap="3" mt="4" wrap="wrap">
                <Button color="violet" size="3">
                  Create component
                </Button>
                <Button asChild variant="soft" size="3">
                  <a href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">
                    Tailwind documentation
                  </a>
                </Button>
              </Flex>
            </Flex>

            <Flex direction="column" gap="4" className="shrink-0">
              <Button
                variant="soft"
                radius="full"
                className="gap-2"
                onClick={() => setAppearance(isDark ? 'light' : 'dark')}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
                {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              </Button>
              <Flex align="center" justify="between" gap="4" className="rounded-2xl border border-dashed p-4">
                <div>
                  <Text weight="bold">Glassmorphism</Text>
                  <Text size="2" color="gray">
                    Toggle blurred panel styling
                  </Text>
                </div>
                <Switch checked={useGlass} onCheckedChange={setUseGlass} />
              </Flex>
            </Flex>
          </div>

          <Flex direction="column" gap="6">
            <Heading size="4">What you get</Heading>
            <Flex direction={{ initial: 'column', sm: 'row' }} gap="4">
              {featureTiles.map(({ title, description, icon: Icon, ctaLabel, ctaHref }) => (
                <Card key={title} className={cardSurface} size="4">
                  <Flex direction="column" gap="4" className="h-full">
                    <Flex align="center" gap="3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/10 text-violet-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <Heading size="4" weight="medium">
                        {title}
                      </Heading>
                    </Flex>
                    <Text size="3" color="gray">
                      {description}
                    </Text>
                    <Separator size="4" />
                    <div className="mt-auto">
                      <Button asChild variant="soft" color="violet">
                        <a href={ctaHref} target="_blank" rel="noreferrer">
                          {ctaLabel}
                        </a>
                      </Button>
                    </div>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Flex>
        </Container>
      </main>
    </Theme>
  )
}

export default App
