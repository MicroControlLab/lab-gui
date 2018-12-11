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
    it('error wron type for container', () => {
      const errorMsg =
        'The container of test_view needs to be a querySelector string or a valid html element. The given value was 9001.'
      expect(() => {
        new BaseView({ container: 9001 as any, name: 'test_view' })
      }).toThrowError(errorMsg)
    })
  })
})
