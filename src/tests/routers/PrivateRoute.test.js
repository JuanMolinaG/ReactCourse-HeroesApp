import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../routers/PrivateRoute';

describe('Pruebas en <PrivateRoute />', () => {
  const props = {
    location: {
      pathname: '/dc',
    },
  };

  Storage.prototype.setItem = jest.fn();

  test('Debe de mostrar el componente si está autenticado y guardar en el localStorage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Prueba</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('span').exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/dc');
  });

  test('Debe de bloquear el componente si no está autenticado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Prueba</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.html()).toBe('');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/dc');
  });
});
