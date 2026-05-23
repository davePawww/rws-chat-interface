import { describe, expect, it } from 'vitest';

import { formatMessageTime } from '@/utils/format-message-time';

function formatExpectedDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

describe('Format Message Time Util', () => {
  it('formats the date into HH:MM AM/PM if the date is today', () => {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 11);
    expect(formatMessageTime(date)).toBe('11:11 AM');
  });

  it('formats the date into MMM DD, HH:MM AM/PM if the date is not today', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(11, 11);

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setHours(11, 11);

    expect(formatMessageTime(yesterday)).toBe(formatExpectedDate(yesterday));
    expect(formatMessageTime(lastMonth)).toBe(formatExpectedDate(lastMonth));
  });
});
