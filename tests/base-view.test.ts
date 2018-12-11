import { BaseView } from '../src/lib/base-classes/base-views'

describe('testing BaseView', () => {
  describe('initialisation', () => {
    it('error thrown with none existing element', () => {
      const errorMsg =
        'The container selector of test_view needs to match exactly one valid html element. ' +
        'The given value of container is #doesNotExist and matches no element.'
      expect(() => {
        new BaseView({ container: '#doesNotExist', name: 'test_view' })
      }).toThrowError(errorMsg)
    })
  })
})
