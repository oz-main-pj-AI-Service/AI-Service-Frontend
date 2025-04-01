import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateMD(dateString: string) {
  const date = new Date(dateString);
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
}

export function formatDateYMD(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
}

export const formatStreamText = (text: string) => {
  // 1. 문장 끝(마침표, 느낌표, 물음표) 다음에 줄바꿈 추가
  let formatted = text.replace(/([.!?])\s+/g, '$1\n');

  // 2. 닫는 괄호 다음에 줄바꿈 추가 (단, 다른 문장 끝 문자가 바로 뒤에 오지 않는 경우)
  formatted = formatted.replace(/\)\s+(?![.!?])/g, ')\n');

  // 3. 세미콜론 다음에 줄바꿈 추가
  formatted = formatted.replace(/;\s+/g, ';\n');

  return formatted;
};
