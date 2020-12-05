import { createLocalVue, mount } from '@vue/test-utils'
import { createForm, findAllComponents, installLaraform } from 'test-helpers'
import { Laraform } from './../../src/index'
import { mergeComponentClasses } from './../../src/utils/mergeClasses'
import defaultTheme from './../../src/themes/default'
import bootstrapTheme from './../../src/themes/bootstrap'
import flushPromises from 'flush-promises'

const Vue = createLocalVue()

jest.mock("axios", () => ({
  get: () => Promise.resolve({ data: 'value' }),
  post: () => Promise.resolve({ data: 'value' }),
  success: () => Promise.resolve({ data: 'value' }),
  error: () => Promise.reject({ data: 'value' }),
  update: () => Promise.resolve({ data: { payload: { updates: { a: 'aaa' } } } })
}))

describe('Laraform Rendering', () => {
  it('should render element from schema', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text'
        }
      }
    })

    expect(form.findComponent({ name: 'TextElement' }).exists()).toBe(true)
  })
})

describe('Laraform Props & Data', () => {
  it('should set class from `class` data', () => {
    let form = createForm({
      class: 'a'
    })
    
    expect(form.classes()).toContain('a')
  })

  it('should set class from `class` form prop', () => {
    let form = createForm({}, {
      propsData: {
      form: {
          class: 'a'
        }
      }
    })

    expect(form.classes()).toContain('a')
  })

  it('should set class from `class` data even if form prop is present', () => {
    let form = createForm({
      class: 'a'
    }, {
      propsData: {
      form: {
          class: 'b'
        }
      }
    })

    expect(form.classes()).toContain('a')
    expect(form.classes()).not.toContain('b')
  })

  it('should retrieve element VMs in elements$ once the form is rendered', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          label: 'A'
        }
      }
    })

    await Vue.nextTick()

    expect(form.vm.elements$.a.label).toBe('A')
  })
  
  it('should select theme what is defined in config', () => {
    let form = createForm({}, {
      config: {
        themes: {
          default: defaultTheme,
        },
        theme: 'default'
      }
    })

    let LaraformClasses = defaultTheme.components.Laraform.data().defaultClasses

    expect(form.classes()).toStrictEqual([LaraformClasses.form])
  })

  it('should select theme what is defined in form prop', () => {
    let form = createForm({}, {
      config: {
        themes: {
          bootstrap: bootstrapTheme,
          default: defaultTheme,
        },
        theme: 'default'
      },
      propsData: {
      form: {
          theme: 'bootstrap'
        }
      }
    })

    let LaraformClasses = bootstrapTheme.components.Laraform.data().defaultClasses

    expect(form.classes()).toStrictEqual([LaraformClasses.form])
  })

  it('should select theme what is defined in form data', () => {
    let form = createForm({
      theme: 'bootstrap'
    }, {
      config: {
        themes: {
          bootstrap: bootstrapTheme,
          default: defaultTheme,
        },
        theme: 'default'
      }
    }, {
      propsData: {
      form: {
          theme: 'default'
        }
      }
    })

    let LaraformClasses = bootstrapTheme.components.Laraform.data().defaultClasses

    expect(form.classes()).toStrictEqual([LaraformClasses.form])
  })

  it('should use defaults classes if otherwise set', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text',
          label: 'Name'
        }
      }
    })

    // Custom logic
    let Laraform = form

    // Custom logic
    let BaseElementLayout = form.findComponent({ name: 'BaseElementLayout' })

    // Uses ElementComponent mixin
    let ElementLabel = form.findComponent({ name: 'ElementLabel' })

    // Uses ThemeComponent mixin
    let FormElements = form.findComponent({ name: 'FormElements' })

    expect(Laraform.vm.extendedClasses).toStrictEqual(Laraform.vm.defaultClasses)
    expect(BaseElementLayout.classes()).toContain(BaseElementLayout.vm.defaultClasses.container)
    expect(ElementLabel.vm.classes).toStrictEqual(ElementLabel.vm.defaultClasses)
    expect(FormElements.vm.classes).toStrictEqual(FormElements.vm.defaultClasses)
  })

  it('should overwrite classes if `classes` defined on form level', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text',
          label: 'Name'
        }
      },
      classes: {
        Laraform: {
        form: 'class-a'
        },
        BaseElementLayout: {
          container: 'class-b'
        },
        FormElements: {
          container: 'class-c'
        },
        ElementLabel: {
          label: 'class-d'
        },
      }
    })

    // Custom logic
    let Laraform = form

    // Custom logic
    let BaseElementLayout = form.findComponent({ name: 'BaseElementLayout' })

    // Uses ElementComponent mixin
    let ElementLabel = form.findComponent({ name: 'ElementLabel' })

    // Uses ThemeComponent mixin
    let FormElements = form.findComponent({ name: 'FormElements' })

    expect(Laraform.vm.extendedClasses.form).toContain('class-a')
    expect(Laraform.vm.extendedClasses.form).not.toContain(Laraform.vm.defaultClasses.form)
    expect(BaseElementLayout.vm.classes.container).toContain('class-b')
    expect(BaseElementLayout.vm.classes.container).not.toContain(BaseElementLayout.vm.defaultClasses.container)
    expect(FormElements.vm.classes.container).toContain('class-c')
    expect(FormElements.vm.classes.container).not.toContain(FormElements.vm.defaultClasses.container)
    expect(ElementLabel.vm.classes.label).toContain('class-d')
    expect(ElementLabel.vm.classes.label).not.toContain(ElementLabel.vm.defaultClasses.label)
  })

  it('should add classes if `addClasses` defined on form level', () => {
    let addClasses = {
      container: 'class-a',
    }

    let form = createForm({
      schema: {
        name: {
          type: 'text'
        }
      },
      addClasses: {
        BaseElementLayout: addClasses
      }
    })

    let BaseElementLayout = form.findComponent({ name: 'BaseElementLayout' })
    
    expect(BaseElementLayout.classes()).toContain('class-a')
    expect(BaseElementLayout.classes()).toContain(BaseElementLayout.vm.defaultClasses.container)
  })

  it('should overwrite and add classes if `classes` and `addClasses` defined on form level', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text'
        }
      },
      classes: {
        BaseElementLayout: {
          container: 'class-a'
        }
      },
      addClasses: {
        BaseElementLayout: {
          container: 'class-b',
        }
      }
    })

    let BaseElementLayout = form.findComponent({ name: 'BaseElementLayout' })
    
    expect(BaseElementLayout.classes()).toContain('class-a')
    expect(BaseElementLayout.classes()).toContain('class-b')
    expect(BaseElementLayout.classes()).not.toContain(BaseElementLayout.vm.defaultClasses.container)
  })

  it('should set default values from config', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text'
        }
      }
    }, {
      config: {
        theme: 'default',
        columns: 11,
        validateOn: 'other',
        labels: 2,
      formErrors: 2,
        method: 'patch',
        locale: 'ru',
        languages: {
          ru: {
            label: 'Russian',
            code: 'ru'
          }
        },
        language: 'ru',
        endpoints: {
          process: 'bbb'
        }
      }
    })

    expect(form.vm.theme).toBe('default')
    expect(form.vm.columns).toBe(11)
    expect(form.vm.validateOn).toBe('other')
    expect(form.vm.labels).toBe(2)
    expect(form.vm.formErrors).toBe(2)
    expect(form.vm.method).toBe('patch')
    expect(form.vm.locale).toBe('ru')
    expect(form.vm.languages).toStrictEqual({ru: {label: 'Russian',code: 'ru'}})
    expect(form.vm.language).toBe('ru')
    expect(form.vm.endpoint).toBe('bbb')
  })

  it('should overwrite default values with form data values', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text'
        }
      },
      theme: 'default',
      columns: 10,
      validateOn: 'submit',
      labels: 3,
    formErrors: 3,
      method: 'put',
      locale: 'de',
      languages: {
        de: {
          label: 'German',
          code: 'de'
        }
      },
      language: 'de',
      endpoint: 'ccc'
    }, {
      config: {
        theme: 'bootstrap',
        columns: 11,
        validateOn: 'other',
        labels: 2,
      formErrors: 2,
        method: 'patch',
        locale: 'ru',
        languages: {
          ru: {
            label: 'Russian',
            code: 'ru'
          }
        },
        language: 'ru',
        endpoint: {
          process: 'bbb'
        }
      }
    })

    expect(form.vm.theme).toBe('default')
    expect(form.vm.columns).toBe(10)
    expect(form.vm.validateOn).toBe('submit')
    expect(form.vm.labels).toBe(3)
    expect(form.vm.formErrors).toBe(3)
    expect(form.vm.method).toBe('put')
    expect(form.vm.locale).toBe('de')
    expect(form.vm.languages).toStrictEqual({de: {label: 'German',code: 'de'}})
    expect(form.vm.language).toBe('de')
    expect(form.vm.endpoint).toBe('ccc')
  })

  it('should set `form` prop values as data', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text'
        },
      },
    }, {
      propsData: {
      form: {
          key: 'aaa',
          class: 'form-class',
          multilingual: 2,
          endpoint: 'bbb',
          wizardControls: 2,
          theme: 'default',
          columns: 11,
          validateOn: 'other',
          labels: 2,
        formErrors: 2,
          method: 'patch',
          locale: 'ru',
          languages: {
            ru: {
              label: 'Russian',
              code: 'ru'
            }
          },
          language: 'ru'
        }
      }
    })

    expect(form.vm.key).toBe('aaa')
    expect(form.vm.class).toBe('form-class')
    expect(form.vm.multilingual).toBe(2)
    expect(form.vm.endpoint).toBe('bbb')
    expect(form.vm.wizardControls).toBe(2)
    expect(form.vm.theme).toBe('default')
    expect(form.vm.columns).toBe(11)
    expect(form.vm.validateOn).toBe('other')
    expect(form.vm.labels).toBe(2)
    expect(form.vm.formErrors).toBe(2)
    expect(form.vm.method).toBe('patch')
    expect(form.vm.locale).toBe('ru')
    expect(form.vm.languages).toStrictEqual({ru: {label: 'Russian',code: 'ru'}})
    expect(form.vm.language).toBe('ru')
    expect(form.vm.endpoint).toBe('bbb')
  })

  it('should keep form data values even if `form` prop is set', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text'
        }
      },
      key: 'bbb',
      class: 'form-class-2',
      multilingual: 3,
      endpoint: 'ccc',
      wizardControls: 3,
      theme: 'default',
      columns: 10,
      validateOn: 'submit',
      labels: 3,
    formErrors: 3,
      method: 'put',
      locale: 'de',
      languages: {
        de: {
          label: 'German',
          code: 'de'
        }
      },
      language: 'de',
    }, {
      propsData: {
      form: {
          key: 'aaa',
          class: 'form-class',
          multilingual: 2,
          endpoint: 'bbb',
          wizardControls: 2,
          theme: 'bootstrap',
          columns: 11,
          validateOn: 'other',
          labels: 2,
        formErrors: 2,
          method: 'patch',
          locale: 'ru',
          languages: {
            ru: {
              label: 'Russian',
              code: 'ru'
            }
          },
          language: 'ru'
        }
      }
    })

    expect(form.vm.key).toBe('bbb')
    expect(form.vm.class).toBe('form-class-2')
    expect(form.vm.multilingual).toBe(3)
    expect(form.vm.endpoint).toBe('ccc')
    expect(form.vm.wizardControls).toBe(3)
    expect(form.vm.theme).toBe('default')
    expect(form.vm.columns).toBe(10)
    expect(form.vm.validateOn).toBe('submit')
    expect(form.vm.labels).toBe(3)
    expect(form.vm.formErrors).toBe(3)
    expect(form.vm.method).toBe('put')
    expect(form.vm.locale).toBe('de')
    expect(form.vm.languages).toStrictEqual({de: {label: 'German',code: 'de'}})
    expect(form.vm.language).toBe('de')
  })

  it('should merge `form` prop properties with data', () => {
    let form = createForm({
      schema: {
        a: {
          label: 'a',
          a: {
            b: 2
          }
        },
        d: {
          type: 'text'
        }
      },
      wizard: {
        first: {
          label: 'First',
        },
        second: {
          label: 'Second',
          elements: ['c']
        }
      },
      tabs: {
        first: {
          label: 'First',
        },
        second: {
          label: 'Second',
          elements: ['c']
        }
      },
      messages: {
        min: {
          array: 'ccc',
          number: 'ddd',
        },
        max: {
          string: 'eee'
        }
      }
    }, {
      propsData: {
      form: {
          schema: {
            a: {
              type: 'text',
              a: {
                b: 1
              }
            },
            b: {
              type: 'text'
            },
            c: {
              type: 'text'
            },
          },
          wizard: {
            first: {
              elements: ['a']
            }
          },
          tabs: {
            first: {
              elements: ['a']
            }
          },
          messages: {
            min: {
              array: 'aaa',
              string: 'bbb',
            }
          }
        }
      }
    })

    expect(form.vm.schema).toStrictEqual({
      a: {
        type: 'text',
        label: 'a',
        a: {
          b: 2
        }
      },
      b: {
        type: 'text'
      },
      c: {
        type: 'text'
      },
      d: {
        type: 'text'
      },
    })

    expect(form.vm.wizard).toStrictEqual({
      first: {
        label: 'First',
        elements: ['a'],
      },
      second: {
        label: 'Second',
        elements: ['c']
      }
    })

    expect(form.vm.tabs).toStrictEqual({
      first: {
        label: 'First',
        elements: ['a'],
      },
      second: {
        label: 'Second',
        elements: ['c']
      }
    })

    expect(form.vm.messages).toStrictEqual({
      min: {
        array: 'ccc',
        string: 'bbb',
        number: 'ddd',
      },
      max: {
        string: 'eee'
      }
    })
  })
})

