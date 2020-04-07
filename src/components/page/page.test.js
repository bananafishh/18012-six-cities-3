import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {AuthStatus} from '../../constants';

import {Page} from './page';

const user = {
  avatarUrl: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
};

const children = <div>Hello, world!</div>;

const history = {
  location: {
    pathname: `/login`,
  },
};

it(`Компонент «Page» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Page
            authStatus={AuthStatus.AUTH}
            user={user}
            history={history}
          >
            {children}
          </Page>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
