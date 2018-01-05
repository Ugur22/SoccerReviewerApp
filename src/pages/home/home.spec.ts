import {HomePage} from './home';

let players =  null;

describe('fetch data players', () => {
 
beforeEach(() => {
    players = new HomePage(null,null);
});

it('should return a non empty array', () => {
    let result = players.getPlayers();
    expect(Array.isArray(result)).toBeTruthy;
    expect(result.length).toBeGreaterThan(0);
    });
});