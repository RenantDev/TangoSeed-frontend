import { TangoSeedPage } from './app.po';

describe('inspinia App', () => {
  let page: TangoSeedPage;

  beforeEach(() => {
    page = new TangoSeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
