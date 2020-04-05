import React from 'react';
import renderer from 'react-test-renderer';

import {AuthStatus} from '../../constants';

import Page from './page';

const user = {
  avatarUrl: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
};

const children = <div>Hello, world!</div>;

it(`Компонент «Page» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <Page
          authStatus={AuthStatus.AUTH}
          user={user}
        >
          {children}
        </Page>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
