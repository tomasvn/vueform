const checkbox = {
  input: 'flex-shrink-0 appearance-none bg-white transition duration-200 ease-in-out cursor-pointer form-w-checkbox form-h-checkbox form-rounded form-border form-border-color mt-1 mr-1.5 focus:form-ring checked:form-bg-check-white checked:border-0',
  input_enabled: 'checked:form-bg-primary',
  input_disabled: 'form-bg-disabled checked:form-border checked:form-border-color',
  $input: (classes, { isDisabled }) => ([
    classes.input,
    isDisabled ? classes.input_disabled : classes.input_enabled
  ]),
}

const radio = {
  input: 'flex-shrink-0 appearance-none bg-white transition duration-200 ease-in-out cursor-pointer form-w-checkbox form-h-checkbox rounded-full form-border form-border-color mt-1 mr-1.5 focus:form-ring checked:form-bg-radio-white checked:border-0',
  input_enabled: 'checked:form-bg-primary',
  input_disabled: 'form-bg-disabled checked:form-border checked:form-border-color',
  $input: (classes, { isDisabled }) => ([
    classes.input,
    isDisabled ? classes.input_disabled : classes.input_enabled
  ]),
}

const text = {
  input: 'w-full form-border form-border-color form-rounded form-p-input z-1 transition-shadow addon-before:form-rounded-l-none addon-before:form-border-l-none outline-none addon-after:form-rounded-r-none addon-after:form-border-r-none',
  input_enabled: 'focus:form-ring',
  input_disabled: 'form-bg-disabled form-text-disabled',
  $input: (classes, { isDisabled }) => ([
    classes.input,
    isDisabled ? classes.input_disabled : classes.input_enabled
  ]),
}

const select = {
  container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer form-border form-border-color form-rounded bg-white text-base leading-snug outline-none',
  containerDisabled: 'cursor-default form-bg-disabled text-gray-400',
  containerOpen: 'form-rounded-b-none',
  containerOpenTop: 'form-rounded-t-none',
  containerActive: 'form-ring',
  search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white form-rounded form-pl-input',
  placeholder: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug form-pl-input text-gray-500',
  caret: 'mask-bg mask-form-caret bg-gray-500 w-2.5 h-4 py-px box-content form-mr-input relative z-10 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none',
  caretOpen: 'rotate-180 pointer-events-auto',
  clear: 'form-pr-input relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80',
  clearIcon: 'mask-bg mask-form-remove bg-black w-2.5 h-4 py-px box-content inline-block',
  spinner: 'mask-bg mask-form-spinner form-bg-primary w-4 h-4 z-10 form-mr-input animate-spin flex-shrink-0 flex-grow-0',
  dropdown: 'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full form-border form-border-color form-rounded-b -mt-px overflow-y-scroll z-50 bg-white flex flex-col',
  dropdownTop: '-translate-y-full top-px bottom-auto flex-col-reverse form-rounded-b-none form-rounded-t',
  dropdownHidden: 'hidden',
  options: 'flex flex-col p-0 m-0 list-none',
  optionsTop: 'flex-col-reverse',
  group: 'p-0 m-0',
  groupLabel: 'flex text-sm box-border items-center justify-start text-left py-1 px-3 font-semibold bg-gray-200 cursor-default leading-normal',
  groupLabelPointable: 'cursor-pointer',
  groupLabelPointed: 'bg-gray-300 text-gray-700',
  groupLabelSelected: 'form-bg-primary-darker text-white',
  groupLabelDisabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  groupLabelSelectedPointed: 'form-bg-primary-darker text-white opacity-90',
  groupLabelSelectedDisabled: 'text-white form-bg-primary-darker bg-opacity-50 cursor-not-allowed',
  groupOptions: 'p-0 m-0',
  option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug form-px-input form-py-input-border',
  optionPointed: 'text-gray-800 bg-gray-100',
  optionSelected: 'text-white form-bg-primary',
  optionDisabled: 'form-text-disabled cursor-not-allowed',
  optionSelectedPointed: 'text-white form-bg-primary opacity-90',
  optionSelectedDisabled: 'text-white form-bg-primary bg-opacity-50 cursor-not-allowed',
  fakeInput: 'bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent',
  spacer: 'form-h-input-inner box-content',
  noOptions: 'text-base leading-normal form-p-input text-gray-600 bg-white',
  noResults: 'text-base leading-normal form-p-input text-gray-600 bg-white',
}

