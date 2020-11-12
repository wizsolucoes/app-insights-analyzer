const buildBreaker = require('../src/build-breaker');

describe('build breaker', () => {
  let mockConsoleError;
  let mockExit;

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation();
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    mockExit = jest.spyOn(process, 'exit').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate arguments', () => {
    buildBreaker.run();
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should exit process with error code and log error if result is false', () => {
    buildBreaker.run('any', false);
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockConsoleError).toHaveBeenCalled();
  });

  it('should NOT exit process with error code OR log error if result is false', () => {
    buildBreaker.run('any', true);
    expect(mockExit).not.toHaveBeenCalled();
    expect(mockConsoleError).not.toHaveBeenCalled();
  });
});
