import React from 'react';

import { UfoData } from './ufo-data.component';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockVehiclesData = [
  {
    id: 'XZ-42P',
    planetName: 'Gliese',
    isFriend: true,
    coordinates: {
      lat: 50.38,
      lng: 12.24
    }
  }
];

describe('UfoDataComponent', () => {
  test('should display empty state', () => {
    render(<UfoData vehiclesData={null} onHoveredVehicleChange={jest.fn} />);

    expect(
      within(screen.getByRole('status')).getByText('No signal')
    ).toBeInTheDocument();
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  test('should display data', () => {
    render(
      <UfoData
        vehiclesData={mockVehiclesData}
        onHoveredVehicleChange={jest.fn()}
      />
    );

    screen.debug();
    expect(
      within(screen.getByRole('status')).getByText('Signal good')
    ).toBeInTheDocument();
    expect(screen.getByText(mockVehiclesData[0].id)).toBeInTheDocument();
    expect(
      screen.getByText(mockVehiclesData[0].planetName)
    ).toBeInTheDocument();
    expect(screen.getByText('Friend')).toBeInTheDocument();
    expect(screen.getByText(/50°38'/)).toBeInTheDocument();
    expect(screen.getByText(/12°24'/)).toBeInTheDocument();
  });

  test('should emit currently hovered vehicle id', async () => {
    const mockOnHover = jest.fn();

    render(
      <UfoData
        vehiclesData={mockVehiclesData}
        onHoveredVehicleChange={mockOnHover}
      />
    );

    expect(mockOnHover).not.toBeCalled();

    userEvent.hover(screen.getByTestId('vehicle-section'));

    expect(mockOnHover).toBeCalledWith(mockVehiclesData[0].id);

    userEvent.unhover(screen.getByTestId('vehicle-section'));

    expect(mockOnHover).toHaveBeenCalledTimes(2);
    expect(mockOnHover).toBeCalledWith(null);
  });
});
