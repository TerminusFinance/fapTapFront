import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}))

// Mock Telegram SDK
(globalThis as any).Telegram = {
  WebApp: {
    ready: vi.fn(),
    expand: vi.fn(),
    close: vi.fn(),
    initData: 'mock_init_data',
    initDataUnsafe: {},
    version: '6.0',
    platform: 'desktop',
    colorScheme: 'dark',
    themeParams: {},
    isExpanded: true,
    viewportHeight: 600,
    viewportStableHeight: 600,
    headerColor: '#121215',
    backgroundColor: '#121215',
    onEvent: vi.fn(),
    offEvent: vi.fn(),
    sendData: vi.fn(),
    openLink: vi.fn(),
    openTelegramLink: vi.fn(),
  }
}

// Mock TON Connect
vi.mock('@tonconnect/ui-react', () => ({
  TonConnectUIProvider: ({ children }: { children: React.ReactNode }) => children,
  useTonAddress: () => '',
  useTonConnectUI: () => [null, {}],
}))

// Mock Telegram Apps SDK
vi.mock('@telegram-apps/sdk', () => ({
  retrieveLaunchParams: () => ({ initDataRaw: 'mock_data' }),
  postEvent: vi.fn(),
  initSwipeBehavior: () => [{ disableVerticalSwipe: vi.fn() }],
}))

vi.mock('@telegram-apps/sdk-react', () => ({
  SDKProvider: ({ children }: { children: React.ReactNode }) => children,
  on: vi.fn(() => vi.fn()), // returns a cleanup function
  postEvent: vi.fn(),
}))

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    clear: vi.fn(() => null),
  },
  writable: true,
})