export default {
  // Elements
  AddressElement: {
    container: '',
    childrenContainer: 'form-row-group flex flex-wrap',
  },
  ButtonElement: {
    container: '',
    button: 'inline-block form-p-button leading-snug form-rounded transition form-bg-primary text-white focus:outline-none',
    button_enabled: 'cursor-pointer hover:form-bg-primary-darker focus:form-ring',
    button_disabled: 'opacity-60 cursor-not-allowed',
    button_loading: 'form-bg-primary text-white form-bg-spinner-white opacity-60 cursor-not-allowed',
    $button: (classes, { isDisabled, isLoading, buttonClass }) => ([
      classes.button,
      isDisabled ? classes.input_disabled : null,
      !isDisabled && !isLoading ? classes.button_enabled : null,
      isLoading ? classes.button_loading : null,
      buttonClass,
    ]),
  },
  CheckboxElement: {
    container: '',
    wrapper: 'flex align-start form-pt-input-border',
    text: 'cursor-pointer',
    ...checkbox,
  },
  CheckboxgroupElement: {
    container: '',
    wrapper: 'flex flex-col justify-start form-pt-input-border',
  },
  DateElement: {
    container: '',
    inputContainer: 'w-full flex',
    ...text,
  },
  DatesElement: {
    container: '',
    inputContainer: 'w-full flex',
    ...text,
  },
  EditorElement: {
    container: '',
    input: 'form-border form-border-color form-rounded',
    input_enabled: '',
    input_disabled: 'is-disabled form-bg-disabled form-text-disabled',
    input_focused: 'form-ring',
    $input: (classes, { isDisabled, focused }) => ([
      classes.input,
      isDisabled ? classes.input_disabled : classes.input_enabled,
      focused ? classes.input_focused : null,
    ]),
  },
  FileElement: {
    container: '',
    container_removing: 'opacity-50',
    button: 'inline-block form-p-button leading-snug form-rounded transition focus:form-ring focus:outline-none',
    button_enabled: 'bg-gray-100 cursor-pointer hover:bg-gray-200',
    button_disabled: 'opacity-50 bg-gray-100 cursor-not-allowed',
    $container: (classes, { removing }) => ([
      classes.container,
      removing ? classes.container_removing : null,
    ]),
    $button: (classes, { isDisabled, preparing }) => ([
      classes.button,
      !isDisabled && !preparing ? classes.button_enabled : null,
      isDisabled || preparing ? classes.button_disabled : null,
    ]),
  },
  GroupElement: {
    container: '',
    wrapper: 'form-row-group flex flex-wrap',
  },
  ListElement: {
    container: '',
    list: '',
    list_disabled: '',
    list_sorting: '',
    listItem: 'form-row relative group ghost:opacity-60',
    handle: 'absolute form-w-input form-h-input left-4 top-0 transform -translate-x-full cursor-grab active:cursor-grabbing opacity-0 transition group-hover:opacity-100',
    handleIcon: 'mask-bg mask-form-sort-handle bg-black mask-size-2.8 block w-full h-full',
    remove: 'absolute z-1 w-4 h-4 box-content p-0.5 top-px form-left-gutter bg-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 hover:bg-gray-300 group-hover:opacity-100',
    removeIcon: 'mask-bg mask-form-remove-light bg-gray-500 mask-size-3 block w-full h-full',
    add: 'inline-block form-bg-primary text-white px-2.5 py-1 text-sm form-rounded transition hover:form-bg-primary-darker',
    list$: (classes, { isDisabled, sorting }) => ([
      classes.list,
      isDisabled ? classes.list_disabled : null,
      sorting ? classes.list_sorting : null,
    ]),
  },
  LocationElement: {
    container: '',
    inputContainer: 'w-full flex',
    input: 'w-full form-p-input form-border form-border-color form-rounded',
    ...text,
  },
  MultifileElement: {
    container: '',
    list: '',
    list_file: 'form-mt-0.5gutter',
    list_image: 'form-mt-gutter',
    list_gallery: 'flex flex-wrap form-mt-0.5gutter',
    list_disabled: '',
    list_sorting: '',
    spacer: 'form-mb-0.5gutter',
    listItem: 'relative group ghost:opacity-60',
    listItem_file: 'form-row -form-mt-0.5gutter',
    listItem_image: 'form-row -form-mt-0.5gutter',
    listItem_gallery: 'form-mr-0.5gutter form-mb-0.5gutter',
    handle: '',
    handle_file: 'absolute form-w-input form-h-input left-4 top-0 transform -translate-x-full cursor-grab active:cursor-grabbing opacity-0 transition group-hover:opacity-100',
    handle_image: 'absolute form-w-input form-h-input left-4 top-0 transform -translate-x-full cursor-grab active:cursor-grabbing opacity-0 transition group-hover:opacity-100',
    handle_gallery: 'absolute w-4 h-4 box-content top-0.5 left-0.5 mt-px ml-px bg-gray-200 bg-center bg-no-repeat rounded-full transition opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing hover:bg-gray-300',
    handleIcon: '',
    handleIcon_file: 'mask-bg mask-form-sort-handle bg-black mask-size-2.8 block w-full h-full',
    handleIcon_image: 'mask-bg mask-form-sort-handle bg-black mask-size-2.8 block w-full h-full',
    handleIcon_gallery: 'mask-bg mask-form-arrows bg-gray-700 mask-size-3 block w-full h-full',
    dnd: 'form-mb-0.5gutter',
    button: 'inline-block form-mb-0.5gutter form-p-button leading-snug form-rounded transition focus:form-ring focus:outline-none',
    button_enabled: 'bg-gray-100 cursor-pointer hover:bg-gray-200',
    button_disabled: 'opacity-50 bg-gray-100 cursor-not-allowed',
    $list: (classes, { isDisabled, sorting, view }) => ([
      classes.list,
      isDisabled ? classes.list_disabled : null,
      sorting ? classes.list_sorting : null,
      classes[`list_${view}`],
    ]),
    $listItem: (classes, { view }) => ([
      classes.listItem,
      classes[`listItem_${view}`],
    ]),
    $handle: (classes, { view }) => ([
      classes.handle,
      classes[`handle_${view}`],
    ]),
    $handleIcon: (classes, { view }) => ([
      classes.handleIcon,
      classes[`handleIcon_${view}`],
    ]),
    $button: (classes, { isDisabled, preparing }) => ([
      classes.button,
      !isDisabled && !preparing ? classes.button_enabled : null,
      isDisabled || preparing ? classes.button_disabled : null,
    ]),
  },
  MultiselectElement: {
    container: '',
    input: 'w-full form-p-input form-border form-border-color form-rounded',
    input_enabled: 'focus:form-ring',
    input_disabled: 'form-bg-disabled form-text-disabled',
    inputWrapper: '',
    select: {
      ...select,
      multipleLabel: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug form-pl-input',
    },
    $input: (classes, { isDisabled }) => ([
      classes.input,
      isDisabled ? classes.input_disabled : classes.input_enabled,
    ]),
  },
  ObjectElement: {
    container: '',
    wrapper: 'form-row-group flex flex-wrap',
  },
  RadioElement: {
    container: '',
    wrapper: 'flex align-start form-pt-input-border',
    text: 'cursor-pointer',
    ...radio,
  },
  RadiogroupElement: {
    container: '',
    wrapper: 'flex flex-col justify-start form-pt-input-border',
  },
  SelectElement: {
    container: '',
    input: 'w-full form-p-input form-border form-border-color form-rounded',
    input_enabled: 'focus:form-ring',
    input_disabled: 'form-bg-disabled form-text-disabled',
    inputWrapper: 'relative',
    inputPlaceholder: 'absolute left-0 top-0 form-pt-input form-pl-input ml-px text-gray-500 pointer-events-none',
    select: {
      ...select,
      singleLabel: 'flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug form-pl-input pr-16 box-border',
      singleLabelText: 'overflow-ellipsis overflow-hidden block whitespace-nowrap max-w-full',
    },
    $input: (classes, { isDisabled }) => ([
      classes.input,
      isDisabled ? classes.input_disabled : classes.input_enabled,
    ]),
  },
  SliderElement: {
    container: '',
    wrapper: 'mt-4',
    slider: {
      target: 'relative box-border user-select-none touch-none tap-highlight-transparent touch-callout-none disabled:cursor-not-allowed',
      focused: 'slider-focused',
      tooltipFocus: 'slider-tooltip-focus',
      tooltipDrag: 'slider-tooltip-drag',
      ltr: 'slider-ltr',
      rtl: 'slider-rtl',
      horizontal: 'slider-horizontal h-1.5',
      vertical: 'slider-vertical w-1.5 h-80',
      textDirectionRtl: 'slider-txt-rtl',
      textDirectionLtr: 'slider-txt-ltr',
      base: 'w-full h-full relative z-1 bg-gray-300 rounded',
      connects: 'w-full h-full relative overflow-hidden z-0 rounded',
      connect: 'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full form-bg-primary cursor-pointer tap:duration-300 tap:transition-transform disabled:form-bg-disabled-darker disabled:cursor-not-allowed',
      origin: 'slider-origin absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full h:h-0 v:-top-full txt-rtl-h:left-0 txt-rtl-h:right-auto v:w-0 tap:duration-300 tap:transition-transform',
      handle: 'absolute rounded-full bg-white border-0 shadow-slider cursor-grab focus:outline-none h:w-4 h:h-4 h:-top-1.5 h:-right-2 txt-rtl-h:-left-2 txt-rtl-h:right-auto v:w-4 v:h-4 v:-bottom-2 v:-right-1.25 disabled:cursor-not-allowed focus:form-ring',
      touchArea: 'h-full w-full',
      tooltip: 'absolute block text-sm font-semibold whitespace-nowrap py-1 px-1.5 min-w-5 text-center text-white rounded border form-border-primary form-bg-primary transform h:-translate-x-1/2 h:left-1/2 v:-translate-y-1/2 v:top-1/2 disabled:form-bg-disabled-darker disabled:form-border-disabled-darker merge-h:translate-x-1/2 merge-h:left-auto merge-v:-translate-x-4 merge-v:top-auto tt-focus:hidden tt-focused:block tt-drag:hidden tt-dragging:block',
      tooltipTop: 'bottom-6 h:arrow-bottom merge-h:bottom-3.5',
      tooltipBottom: 'top-6 h:arrow-top merge-h:top-5',
      tooltipLeft: 'right-6 v:arrow-right merge-v:right-1',
      tooltipRight: 'left-6 v:arrow-left merge-v:left-7',
      tooltipHidden: 'slider-tooltip-hidden',
      active: 'slider-active shadow-slider-active cursor-grabbing',
      draggable: 'cursor-ew-resize v:cursor-ns-resize',
      tap: 'slider-state-tap',
      drag: 'slider-state-drag',
    }
  },
  StaticElement: {
    container: '',
    content: 'form-pt-input-border',
  },
  TagsElement: {
    container: '',
    select: {
      ...select,
      tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 form-pl-input-y',
      tag: 'form-bg-primary text-white text-sm font-semibold py-px pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap',
      tagDisabled: 'pr-2 opacity-50',
      tagRemove: 'flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-black hover:bg-opacity-10 group',
      tagRemoveIcon: 'mask-bg mask-form-remove bg-current inline-block w-3 h-3',
      tagsSearchWrapper: 'inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full',
      tagsSearch: 'absolute inset-0 border-0 outline-none appearance-none p-0 text-base font-sans box-border w-full',
      tagsSearchCopy: 'invisible whitespace-pre-wrap inline-block h-px',
    }
  },
  TextareaElement: {
    container: '',
    inputContainer: 'w-full flex',
    ...text,
  },
  TextElement: {
    container: '',
    inputContainer: 'w-full flex',
    ...text,
  },
  TextElement: {
    container: '',
    inputContainer: 'w-full flex',
    ...text,
  },
  ToggleElement: {
    container: '',
    wrapper: 'form-pt-input-border flex items-center',
    text: 'ml-2',
    toggle: {
      container: 'inline-block rounded-full outline-none focus:form-ring',
      toggle: 'flex w-12 h-5 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
      toggleOn: 'form-bg-primary form-border-primary justify-start text-white',
      toggleOff: 'bg-gray-300 border-gray-300 justify-end text-gray-700',
      toggleOnDisabled: 'form-bg-primary form-border-primary opacity-50 justify-start text-white cursor-not-allowed',
      toggleOffDisabled: 'bg-gray-300 border-gray-300 opacity-50 justify-end text-gray-700 cursor-not-allowed',
      handle: 'inline-block bg-white w-5 h-5 top-0 rounded-full absolute transition-all',
      handleOn: 'left-full transform -translate-x-full',
      handleOff: 'left-0',
      handleOnDisabled: 'left-full transform -translate-x-full',
      handleOffDisabled: 'left-0',
      label: 'text-center w-8 border-box whitespace-nowrap select-none',
    }
  },
  TTextareaElement: {
    container: '',
    inputContainer: 'w-full flex',
    ...text,
  },
  TTextElement: {
    container: '',
    inputContainer: 'w-full flex',
    ...text,
  },
  TEditorElement: {
    container: '',
    input: 'form-border form-border-color form-rounded',
    input_enabled: '',
    input_disabled: 'is-disabled form-bg-disabled form-text-disabled',
    input_focused: 'form-ring',
    $input: (classes, { isDisabled, focused }) => ([
      classes.input,
      isDisabled ? classes.input_disabled : classes.input_enabled,
      focused ? classes.input_focused : null,
    ]),
  },

  // Wrappers
  DatepickerWrapper: {
    datepicker: '',
    calendarContainer: ''
  },
  EditorWrapper: {
    container: 'bg-white',
  },

  // Components
  DragAndDrop: {
    container: 'w-full border border-dashed transition inline-flex flex-col items-center justify-center p-6 cursor-pointer',
    container_inactive: 'form-border-color',
    container_active: 'form-border-primary form-bg-primary bg-opacity-20',
    container_enabled: '',
    container_disabled: 'opacity-50 bg-gray-50 cursor-not-allowed',
    icon: 'inline-block w-9 h-8 mask-bg mask-form-inbox-in form-bg-primary bg-opacity-100',
    title: 'font-semibold mt-3',
    description: '',
    $container: (classes, { dragging, disabled }) => ([
      classes.container,
      dragging ? classes.container_active : classes.container_inactive,
      disabled ? classes.container_disabled : classes.container_enabled,
    ]),
  },
  ElementAddon: {
    container: 'form-p-input form-border form-border-color bg-gray-100 flex items-center',
    container_before: 'form-addon-before !form-border-r-0 form-rounded-l',
    container_after: 'form-addon-after !form-border-l-0 form-rounded-r order-2',
    wrapper: '',
    $container: (classes, { type }) => ([
      classes.container,
      classes[`container_${type}`]
    ]),
  },
  ElementDescription: {
    container: 'text-gray-500 text-sm mt-1',
  },
  ElementError: {
    container: 'text-sm text-red-500 block mt-1',
  },
  ElementInfo: {
    container: 'inline-block w-3.5 h-3.5 form-bg-info relative ml-2 top-px cursor-pointer group',
    wrapper: 'absolute left-5 -top-0.5 -mt-px opacity-0 invisible group-hover:opacity-100 group-hover:form-visible transition z-20 w-52',
    content: 'bg-black bg-opacity-90 text-white rounded-md text-sm py-1 px-2.5 not-italic inline-block relative',
  },
  ElementLabel: {
    container: 'form-col form-py-input-border pr-4',
    $container: (classes, { el$ }) => ([
      classes.container,
      !el$.inline ? el$.columnsClasses.label : null,
    ]),
  },
  ElementLabelFloating: {
    container: 'relative',
    label: 'absolute z-10 left-2.5 leading-px leading-none form-text-0.5xs text-gray-500 bg-white px-px transition whitespace-nowrap',
    label_invisible: 'opacity-0 invisible',
    label_visible: 'opacity-100 visible',
    $label: (classes, { visible }) => ([
      classes.label,
      visible ? classes.label_visible : classes.label_invisible
    ]),
  },
  ElementLayout: {
    container: 'form-col',
    container_error: 'has-error',
    outerWrapper: 'form-row flex flex-wrap',
    outerWrapper_single: 'form-mb-gutter',
    outerWrapper_multiple: '',
    innerContainer: 'flex-1',
    innerWrapperBefore: 'form-col w-full',
    innerWrapper: 'form-col',
    innerWrapperAfter: 'form-col w-full',
    $container: (classes, { el$ }) => ([
      classes.container,
      el$.columnsClasses.container,
      el$.classes.container,
      !el$.isStatic && el$.errors && !!el$.errors.length ? classes.container_error : null
    ]),
    $innerContainer:  (classes, { el$ }) => ([
      classes.innerContainer,
      el$.columnsClasses.innerContainer,
    ]),
    $innerWrapper:  (classes, { el$ }) => ([
      classes.innerWrapper,
      el$.columnsClasses.wrapper,
    ]),
    $outerWrapper:  (classes, { multiple }) => ([
      classes.outerWrapper,
      multiple.value ? classes.outerWrapper_multiple : classes.outerWrapper_single,
    ]),
  },
  ElementLayoutInline: {
    container: 'flex',
    container_error: 'has-error',
    $container: (classes, { el$ }) => ([
      classes.container,
      !el$.isStatic && el$.errors && !!el$.errors.length ? classes.container_error : null
    ]),
  },
  ElementLoader: {
    container: 'relative z-10 order-1',
    loader: 'absolute w-4 h-4 form-mr-input right-full form-top-input mt-1 mask-bg mask-form-spinner form-bg-primary animate-spin',
  },
  ElementMessage: {
    container: 'text-sm text-green-500 block mt-1',
  },
  ElementText: {
    container: '',
    container_before: '',
    container_between: '',
    container_after: '',
    $container: (classes, { type }) => ([
      classes.container,
      classes[`container_${type}`]
    ]),
  },
  FormElements: {
    container: 'form-row flex flex-wrap'
  },
  FormErrors: {
    container: 'bg-red-100 text-red-500 py-3 px-5 rounded form-mb-gutter',
    error: '',
  },
  FormLanguage: {
    container: 'flex-grow flex-shrink w-full',
    wrapper: 'form-rounded text-center py-2 px-4 block',
    wrapper_inactive: 'form-text-primary',
    wrapper_active: 'text-white form-bg-primary',
    $wrapper: (classes, { selected }) => ([
      classes.wrapper,
      selected ? classes.wrapper_active : classes.wrapper_inactive
    ]),
  },
  FormLanguages: {
    container: 'flex items-center justify-between form-mb-gutter',
  },
  FormMessages: {
    container: 'bg-green-100 text-green-500 py-3 px-5 rounded form-mb-gutter',
    message: '',
  },
  FormStep: {
    container: 'form-step',
    wrapper: '',
    container_active: 'form-step-active',
    container_inactive: '',
    container_invalid: 'has-errors',
    container_valid: '',
    container_disabled: 'form-step-disabled',
    container_enabled: '',
    container_completed: 'form-step-completed',
    container_incompleted: '',
    container_pending: 'form-step-pending',
    $container: (classes, { active, isDisabled, completed, invalid, pending }) => ([
      classes.container,
      active ? classes.container_active : classes.container_inactive,
      isDisabled ? classes.container_disabled : classes.container_enabled,
      completed ? classes.container_completed : classes.container_incompleted,
      invalid ? classes.container_invalid : classes.container_valid,
      pending ? classes.container_pending : null,
      // props.addClass.value, // @todo: step roar
    ]),
  },
  FormSteps: {
    container: 'form-mb-gutter flex justify-between overflow-x-auto pt-5',
  },
  FormStepsControl: {
    button: 'px-4 py-2 form-rounded focus:form-ring focus:outline-none disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed',
    button_previous_enabled: 'text-gray-700 bg-gray-200 transition hover-not-disabled:bg-gray-300',
    button_previous_disabled: 'text-gray-700 bg-gray-200 opacity-60 pointer-events-none',
    button_next_enabled: 'form-bg-primary text-white transition hover:form-bg-primary-darker',
    button_next_disabled: 'form-bg-primary text-white opacity-60 pointer-events-none cursor-not-allowed',
    button_next_loading: 'form-bg-primary text-white form-bg-spinner-white',
    button_finish_enabled: 'form-bg-primary text-white transition hover:form-bg-primary-darker',
    button_finish_disabled: 'form-bg-primary text-white opacity-60 pointer-events-none cursor-not-allowed',
    button_finish_loading: 'form-bg-primary text-white form-bg-spinner-white',
    $button: (classes, { isDisabled, isLoading, type }) => ([
      classes.button,
      isDisabled ? classes[`button_${type}_disabled`] : classes[`button_${type}_enabled`],
      isLoading ? classes[`button_${type}_loading`] : null,
    ]),
  },
  FormStepsControls: {
    container: 'flex justify-between form-mt-gutter'
  },
  FormTab: {
    container: '',
    wrapper: 'py-2 px-4 block bg-white -mb-px',
    wrapper_active: 'border form-border-color !form-border-b-white rounded-tl rounded-tr',
    wrapper_inactive: 'border border-white form-border-b-color',
    wrapper_valid: '',
    wrapper_invalid: 'text-red-500',
    $container: (classes, {}) => ([
      classes.container,
      // props.addClass.value, // @todo: tab roar
    ]),
    $wrapper: (classes, { active, invalid }) => ([
      classes.wrapper,
      active ? classes.wrapper_active : classes.wrapper_inactive,
      invalid ? classes.wrapper_invalid : classes.wrapper_valid,
    ]),
  },
  FormTabs: {
    container: 'flex border-b form-border-color form-mb-gutter items-end',
  },
  Vueform: {
    form: '',
  },

  // Slots
  CheckboxgroupCheckbox: {
    ...checkbox,
    container: 'flex align-start cursor-pointer',
    text: '',
    $input: (classes, { isDisabled }) => ([
      classes.input,
      isDisabled ? classes.input_disabled : classes.input_enabled
    ]),
  },
  FilePreview: {
    container: 'form-py-input flex justify-start flex-row group relative',
    wrapper: 'flex justify-between items-center w-full',
    file: 'flex items-center',
    filenameLink: 'hover:underline',
    filenameStatic: '',
    actions: 'flex items-center',
    percent: 'flex justify-between items-center text-sm text-gray-500 group-hover:form-hidden',
    upload: 'form-bg-primary text-white form-rounded text-xs py-0.5 px-1.5 ml-1.5 whitespace-nowrap transition hover:form-bg-primary-darker focus:form-ring',
    progressBar: 'bg-gray-200 h-0.75 absolute bottom-0 w-full',
    progress: 'w-0 form-bg-primary transition-all ease-out duration-500 h-0.75',
    warning: 'flex w-4 h-4 items-center justify-center bg-red-200 rounded-full group-hover:form-hidden',
    warningIcon: 'mask-bg mask-form-exclamation-solid bg-red-500 mask-size-2.5 block w-full h-full',
    uploaded: 'flex w-4 h-4 items-center justify-center bg-green-200 rounded-full group-hover:form-hidden',
    uploadedIcon: 'mask-bg mask-form-check-solid bg-green-500 mask-size-2.5 block w-full h-full',
    remove: 'flex w-4 h-4 items-center justify-center bg-gray-200 rounded-full transition hover:bg-gray-300 form-hidden group-hover:form-inline-block',
    removeIcon: 'mask-bg mask-form-remove-light bg-black mask-size-3 block w-full h-full',
  },
  GalleryPreview: {
    container: 'flex justify-start flex-col transition duration-500 form-w-gallery form-h-gallery relative group',
    image: 'w-full h-full bg-gray-100 form-rounded',
    image_link: '',
    image_static: '',
    img: 'w-full h-full form-rounded object-cover form-hide-empty-img',
    overlay: 'absolute inset-0 bg-white bg-opacity-50 transition duration-300 opacity-0 invisible flex items-center justify-center p-3 form-rounded group-hover:form-visible group-hover:opacity-100',
    upload: 'relative z-1 form-bg-primary text-white bg-opacity-100 form-rounded text-xs py-0.5 px-1.5 whitespace-nowrap transition hover:form-bg-primary-darker focus:form-ring',
    progressBar: 'bg-white absolute left-1 right-1 bottom-1 h-0.75',
    progress: 'w-0 form-bg-primary transition-all ease-out duration-500 h-0.75',
    warning: 'absolute right-0.5 bottom-0.5 mr-px mb-px flex w-4 h-4 items-center justify-center bg-red-200 rounded-full',
    warningIcon: 'mask-bg mask-form-exclamation-solid bg-red-500 mask-size-2.5 block w-full h-full',
    uploaded: 'absolute right-0.5 bottom-0.5 mr-px mb-px flex w-4 h-4 items-center justify-center bg-green-200 rounded-full',
    uploadedIcon: 'mask-bg mask-form-check-solid bg-green-500 mask-size-2.5 block w-full h-full',
    remove: 'flex w-4 h-4 items-center justify-center bg-gray-200 absolute top-0.5 right-0.5 mt-px mr-px form-hidden rounded-full transition hover:bg-gray-300 group-hover:form-inline-block ',
    removeIcon: 'mask-bg mask-form-remove-light bg-black mask-size-3 block w-full h-full',
  },
  ImagePreview: {
    container: 'flex justify-start flex-row group relative',
    wrapper: 'flex justify-between items-center w-full',
    image: 'flex items-center bg-gray-100 form-rounded flex-grow-0 flex-shrink-0',
    image_link: '',
    image_static: '',
    img: 'form-w-input form-h-input form-rounded form-hide-empty-img object-cover',
    file: 'flex items-center flex-grow flex-shrink ml-2.5',
    filenameLink: 'hover:underline',
    filenameStatic: '',
    actions: 'flex items-center',
    percent: 'flex justify-between items-center text-sm text-gray-500 group-hover:form-hidden',
    upload: 'form-bg-primary text-white form-rounded text-xs py-0.5 px-1.5 ml-1.5 whitespace-nowrap transition hover:form-bg-primary-darker focus:form-ring',
    progressBar: 'bg-gray-200 h-0.75 form-left-input ml-2.5 absolute bottom-0 right-0',
    progress: 'w-0 form-bg-primary transition-all ease-out duration-500 h-0.75',
    warning: 'flex w-4 h-4 items-center justify-center bg-red-200 rounded-full group-hover:form-hidden',
    warningIcon: 'mask-bg mask-form-exclamation-solid bg-red-500 mask-size-2.5 block w-full h-full',
    uploaded: 'flex w-4 h-4 items-center justify-center bg-green-200 rounded-full group-hover:form-hidden',
    uploadedIcon: 'mask-bg mask-form-check-solid bg-green-500 mask-size-2.5 block w-full h-full',
    remove: 'flex w-4 h-4 items-center justify-center bg-gray-200 rounded-full transition hover:bg-gray-300 form-hidden group-hover:form-inline-block',
    removeIcon: 'mask-bg mask-form-remove-light bg-black mask-size-3 block w-full h-full',
    $image: (classes, { hasLink }) => ([
      classes.image,
      hasLink ? classes.image_link : classes.image_static
    ]),
  },
  RadiogroupRadio: {
    container: 'flex align-start cursor-pointer',
    text: '',
    ...radio,
    $input: (classes, { isDisabled }) => ([
      classes.input,
      isDisabled ? classes.input_disabled : classes.input_enabled
    ]),
  },
}