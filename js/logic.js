async function delay(milisec) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, milisec);
  })
}


async function playKey(TONE,del){
  playTone(tone[TONE],'square',1)
  await delay(del)
}

async function playChord(ch,del){
  chord[ch].forEach(async(n)=>{playTone(n,'square',2);await delay(del)})
  await delay(del);
}


function $(a){
  return document.querySelector(a)
}
function load(){
    k = Object.keys(tone)
    k.forEach(n=>{
           document.getElementById('but').innerHTML+=`<button id="${n}" onclick="playTone(${tone[n]},'sine',5)">${n}</button>`
    })
}
function make(a){
  a=a.split('\n').filter(n=>n);
  p=''
  a.forEach(n => {
    if(n.match('delay')){
        p+='await '+n+'\n'
    }
    else if(n.match('x')){
      u=n.split('x')
      n=u[0].split(',')
      o=n[0].split('(')
      for(i=0;i<parseInt(u[1]);i++){
        p+='await '+o[0]+"('"+o[1]+"',"+n[1]+'\n'
      }
    }
    else{
        n=n.split(',')
        o=n[0].split('(')
        p+='await '+o[0]+"('"+o[1]+"',"+n[1]+'\n'
    }
  });
  eval(`(async function(){${p}})()`)
}
function trig(){
  if($('#code').innerText==kgf_notes.replaceAll(';','\n')){
    var audio = new Audio('./mp3/velachil.mp3');
    audio.play();
  }
  else{
    make($('#code').innerText)
  }
}

function kgf(){
  $('#code').innerHTML = kgf_notes.replaceAll(';','<br>')
  make(kgf_notes.replaceAll(';','\n'))
}
  
out = ''
k=['C', 'Cm', 'C#', 'D', 'Dm', 'D#', 'E', 'Em', 'F', 'Fm', 'F#', 'G', 'Gm', 'G#', 'A', 'Am', 'A#', 'B', 'Bm']
k.forEach(n=>{
  out+=`<button onclick="playChord('${n}',1000)">${n}</button><br>`
})
uot=''
y=Object.keys(tone)
y.forEach(n=>{
  uot+=`<button onclick="playKey('${n}',1000)">${n}</button><br>`
})

id('output1').innerHTML = out
id('output2').innerHTML = uot
footer={
  '0': {
    url: 'https://facebook.com/ieeeceksb',
    img: 'fb.png',
    alt: 'facebook-logo'
  },
  '1': {
    url: 'https://instagram.com/ieee_sb_cek',
    img: 'ista.png',
    alt: 'instagram-logo'
  },
  '2': {
    url: 'https://twitter.com/IEEE_SB_CEK',
    img: 'twit.png',
    alt: 'twitter-logo'
  },
  '3': {
    url: 'https://www.linkedin.com/company/ieeesbcek',
    img: 'lin.png',
    alt: 'linkedin-logo'
  }
}

function len(obj){
  return Object.keys(obj).length
}

function footers(a){
  return `
      <a href="${a.url}">
          <img class='social' src="imgs/social/${a.img}" alt="${a.alt}">  
      </a>
    `
}
function genFooter(){
  for(i=0;i<len(footer);i++)
  $('footer').innerHTML+=footers(footer[i])
  $('footer').innerHTML+='<p class="copyright">Made with &#10084 <br> IEEE SB CEK © 2022</p>'
}

genFooter()

