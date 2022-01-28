import { renderWithRouter } from '../../../test/TestHelpers';
import { screen } from '@testing-library/react';
import { NavBar } from '../Navbar';

const renderNavbar = (props: any = {}) => {

  renderWithRouter(<NavBar/>, { route: '/' }, { withUser: props.withUser });

  const getElement = (text: string) => screen.queryByText(text) ?? undefined;

  return { screen, getElement };
};

describe('Navbar', function() {
  describe('render', function() {
    it('should render ok', function() {
      renderNavbar();
    });
  });

  describe('Navbar tabs', function() {
    it('should not render the user sections if user is not logged', function() {
      const { getElement } = renderNavbar();

      const logoutButton = getElement('Logout');
      const favoritesSection = getElement('FAVORITES');

      expect(logoutButton).not.toBeDefined();
      expect(favoritesSection).not.toBeDefined();
    });

    it('should render the user sections if user is logged', async function() {
      const { getElement } = renderNavbar({ withUser: true });

      const logoutButton = getElement('LogOut');
      const favoritesSection = getElement('Favorites');

      expect(logoutButton).toBeDefined();
      expect(favoritesSection).toBeDefined();
    });
  });
});
