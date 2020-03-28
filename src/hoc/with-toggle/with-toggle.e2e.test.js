import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withToggle from './with-toggle';
import PropTypes from "prop-types";

configure({adapter: new Adapter()});

const MockComponent = (props) => {
  const {
    isOpen,
    onToggleButtonClick,
  } = props;

  return (
    <div>
      <button type="button" onClick={onToggleButtonClick}></button>
      <div className={isOpen ? `content is-open` : `content`}></div>
    </div>
  );
};

MockComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggleButtonClick: PropTypes.func.isRequired,
};

describe(`HOC «withToggle» работает корректно`, () => {
  it(`При вызове коллбэка «onToggleButtonClick» в компоненте, обёрнутом в HOC, происходит его показ/скрытие`, () => {
    const MockComponentWrapped = withToggle(MockComponent);
    const mockComponentWrapped = mount(<MockComponentWrapped/>);

    expect(mockComponentWrapped.find(`.is-open`).length).toBe(0);
    mockComponentWrapped.find(`button`).simulate(`click`);
    expect(mockComponentWrapped.find(`.is-open`).length).toBe(1);
  });
});
