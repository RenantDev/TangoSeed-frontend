import { TangoSeedPage } from './app.po';

describe('tangoseed App', () => {
  let page: TangoSeedPage;

  beforeEach(() => {
    page = new TangoSeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect<any>(page.getParagraphText()).toEqual('app works!');
  });
});
