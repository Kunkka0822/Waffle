describe('UNIT: Miscellaneous', () => {
  describe('Proper address', () => {
    it('Expect to be proper address', async () => {
      expect('0x28FAA621c3348823D6c6548981a19716bcDc740e').toBeProperAddress();
      expect('0x846C66cf71C43f80403B51fE3906B3599D63336f').toBeProperAddress();
    });

    it('Expect not to be proper address', async () => {
      expect('0x28FAA621c3348823D6c6548981a19716bcDc740').not.toBeProperAddress();
      expect('0x846C66cf71C43f80403B51fE3906B3599D63336g').not.toBeProperAddress();
    });

    it('Expect to throw if invalid address', async () => {
      expect(
        () => expect('0x28FAA621c3348823D6c6548981a19716bcDc740').toBeProperAddress()
      ).toThrowError('Expected "0x28FAA621c3348823D6c6548981a19716bcDc740" to be a proper address');
    });

    it('Expect to throw if negation with proper address)', async () => {
      expect(
        () => expect('0x28FAA621c3348823D6c6548981a19716bcDc740e').not.toBeProperAddress()
      ).toThrowError('Expected "0x28FAA621c3348823D6c6548981a19716bcDc740e" not to be a proper address');
    });
  });

  describe('Proper private', () => {
    it('Expect to be proper private', async () => {
      expect('0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c5').toBeProperPrivateKey();
      expect('0x03c909455dcef4e1e981a21ffb14c1c51214906ce19e8e7541921b758221b5ae').toBeProperPrivateKey();
    });

    it('Expect not to be proper private', async () => {
      expect('0x28FAA621c3348823D6c6548981a19716bcDc740').not.toBeProperPrivateKey();
      expect('0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7cw').not.toBeProperPrivateKey();
    });

    it('Expect to throw if invalid private', async () => {
      expect(
        () => expect('0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c').toBeProperPrivateKey()
      ).toThrowError(
        'Expected "0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c" to be a proper private key'
      );
    });

    it('Expect to throw if negation with proper private)', async () => {
      expect(
        () => expect('0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c5').not.toBeProperPrivateKey()
      ).toThrowError(
        'Expected "0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c5" not to be a proper private key'
      );
    });
  });

  describe('Proper hex', () => {
    it('Expect to be proper hex', async () => {
      expect('0x70').toBeProperHex(2);
      expect('0x03c909455d').toBeProperHex(10);
    });

    it('Expect not to be proper hex', async () => {
      expect('0x284').not.toBeProperHex(2);
      expect('0x2g').not.toBeProperHex(2);
      expect('0x03c909455dd').not.toBeProperHex(10);
      expect('0x03c909455w').not.toBeProperHex(10);
    });

    it('Expect to throw if invalid hex', async () => {
      expect(
        () => expect('0x702').toBeProperHex(2)
      ).toThrowError('Expected "0x702" to be a proper hex of length 2');
    });

    it('Expect to throw if negation with proper hex)', async () => {
      expect(
        () => expect('0x70').not.toBeProperHex(2)
      ).toThrowError('Expected "0x70" not to be a proper hex of length 2, but it was');
    });
  });
});
