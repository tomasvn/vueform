import { createLocalVue } from '@vue/test-utils'
import { createForm, findAllComponents, change } from './.test-helpers'

describe('Integer Rule', () => {
  it('should allow only integers', (done) => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'integer',
        }
      }
    })

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)

    change(a, '1')
    expect(a.vm.invalid).toBe(false)

    change(a, '0')
    expect(a.vm.invalid).toBe(false)

    change(a, '-1')
    expect(a.vm.invalid).toBe(false)

    change(a, '1.1')
    expect(a.vm.invalid).toBe(true)

    change(a, '-1.1')
    expect(a.vm.invalid).toBe(true)

    change(a, '3-')
    expect(a.vm.invalid).toBe(true)

    change(a, '3aaa')
    expect(a.vm.invalid).toBe(true)

    change(a, 'aaa3')
    expect(a.vm.invalid).toBe(true)

    change(a, '3 ')
    expect(a.vm.invalid).toBe(false)

    change(a, '1000')
    expect(a.vm.invalid).toBe(false)

    change(a, '-1000')
    expect(a.vm.invalid).toBe(false)

    change(a, '9999999999999')
    expect(a.vm.invalid).toBe(false)

    change(a, '-9999999999999')
    expect(a.vm.invalid).toBe(false)

    change(a, 'asdfads')
    expect(a.vm.invalid).toBe(true)

    change(a, '%%!+')
    expect(a.vm.invalid).toBe(true)

    change(a, '0x1D306')
    expect(a.vm.invalid).toBe(true)

    done()
  })
})