/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from './EmptyState';

jest.mock('react-native', () => ({
  View: ({ children, ...p }: any) => <div {...p}>{children}</div>,
  Text: ({ children, ...p }: any) => <span {...p}>{children}</span>,
  TouchableOpacity: ({ children, onPress, accessibilityLabel }: any) => (
    <button type="button" onClick={onPress} aria-label={accessibilityLabel}>
      {children}
    </button>
  ),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name }: { name: string }) => <span data-testid="icon" data-icon={name} />,
}));

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      <EmptyState
        icon="alert-circle-outline"
        title="오류 발생"
        description="문제가 발생했습니다."
      />
    );
    expect(screen.getByText('오류 발생')).toBeInTheDocument();
    expect(screen.getByText('문제가 발생했습니다.')).toBeInTheDocument();
  });

  it('does not render action button when actionLabel or onAction is missing', () => {
    render(
      <EmptyState
        icon="search-outline"
        title="검색 결과 없음"
        description="설명"
      />
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders action button and calls onAction when pressed', () => {
    const onAction = jest.fn();
    render(
      <EmptyState
        icon="alert-circle-outline"
        title="오류"
        description="설명"
        actionLabel="다시 시도"
        onAction={onAction}
      />
    );
    const button = screen.getByRole('button', { name: '다시 시도' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
