import newGuid from '../string/newGuid';

describe('newGuid', () => {
  it("length should be 36 and text should contains 5 '-'", () => {
    // Given & When
    const guid = newGuid();
    const occurences = guid.split('-');

    expect(guid.length).toBe(36);
    expect(occurences.length).toBe(5);
  });
});
