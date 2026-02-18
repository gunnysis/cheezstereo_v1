/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

jest.mock('react-native', () => ({
  View: ({ children, ...p }: any) => <div {...p}>{children}</div>,
  Text: ({ children, ...p }: any) => <span {...p}>{children}</span>,
  TextInput: ({ onChangeText, placeholder, value, ...p }: any) => (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChangeText(e.target.value)}
      data-testid="search-input"
      {...p}
    />
  ),
  TouchableOpacity: ({ children, onPress, accessibilityLabel, ...p }: any) => (
    <button type="button" onClick={onPress} aria-label={accessibilityLabel} {...p}>
      {children}
    </button>
  ),
}));

jest.mock('react-native-reanimated', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: {
      View: ({ children, ...p }: any) => React.createElement('div', p, children),
    },
    useAnimatedStyle: () => ({}),
    useSharedValue: () => ({ value: 1 }),
    withSpring: (x: number) => x,
    withTiming: (x: number) => x,
  };
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name }: { name: string }) => <span data-icon={name} />,
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 1, Medium: 2, Heavy: 3 },
}));

describe('SearchBar', () => {
  it('renders input with placeholder and value', () => {
    render(
      <SearchBar
        value=""
        onChangeText={jest.fn()}
        onClear={jest.fn()}
        placeholder="음악 검색..."
      />
    );
    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('placeholder', '음악 검색...');
    expect(input).toHaveValue('');
  });

  it('calls onChangeText when user types', () => {
    const onChangeText = jest.fn();
    render(
      <SearchBar
        value=""
        onChangeText={onChangeText}
        onClear={jest.fn()}
        placeholder="검색"
      />
    );
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'a' } });
    expect(onChangeText).toHaveBeenCalledWith('a');
  });

  it('shows clear button when value is not empty and calls onClear when clicked', () => {
    const onClear = jest.fn();
    render(
      <SearchBar
        value="test"
        onChangeText={jest.fn()}
        onClear={onClear}
        placeholder="검색"
      />
    );
    const clearButton = screen.getByRole('button', { name: '검색어 지우기' });
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('does not show clear button when value is empty', () => {
    render(
      <SearchBar
        value=""
        onChangeText={jest.fn()}
        onClear={jest.fn()}
        placeholder="검색"
      />
    );
    expect(screen.queryByRole('button', { name: '검색어 지우기' })).not.toBeInTheDocument();
  });
});
