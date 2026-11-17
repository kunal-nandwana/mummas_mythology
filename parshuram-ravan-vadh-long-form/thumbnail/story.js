/* Thumbnail for "परशुराम जी ने रावण का वध क्यों नहीं किया?" : one still frame (render with .kiro/artifacts/screenshots/thumb.js) */
const lay = mk => ({ sky:()=>mk().sky(), far:()=>mk().far(), mid:()=>mk().mid(), near:()=>mk().near() });
const TXT = (y,size,t,col) => `<text x="480" y="${y}" text-anchor="middle" font-size="${size}" style="font-family:'Mukta',sans-serif;font-weight:800;paint-order:stroke;stroke:#1a0a05;stroke-width:${size*.2}px;stroke-linejoin:round" fill="${col}">${t}</text>`;
/* v3: Parshuram (axe raised, big, left) vs kneeling Ravan (right), blood-red lightning storm, text top-right (text + outlines added by thumb3.js) */
VIDEO({
  title:'thumbnail', format:'long', target:3, music:false, sfx:false, ending:0, handheld:0, look:{rim:1,bokeh:0,motes:0,warm:0,vig:.12},
  shots:[
    { line:`परशुराम रावण`, nocap:true, dur:3, cam:'fit',
      art:()=>wsky([[0,'#1a0308'],[.35,'#7a0c14'],[.7,'#d42a16'],[1,'#ff9a2a']])+wglow(250,320,330,'#ff8a2a',.55)+wglow(720,440,320,'#ff3a14',.6)+
        wclouds(60,'#2a0508',6,70,.7)+
        wbolt(110,-20,300,5,0,'#ffe9b0')+wbolt(430,-20,230,7,2.2,'#ffe9b0')+wbolt(880,-20,330,6,3.6,'#fff0c0')+
        wridge(480,40,'#140305',60)+wsparks(0,960,80,540,70,'#ffb45a'),
      cast:[
        {c:PARSHURAM, x:200, y:560, s:1.3, expr:'angry', props:{front:'parashu'}, acts:[[0,'stand'],[.1,'armUp']], gesture:false},
        {c:RAVAN, x:745, y:560, s:1.05, flip:true, expr:'angry', props:{front:'khadga'}, acts:[[0,'kneel'],[.1,'kneel']], gesture:false} ] }
  ] });