describe('Laraform Computed', () => {
  it('should return `data`', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text'
        },
        email: {
          type: 'text'
        },
      }
    })

    form.vm.update({
      name: 'a',
      email: 'b'
    })

    expect(form.vm.data).toStrictEqual({
      name: 'a',
      email: 'b'
    })
  })

  it('should return `filtered`', () => {
    let form = createForm({
      schema: {
        name: {
          type: 'text'
        },
        email: {
          type: 'text',
          submit: false
        },
      }
    })

    form.vm.update({
      name: 'a',
      email: 'b'
    })

    expect(form.vm.filtered).toStrictEqual({
      name: 'a'
    })
  })

  it('should return `formData`', () => {
    let form = createForm({
      key: 'c',
      schema: {
        name: {
          type: 'text'
        },
        email: {
          type: 'text',
          submit: false
        },
      }
    })

    form.vm.update({
      name: 'a',
      email: 'b'
    })

    expect(form.vm.formData instanceof FormData).toBe(true)
  })

  it('should be `dirty` if any element is dirty', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text'
        },
        b: {
          type: 'text',
        },
      }
    })

    expect(form.vm.dirty).toBe(false)

    await Vue.nextTick()

    findAllComponents(form, { name: 'TextElement' }).at(0).get('input').setValue('aaa')
      
    await Vue.nextTick()

    expect(form.vm.dirty).toBe(true)
  })

  it('should be `invalid` if any element is invalid', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'required'
        },
        b: {
          type: 'text',
        },
      }
    })

    expect(form.vm.invalid).toBe(false)

    await Vue.nextTick()

    findAllComponents(form, { name: 'TextElement' }).at(0).vm.validate()
      
    await Vue.nextTick()

    expect(form.vm.invalid).toBe(true)
  })

  it('should be `debouncing` & `busy` if any element is debouncing', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'required:debounce=3000'
        },
        b: {
          type: 'text',
        },
      }
    })

    expect(form.vm.debouncing).toBe(false)
    expect(form.vm.busy).toBe(false)

    await Vue.nextTick()

    findAllComponents(form, { name: 'TextElement' }).at(0).vm.validate()
      
    await Vue.nextTick()

    expect(form.vm.debouncing).toBe(true)
    expect(form.vm.busy).toBe(true)
  })

  it('should be `pending`, `busy` & `disabled` if any element is pending', () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'unique'
        },
        b: {
          type: 'text'
        },
      }
    })

    expect(form.vm.pending).toBe(false)
    expect(form.vm.busy).toBe(false)
    expect(form.vm.disabled).toBe(false)

    form.vm.validate()

    expect(form.vm.pending).toBe(true)
    expect(form.vm.busy).toBe(true)
    expect(form.vm.disabled).toBe(true)
  })

  it('should be `validated` only if all elements are validated', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'required'
        },
        b: {
          type: 'text'
        },
      }
    })

    expect(form.vm.validated).toBe(false)

    await Vue.nextTick()

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)

    a.get('input').setValue('aaa')
    a.vm.validate()

    await flushPromises()
      
    await Vue.nextTick()

    expect(form.vm.validated).toBe(true)
  })

  it('should be `pending`, `busy` & `disabled` if any element is pending', () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'unique'
        },
        b: {
          type: 'text'
        },
      }
    })

    expect(form.vm.pending).toBe(false)
    expect(form.vm.busy).toBe(false)
    expect(form.vm.disabled).toBe(false)

    form.vm.validate()

    expect(form.vm.pending).toBe(true)
    expect(form.vm.busy).toBe(true)
    expect(form.vm.disabled).toBe(true)
  })

  it('should collect element errors in `errors`', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'required'
        },
        b: {
          type: 'text'
        },
      }
    })

    expect(form.vm.errors.length).toBe(0)

    await Vue.nextTick()

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)

    a.vm.validate()
      
    await Vue.nextTick()

    expect(form.vm.errors.length).toBe(1)
  })

  it('should be `disabled` when submitting', () => {
    let form = createForm({
      method: 'success',
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text'
        },
      }
    })

    expect(form.vm.disabled).toBe(false)

    form.vm.submitting = true

    expect(form.vm.disabled).toBe(true)
  })

  it('should be `disabled` if invalid & validateOn change is included', async () => {
    let form = createForm({
      validateOn: 'change|submit',
      schema: {
        a: {
          type: 'text',
          rules: 'required',
        },
        b: {
          type: 'text'
        },
      }
    })

    expect(form.vm.disabled).toBe(false)

    await Vue.nextTick()

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)

    a.vm.validate()
      
    expect(form.vm.disabled).toBe(true)
  })

  it('should be not `disabled` if invalid & validateOn change is excluded', async () => {
    let form = createForm({
      validateOn: 'submit',
      schema: {
        a: {
          type: 'text',
          rules: 'required',
        },
        b: {
          type: 'text'
        },
      }
    })

    expect(form.vm.disabled).toBe(false)

    await Vue.nextTick()

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)

    a.vm.validate()
      
    expect(form.vm.disabled).toBe(false)
  })

  it('should have `selectedLocale` equal to vue-i18n\'s locale if installed', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text'
        },
      }
    }, {
      vueI18n: true,
      vueI18nLocale: 'rr',
    })

    await Vue.nextTick()

    expect(form.vm.selectedLocale).toBe('rr')
  })

  it('should have `selectedLocale` equal to `locale` if defined', async () => {
    let form = createForm({
      locale: 'c',
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text'
        },
      }
    }, {
      config: {
        locale: 'a'
      },
      propsData: {
      form: {
          locale: 'b'
        }
      }
    })

    await Vue.nextTick()

    expect(form.vm.selectedLocale).toBe('c')
  })

  it('should have `selectedLocale` equal to form prop\'s `locale` if defined', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text'
        },
      }
    }, {
      config: {
        locale: 'a'
      },
      propsData: {
      form: {
          locale: 'b'
        }
      }
    })

    await Vue.nextTick()

    expect(form.vm.selectedLocale).toBe('b')
  })

  it('should have `selectedLocale` equal to config `locale` if nothing else defined', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text'
        },
      }
    }, {
      config: {
        locale: 'a'
      },
    })

    await Vue.nextTick()

    expect(form.vm.selectedLocale).toBe('a')
  })
})

