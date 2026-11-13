/* =====================================================================
   CHARACTERS: costume presets for the rig. Use in a story like:
     cast:[ {c:KRISHNA, x:300, y:840, s:.9, acts:[[0,'stand'],[1.2,'bless']], expr:'serene', talk:true} ]
   Override any field per shot:  {c:BARBARIK, with:{cape:null}}
   Costume fields: skin top bottom shin foot sleeve skirt trim hair(long|bun|none) head(crown|feather|turban|band|big|jata|none)
     beard(white|black) mus cape quiver garland sash veil turban tilak earring big aura(gw|saf|gr|gb|gg) jewel
   ===================================================================== */
const BARBARIK  = {skin:'#8c6248', top:'#1f2640', bottom:'#8e1d24', cape:'#7a1820', quiver:true, head:'crown', tilak:true};
const KRISHNA   = {skin:'#3d5fa8', top:'#2a3f7a', bottom:'#e5b324', head:'feather', garland:'#f0e6d0', sash:'#e5b324', tilak:true};
const BRAHMIN   = {skin:'#8a5a3c', top:'#cdbf9e', bottom:'#d9d1bf', head:'turban', beard:'white', hair:'none', sash:'#c98a2e', trim:null, tilak:true, jewel:false};
const ARJUNA    = {skin:'#9a6a4a', top:'#e8e0cc', bottom:'#2a6a8a', head:'crown', quiver:true, mus:true, cape:'#1f4a6a'};
const BHIMA     = {skin:'#7a4e34', top:'#5a2a1a', bottom:'#a8501a', head:'band', mus:true, big:true};
const YUDHISHTHIRA = {skin:'#9a6a4a', top:'#f0e6d0', bottom:'#c8a020', head:'crown', beard:'black', garland:'#fff3c4'};
const NAKULA    = {skin:'#9a6a4a', top:'#2a6a3a', bottom:'#d9d1bf', head:'band'};
const SAHADEVA  = {skin:'#9a6a4a', top:'#6a2a6a', bottom:'#d9d1bf', head:'band'};
const GHATOTKACH= {skin:'#4a3a3a', top:'#2a1a1a', bottom:'#5a1a1a', head:'band', hair:'long', mus:true, big:true, cape:'#1a0a0a'};
const MOTHER    = {skin:'#8a5a3c', top:'#c8641e', bottom:'#c8641e', skirt:true, veil:'#e08a2a', hair:'long', jewel:true};   // Barbarik's mother
const DEVI      = {skin:'#c98a6a', top:'#c0202a', bottom:'#c0202a', skirt:true, veil:'#d63a2a', head:'crown', aura:'gr', jewel:true};
const SITA      = {skin:'#c98a6a', top:'#d6a22a', bottom:'#d6a22a', skirt:true, veil:'#f0c040', jewel:true};
const RAMA      = {skin:'#3a6a8a', top:'#c8a020', bottom:'#e5b324', head:'big', quiver:true, garland:'#f0e6d0', tilak:true};
const SHIVA     = {skin:'#7f93c4', top:'#7f93c4', bottom:'#d08a2a', shin:'#7f93c4', head:'mahadev', hair:'none', bare:true, ash:true, snake:true, tiger:true, rudra:true, third:true, big:true, trim:null, jewel:false, garland:'#6a3c1a', aura:'gb'};   // Mahadev: matted-hair topknot with Ganga + crescent, third eye, ash stripes, Vasuki, tiger skin, rudraksha
const MAHAKAL   = Object.assign({}, SHIVA, {skin:'#6a7db4', top:'#6a7db4', shin:'#6a7db4', fireHair:true, aura:'gr'});   // fierce form: flaming jata, third eye blazes when angry
const DUSHAN    = {skin:'#a63c22', top:'#a63c22', bottom:'#3a0e12', shin:'#8a2c1c', foot:'#2a1410', head:'demon', hair:'none', bare:true, spikes:true, tusks:true, big:true, eyeCol:'#ffd24a', rudra:'#2a2428', garland:'#e8dcc0', aura:'gr', trim:null, jewel:false, earring:false};   // horned asura with iron armour (use props:{front:'axe'})
const ASURA     = {skin:'#5e3a74', top:'#5e3a74', bottom:'#2a1018', shin:'#4a2a5e', head:'demon', hair:'none', bare:true, tusks:true, eyeCol:'#ffd24a', trim:null, jewel:false, earring:false, aura:'gr'};   // demon foot-soldier
const RISHI     = {skin:'#8a5a3c', top:'#d98a2a', bottom:'#d98a2a', head:'jata', beard:'white', jewel:false, trim:null};
const SOLDIER   = {skin:'#7a4e34', top:'#3a2a2a', bottom:'#5a3a2a', head:'band', jewel:false};
const VILLAGER  = {skin:'#8a5a3c', top:'#c8641e', bottom:'#efe9da', head:'turban', turban:'#ff8a1a', jewel:false, trim:null};
const DEVOTEE_F = {skin:'#8a5a3c', top:'#b8202a', bottom:'#b8202a', skirt:true, veil:'#e05a2a', jewel:false};
const CHANDRA   = {skin:'#eadcd0', top:'#f4f1e6', bottom:'#b9c6e6', head:'crown', crescent:true, garland:'#fff6dc', sash:'#c9d4f0', aura:'gw', tilak:true};
const DAKSHA    = {skin:'#9a6a4a', top:'#7a1a2a', bottom:'#e5b324', head:'big', beard:'white', mus:true, garland:'#ffd25e', sash:'#e5b324', tilak:true};
const ROHINI    = {skin:'#c98a6a', top:'#d8487a', bottom:'#d8487a', skirt:true, veil:'#f28ab4', head:'crown', jewel:true};
const NAKSHATRA = {skin:'#b67e5e', top:'#5a3a9a', bottom:'#5a3a9a', skirt:true, veil:'#8a6ad0', jewel:true};   // one of the 27 wives; recolour with:{top,bottom,veil}
const INDRA     = {skin:'#c98a6a', top:'#2a5aa8', bottom:'#e5b324', head:'big', garland:'#ffd25e', mus:true, aura:'gw'};
const DEVA      = {skin:'#c98a6a', top:'#e8e0cc', bottom:'#c8641e', head:'crown', garland:'#ffd25e'};

const CHARACTER_LIST = {BARBARIK, KRISHNA, BRAHMIN, ARJUNA, BHIMA, YUDHISHTHIRA, NAKULA, SAHADEVA, GHATOTKACH, MOTHER, DEVI, SITA, RAMA, SHIVA, MAHAKAL, DUSHAN, ASURA, RISHI, SOLDIER, VILLAGER, DEVOTEE_F,
  CHANDRA, DAKSHA, ROHINI, NAKSHATRA, INDRA, DEVA};
