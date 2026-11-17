/* Thumbnail for "परशुराम जी ने रावण का वध क्यों नहीं किया?" : one still frame (render with .kiro/artifacts/screenshots/thumb.js) */
const lay = mk => ({ sky:()=>mk().sky(), far:()=>mk().far(), mid:()=>mk().mid(), near:()=>mk().near() });
const TXT = (y,size,t,col) => `<text x="480" y="${y}" text-anchor="middle" font-size="${size}" style="font-family:'Mukta',sans-serif;font-weight:800;paint-order:stroke;stroke:#1a0a05;stroke-width:${size*.2}px;stroke-linejoin:round" fill="${col}">${t}</text>`;
VIDEO({
  title:'thumbnail', format:'long', target:3, music:false, sfx:false, ending:0, handheld:0, look:{rim:1.3,bokeh:.6,motes:1,warm:.06,vig:.1},
  shots:[
    { line:`परशुराम रावण`, nocap:true, dur:3, mood:'hope', cam:'fit',
      ...lay(()=>vardanSky({gx:480,gy:300})),
      art:()=>`<defs><linearGradient id="thb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0410" stop-opacity="0"/><stop offset="1" stop-color="#0a0410" stop-opacity=".92"/></linearGradient></defs>`+
        wglow(480,300,260,'#ff8a2a',.55)+wglow(760,250,200,'#ffb060',.5)+wglow(190,250,180,'#ffb060',.4)+wglow(480,300,120,'#fff0c0',.7)+wsparks(300,660,120,460,24,'#ffb45a'),
      cast:[
        {c:PARSHURAM, x:185, y:640, s:1.5, expr:'angry', props:{front:'parashu'}, acts:[[0,'stand'],[.1,'rage']], gesture:false},
        {c:RAVAN, x:745, y:640, s:1.3, flip:true, expr:'angry', props:{front:'khadga'}, acts:[[0,'stand'],[.1,'rage']], gesture:false} ],
      front:()=>A('pulse:2',`<g transform="translate(520 120)">${wglow(0,0,110,'#ffd98a',.5)}<text text-anchor="middle" y="58" font-size="170" style="font-family:'Tiro',serif" fill="url(#gold)" stroke="#2a1000" stroke-width="7" paint-order="stroke">?</text></g>`) }
  ] });
