/* eslint-disable */
// https://spicyyoghurt.com/tools/easing-functions & https://easings.net/fr
// t: elapsedTime, b: startValue, c: endValue, d: duration
export const linear = (t: number, b: number, c: number, d: number) : number => c * t / d + b;

export const easeInQuad = (t: number, b: number, c: number, d: number) : number => c * (t /= d) * t + b;
export const easeOutQuad = (t: number, b: number, c: number, d: number) : number => -c * (t /= d) * (t - 2) + b;
export const easeInOutQuad = (t: number, b: number, c: number, d: number) : number => {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
};

export const easeInSine = (t: number, b: number, c: number, d: number) : number => -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
export const easeOutSine = (t: number, b: number, c: number, d: number) : number => c * Math.sin(t / d * (Math.PI / 2)) + b;
export const easeInOutSine = (t: number, b: number, c: number, d: number) : number => -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;

export const easeInExpo = (t: number, b: number, c: number, d: number) : number => ((t == 0) ? b : c * 2 ** (10 * (t / d - 1)) + b);
export const easeOutExpo = (t: number, b: number, c: number, d: number) : number => ((t == d) ? b + c : c * (-(2 ** (-10 * t / d)) + 1) + b);
export const easeInOutExpo = (t: number, b: number, c: number, d: number) : number => {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * 2 ** (10 * (t - 1)) + b;
  return c / 2 * (-(2 ** (-10 * --t)) + 2) + b;
};

export const easeInCirc = (t: number, b: number, c: number, d: number) : number => -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
export const easeOutCirc = (t: number, b: number, c: number, d: number) : number => c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
export const easeInOutCirc = (t: number, b: number, c: number, d: number) : number => {
  if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};

export const easeInCubic = (t: number, b: number, c: number, d: number) : number => c * (t /= d) * t * t + b;
export const easeOutCubic = (t: number, b: number, c: number, d: number) : number => c * ((t = t / d - 1) * t * t + 1) + b;
export const easeInOutCubic = (t: number, b: number, c: number, d: number) : number => {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
};

