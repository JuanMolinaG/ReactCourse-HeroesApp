import React from 'react';
import { mount } from 'enzyme';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <SearchScreen />', () => {
  test('Debe de mostrar el componente correctamente', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path='/search' component={SearchScreen}></Route>
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
  });

  test('Debe de mostrar a Batman y el input debe tener el valor del query', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path='/search' component={SearchScreen}></Route>
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input').prop('value')).toBe('batman');
  });

  test('Debe de mostrar un mensaje de error si no se encuentra el hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batsy']}>
        <Route path='/search' component={SearchScreen}></Route>
      </MemoryRouter>
    );

    expect(wrapper.find('.alert-danger').text().trim()).toBe(
      'There is no a hero called batsy'
    );
  });

  test('Debe de llamar el push del history', () => {
    const historyMock = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route
          path='/search'
          component={() => <SearchScreen history={historyMock} />}
        ></Route>
      </MemoryRouter>
    );

    wrapper
      .find('input')
      .simulate('change', { target: { name: 'search', value: 'Batman' } });

    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

    expect(historyMock.push).toHaveBeenCalledWith('?q=Batman');
  });
});