describe('Laraform Methods', () => {
  it('should prevent submit if disabled', () => {
    const { LocalVue, config } = installLaraform()

    let proceedMock = jest.fn(() => {})

    let formComponent = LocalVue.extend({
      mixins: [Laraform],
      data() {
        return {
          schema: {
            name: {
              type: 'text'
            }
          }
        }
      },
      computed: {
        disabled() {
          return true
        }
      },
      methods: {
        proceed: proceedMock
      }
    })

    let form = mount(formComponent, {
      LocalVue,
      mocks: {
        $laraform: {
          config: config,
          services: {
            messageBag: jest.fn()
          }
        }
      }
    })
    
    form.vm.submit()

    expect(proceedMock.mock.calls.length).toBe(0)
  })

  it('should validate elements on submit if validateOn submit is included', async () => {
    let form = createForm({
      validateOn: 'submit',
      schema: {
        a: {
          type: 'text',
          rules: 'required'
        }
      }
    })

    let a = form.findComponent({ name: 'TextElement' })

    expect(a.vm.validated).toBe(false)

    form.vm.submit()

    await flushPromises()

    expect(a.vm.validated).toBe(true)
  })

  it('should not validate elements on submit if validateOn submit is excluded', () => {
    let form = createForm({
      validateOn: 'change',
      schema: {
        a: {
          type: 'text',
          rules: 'required'
        }
      }
    })

    let a = form.findComponent({ name: 'TextElement' })

    expect(a.vm.validated).toBe(false)

    form.vm.submit()

    expect(a.vm.validated).toBe(false)
  })

  it('should call send on submit', async () => {
    const { LocalVue, config } = installLaraform()

    let sendMock = jest.fn(() => {})

    let formComponent = LocalVue.extend({
      mixins: [Laraform],
      data() {
        return {
          schema: {
            name: {
              type: 'text'
            }
          }
        }
      },
      methods: {
        send: sendMock
      }
    })

    let form = mount(formComponent, {
      LocalVue,
      mocks: {
        $laraform: {
          config: config,
          services: {
            messageBag: jest.fn()
          }
        }
      }
    })
    
    form.vm.submit()

    await flushPromises()

    expect(sendMock.mock.calls.length).toBe(1)
  })

  it('should `load` data to elements', () => {
    let form = createForm({
      validateOn: 'change',
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text',
          default: 1
        },
      }
    })

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)
    let b = findAllComponents(form, { name: 'TextElement' }).at(1)

    expect(a.vm.value).toBe(a.vm.null)
    expect(b.vm.value).toBe(1)

    form.vm.load({
      a: 'aaa'
    })

    expect(a.vm.value).toBe('aaa')
    expect(b.vm.value).toBe(b.vm.null)
  })

  it('should `update` element data', () => {
    let form = createForm({
      validateOn: 'change',
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text',
          default: 1
        },
      }
    })

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)
    let b = findAllComponents(form, { name: 'TextElement' }).at(1)

    expect(a.vm.value).toBe(a.vm.null)
    expect(b.vm.value).toBe(1)

    form.vm.update({
      a: 'aaa'
    })

    expect(a.vm.value).toBe('aaa')
    expect(b.vm.value).toBe(1)
  })

  it('should `reset` elements', () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text',
          default: 1
        },
      }
    })

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)
    let b = findAllComponents(form, { name: 'TextElement' }).at(1)

    expect(a.vm.value).toBe(a.vm.null)
    expect(b.vm.value).toBe(1)

    form.vm.update({
      a: 'aaa',
      b: 'bbb'
    })

    expect(a.vm.value).toBe('aaa')
    expect(b.vm.value).toBe('bbb')

    form.vm.reset()

    expect(a.vm.value).toBe(a.vm.default)
    expect(b.vm.value).toBe(b.vm.default)
  })

  it('should `clear` elements', () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
        b: {
          type: 'text',
          default: 1
        },
      }
    })

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)
    let b = findAllComponents(form, { name: 'TextElement' }).at(1)

    expect(a.vm.value).toBe(a.vm.null)
    expect(b.vm.value).toBe(1)

    form.vm.update({
      a: 'aaa',
      b: 'bbb'
    })

    expect(a.vm.value).toBe('aaa')
    expect(b.vm.value).toBe('bbb')

    form.vm.clear()

    expect(a.vm.value).toBe(a.vm.null)
    expect(b.vm.value).toBe(b.vm.null)
  })

  it('should `createFormData`', () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          default: 1
        },
        b: {
          type: 'text',
          default: 2
        },
      }
    })

    expect(form.vm.createFormData(form.vm.data) instanceof FormData).toBe(true)
  })

  it('should `disableValidation`', () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
      }
    })

    expect(form.vm.validation).toBe(true)

    form.vm.disableValidation()

    expect(form.vm.validation).toBe(false)
  })

  it('should `enableValidation`', () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
      }
    })

    expect(form.vm.validation).toBe(true)

    form.vm.disableValidation()

    expect(form.vm.validation).toBe(false)

    form.vm.enableValidation()

    expect(form.vm.validation).toBe(true)
  })

  it('should not validate elements when validation is disabled', () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'required'
        },
      }
    })

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)

    expect(a.vm.validated).toBe(false)

    form.vm.disableValidation()

    a.vm.validate()

    expect(a.vm.validated).toBe(false)
  })

  it('should return element with `el$`', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
      }
    })

    await Vue.nextTick()

    expect(form.vm.el$('a').name).toBe('a')
  })

  it('should return element in object with `el$`', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'object',
          schema: {
            b: {
              type: 'text'
            }
          }
        },
      }
    })

    await Vue.nextTick()

    expect(form.vm.el$('a.b').name).toBe('b')
  })

  it('should return element in group with `el$`', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'group',
          schema: {
            b: {
              type: 'text'
            }
          }
        },
      }
    })

    await Vue.nextTick()

    expect(form.vm.el$('a.b').name).toBe('b')
  })

  it('should return element in element list with `el$`', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'list',
          initial: 1,
          element: {
            type: 'text',
            label: 'b'
          }
        },
      }
    })

    await Vue.nextTick()

    expect(form.vm.el$('a.0').label).toBe('b')
  })

  it('should return element in object list with `el$`', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'list',
          initial: 1,
          object: {
            schema: {
              b: {
                type: 'text',
              }
            } 
          }
        },
      }
    })

    await Vue.nextTick()

    expect(form.vm.el$('a.0.b').name).toBe('b')
  })

  it('should return null for `el$` if element can\'t be found', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
        },
      }
    })

    await Vue.nextTick()

    expect(form.vm.el$('b')).toBe(null)
    expect(form.vm.el$('a.b')).toBe(null)
  })

  it('should return return `siblings$` of element', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'text'
        },
        b: {
          type: 'text'
        },
        c: {
          type: 'text'
        },
      }
    })

    await Vue.nextTick()

    expect(_.keys(form.vm.siblings$('b'))).toStrictEqual(['a', 'b', 'c'])
  })

  it('should return return `siblings$` of element in object', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'object',
          schema: {
            b: {
              type: 'text'
            },
            c: {
              type: 'text'
            },
            d: {
              type: 'text'
            },
          }
        },
      }
    })

    await Vue.nextTick()

    expect(_.keys(form.vm.siblings$('a.c'))).toStrictEqual(['b', 'c', 'd'])
  })

  it('should return return `siblings$` of element in group', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'group',
          schema: {
            b: {
              type: 'text'
            },
            c: {
              type: 'text'
            },
            d: {
              type: 'text'
            },
          }
        },
      }
    })

    await Vue.nextTick()

    expect(_.keys(form.vm.siblings$('a.c'))).toStrictEqual(['b', 'c', 'd'])
  })

  it('should return return `siblings$` of element in element list', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'list',
          initial: 3,
          element: {
            type: 'text',
          }
        },
      }
    })

    await Vue.nextTick()

    expect(_.keys(form.vm.siblings$('a.1'))).toStrictEqual(['0','1','2'])
  })

  it('should return return `siblings$` of element in object list', async () => {
    let form = createForm({
      schema: {
        a: {
          type: 'list',
          initial: 3,
          object: {
            schema: {
              b: {
                type: 'text',
              },
              c: {
                type: 'text',
              },
              d: {
                type: 'text',
              },
            } 
          }
        },
      }
    })

    await Vue.nextTick()

    expect(_.keys(form.vm.siblings$('a.1'))).toStrictEqual(['0','1','2'])
    expect(_.keys(form.vm.siblings$('a.1.c'))).toStrictEqual(['b', 'c', 'd'])
  })

  it('should update data if payload contains updates', async () => {    
    let form = createForm({
      method: 'update', // fake axios method for testing
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    form.vm.submit()

    await flushPromises()

    await Vue.nextTick()

    await Vue.nextTick()

    expect(form.findComponent({ name: 'TextElement' }).vm.value).toBe('aaa')
  })x
})