export const easeInQuart = (t: number, b: number, c: number, d: number) : number => c * (t /= d) * t * t * t + b;
export const easeOutQuart = (t: number, b: number, c: number, d: number) : number => -c * ((t = t / d - 1) * t * t * t - 1) + b;
export const easeInOutQuart = (t: number, b: number, c: number, d: number) : number => {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

export const easeInQuint = (t: number, b: number, c: number, d: number) : number => c * (t /= d) * t * t * t * t + b;
export const easeOutQuint = (t: number, b: number, c: number, d: number) : number => c * ((t = t / d - 1) * t * t * t * t + 1) + b;
export const easeInOutQuint = (t: number, b: number, c: number, d: number) : number => {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
};

export const easeInElastic = (t: number, b: number, c: number, d: number) : number => {
  var s = 1.70158;
  let p = 0;
  let a = c;
  if (t == 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    const s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
  return -(a * 2 ** (10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
};
export const easeOutElastic = (t: number, b: number, c: number, d: number) : number => {
  var s = 1.70158;
  let p = 0;
  let a = c;
  if (t == 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
  return a * 2 ** (-10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
};
export const easeInOutElastic = (t: number, b: number, c: number, d: number) : number => {
  var s = 1.70158;
  let p = 0;
  let a = c;
  if (t == 0) return b;
  if ((t /= d / 2) == 2) return b + c;
  if (!p) p = d * (0.3 * 1.5);
  if (a < Math.abs(c)) {
    a = c;
    var s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
  if (t < 1) return -0.5 * (a * 2 ** (10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  return a * 2 ** (-10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
};

export type AnimationEase =
  'linear' |
  'easeInQuad' |
  'easeOutQuad' |
  'easeInOutQuad' |
  'easeInSine' |
  'easeOutSine' |
  'easeInOutSine' |
  'easeInExpo' |
  'easeOutExpo' |
  'easeInOutExpo' |
  'easeInCirc' |
  'easeOutCirc' |
  'easeInOutCirc' |
  'easeInCubic' |
  'easeOutCubic' |
  'easeInOutCubic' |
  'easeInQuart' |
  'easeOutQuart' |
  'easeInOutQuart' |
  'easeInQuint' |
  'easeOutQuint' |
  'easeInOutQuint' |
  'easeInElastic' |
  'easeOutElastic' |
  'easeInOutElastic'

export interface IAnimationCurveParameters {
  startValue: number
  endValue: number
  duration: number
  timingFunction?: AnimationEase
  onAnimatedValueChange: (newValue: number) => void
  onAnimationEnd?: () => void
  valueWithDecimal?: boolean
}

const FPS = 60;
class AnimationCurve {
  animatedValue: number | undefined

  duration: number

  startValue: number

  endValue: number

  ease: AnimationEase

  valueWithDecimal?: boolean

  onValueChange: (newValue: number) => void

  onAnimationEnd?: () => void

  elapsedTime = 0

  intervalId: NodeJS.Timer | undefined

  easeFunction : (t: number, b: number, c: number, d: number) => number

  constructor(
    {
      duration,
      startValue,
      endValue,
      timingFunction,
      onAnimatedValueChange,
      onAnimationEnd,
      valueWithDecimal = false,
    } : IAnimationCurveParameters) {
    this.duration = duration;
    this.startValue = startValue;
    this.endValue = endValue;
    this.onValueChange = onAnimatedValueChange;
    this.onAnimationEnd = onAnimationEnd;
    this.valueWithDecimal = valueWithDecimal;

    // Select the ease function
    this.ease = timingFunction ?? 'easeOutSine';
    switch (this.ease) {
      case 'linear': this.easeFunction = linear; break;

      case 'easeInCirc': this.easeFunction = easeInCirc; break;
      case 'easeInCubic': this.easeFunction = easeInCubic; break;
      case 'easeInElastic': this.easeFunction = easeInElastic; break;
      case 'easeInExpo': this.easeFunction = easeInExpo; break;
      case 'easeInQuad': this.easeFunction = easeInQuad; break;
      case 'easeInQuart': this.easeFunction = easeInQuart; break;
      case 'easeInQuint': this.easeFunction = easeInQuint; break;
      case 'easeInSine': this.easeFunction = easeInSine; break;

      case 'easeInOutCirc': this.easeFunction = easeInOutCirc; break;
      case 'easeInOutCubic': this.easeFunction = easeInOutCubic; break;
      case 'easeInOutElastic': this.easeFunction = easeInOutElastic; break;
      case 'easeInOutExpo': this.easeFunction = easeInOutExpo; break;
      case 'easeInOutQuad': this.easeFunction = easeInOutQuad; break;
      case 'easeInOutQuart': this.easeFunction = easeInOutQuart; break;
      case 'easeInOutQuint': this.easeFunction = easeInOutQuint; break;
      case 'easeInOutSine': this.easeFunction = easeInOutSine; break;

      case 'easeOutCirc': this.easeFunction = easeOutCirc; break;
      case 'easeOutCubic': this.easeFunction = easeOutCubic; break;
      case 'easeOutElastic': this.easeFunction = easeOutElastic; break;
      case 'easeOutExpo': this.easeFunction = easeOutExpo; break;
      case 'easeOutQuad': this.easeFunction = easeOutQuad; break;
      case 'easeOutQuart': this.easeFunction = easeOutQuart; break;
      case 'easeOutQuint': this.easeFunction = easeOutQuint; break;
      case 'easeOutSine': this.easeFunction = easeOutSine; break;
    }

    // Start then stop the animation
    this.intervalId = setInterval(() => {
      this.elapsedTime += 1 / FPS;
      this.animatedValue = this.easeFunction(this.elapsedTime, this.startValue, this.endValue, this.duration);

      if (this.animatedValue >= this.endValue) {
        clearInterval(this.intervalId);
        this.animatedValue = this.endValue;
        this.onAnimationEnd?.();
      }

      this.onValueChange(!this.valueWithDecimal ? Math.round(this.animatedValue) : this.animatedValue);
    }, 1000 / FPS);
  }
}

export default AnimationCurve;
