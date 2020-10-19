describe('App', () => {
  const pureBreeds = [{
    id: 1,
    live: true,
    hybrid: false,
    name: 'Pure Breed (1)'
  }];

  const hybridBreeds = [{
    id: 2,
    live: true,
    hybrid: true,
    name: 'Hybrid Breed (2)'
  }, {
    id: 3,
    live: true,
    hybrid: true,
    name: 'Hybrid Breed (3)'
  }];

  const notLiveBreeds = [{
    id: 4,
    live: false,
    hybrid: false,
    name: 'Not Live Pure Breed (4)'
  }, {
    id: 5,
    live: false,
    hybrid: true,
    name: 'Not Live Hybrid Breed (5)'
  }, {
    id: 6,
    live: false,
    hybrid: true,
    name: 'Not Live Hybrid Breed (6)'
  }];

  // eslint-disable-next-line no-unused-vars
  const allBreeds = [
    ...pureBreeds,
    ...hybridBreeds,
    ...notLiveBreeds
  ];

  // ADD TESTS:
  // Given the `allBreeds` array above:
  //   1) one pure breed is returned/rendered in a group
  //   2) two hybrid breeds are returned/rendered in a group
  //   3) three non-live breeds are returned/rendered in a group
  //
  // NOTE: You're free to move these test files around or rewrite them however you like,
  // but the underlying grouping logic must be validated somehow.
  //
  // In addition to the above tests, you can also add however many tests
  // you think are necessary for your changes!
  it('passes', () => {
    expect(true).toEqual(false);
  });
});
