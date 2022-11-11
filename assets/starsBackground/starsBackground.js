const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 200;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = document.querySelector('canvas'),
context = canvas.getContext('2d');

let scale = 1, // device pixel ratio
width,
height;

let stars = [];

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let zoom = 0;
let scrollAnim = {direction: 'none', targetSpeed: 0, acceleration: 0}

generate();
resize();
step();

window.onresize = resize;

function generate() {

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE) });

  }

}

function placeStar(star) {

  star.x = Math.random() * width;
  star.y = Math.random() * height;

}

function recycleStar(star) {

  let direction = 'z';

  let vx = Math.abs(velocity.x),
  vy = Math.abs(velocity.y);

  if (vx > 1 || vy > 1) {
    let axis;

    if (vx > vy) {
      axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
    } else
    {
      axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
    }

    if (axis === 'h') {
      direction = velocity.x > 0 ? 'l' : 'r';
    } else
    {
      direction = velocity.y > 0 ? 't' : 'b';
    }
  }

  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

  if (direction === 'z') {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  } else
  if (direction === 'l') {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else
  if (direction === 'r') {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else
  if (direction === 't') {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
  } else
  if (direction === 'b') {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
  }

}

function resize() {

  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach(placeStar);

}

function step() {

  context.clearRect(0, 0, width, height);

  update();
  render();

  requestAnimationFrame(step);

}

function update() {

  if (scrollAnim.direction === 'none') {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;
  } else if (scrollAnim.direction === 'right') {
      if (velocity.x > -scrollAnim.targetSpeed) {
        velocity.tx = velocity.tx + (-scrollAnim.acceleration) / 8 * scale;
        console.log('Scrolling right')
    } else {
        velocity.tx = -scrollAnim.targetSpeed
    }
  } else if (scrollAnim.direction === 'left') {
      if (velocity.x < scrollAnim.targetSpeed) {
        velocity.tx = velocity.tx + (scrollAnim.acceleration) / 8 * scale;
        console.log('Scrolling left')
    } else {
      velocity.tx = scrollAnim.targetSpeed
  }
} else if (scrollAnim.direction === 'up') {
    if (velocity.y < scrollAnim.targetSpeed) {
      velocity.ty = velocity.ty + (scrollAnim.acceleration) / 8 * scale;
      console.log('Scrolling up')
  } else {
      velocity.ty = scrollAnim.targetSpeed
}
} else if (scrollAnim.direction === 'down') {
    if (velocity.y > -scrollAnim.targetSpeed) {
      velocity.ty = velocity.ty + (-scrollAnim.acceleration) / 8 * scale;
      console.log('Scrolling down')
  } else {
      velocity.ty = -scrollAnim.targetSpeed
}
} 

  velocity.x += (velocity.tx - velocity.x) * 0.8;
  velocity.y += (velocity.ty - velocity.y) * 0.8;

  stars.forEach(star => {

    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    if (zoom === 1) {
      if (velocity.z < 0.05) {
        velocity.z *= 1.0002
      }
      if (velocity.z > 0.05) {
        velocity.z = 0.05
      }
    } else if (zoom === -1) {
      if (velocity.z > -0.05) {
        velocity.z *= 1.0002
      }
      if (velocity.z < -0.05) {
        velocity.z = -0.05
      } 
    } else {
      if (velocity.z > 0.0005) {
        velocity.z *= 0.9999
      } else if (velocity.z < -0.0005) {
        velocity.z *= 0.9999
      }
      if (velocity.z < 0.0005) {
        velocity.z = 0.0005
      } else if (velocity.z > -0.0005) {
        velocity.z = 0.0005
      }
    }

    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

    // recycle when out of bounds
    if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
      recycleStar(star);
    }

  });

}

function render() {

  stars.forEach(star => {

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.5 + 0.5 * Math.random();
    context.strokeStyle = STAR_COLOR;

    context.beginPath();
    context.moveTo(star.x, star.y);

    var tailX = velocity.x * 2,
    tailY = velocity.y * 2;

    // stroke() wont work on an invisible line
    if (Math.abs(tailX) < 0.1) tailX = 0.5;
    if (Math.abs(tailY) < 0.1) tailY = 0.5;

    context.lineTo(star.x + tailX, star.y + tailY);

    context.stroke();

  });

}

export default ({app}, inject) => {

  const directionalScrollAnimation = (args) => {
    scrollAnim = args
    console.log(scrollAnim)
    if (scrollAnim.direction === 'right' || scrollAnim.direction === 'left') {
      velocity.tx = 1;
    } else if (scrollAnim.direction === 'up' || scrollAnim.direction === 'down') {
      velocity.ty = 1;
    }
  }

  const stopScrollingAnimation = () => {
    scrollAnim = {direction: 'none', targetSpeed: 0, acceleration: 0}
  }

  const checkZoom = () => {
    return zoom
  }

  const setZoom = (newZoom) => {
    if (newZoom === -1) {
      velocity.z = -0.0005
    }
    if (newZoom === 1) {
      velocity.z = 0.0005
    }
    zoom = Number(newZoom)
    console.log(zoom)
  }

  /* create diff functions for mobile and pc oy = 10 on pc and 2 on mobile */
  function scrollUpAnimation(speed) {
    let oy = -speed;

    velocity.ty = velocity.ty + oy / 8 * scale;
  }

  function scrollDownAnimation(speed) {
    let oy = speed;

    velocity.ty = velocity.ty + oy / 8 * scale;
  }

  function scrollAnimation(speed) {
    let oy = speed/4;
    
    velocity.ty = velocity.ty + oy / 8 * scale;
  }

  inject('checkZoom', checkZoom)
  inject('setZoom', setZoom)
  inject('directionalScrollAnimation', directionalScrollAnimation)
  inject('stopScrollingAnimation', stopScrollingAnimation)
  inject('scrollAnimation', scrollAnimation)
  inject('scrollUpAnimation', scrollUpAnimation)
  inject('scrollDownAnimation', scrollDownAnimation)
}
