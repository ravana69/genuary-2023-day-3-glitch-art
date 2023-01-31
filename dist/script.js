let n = 40;
let p = 5;
let b = 100;
let canv, c, c2, cells, rects, gw, gh, finished;

function setup (){
  pixelDensity(1);
  canv = createCanvas();
  colorMode(HSB, 1, 1, 1);
  c = createGraphics(n, n);
  c.colorMode(HSB, 1, 1, 1);
  c.textSize(n*1.5);
  c.textAlign(CENTER, CENTER);
  windowResized();
}

let init = () => {
  finished = false;
  noiseSeed(random(1e6));
  c2 = createGraphics(width, height);
  background(0);
  cells = 0; rects = 0;
  gw = floor(width/n)+1;
  gh = floor(height/n)+1;
}

let drawGrid = () => {
  let i = floor(cells/p)%gw;
  let j = floor(cells/(p*gw));
  let k = cells%p;
  c.clear();
  c.fill(random(), random(), random());
  noStroke();
  let t = String.fromCharCode(window.crypto.getRandomValues(new Uint16Array(1)));
  c.text(t, n/2, n/2);
  image(c, i*n, j*n);
  cells++;
}

function draw(){
  if (cells < gw*gh*p) for (let i = 0; i < 30; i++) drawGrid();
  else if (rects < b){
    fill(random(), random(), 1, .3);
    rect(random(-250, width), random(-250, height), random(30, width/4), random(30, height/4));
    rects++;
  } else if (!finished){
    for (let i = 0; i < height; i++){
      let n = (noise(i/10)-.5)*pow(noise(i/100 + 1e6), 3)*1000;
      c2.image(canv, n      , i, width, 1, 0, i, width, 1);
      c2.image(canv, n-width, i, width, 1, 0, i, width, 1);
      c2.image(canv, n+width, i, width, 1, 0, i, width, 1);
    }
    image(c2, 0, 0);
    finished = true;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  init();
}

function mousePressed(){init()}