describe('Laraform Vuex', () => {
  it('should update Vuex store data when form data changes', async () => {
    let form = createForm({
      storePath: 'form',
      schema: {
        a: {
          type: 'text',
          default: 1
        },
        b: {
          type: 'object',
          schema: {
            c: {
              type: 'text',
              default: 2,
            },
            d: {
              type: 'text',
              default: 3,
            }
          }
        },
      },
      storePath: 'form'
    }, {
      vuex: {
      form: {}
      }
    })

    await Vue.nextTick()

    expect(form.vm.$store.state.form.a).toBe(1)
    expect(form.vm.$store.state.form.b.c).toBe(2)
    expect(form.vm.$store.state.form.b.d).toBe(3)

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)
    expect(a.vm.name).toBe('a')

    let c = findAllComponents(form, { name: 'TextElement' }).at(1)
    expect(c.vm.name).toBe('c')

    let d = findAllComponents(form, { name: 'TextElement' }).at(2)
    expect(d.vm.name).toBe('d')

    a.get('input').setValue('aaa')
    c.get('input').setValue('ccc')
    d.get('input').setValue('ddd')

    await Vue.nextTick()

    expect(form.vm.$store.state.form.a).toBe('aaa')
    expect(form.vm.$store.state.form.b.c).toBe('ccc')
    expect(form.vm.$store.state.form.b.d).toBe('ddd')
  })

  it('should update Vuex store data natively when form data changes & store is not registered to Laraform', async () => {
    let form = createForm({
      storePath: 'form',
      schema: {
        a: {
          type: 'text',
          default: 1
        },
        b: {
          type: 'object',
          schema: {
            c: {
              type: 'text',
              default: 2,
            },
            d: {
              type: 'text',
              default: 3,
            }
          }
        },
      },
      storePath: 'form'
    }, {
      vuex: {
      form: {}
      },
      laraformStore: false
    })

    await Vue.nextTick()

    expect(form.vm.$store.state.form.a).toBe(1)
    expect(form.vm.$store.state.form.b.c).toBe(2)
    expect(form.vm.$store.state.form.b.d).toBe(3)

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)
    expect(a.vm.name).toBe('a')

    let c = findAllComponents(form, { name: 'TextElement' }).at(1)
    expect(c.vm.name).toBe('c')

    let d = findAllComponents(form, { name: 'TextElement' }).at(2)
    expect(d.vm.name).toBe('d')

    a.get('input').setValue('aaa')
    c.get('input').setValue('ccc')
    d.get('input').setValue('ddd')

    await Vue.nextTick()

    expect(form.vm.$store.state.form.a).toBe('aaa')
    expect(form.vm.$store.state.form.b.c).toBe('ccc')
    expect(form.vm.$store.state.form.b.d).toBe('ddd')
  })

  it('should update form data when Vuex store data changes', async () => {
    let form = createForm({
      storePath: 'form',
      schema: {
        a: {
          type: 'text',
          default: 1
        },
        b: {
          type: 'object',
          schema: {
            c: {
              type: 'text',
              default: 2,
            },
            d: {
              type: 'text',
              default: 3,
            }
          }
        },
      },
      storePath: 'form'
    }, {
      vuex: {
      form: {}
      }
    })

    await Vue.nextTick()

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)
    expect(a.vm.name).toBe('a')

    let c = findAllComponents(form, { name: 'TextElement' }).at(1)
    expect(c.vm.name).toBe('c')

    let d = findAllComponents(form, { name: 'TextElement' }).at(2)
    expect(d.vm.name).toBe('d')

    expect(a.vm.value).toBe(1)
    expect(c.vm.value).toBe(2)
    expect(d.vm.value).toBe(3)

    form.vm.$store.state.form.a = 'aaa'
    form.vm.$store.state.form.b.c = 'ccc'
    form.vm.$store.state.form.b.d = 'ddd'

    await Vue.nextTick()

    expect(a.vm.value).toBe('aaa')
    expect(c.vm.value).toBe('ccc')
    expect(d.vm.value).toBe('ddd')
  })
})

