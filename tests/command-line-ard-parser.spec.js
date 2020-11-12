const commandLineArgsParser = require('../src/command-line-args-parser');

describe('command line args parser', () => {
  it('sets default values', () => {
    // When
    const { app, dir } = commandLineArgsParser.parse();

    // Then
    expect(app).toBe(undefined);
    expect(dir).toBe('.');
  });

  it('parses given values', () => {
    // Given
    process.argv.push('--app', 'my-app');
    process.argv.push('--dir', 'projects');

    // When
    const { app, dir } = commandLineArgsParser.parse();

    // Then
    expect(app).toBe('my-app');
    expect(dir).toBe('projects');
  });
});
