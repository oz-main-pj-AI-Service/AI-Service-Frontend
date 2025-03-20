import { Option } from '@/types/ai';

// 메뉴
export const cuisine_type: readonly Option[] = [
  {
    id: 'korean',
    label: '한식',
  },
  {
    id: 'japanese',
    label: '일식',
  },
  {
    id: 'chinese',
    label: '중식',
  },
  {
    id: 'western',
    label: '양식',
  },
  {
    id: 'asian',
    label: '아시안',
  },
] as const;

export const food_base: readonly Option[] = [
  {
    id: 'rice',
    label: '밥',
  },
  {
    id: 'noodle',
    label: '면',
  },
  {
    id: 'bread',
    label: '빵',
  },
] as const;

export const taste: readonly Option[] = [
  {
    id: 'sweet',
    label: '단맛',
  },
  {
    id: 'savory',
    label: '고소한 맛',
  },
  {
    id: 'spicy',
    label: '매운 맛',
  },
  {
    id: 'light',
    label: '상큼한 맛',
  },
] as const;

export const dietary_type: readonly Option[] = [
  {
    id: 'strong_flavored',
    label: '자극적',
  },
  {
    id: 'healthy',
    label: '건강한',
  },
] as const;

// 식단
export const goal: readonly Option[] = [
  {
    id: 'lose',
    label: '다이어트',
  },
  {
    id: 'gain',
    label: '벌크업',
  },
  {
    id: 'maintain',
    label: '유지',
  },
] as const;

export const exercise_frequency: readonly Option[] = [
  {
    id: '1',
    label: '주 1회',
  },
  {
    id: '2,3',
    label: '주 2, 3회',
  },
  {
    id: '4',
    label: '주 4회 이상',
  },
  {
    id: 'none',
    label: '운동 안함',
  },
] as const;