describe('Laraform Elements', () => {
  it('should register new element', () => {
    let CustomElement = Vue.extend({
      name: 'CustomElement',
      render(h) {
        return h('div', 'Custom Element')
      }
    })

    const form = createForm({
      schema: {
        custom: {
          type: 'custom',
        }
      },
      elements: {
        CustomElement,
      }
    })

    expect(form.findComponent({name: 'CustomElement'}).html()).toContain('Custom Element')
  })

  it('should overwrite existing element', () => {
    let TextElement = Vue.extend({
      name: 'TextElement',
      render(h) {
        return h('div', 'Text Element')
      }
    })

    const form = createForm({
      schema: {
        custom: {
          type: 'text',
        }
      },
      elements: {
        TextElement,
      }
    })

    expect(form.findComponent({name: 'TextElement'}).html()).toContain('Text Element')
  })
})

describe('Laraform Components', () => {
  it('should add new component', () => {
    let CustomComponent = {
      name: 'CustomComponent'
    }

    const form = createForm({
      schema: {
        custom: {
          type: 'text',
        }
      },
      components: {
        CustomComponent,
      }
    })

    expect(form.vm.extendedTheme.components.CustomComponent).toStrictEqual(CustomComponent)
  })

  it('should overwrite existing component', () => {
    let BaseElementLayout = Vue.extend({
      name: 'BaseElementLayout',
      render(h) {
        return h('div', 'Base Layout')
      }
    })

    const form = createForm({
      schema: {
        custom: {
          type: 'text',
        }
      },
      components: {
        BaseElementLayout,
      }
    })

    expect(form.findComponent({name: 'TextElement'}).html()).toContain('Base Layout')
  })
})

