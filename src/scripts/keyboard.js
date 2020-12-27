import Search from './search.js';

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    firstInit: true,
    value: '',
    capsLock: false,
    shift: false,
    cursorPosition: null,
    lang: 'en',
    sounds: true,
    soundVolume: 0.03,
    isSpeechRecognitionOn: false,
    isSpeechSynthesisOn: false,
    speechSynthesisSpeed: 1,
  },

  soundsSets: {
    ru: {
      shift: './assets/sounds/ru_shift.wav',
      backspace: './assets/sounds/ru_backspace.wav',
      caps: './assets/sounds/ru_caps.wav',
      enter: './assets/sounds/ru_enter.wav',
      type: './assets/sounds/ru_type.wav',
    },

    en: {
      shift: './assets/sounds/en_shift.wav',
      backspace: './assets/sounds/en_backspace.wav',
      caps: './assets/sounds/en_caps.wav',
      enter: './assets/sounds/en_enter.wav',
      type: './assets/sounds/en_type.wav',
    },

    closeSound: './assets/sounds/close.wav',
    speechSound: './assets/sounds/speech_recog.wav',
    cursorMoveSound: './assets/sounds/cursor_move.wav',
  },

  keyLayouts: {
    en: {
      shiftUp: [
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
        'volume_up', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}',
        'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'enter',
        'done', 'play_arrow', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?',
        'keyboard_arrow_up', 'en', 'fast_rewind', 'space', 'fast_forward', 'mic', 'keyboard_arrow_up',
      ],

      shiftDown: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'volume_up', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
        'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
        'done', 'play_arrow', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
        'keyboard_arrow_up', 'en', 'fast_rewind', 'space', 'fast_forward', 'mic', 'keyboard_arrow_up',
      ],
    },
    ru: {
      shiftUp:
        [
          '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
          'volume_up', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
          'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
          'done', 'play_arrow', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',',
          'keyboard_arrow_up', 'рус', 'fast_rewind', 'space', 'fast_forward', 'mic', 'keyboard_arrow_up',
        ],

      shiftDown:
        [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
          'volume_up', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
          'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
          'done', 'play_arrow', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
          'keyboard_arrow_up', 'рус', 'fast_rewind', 'space', 'fast_forward', 'mic', 'keyboard_arrow_up',
        ],
    },
    keyCodes: ['--key49', '--key50', '--key51', '--key52', '--key53', '--key54', '--key55', '--key56', '--key57', '--key48', '--key189', '--key187', '--key8', '', '--key81', '--key87', '--key69', '--key82', '--key84', '--key89', '--key85', '--key73', '--key79', '--key80', '--key219', '--key221', '--key20', '--key65', '--key83', '--key68', '--key70', '--key71', '--key72', '--key74', '--key75', '--key76', '--key186', '--key222', '--key13', '', '', '--key90', '--key88', '--key67', '--key86', '--key66', '--key78', '--key77', '--key188', '--key190', '--key191', '--key16', '', '--key37', '--key32', '--key39', '', '--key16'],

  },

  keyLineBreaks: {
    en: ['backspace', ']', 'enter', '?', '}', '/'],
    ru: ['backspace', 'ъ', 'enter', '.', ','],
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input

    if (this.properties.firstInit) {
      this.properties.firstInit = !this.properties.firstInit;
      const input = document.querySelector('.use-keyboard-input');
      const btnOped = document.querySelector('.list-container--search__btn-keyboard');

      btnOped.addEventListener('click', () => {
        Keyboard.open(input.value, (currentValue) => {
          input.value = currentValue;
        });
      });
      input.addEventListener('keyup', () => {
        this.properties.value = input.value || '';
        this.properties.cursorPosition = input.selectionStart;
      });

      Keyboard.markBtn();
    }
    this.playClick();
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const shiftPosition = this.properties.shift ? 'shiftUp' : 'shiftDown';
    const keyLayout = this.keyLayouts[this.properties.lang][shiftPosition];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => `<i class="material-icons">${icon_name}</i>`;

    const setFocus = () => {
      document.querySelector('.use-keyboard-input').focus();
    };

    const moveCursor = (direction) => {
      switch (direction) {
        case 'fast_forward':
          if (this.properties.cursorPosition < this.properties.value.length) {
            this.properties.cursorPosition++;
            document.querySelector('.use-keyboard-input').selectionStart = this.properties.cursorPosition;
          }
          break;

        case 'fast_rewind':
          if (this.properties.cursorPosition > 0) {
            this.properties.cursorPosition--;
            document.querySelector('.use-keyboard-input').selectionStart = this.properties.cursorPosition;
          }
          break;

        default:
          break;
      }
      document.querySelector('.use-keyboard-input').selectionEnd = document.querySelector('.use-keyboard-input').selectionStart;
    };

    keyLayout.forEach((key, index) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = this.keyLineBreaks[this.properties.lang].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'en':
        case 'рус':
          keyElement.innerHTML = `<span>${key.toLowerCase()}</span>`;
          keyElement.classList.add('keyboard__key--close', 'keyboard__key--lang');
          keyElement.addEventListener('click', () => {
            this._toggleLang();
            setFocus();
          });

          break;

        case 'volume_up':
          keyElement.innerHTML = this.properties.sounds ? createIconHTML('volume_up') : createIconHTML('volume_off');
          keyElement.classList.add('keyboard__key--close', 'keyboard__key--volume');
          keyElement.addEventListener('click', () => {
            this._toggleSound();
            setFocus();
          });

          break;

        case 'mic':
          keyElement.innerHTML = createIconHTML('mic');
          keyElement.classList.add('keyboard__key--speech');
          keyElement.addEventListener('click', () => {
            setFocus();
            this.properties.isSpeechRecognitionOn = !this.properties.isSpeechRecognitionOn;
            if (this.properties.isSpeechRecognitionOn) {
              this.recognizeSpeech();
              keyElement.classList.add('keyboard__key--speech-active');
            } else keyElement.classList.remove('keyboard__key--speech-active');
          });

          break;

        case 'play_arrow':
          if (!this.properties.isSpeechSynthesisOn) keyElement.innerHTML = createIconHTML('play_arrow');
          else keyElement.innerHTML = createIconHTML('stop');
          keyElement.classList.add('keyboard__key--synthesis', 'keyboard__key--speech');
          keyElement.addEventListener('click', () => {
            this.keyboardSpeechSynthesis();
          });

          break;

        case 'keyboard_arrow_up':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'keyboard__key--shift');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_up');
          keyElement.classList.toggle('keyboard__key--active', this.properties.shift);
          keyElement.addEventListener('click', () => {
            this._triggerShift();
            setFocus();
          });

          break;

        case 'fast_forward':
          keyElement.innerHTML = createIconHTML('fast_forward');
          keyElement.classList.add('keyboard__key--move_cursor');
          keyElement.addEventListener('click', () => {
            setFocus();
            moveCursor('fast_forward');
          });

          break;

        case 'fast_rewind':
          keyElement.innerHTML = createIconHTML('fast_rewind');
          keyElement.classList.add('keyboard__key--move_cursor');
          keyElement.addEventListener('click', () => {
            setFocus();
            moveCursor('fast_rewind');
          });

          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--backspace');
          keyElement.innerHTML = createIconHTML('backspace');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.cursorPosition - 1) + this.properties.value.substring(this.properties.cursorPosition, this.properties.value.length);
            this._triggerEvent('oninput');
            moveCursor('fast_rewind');
            setFocus();
            Search.prototype.hideNotNeeded();
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'keyboard__key--caps');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');
          keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            setFocus();
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--enter');
          keyElement.innerHTML = createIconHTML('keyboard_return');
          keyElement.addEventListener('click', () => {
            this.properties.value = `${this.properties.value.substring(0, this.properties.cursorPosition)}\n${this.properties.value.substring(this.properties.cursorPosition, this.properties.value.length)}`;
            this._triggerEvent('oninput');
            setFocus();
            moveCursor('fast_forward');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide', 'keyboard__key--type');
          keyElement.innerHTML = createIconHTML('space_bar');
          keyElement.addEventListener('click', () => {
            this.properties.value = `${this.properties.value.substring(0, this.properties.cursorPosition)} ${this.properties.value.substring(this.properties.cursorPosition, this.properties.value.length)}`;
            this._triggerEvent('oninput');
            setFocus();
            moveCursor('fast_forward');
            Search.prototype.hideNotNeeded();
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark', 'keyboard__key--close');
          keyElement.innerHTML = createIconHTML('check_circle');
          keyElement.addEventListener('click', () => {
            this.close();
            this._triggerEvent('onclose');
          });

          break;

        default:
          if (this.properties.capsLock) keyElement.textContent = this.properties.shift ? key.toLowerCase() : key.toUpperCase();
          if (!this.properties.capsLock) keyElement.textContent = this.properties.shift ? key.toUpperCase() : key.toLowerCase();
          keyElement.classList.add('keyboard__key--type');
          keyElement.addEventListener('click', () => {
            let charAdd;
            if (this.properties.capsLock) charAdd = this.properties.shift ? key.toLowerCase() : key.toUpperCase();
            if (!this.properties.capsLock) charAdd = this.properties.shift ? key.toUpperCase() : key.toLowerCase();
            this.properties.value = this.properties.value.substring(0, this.properties.cursorPosition) + charAdd + this.properties.value.substring(this.properties.cursorPosition, this.properties.value.length);
            this._triggerEvent('oninput');
            setFocus();
            moveCursor('fast_forward');
            if (this.properties.shift) this._triggerShift();
            Search.prototype.hideNotNeeded();
          });

          break;
      }
      keyElement.classList.add(`keyboard__key${this.keyLayouts.keyCodes[index]}`);
      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (this.properties.capsLock) key.textContent = this.properties.shift ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
        if (!this.properties.capsLock) key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
    document.querySelector('.keyboard__key--caps').classList.toggle('keyboard__key--active', this.properties.capsLock);
  },

  _triggerShift() {
    this.properties.shift = !this.properties.shift;
    document.querySelector('.keyboard').remove();
    this.init();
    this.elements.main.classList.remove('keyboard--hidden');
    document.querySelectorAll('.keyboard__key--shift').forEach((key) => {
      key.classList.toggle('keyboard__key--active', this.properties.shift);
    });
  },

  _toggleSound() {
    this.properties.sounds = !this.properties.sounds;
    document.querySelector('.keyboard__key--volume').innerHTML = this.properties.sounds ? '<i class="material-icons">volume_up</i>' : '<i class="material-icons">volume_off</i>';
  },

  _toggleLang() {
    document.querySelector('.keyboard').remove();
    this.properties.lang = this.properties.lang === 'en' ? this.properties.lang = 'ru' : 'en';
    this.init();
    this.elements.main.classList.remove('keyboard--hidden');
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.toggle('keyboard--hidden');
    this.properties.cursorPosition = document.querySelector('.use-keyboard-input').selectionStart;
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },

  playClick() {
    const shiftClick = new Audio();
    const backspaceClick = new Audio();
    const capsClick = new Audio();
    const enterClick = new Audio();
    const typeClick = new Audio();
    const closeClick = new Audio();
    const cursorMoveClick = new Audio();
    const speechClick = new Audio();

    shiftClick.volume = this.properties.soundVolume;
    backspaceClick.volume = this.properties.soundVolume;
    capsClick.volume = this.properties.soundVolume;
    enterClick.volume = this.properties.soundVolume;
    typeClick.volume = this.properties.soundVolume;
    closeClick.volume = this.properties.soundVolume;
    cursorMoveClick.volume = this.properties.soundVolume;
    speechClick.volume = this.properties.soundVolume;

    shiftClick.preload = 'auto';
    backspaceClick.preload = 'auto';
    capsClick.preload = 'auto';
    enterClick.preload = 'auto';
    typeClick.preload = 'auto';
    closeClick.preload = 'auto';
    cursorMoveClick.preload = 'auto';
    speechClick.preload = 'auto';

    shiftClick.src = this.soundsSets[this.properties.lang].shift;
    backspaceClick.src = this.soundsSets[this.properties.lang].backspace;
    capsClick.src = this.soundsSets[this.properties.lang].caps;
    enterClick.src = this.soundsSets[this.properties.lang].enter;
    typeClick.src = this.soundsSets[this.properties.lang].type;
    closeClick.src = this.soundsSets.closeSound;
    cursorMoveClick.src = this.soundsSets.cursorMoveSound;
    speechClick.src = this.soundsSets.speechSound;

    const shiftBtn = document.querySelectorAll('.keyboard__key--shift');
    shiftBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (this.properties.sounds) shiftClick.play();
      });
    });
    const backspaceBtn = document.querySelectorAll('.keyboard__key--backspace');
    backspaceBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (this.properties.sounds) backspaceClick.play();
      });
    });
    const capsBtn = document.querySelectorAll('.keyboard__key--caps');
    capsBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (this.properties.sounds) capsClick.play();
      });
    });
    const enterBtn = document.querySelectorAll('.keyboard__key--enter');
    enterBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (this.properties.sounds) enterClick.play();
      });
    });
    const typeBtn = document.querySelectorAll('.keyboard__key--type');
    typeBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (this.properties.sounds) typeClick.play();
      });
    });
    const closeBtn = document.querySelectorAll('.keyboard__key--close');
    closeBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (this.properties.sounds) closeClick.play();
      });
    });
    const cursorMoveBtn = document.querySelectorAll('.keyboard__key--move_cursor');
    cursorMoveBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (this.properties.sounds) cursorMoveClick.play();
      });
    });
    const speechBtn = document.querySelectorAll('.keyboard__key--speech');
    speechBtn.forEach((elem) => {
      elem.addEventListener('mousedown', () => {
        if (this.properties.sounds) speechClick.play();
      });
    });
  },

  markBtn() {
    document.querySelector('.use-keyboard-input').addEventListener('keydown', (key) => {
      const btn = document.querySelectorAll(`.keyboard__key--key${key.keyCode || key.which}`);
      btn.forEach((el) => {
        el.classList.add('keyboard__key--markFromKeyboard');
        if (key.keyCode === 20 || key.which === 20) this._toggleCapsLock();
      });
      if (key.keyCode === 16 || key.which === 16) {
        Keyboard._triggerShift();
        document.querySelector('.keyboard__key--key16').classList.add('keyboard__key--markFromKeyboard');
      }
    });
    document.querySelector('.use-keyboard-input').addEventListener('keyup', (key) => {
      const btn = document.querySelectorAll(`.keyboard__key--key${key.keyCode || key.which}`);
      btn.forEach((el) => {
        el.classList.remove('keyboard__key--markFromKeyboard');
      });
    });
  },

  recognizeSpeech() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = this.properties.lang === 'ru' ? 'ru' : 'en-US';
    recognition.addEventListener('result', (e) => {
      const resultOfRecognition = e.results[0][0].transcript;
      this.properties.value = `${this.properties.value.substring(0, this.properties.cursorPosition) + resultOfRecognition}\n${this.properties.value.substring(this.properties.cursorPosition, this.properties.value.length)}`;
      this.properties.cursorPosition += resultOfRecognition.length + 1;
      document.querySelector('.use-keyboard-input').value = this.properties.value;
    });
    recognition.addEventListener('end', () => {
      if (this.properties.isSpeechRecognitionOn) recognition.start();
    });
    recognition.start();
  },

  keyboardSpeechSynthesis() {
    this.properties.isSpeechSynthesisOn = !this.properties.isSpeechSynthesisOn;
    const synthesisBtn = document.querySelector('.keyboard__key--synthesis');
    synthesisBtn.innerHTML = this.properties.isSpeechSynthesisOn
      ? '<i class="material-icons">stop</i>' : '<i class="material-icons">play_arrow</i>';

    const textInput = document.querySelector('.use-keyboard-input');
    textInput.disabled = this.properties.isSpeechSynthesisOn;

    if (textInput.value == '') {
      textInput.value;
      if (this.properties.lang === 'ru') textInput.value = 'Привет. Вы ничего не ввели, поэтому придётся синтезировать что есть.';
      else textInput.value = 'Hi. There is no text for speech synthesis.';
    }

    if (this.properties.isSpeechSynthesisOn) {
      const utterance = new SpeechSynthesisUtterance(textInput.value);
      utterance.rate = this.properties.speechSynthesisSpeed;
      utterance.lang = this.properties.lang === 'ru' ? 'ru' : 'en-US';
      speechSynthesis.speak(utterance);

      utterance.addEventListener('end', () => {
        this.properties.isSpeechSynthesisOn = !this.properties.isSpeechSynthesisOn;
        textInput.disabled = this.properties.isSpeechSynthesisOn;
        synthesisBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
      });

      synthesisBtn.addEventListener('click', function stopSynthesis() {
        if (Keyboard.properties.isSpeechSynthesisOn) {
          speechSynthesis.cancel();
          textInput.disabled = Keyboard.properties.isSpeechSynthesisOn;
          synthesisBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
          synthesisBtn.removeEventListener('click', stopSynthesis);
        }
      });
    }
  },
};

export default function getVirtualKeyboard() {
  Keyboard.init();
}
