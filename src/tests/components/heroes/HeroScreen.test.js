import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {
  const historyMock = {
    lenght: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test('Debe de mostrar el componente Redirect si no hay argumentos en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );

    expect(wrapper.find('Redirect').exists()).toBe(true);
  });

  test('Debe de mostrar un hero si el parámetro existe y se encuentra el hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/dc-batman']}>
        <Route path='/hero/:heroId' component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('Debe de regresar a la pantalla principal del hero con push', () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/dc-batman']}>
        <Route
          path='/hero/:heroId'
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();

    expect(historyMock.push).toHaveBeenCalledWith('/dc');
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });

  test('Debe de regresar a la pantalla anterior con goBack', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/dc-batman']}>
        <Route
          path='/hero/:heroId'
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();

    expect(historyMock.goBack).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalledTimes(0);
  });

  test('Debe de llamar el redirect si el hero no existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/dc-batsy']}>
        <Route
          path='/hero/:heroId'
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe('');
  });
});
