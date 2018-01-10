import { SoccerReviewerAppPage } from './app.po';

describe('soccer-reviewer-app App', function() {
  let page: SoccerReviewerAppPage;

  beforeEach(() => {
    page = new SoccerReviewerAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
