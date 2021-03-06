import { AbstractView } from '../src/lib/abstract-classes/abstract-view'

describe('testing AbstractView', () => {
  describe('initialisation', () => {
    it('error thrown with none existing element', () => {
      const errorMsg =
        'The container selector of test_view needs to match exactly one valid html element. ' +
        'The given value of container is #doesNotExist and matches no element.'
      const exception = () => {
        const foo = new AbstractView({ container: '#doesNotExist', name: 'test_view' })
      }
      expect(exception).toThrowError(errorMsg)
    })
    it('error wrong type for container', () => {
      const errorMsg =
        'The container of test_view needs to be a querySelector string or a valid html element. The given value was 9001.'
      const exception = () => {
        const foo = new AbstractView({ container: 9001 as any, name: 'test_view' })
      }
      expect(exception).toThrowError(errorMsg)
    })
  })
})
