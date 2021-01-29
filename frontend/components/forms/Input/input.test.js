import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './input';

describe('Input tests', () => {
  const onChange = jest.fn();
  const label = 'Test Label';
  const text = 'Test';
  beforeEach(() => {
    render(<Input labelName={label} onChange={onChange} />);
  });
  test('Input renders properly', () => {
    expect(screen.queryByText(label)).toBeTruthy();
  });
  test('onChange is called properly', () => {
    userEvent.type(screen.getByLabelText(label), text);
    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
