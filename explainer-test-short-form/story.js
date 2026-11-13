/* Explainer templates test: family tree, timeline, map route. Build: node tools/build.js explainer-test-short-form */
const exBg=()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(60,900)+`<circle cx="270" cy="470" r="330" fill="url(#saf)" opacity=".16"/>`;
VIDEO({
  title:'Explainer templates test', format:'short', target:36,
  keywords:['दशरथ','चार','युग','लंका'],
  shots:[
    { line:'अयोध्या के राजा दशरथ के चार पुत्र थे।', capTop:120, mood:'calm', fx:'dust', cam:'in',
      art:()=> exBg()+famTree(270,300,{n:'दशरथ',sub:'अयोध्या के राजा',hi:true,kids:[{n:'राम',hi:true,col:'#8fb4ff'},{n:'भरत'},{n:'लक्ष्मण'},{n:'शत्रुघ्न'}]},{gapY:300,leafW:130,r:40}) },
    { line:'चार युग — सतयुग, त्रेता, द्वापर और कलियुग।', capTop:120, mood:'hope', fx:'stars', cam:'up',
      art:()=> exBg()+timeline(270,260,[{t:'सतयुग',d:'सत्य का युग'},{t:'त्रेता',d:'राम का युग',hi:true},{t:'द्वापर',d:'कृष्ण का युग'},{t:'कलियुग',d:'आज का युग'}],{gap:190}) },
    { line:'राम का सफ़र — अयोध्या से चित्रकूट, पंचवटी और फिर लंका तक।', capTop:120, mood:'divine', fx:'sparks', cam:'in',
      art:()=> exBg()+mapRoute([{x:130,y:250,n:'अयोध्या'},{x:390,y:400,n:'चित्रकूट'},{x:150,y:560,n:'पंचवटी'},{x:400,y:720,n:'किष्किन्धा'},{x:190,y:870,n:'लंका'}],{step:.8,wiggle:34,label:'side'}) }
  ]
});
