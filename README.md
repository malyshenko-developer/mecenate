# Mecenate Test App

Мобильное приложение (React Native + Expo) для тестового задания Mecenate.

## 🔧 Стек

- **React Native** + **Expo** (iOS / Android)
- **TypeScript**
- **MobX** + **React Query** — управление состоянием и серверным кэшем
- **Reanimated 2** — анимация лайков
- **WebSocket** — реальное время (лайки, комментарии)
- **Дизайн-токены** (цвета, типографика, радиусы)

## 📦 Установка и запуск

1. Установите зависимости:
npm install

2. Создайте файл .env в корне проекта со следующим содержимым:
EXPO_PUBLIC_API_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_WS_URL=ws://k8s.mectest.ru

3. Запустите проект:
npm run start

4. Откройте приложение через Expo Go (отсканируйте QR-код) или запустите эмулятор.