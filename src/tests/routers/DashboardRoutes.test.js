import React from 'react';
import { mount } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

describe('Prueba en <DashboardRoutes />', () => {
  test('Debe de mostrar el componente correctamente', () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        name: 'Juan G.',
        logged: true,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Juan G.');
  });
});
