/* Thumbnail for "परशुराम जी ने रावण का वध क्यों नहीं किया?" : one still frame (render with .kiro/artifacts/screenshots/thumb.js) */
const lay = mk => ({ sky:()=>mk().sky(), far:()=>mk().far(), mid:()=>mk().mid(), near:()=>mk().near() });
const TXT = (y,size,t,col) => `<text x="480" y="${y}" text-anchor="middle" font-size="${size}" style="font-family:'Mukta',sans-serif;font-weight:800;paint-order:stroke;stroke:#1a0a05;stroke-width:${size*.2}px;stroke-linejoin:round" fill="${col}">${t}</text>`;
/* clean YouTube thumbnail: fiery red storm sky, two big full-body characters with thick dark outlines, huge short text in the middle (text + outlines are added by thumb.js) */
VIDEO({
  title:'thumbnail', format:'long', target:3, music:false, sfx:false, ending:0, handheld:0, look:{rim:.8,bokeh:0,motes:0,warm:0,vig:.05},
  shots:[
    { line:`परशुराम रावण`, nocap:true, dur:3, cam:'fit',
      art:()=>wsky([[0,'#2a0610'],[.4,'#8a1018'],[.75,'#e0381a'],[1,'#ffa030']])+wglow(480,470,520,'#ffb040',.75)+wglow(480,300,300,'#ff5a2a',.35)+
        wclouds(70,'#3a0810',6,60,.6)+
        wbolt(330,-20,420,6,0,'#ffe1a0')+wbolt(640,-20,420,8,2.2,'#ffe1a0')+wbolt(480,-20,150,9,4.6,'#fff0c0')+
        wridge(470,40,'#1a0508',60)+wsparks(0,960,120,520,40,'#ffb45a'),
      cast:[
        {c:PARSHURAM, x:190, y:540, s:1.1, expr:'angry', props:{front:'parashu'}, acts:[[0,'stand'],[.1,'armUp']], gesture:false},
        {c:RAVAN, x:790, y:528, s:1.1, flip:true, expr:'angry', props:{front:'khadga'}, acts:[[0,'stand'],[.1,'fist']], gesture:false} ] }
  ] });
