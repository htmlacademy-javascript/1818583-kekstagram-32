import {DEFAULT_PHOTO_SCALE, MAX_PHOTO_SCALE, MIN_PHOTO_SCALE, PHOTO_SCALE_STEP} from './constants';

// Масштаб изображения

const scaleMinusButton = document.querySelector('.scale__control--smaller');
const scalePlusButton = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview').querySelector('img');

const scalePreviewImage = (value) => {
  scaleInputElement.value = `${value}%`;
  imagePreviewElement.style.transform = `scale(${value / 100})`;
};

const scaleMinus = () => {
  let newValue = parseInt(scaleInputElement.value, 10) - PHOTO_SCALE_STEP;
  if (newValue < MIN_PHOTO_SCALE) {
    newValue = MIN_PHOTO_SCALE;
  }
  scalePreviewImage(newValue);
};

const scalePlus = () => {
  let newValue = parseInt(scaleInputElement.value, 10) + PHOTO_SCALE_STEP;
  if (newValue > MAX_PHOTO_SCALE) {
    newValue = MAX_PHOTO_SCALE;
  }
  scalePreviewImage(newValue);
};

scaleMinusButton.addEventListener('click', scaleMinus);
scalePlusButton.addEventListener('click', scalePlus);

// Эффекты изображения

const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const previewImageElement = document.querySelector('.img-upload__preview').querySelector('img');
effectSliderContainer.classList.add('hidden');

const Effects = {
  chrome: 'chrome',
  sepia: 'sepia',
  marvin: 'marvin',
  phobos: 'phobos',
  heat: 'heat',
  none: 'none',
};

const EffectSettings = {
  [Effects.chrome]: {
    min: 0,
    max: 1,
    step: 0.1,
    effect: 'grayscale',
    unit: '',
  },
  [Effects.sepia]: {
    min: 0,
    max: 1,
    step: 0.1,
    effect: 'sepia',
    unit: '',
  },
  [Effects.marvin]: {
    min: 0,
    max: 100,
    step: 1,
    effect: 'invert',
    unit: '%',
  },
  [Effects.phobos]: {
    min: 0,
    max: 3,
    step: 0.1,
    effect: 'blur',
    unit: 'px',
  },
  [Effects.heat]: {
    min: 1,
    max: 3,
    step: 0.1,
    effect: 'brightness',
    unit: '',
  },
};

const sliderOptions = {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 80,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

const updateSliderOptions = (newMin, newMax, newStep) => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: newMin,
      max: newMax,
    },
    step: newStep,
    start: newMax,
  });
};

let currentEffect = Effects.none;

const acceptEffect = (effect, intensity) => {
  if (!effect || intensity === undefined || effect === Effects.none) {
    previewImageElement.style.filter = 'none';
    return;
  }

  const filter = EffectSettings[effect];
  previewImageElement.style.filter = `${filter.effect}(${intensity}${filter.unit})`;
};

const effectsListElement = document.querySelector('.effects__list');

effectsListElement.addEventListener('click', (e) => {
  const radio = e.target.closest('.effects__radio');

  if (!radio) {
    return;
  }

  const value = radio.value;

  if (value === currentEffect) {
    return;
  }

  const effect = EffectSettings[value];
  currentEffect = value;

  if (effect) {
    updateSliderOptions(effect.min, effect.max, effect.step);
    effectSliderContainer.classList.remove('hidden');
  } else {
    acceptEffect(currentEffect);
    effectSliderContainer.classList.add('hidden');
  }
});

const initFilters = () => {
  console.log('init');
  effectSliderContainer.classList.add('hidden');
  currentEffect = Effects.none;
  acceptEffect();

  noUiSlider.create(effectSliderElement, sliderOptions);

  effectSliderElement.noUiSlider.on('update', () => {
    const value = effectSliderElement.noUiSlider.get();
    effectValueElement.value = value;
    acceptEffect(currentEffect, value);
  });
};

const destroyFilters = () => {
  scalePreviewImage(DEFAULT_PHOTO_SCALE);
  effectSliderElement.noUiSlider.destroy();
};

export {destroyFilters, initFilters};