describe('Laraform Events', () => {
  it('should trigger `change` event when data changes', async () => {    
    let form = createForm({
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    let changeMock = jest.fn(() => {})

    form.vm.on('change', changeMock)

    expect(changeMock.mock.calls.length).toBe(0)

    let a = findAllComponents(form, { name: 'TextElement' }).at(0)

    a.get('input').setValue('aaa')

    await Vue.nextTick()

    expect(changeMock.mock.calls.length).toBe(1)
  })

  it('should trigger `submit` event when submitted', async () => {    
    let form = createForm({
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    let submitMock = jest.fn(() => {})

    form.vm.on('submit', submitMock)

    expect(submitMock.mock.calls.length).toBe(0)

    form.vm.submit()

    await Vue.nextTick()

    expect(submitMock.mock.calls.length).toBe(1)
  })

  it('should trigger `success` event on successful response', async () => {    
    let form = createForm({
      method: 'success', // fake axios method for testing
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    let successMock = jest.fn(() => {})

    form.vm.on('success', successMock)

    expect(successMock.mock.calls.length).toBe(0)

    form.vm.send()

    await Vue.nextTick()

    expect(successMock.mock.calls.length).toBe(1)
  })

  it('should trigger `error` event on failed response', async () => {    
    let form = createForm({
      method: 'error', // fake axios method for testing
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    let errorMock = jest.fn(() => {})

    form.vm.on('error', errorMock)

    expect(errorMock.mock.calls.length).toBe(0)

    try {
      form.vm.send()
    }
    finally {
      await Vue.nextTick()

      expect(errorMock.mock.calls.length).toBe(1)
    }
  })

  it('should trigger `language` when language is changed', async () => {    
    let form = createForm({
      multilingual: true,
      language: 'en',
      languages: {
        en: {
          label: 'English',
          code: 'en'
        },
        de: {
          label: 'German',
          code: 'de'
        },
      },
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    let languageMock = jest.fn(() => {})

    form.vm.on('language', languageMock)

    expect(languageMock.mock.calls.length).toBe(0)

    expect(form.vm.language).toBe('en')

    findAllComponents(form, { name: 'FormLanguageSelectorTab' }).at(1).get('a').trigger('click')

    expect(form.vm.language).toBe('de')
    
    expect(languageMock.mock.calls.length).toBe(1)
  })

  it('should trigger `reset` when form is resetted', () => {    
    let form = createForm({
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    let resetMock = jest.fn(() => {})

    form.vm.on('reset', resetMock)

    expect(resetMock.mock.calls.length).toBe(0)

    form.vm.reset()
    
    expect(resetMock.mock.calls.length).toBe(1)
  })

  it('should trigger `clear` when form is cleared', () => {    
    let form = createForm({
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    let clearMock = jest.fn(() => {})

    form.vm.on('clear', clearMock)

    expect(clearMock.mock.calls.length).toBe(0)

    form.vm.clear()
    
    expect(clearMock.mock.calls.length).toBe(1)
  })
})

describe('Laraform Dynamics', () => {
  it('should update elements$ when schema changes', async () => {    
    let form = createForm({
      schema: {
        a: {
          type: 'text'
        }
      }
    })

    expect(_.keys(form.vm.elements$).length).toBe(1)

    form.vm.updateSchema({
      a: {
        type: 'text'
      },
      b: {
        type: 'text'
      },
    })

    await Vue.nextTick()

    await Vue.nextTick()

    expect(_.keys(form.vm.elements$).length).toBe(2)
  })
})