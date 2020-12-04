import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {
  const historyMock = {
    lenght: 10,
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <LoginScreen history={historyMock} />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('Debe de mostrar el componente correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe de realizar el dispatch y la navegacion', () => {
    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: 'Juan G.' },
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/');

    localStorage.setItem('lastPath', '/dc');
    handleClick();

    expect(historyMock.replace).toHaveBeenCalledWith('/dc');
  });
});
