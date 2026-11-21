
/*CODEC*/
const SECRET="道法自然:wox2:5f1c-93ab-e27d",WQ=97;
let _e=625341585;
for(let i=0;i<SECRET.length;i++)_e=Math.imul(_e^SECRET.charCodeAt(i),16777619)>>>0;
const BQ=[];
for(let i=0;i<WQ;i++){_e=(_e^(_e<<13))>>>0;_e=(_e^(_e>>>17))>>>0;_e=(_e^(_e<<5))>>>0;BQ.push(_e%94)}
const JME=new Uint8Array(WQ*94);
{let n=0;for(let t=0;t<94;t++)for(let o=0;o<WQ;o++)JME[n++]=(BQ[o]+t*29+((o^t)%11))%94}
function sze(s){
  let t=(2166136261^Math.imul(BQ[3]+1,2654435761))>>>0;
  let h=(16777619^(BQ[41]<<11))>>>0,a=0;
  for(let i=0;i<s.length;i++){const r=s.charCodeAt(i);
    t=Math.imul(t^r,16777619)>>>0;
    h=(Math.imul(h^r,1540483477)+BQ[a])>>>0;a=(a+1)%WQ}
  t=(t^s.length)>>>0;h=(h^(h>>>15))>>>0;h=Math.imul(h^s.length,668265261)>>>0;h=(h^(h>>>13))>>>0;
  return t.toString(16).padStart(8,"0")+h.toString(16).padStart(8,"0");
}
function aze(s,dir){
  const L=s.length,out=new Array(L);
  for(let i=0;i<L;i++){const c=s.charCodeAt(i),v=c-33;
    if(v>=0&&v<94){const k=JME[i%JME.length];let x=v+(dir>0?k:94-k);if(x>=94)x-=94;out[i]=x+33}else out[i]=c}
  let r="";for(let i=0;i<L;i+=8192)r+=String.fromCharCode.apply(null,out.slice(i,i+8192));
  return r;
}
function seal(text){return"WOX2"+sze(text)+"~"+aze(text,1)}
function unseal(raw){
  if(!raw.startsWith("WOX2")||raw[20]!=="~")throw new Error("ไม่ใช่ไฟล์เซฟ WOX2");
  const text=aze(raw.slice(21),-1);
  if(sze(text)!==raw.slice(4,20))throw new Error("ตราตรวจสอบไม่ตรง (ไฟล์อาจเสียหายหรือถูกแก้)");
  return text;
}
/*END*/

const $=s=>document.querySelector(s);
let state=null,base="save",edited=false;
const Yh=["body","mind","will","charm","luck"];
/* ป้าย tampered ที่รากของเซฟ: เกมใช้ตัดสินสิทธิ์ขึ้นทำเนียบ/แข่งออนไลน์/อวดของในแชท ตัวแก้ไขนี้จึงไม่ให้แก้หรือลบ */
const PROT=p=>p.length>=1&&p[0]==="tampered";
const Q=[["ชื่อ (ไทย)",["name","th"]],["ชื่อ (อังกฤษ)",["name","en"]],["เงิน (ตำลึง)",["money"],99999999],["ชื่อเสียง",["fame"]],["กรรม",["karma"]],["เกียรติยศ",["renown"]],["อายุ (เดือน)",["ageMonths"]],["สุขภาพ",["health"],100],["ลมปราณ",["qi"]],["ขั้นบำเพ็ญ (realm)",["realm"]],["ชั้น (layer)",["layer"]],["กาย",["stats","body"]],["ปัญญา",["stats","mind"]],["จิต",["stats","will"]],["เสน่ห์",["stats","charm"]],["โชค",["stats","luck"]],["ชื่อเสียงเสีย (infamy)",["infamy"]],["infamy ของสายตระกูล",["lineInfamy"]],["ระดับฐานะ (wealth)",["wealth"]],["ความเร็วบำเพ็ญ (pace)",["pace"]],["คูลดาวน์ทะลวง",["breakCooldown"]],["ปีโบนัส (bonusYears)",["bonusYears"]],["ยังมีชีวิตอยู่",["alive"]],["กำลังฝึกฝน",["cultivating"]]];
/* ดวงชะตา: 6 ระดับจาก zv/Oie ใน bundle เกม (ลำดับตามคะแนนตอนสร้างตัวละคร) */
const FATE=[["passing","ดาวผ่านฟ้า","A passing star",0],["support","ดาวค้ำชะตา","The steadying star",2],["falling","ดาวร่วง","The falling star",3],["dark","ดาวทมิฬ","The dark star",5],["rival","ดาวคู่ชะตา","The twin star",7],["lead","ดาวนำชะตา","The star the tale follows",10]];
const FATEM=new Map(FATE.map(f=>[f[0],f]));
/* กำเนิด: พื้นหลังตระกูล/โครงสร้าง/ราก/ธาตุ/เส้นเอ็น — ดึงจาก CRe,LRe,Tie,V_,Aie ใน bundle เกม */
const BG=[["poor","ครอบครัวยากจน","Poor family"],["middle","ครอบครัวปานกลาง","Middle-class family"],["rich","ตระกูลใหญ่","Wealthy clan"],["martial","ตระกูลยุทธภพ","Martial family"],["bandit","ตระกูลโจร","Bandit family"],["tribe","ชนเผ่าชาวเขา","Hill tribe"],["noble","ตระกูลขุนนาง","Noble family"],["royal","ราชสำนัก","Imperial family"],["fallen","ตระกูลตกอับ","Fallen clan"],["cultSmall","ตระกูลผู้ฝึกตนเล็ก","Minor cultivator clan"],["cultBig","ตระกูลผู้ฝึกตนใหญ่","Great cultivator clan"],["demonic","ตระกูลมาร","Demonic clan"]];
const STRUCT=[["both","พ่อแม่ครบ","Both parents"],["single","มีแค่พ่อหรือแม่","Single parent"],["orphan","กำพร้า","Orphan"],["adopted","ถูกรับเลี้ยง","Adopted"]];
const ROOTT=[["none",0,"ไม่มีรากปราณ","No spiritual root",0],["pseudo",1,"รากเทียม (5 ธาตุ)","Pseudo root (5 elements)",5],["four",2,"รากสี่ธาตุ","Four-element root",4],["three",4,"รากสามธาตุ","Three-element root",3],["two",6,"รากสองธาตุ","Two-element root",2],["heavenly",8,"รากสวรรค์ (1 ธาตุ)","Heavenly root (1 element)",1],["special",10,"รากธาตุพิเศษ","Special-element root",1]];
const ROOTM=new Map(ROOTT.map(r=>[r[0],{th:r[2],count:r[4]}]));
const ELEM=[["metal","ทอง","Metal"],["wood","ไม้","Wood"],["water","น้ำ","Water"],["fire","ไฟ","Fire"],["earth","ดิน","Earth"],["lightning","สายฟ้า","Lightning"],["ice","น้ำแข็ง","Ice"],["wind","ลม","Wind"]];
const EL5=ELEM.slice(0,5),ELX=ELEM.slice(5);
const SINEW=[["common","เส้นเอ็นสามัญ","Common sinews"],["sturdy","เส้นเอ็นแกร่ง","Sturdy sinews"],["fine","เส้นเอ็นยอดเยี่ยม","Fine sinews"],["tiger","เส้นเอ็นพยัคฆ์","Tiger sinews"],["dragon","เส้นเอ็นมังกร","Dragon sinews"]];

const get=p=>p.reduce((o,k)=>o==null?o:o[k],state);
const flash=(t,ok)=>{const m=$("#msg");m.textContent=t;m.className="sub "+(ok?"ok":"warn")};
const dirty=()=>{edited=true;flash("มีการแก้ไขที่ยังไม่บันทึก")};

/* ค่าสถานะของเกม = ผลรวมของ statSrc จึงปรับ statSrc.event ให้ผลรวมตรงกับค่าที่ตั้ง */
function setStat(n,t){
  const src=state.statSrc&&state.statSrc[n];
  if(src){const cur=Object.values(src).reduce((a,b)=>a+(+b||0),0);src.event=(src.event||0)+(t-cur)}
  state.stats[n]=t;(state.capSeen??={})[n]=Math.max(state.capSeen[n]??0,t);
  if(state.yearFrom&&n in state.yearFrom)state.yearFrom[n]=t;
}
/* ตั้งค่าที่ path ใดก็ได้ (ค่าสถานะจะผ่าน setStat ให้อัตโนมัติ) */
function setAt(p,v){
  if(PROT(p)||!p.length)return;
  if(p.length===2&&p[0]==="stats"&&typeof v==="number"&&state.stats&&typeof state.stats[p[1]]==="number")setStat(p[1],v);
  else{
    get(p.slice(0,-1))[p[p.length-1]]=v;
    if(p.length===1&&p[0]==="renown"&&typeof state.renownPeak==="number"&&typeof v==="number"&&v>state.renownPeak)state.renownPeak=v;
  }
  dirty();
}

/* ชนิดข้อมูล */
const TYPES=[["string","ข้อความ"],["number","ตัวเลข"],["bool","จริง/เท็จ"],["null","null"],["object","กลุ่ม {}"],["array","รายการ []"]];
const tof=v=>v===null?"null":Array.isArray(v)?"array":typeof v==="object"?"object":typeof v==="boolean"?"bool":typeof v==="number"?"number":"string";
function conv(v,t){
  const isO=v!==null&&typeof v==="object";
  switch(t){
    case"string":return v==null?"":isO?JSON.stringify(v):String(v);
    case"number":{const n=parseFloat(v);return Number.isFinite(n)?n:(v===true?1:0)}
    case"bool":return typeof v==="string"?!/^\s*(|0|false|no|null)\s*$/i.test(v):!!v;
    case"null":return null;
    case"object":return Array.isArray(v)?Object.assign({},v):isO?v:{};
    case"array":return Array.isArray(v)?v:isO?Object.values(v):[];
  }
}

/* ส่วนประกอบ UI */
function btn(text,cls,fn){const b=document.createElement("button");b.textContent=text;b.className=cls||"";b.onclick=fn;return b}
function arm(b,label,act){let t=0;b.textContent=label;b.onclick=()=>{if(t){clearTimeout(t);t=0;act();return}b.textContent="ยืนยัน?";t=setTimeout(()=>{t=0;b.textContent=label},2500)}}
function typeSel(cur,pick){
  const s=document.createElement("select");s.title="ชนิดข้อมูล";
  for(const[v,l]of TYPES){const o=document.createElement("option");o.value=v;o.textContent=l;if(v===cur)o.selected=true;s.appendChild(o)}
  if(pick)s.onchange=()=>pick(s.value);
  return s;
}
function row(label,hint,el){
  const d=document.createElement("div");d.className="row";
  const l=document.createElement("label");l.textContent=label;
  if(hint){const s=document.createElement("small");s.textContent=hint;l.appendChild(s)}
  d.append(l,el);return d;
}
/* ช่องกรอกตามชนิดของค่า */
function ctl(p,v){
  const t=tof(v);let el;
  if(PROT(p)||t==="null"){
    el=document.createElement("input");el.type="text";el.disabled=true;
    if(PROT(p)){el.value=JSON.stringify(v);el.title="ป้ายนี้เกมใช้ตัดสินสิทธิ์ขึ้นทำเนียบ/แข่งออนไลน์ จึงแก้ไม่ได้"}
    else{el.value="";el.placeholder="null · เปลี่ยนชนิดด้านขวาเพื่อใส่ค่า"}
    return el;
  }
  if(t==="bool"){el=document.createElement("input");el.type="checkbox";el.checked=v;el.onchange=()=>setAt(p,el.checked)}
  else if(t==="number"){
    el=document.createElement("input");el.type="number";el.step="any";el.value=v;
    el.onchange=()=>{const n=parseFloat(el.value);if(Number.isFinite(n))setAt(p,n);else el.value=get(p)};
  }else{
    const long=typeof v==="string"&&(v.length>60||v.includes("\n"));
    el=document.createElement(long?"textarea":"input");if(!long)el.type="text";
    el.value=v;el.onchange=()=>setAt(p,el.value);
  }
  return el;
}

/* ต้นไม้ข้อมูลทั้งหมด: ทุกโหนดแก้ค่า/เปลี่ยนชนิด/ลบได้ กลุ่มและรายการเพิ่มสมาชิกหรือแก้เป็น JSON ได้ */
function node(pv,k,path,refill,label){
  const v=pv[k],p=path.concat(Array.isArray(pv)?+k:k),lb=label??String(k);
  let el;
  const rebuild=()=>el.replaceWith(node(pv,k,path,refill,label));
  const del=()=>{
    if(Array.isArray(pv))pv.splice(+k,1);else delete pv[k];
    dirty();
    if(Array.isArray(pv)||label!=null)refill();else el.remove();
  };
  const retype=t=>{setAt(p,conv(pv[k],t));rebuild()};
  if(v!==null&&typeof v==="object")el=branch(v,p,lb,rebuild,del,retype);
  else{
    const w=document.createElement("div");w.className="ctl";
    w.appendChild(ctl(p,v));
    if(!PROT(p)){w.appendChild(typeSel(tof(v),retype));const x=btn("","x sm");arm(x,"✕",del);w.appendChild(x)}
    el=row(lb,"",w);
  }
  return el;
}
function branch(v,p,lb,rebuild,del,retype){
  const d=document.createElement("details"),s=document.createElement("summary");
  const cnt=()=>Array.isArray(v)?"["+v.length+"]":"{"+Object.keys(v).length+"}";
  const c=document.createElement("span");c.textContent=cnt();
  s.append(lb+" ",c);d.appendChild(s);
  let done=false;
  d.ontoggle=()=>{
    if(!d.open||done)return;done=true;
    const box=document.createElement("div");
    const refill=()=>{fill(box,v,p);c.textContent=cnt()};
    if(!PROT(p))d.appendChild(tools(v,p,refill,{rebuild,del,retype}));
    d.appendChild(box);refill();
  };
  return d;
}
function tools(v,p,refill,ops){
  const wrap=document.createElement("div");
  const bar=document.createElement("div");bar.className="tools";
  const isArr=Array.isArray(v);
  const kin=document.createElement("input");kin.type="text";kin.placeholder="ชื่อคีย์ใหม่";
  const ts=typeSel("string");
  const add=btn("+ เพิ่ม","sm",()=>{
    let name=null;
    if(!isArr){
      name=kin.value.trim();
      if(!name)return flash("ใส่ชื่อคีย์ก่อน");
      if(Object.prototype.hasOwnProperty.call(v,name))return flash("มีคีย์นี้อยู่แล้ว");
      if(!p.length&&name==="tampered")return flash("คีย์ tampered เพิ่มหรือแก้ไม่ได้");
    }
    const nv=conv(null,ts.value);
    if(isArr)v.push(nv);else v[name]=nv;
    kin.value="";dirty();refill();
  });
  if(!isArr)bar.appendChild(kin);
  bar.append(ts,add);
  const jbox=document.createElement("div");
  if(ops){
    bar.appendChild(btn("แก้เป็น JSON","ghost sm",()=>{
      if(jbox.childElementCount){jbox.textContent="";return}
      const txt=JSON.stringify(v,null,1);
      if(txt.length>1500000)return flash("กลุ่มนี้ใหญ่เกินกว่าจะแก้เป็น JSON ทั้งก้อน แก้ทีละคีย์แทน");
      const ta=document.createElement("textarea");ta.className="js";ta.value=txt;
      const ap=btn("ใช้ค่านี้","sm",()=>{
        let t;try{t=JSON.parse(ta.value)}catch(e){return flash("JSON ผิดรูปแบบ: "+e.message)}
        setAt(p,t);ops.rebuild();
      });
      jbox.append(ta,ap);
    }));
    const ts2=typeSel(tof(v),ops.retype);bar.appendChild(ts2);
    const x=btn("","x sm");arm(x,"ลบทั้งกลุ่ม",ops.del);bar.appendChild(x);
  }
  wrap.append(bar,jbox);return wrap;
}
function fill(box,val,path){
  box.textContent="";
  const keys=Object.keys(val);let shown=0;const LIM=100;
  const more=document.createElement("button");more.className="ghost";
  const refill=()=>fill(box,val,path);
  function next(){
    const end=Math.min(keys.length,shown+LIM);
    for(;shown<end;shown++)box.insertBefore(node(val,keys[shown],path,refill),more);
    more.textContent="แสดงเพิ่ม ("+(keys.length-shown)+")";
    if(shown>=keys.length)more.remove();
  }
  more.onclick=next;box.appendChild(more);next();
}
function search(q){
  const out=$("#res");out.textContent="";q=q.trim().toLowerCase();
  if(!q){
    const box=document.createElement("div");
    const refill=()=>fill(box,state,[]);
    out.append(tools(state,[],refill,null),box);refill();return;
  }
  const again=()=>search($("#q").value);
  let n=0,seen=0;
  (function walk(v,p){
    if(n>=150||seen>400000)return;
    if(v!==null&&typeof v==="object"){for(const k of Object.keys(v)){walk(v[k],p.concat(Array.isArray(v)?+k:k));if(n>=150)return}return}
    seen++;
    if(p.join(".").toLowerCase().includes(q)||String(v).toLowerCase().includes(q)){
      n++;out.appendChild(node(get(p.slice(0,-1)),p[p.length-1],p.slice(0,-1),again,p.join(".")));
    }
  })(state,[]);
  if(!n)out.textContent="ไม่พบ";else if(n>=150){const s=document.createElement("p");s.className="sub";s.textContent="แสดง 150 รายการแรก ลองค้นให้เจาะจงขึ้น";out.appendChild(s)}
}

/* แท็บแก้ไขด่วน */
/* ตารางพรสวรรค์จริง ดึงจากตัวแปร Hf ใน c-GZJ7HVMK.js (ในไฟล์เกม app-*.js เรียกว่า Ci) ทั้งหมด 76 รายการ
   แต่ละแถว: [รหัส, ดี(1)/ร้าย(0), ระดับ(tier), ข้ามขีดจำกัด(crossing), fx, ชื่อไทย, ชื่ออังกฤษ] */
const TAL=[
  ["martialPeak",1,3,1,{},"ยอดยุทธ์","Peak of the martial way"],
  ["dragonFocus",1,3,1,{},"สมาธิดั่งมังกร","Focus of the dragon"],
  ["memory",1,1,0,{"mind":10},"ความจำดี","Sharp memory"],
  ["sturdy",1,1,0,{"body":10},"ร่างแข็งแรง","Sturdy body"],
  ["silver",1,1,0,{"charm":10},"ปากหวาน","Silver tongue"],
  ["heavenEye",1,2,0,{"luck":10},"ดวงตาสวรรค์","Heavenly eyes"],
  ["pureYin",1,2,0,{},"กายหยินบริสุทธิ์","Pure Yin body"],
  ["daoHeart",1,2,0,{"will":10},"หัวใจเต๋ามั่นคง","Steadfast Dao heart"],
  ["ancientBody",1,4,0,{"body":25},"กายเทพโบราณ","Ancient divine body"],
  ["dragonBlood",1,4,0,{"body":10,"will":10},"สายเลือดมังกร","Dragon bloodline"],
  ["shortLived",0,2,0,{},"อายุสั้น","Short-lived"],
  ["unlucky",0,1,0,{"luck":-20},"ดวงตกต่ำ","Ill-starred"],
  ["frail",0,2,0,{"body":-15},"ร่างอ่อนแอ","Frail"],
  ["hothead",0,1,0,{"will":-10},"ใจร้อน","Hot-headed"],
  ["doomStar",0,2,0,{"luck":-25},"ดาวหายนะ","Star of calamity"],
  ["quickWit",1,1,0,{"mind":5},"ปฏิภาณว่องไว","Quick wit"],
  ["herculean",1,1,0,{"body":5},"พละกำลังมหาศาล","Herculean strength"],
  ["ironWill",1,1,0,{"will":10},"ใจหินผา","Iron will"],
  ["peerlessBeauty",1,2,0,{"charm":20},"งามล่มเมือง","Peerless beauty"],
  ["heavensFavor",1,2,0,{"luck":5},"ฟ้าโปรดปราน","Heaven's favourite"],
  ["quickHealer",1,1,0,{},"บาดแผลหายไว","Quick healer"],
  ["merchantMind",1,1,0,{"mind":5},"หัวการค้า","Merchant's mind"],
  ["fastLearner",1,2,0,{},"เรียนรู้ไว","Fast learner"],
  ["calmMind",1,2,0,{"will":5},"จิตสงบนิ่ง","Still mind"],
  ["longevity",1,2,0,{},"ชะตาอายุยืน","Long-lived"],
  ["strongSoul",1,2,0,{"mind":5},"วิญญาณแกร่งกล้า","Mighty soul"],
  ["sixthSense",1,2,0,{"luck":10},"สัมผัสที่หก","Sixth sense"],
  ["poisonProof",1,2,0,{"body":5},"กายต้านพิษ","Poison-proof body"],
  ["bornLeader",1,2,0,{"charm":10,"will":5},"ผู้นำโดยกำเนิด","Born leader"],
  ["martialBones",1,2,0,{"body":10},"กระดูกยุทธ์","Martial bones"],
  ["swordBone",1,3,0,{"body":5,"will":5},"กระดูกกระบี่","Sword bones"],
  ["pureYang",1,2,0,{"body":5},"กายหยางบริสุทธิ์","Pure Yang body"],
  ["innateQi",1,4,0,{},"กายปราณกำเนิด","Innate qi body"],
  ["phoenixBody",1,4,0,{"body":10},"กายหงส์อมตะ","Undying phoenix body"],
  ["demonBlood",1,3,0,{"body":15},"สายเลือดอสูร","Demon bloodline"],
  ["lazy",0,2,0,{},"เกียจคร้าน","Idle"],
  ["sickly",0,1,0,{"body":-5},"ขี้โรค","Sickly"],
  ["slowWit",0,1,0,{"mind":-15},"หัวช้า","Slow-witted"],
  ["ugly",0,1,0,{"charm":-20},"หน้าตาอัปลักษณ์","Ill-favoured face"],
  ["blockedMeridians",0,2,0,{},"เส้นลมปราณอุดตัน","Blocked meridians"],
  ["fragileHeart",0,1,0,{"will":-10},"ใจเปราะบาง","Fragile heart"],
  ["spendthrift",0,1,0,{},"มือเติบ","Spendthrift"],
  ["heartDemon",0,2,0,{},"มารในใจ","Demon in the heart"],
  ["coward",0,1,0,{"will":-15},"ขี้ขลาด","Faint-hearted"],
  ["bloodCurse",0,2,0,{"luck":-10},"คำสาปสายเลือด","Blood curse"],
  ["jinxed",0,1,0,{},"เคราะห์ซ้ำกรรมซัด","Jinxed"],
  ["goldenTouch",1,1,0,{},"ทองคำไหลมาเทมา","Golden touch"],
  ["kindHeart",1,1,0,{"charm":5},"ใจบุญ","Kind heart"],
  ["risingStar",1,1,0,{},"ดาวรุ่งพุ่งแรง","Rising star"],
  ["diligentDisciple",1,1,0,{"will":5},"ศิษย์ขยัน","Diligent disciple"],
  ["toughHide",1,1,0,{},"หนังเหนียว","Tough hide"],
  ["ironBody",1,3,0,{"body":10},"กายเหล็กไหล","Iron body"],
  ["hawkEye",1,1,0,{"luck":5,"mind":5},"สายตาเหยี่ยว","Hawk's eye"],
  ["heavenlyVoice",1,2,0,{"charm":10},"เสียงสวรรค์","Heavenly voice"],
  ["oldSoul",1,2,0,{"mind":10,"will":5},"วิญญาณเก่าแก่","Old soul"],
  ["frostBody",1,3,0,{},"กายวิญญาณน้ำแข็ง","Frost spirit body"],
  ["flameBody",1,3,0,{"body":5},"กายธาตุเพลิง","Flame body"],
  ["spotless",1,2,0,{},"กายไร้มลทิน","Spotless body"],
  ["warriorHeart",1,2,0,{"body":5,"will":5},"ใจนักรบ","Warrior's heart"],
  ["enlightenedMind",1,3,0,{"mind":15},"ปัญญาญาณ","Enlightened mind"],
  ["survivor",1,2,0,{"luck":5},"ผู้รอดชีวิต","Survivor"],
  ["emperorStar",1,4,0,{"charm":15,"luck":10},"ดวงจักรพรรดิ","Emperor's star"],
  ["pastLife",1,4,0,{"mind":10},"ความทรงจำชาติก่อน","Memories of a past life"],
  ["divineBlood",1,4,0,{"body":5,"mind":5,"will":5,"charm":5,"luck":5},"สายเลือดเทพ","Divine bloodline"],
  ["winebibber",0,1,0,{},"ติดสุรา","Wine-bibber"],
  ["thinSkin",0,1,0,{},"กายเปราะ","Thin-skinned"],
  ["coldHeart",0,1,0,{"charm":-5},"ใจทมิฬ","Cold heart"],
  ["obscure",0,1,0,{},"อาภัพชื่อเสียง","Doomed to obscurity"],
  ["forgetful",0,1,0,{"mind":-10},"ขี้หลงขี้ลืม","Forgetful"],
  ["coldBody",0,1,0,{},"กายเย็นชืด","Sluggish body"],
  ["anemic",0,1,0,{"body":-10},"เลือดจาง","Thin-blooded"],
  ["sharpTongue",0,1,0,{"charm":-15},"ปากเสีย","Sharp tongue"],
  ["scatteredMind",0,1,0,{"will":-5},"จิตฟุ้งซ่าน","Scattered mind"],
  ["greedy",0,1,0,{},"ใจโลภ","Greedy"],
  ["clashStar",0,1,0,{"luck":-5},"ดวงชง","Clashing star"],
  ["lame",0,1,0,{"body":-10},"ขาพิการ","Lame leg"]
].map(([id,g,tier,x,fx,th,en])=>({id,good:!!g,tier,crossing:!!x,fx,th,en}));
const TALM=new Map(TAL.map(t=>[t.id,t]));
/* คู่ที่อยู่ร่วมกันไม่ได้ (ตัวแปร joe/$Re ในไฟล์เกม) เกมจะถอดตัวที่ขัดกันออกเมื่อได้พรสวรรค์ใหม่ */
const CONF=[["silver","sharpTongue"],["sturdy","frail"],["sturdy","anemic"],["ancientBody","frail"],["herculean","frail"],["memory","forgetful"],["memory","slowWit"],["quickWit","slowWit"],["quickWit","forgetful"],["enlightenedMind","slowWit"],["heavenEye","unlucky"],["heavenEye","doomStar"],["heavensFavor","jinxed"],["heavensFavor","unlucky"],["emperorStar","doomStar"],["longevity","shortLived"],["phoenixBody","shortLived"],["peerlessBeauty","ugly"],["heavenlyVoice","ugly"],["ironWill","coward"],["ironWill","fragileHeart"],["daoHeart","fragileHeart"],["strongSoul","fragileHeart"],["warriorHeart","coward"],["bornLeader","coward"],["calmMind","hothead"],["calmMind","heartDemon"],["quickHealer","sickly"],["quickHealer","anemic"],["spotless","sickly"],["poisonProof","sickly"],["toughHide","thinSkin"],["ironBody","thinSkin"],["fastLearner","lazy"],["merchantMind","spendthrift"],["goldenTouch","spendthrift"],["kindHeart","coldHeart"],["risingStar","obscure"],["frostBody","flameBody"],["pureYin","pureYang"],["innateQi","blockedMeridians"]];
const KNOWN_T=TAL.map(t=>t.id);
const tconf=(a,b)=>CONF.some(([x,y])=>x===a&&y===b||x===b&&y===a);
/* ช่อง: ใช้เฉพาะเซฟที่ talentRules==="slots" · ดีสูงสุด min(8, 5+talentSlotsUp) · ร้ายสูงสุด 5 · พรสวรรค์ crossing ไม่นับช่อง */
const slotsOn=()=>state.talentRules==="slots";
const goodMax=()=>Math.min(8,5+(+state.talentSlotsUp||0)),ILL_MAX=5;
const tCount=(good,skip)=>(state.talents||[]).filter(id=>!(skip&&skip.includes(id))).map(id=>TALM.get(id)).filter(t=>t&&!t.crossing&&t.good===good).length;
const tTag=t=>t.good?"ดี ★"+t.tier:"ร้าย "+t.tier;
/* ปรับค่าสถานะตาม fx เหมือน Zc ของเกม: แหล่ง talent ไม่ถูกคูณตัวคูณ (อยู่ใน fixed) · ค่าไม่ต่ำกว่า 1 · ไม่เกินเพดาน capSeen (เว้นแต่เกินอยู่แล้ว)
   ส่วนที่เปลี่ยนจริงบันทึกลง statSrc.<stat>.talent */
function talentFx(t,sign){
  for(const[n,a]of Object.entries(t.fx||{})){
    if(!state.stats||typeof state.stats[n]!=="number")continue;
    const r=state.stats[n],cap=state.capSeen&&state.capSeen[n];
    const hi=Math.max(typeof cap==="number"?cap:Infinity,r);
    const nv=Math.min(Math.max(r+sign*a,1),hi),d=nv-r;
    if(!d)continue;
    state.stats[n]=nv;
    const src=((state.statSrc??={})[n]??={});src.talent=(src.talent||0)+d;
    if(state.yearFrom&&n in state.yearFrom)state.yearFrom[n]+=d;
  }
}
function findTalent(v){
  v=v.trim();if(!v)return null;const lo=v.toLowerCase();
  return TALM.get(v)||TAL.find(t=>t.id.toLowerCase()===lo||t.th===v||t.en.toLowerCase()===lo)||null;
}
function addTalent(raw){
  const t=findTalent(raw);
  if(!t)return flash("ไม่พบ “"+raw.trim()+"” ในตารางพรสวรรค์ของเกม จึงไม่เพิ่มให้ (รหัสที่เกมไม่รู้จักอาจทำให้เซฟพัง)");
  if(state.talents.includes(t.id))return flash("มี「"+t.th+"」อยู่แล้ว");
  const clash=state.talents.filter(o=>tconf(t.id,o));
  if(!t.good&&clash.some(o=>TALM.get(o)?.good))
    return flash("「"+t.th+"」ขัดกับพรสวรรค์ดี「"+clash.map(o=>TALM.get(o)?.th||o).join("、")+"」ที่มีอยู่ ลบตัวนั้นก่อนถ้าต้องการเพิ่ม");
  if(slotsOn()&&!t.crossing){
    if(t.good&&tCount(true,clash)>=goodMax())
      return flash("ช่องพรสวรรค์ดีเต็มแล้ว ("+goodMax()+"/"+goodMax()+") ลบตัวเดิมก่อน หรือเพิ่ม talentSlotsUp (สูงสุดช่องที่ 8) ในแท็บ “ข้อมูลทั้งหมด”");
    if(!t.good&&tCount(false,clash)>=ILL_MAX)
      return flash("พรสวรรค์ร้ายเต็ม "+ILL_MAX+" แล้ว ลบตัวเดิมก่อน");
  }
  /* เกมถอดตัวที่ขัดกันออกพร้อมคืนค่า fx ก่อนใส่ตัวใหม่ (Sue) */
  for(const o of clash){const ot=TALM.get(o);if(ot)talentFx(ot,-1);state.talents.splice(state.talents.indexOf(o),1)}
  state.talents.push(t.id);talentFx(t,1);
  dirty();
  flash("เพิ่ม「"+t.th+"」แล้ว"+(Object.keys(t.fx).length?" · ปรับค่าสถานะตาม fx และ statSrc.*.talent ให้":"")+(clash.length?" · ถอด「"+clash.map(o=>TALM.get(o)?.th||o).join("、")+"」ที่ขัดกันออก":""),true);
  quick();
}
function removeTalent(i){
  const id=state.talents[i],t=TALM.get(id);
  if(t)talentFx(t,-1);
  state.talents.splice(i,1);
  dirty();
  flash("ลบ「"+(t?t.th:id)+"」แล้ว"+(t&&Object.keys(t.fx).length?" · คืนค่าสถานะตาม fx ให้":"")+(t?"":" · รหัสนี้ไม่อยู่ในตาราง จึงไม่มี fx ให้คืน"),true);
  quick();
}
function talentsUI(box){
  if(!Array.isArray(state.talents))return;
  const w=document.createElement("div");w.className="row";w.style.gridTemplateColumns="1fr";
  const lb=document.createElement("label");lb.textContent="พรสวรรค์ (talents) · กดชื่อเพื่อลบ";
  const sm=document.createElement("small");
  sm.textContent=slotsOn()?"ช่องดี "+tCount(true)+"/"+goodMax()+" · ร้าย "+tCount(false)+"/"+ILL_MAX:"เซฟรุ่นเก่า (talentRules ไม่ใช่ slots) เกมไม่จำกัดช่อง";
  lb.appendChild(sm);w.appendChild(lb);
  const chips=document.createElement("div");chips.style.cssText="display:flex;flex-wrap:wrap;gap:6px";
  state.talents.forEach((id,i)=>{
    const t=TALM.get(id),b=document.createElement("button");b.className="ghost";
    b.textContent=(t?t.th+" · "+tTag(t)+(t.crossing?" · crossing":""):id+" · ไม่อยู่ในตาราง")+" ✕";
    b.title=id;b.onclick=()=>removeTalent(i);chips.appendChild(b);
  });
  w.appendChild(chips);
  const add=document.createElement("div");add.style.cssText="display:flex;gap:6px";
  const inp=document.createElement("input");inp.type="text";inp.setAttribute("list","tl");inp.placeholder="รหัสหรือชื่อ เช่น heavenEye / ดวงตาสวรรค์";
  const dl=document.createElement("datalist");dl.id="tl";
  TAL.forEach(t=>{const o=document.createElement("option");o.value=t.id;o.label=t.th+" · "+tTag(t);dl.appendChild(o)});
  const ab=document.createElement("button");ab.textContent="เพิ่ม";
  ab.onclick=()=>{if(inp.value.trim())addTalent(inp.value)};
  add.append(inp,dl,ab);w.appendChild(add);
  const h=document.createElement("small");h.style.cssText="color:var(--mut);font-size:12px";
  h.textContent="รายการนี้ดึงจากตารางพรสวรรค์ในไฟล์เกมจริง ("+TAL.length+" รายการ) รับเฉพาะรหัสที่เกมรู้จัก · เพิ่ม/ลบจะปรับค่าสถานะตาม fx และ statSrc.*.talent ให้ ส่วนผลอื่นของพรสวรรค์ (เช่น อายุขัย โชคเหตุการณ์ ความเร็วบำเพ็ญ) เกมคำนวณจากรายการนี้เองตอนเล่น · พรสวรรค์ที่ขัดกันจะถอดตัวเดิมออกให้เหมือนในเกม · ลองกับไฟล์สำเนาก่อน";
  w.appendChild(h);box.appendChild(w);
}
/* select ที่กันค่าที่เกมไม่รู้จัก (รหัสแปลก ๆ ในเซฟยังเห็นและยังแก้ได้) */
function mkSel(rows,cur,title){
  const s=document.createElement("select");s.style.cssText="flex:1 1 9em;width:auto;max-width:none";s.title=title||"";
  if(cur!=null&&cur!==""&&!rows.some(r=>r[0]===String(cur))){const o=document.createElement("option");o.value=String(cur);o.textContent=String(cur)+" · ในเซฟ";s.appendChild(o)}
  for(const[v,th,en]of rows){const o=document.createElement("option");o.value=v;o.textContent=th+(en?" · "+en:"");s.appendChild(o)}
  s.value=cur==null?"":String(cur);return s;
}
/* กำเนิด: cls/structure = พื้นหลังตระกูล · root = {type,elements,purity,known} · sinew = เส้นเอ็น */
function originUI(box){
  const w=document.createElement("div");w.className="row";w.style.gridTemplateColumns="1fr";
  const lb=document.createElement("label");lb.textContent="กำเนิด · พื้นหลัง / ราก / เส้นเอ็น";
  const sm=document.createElement("small");sm.textContent="ค่าตอนเกิด เกมใช้คำนวณศักยภาพและเรื่องราวส่วนตัว · แก้แล้วติดป้ายชีวิตที่ถูกแก้ไข";
  lb.appendChild(sm);w.appendChild(lb);
  const r1=document.createElement("div");r1.className="ctl";
  const bgSel=mkSel(BG,state.cls,"พื้นหลังตระกูล (cls)");bgSel.onchange=()=>setAt(["cls"],bgSel.value);
  const stSel=mkSel(STRUCT,state.structure,"โครงสร้างครอบครัว (structure)");stSel.onchange=()=>setAt(["structure"],stSel.value);
  r1.append(bgSel,stSel);w.appendChild(r1);
  const rootObj=state.root&&typeof state.root==="object"&&!Array.isArray(state.root)?state.root:null;
  const curType=rootObj&&rootObj.type!=null?String(rootObj.type):"none";
  const r2=document.createElement("div");r2.className="ctl";
  const rtSel=mkSel(ROOTT,curType,"ระดับรากปราณ (root.type)");
  rtSel.onchange=()=>{
    if(!state.root||typeof state.root!=="object"||Array.isArray(state.root))state.root={};
    const v=rtSel.value,cnt=ROOTM.get(v)?.count||0,pool=v==="special"?ELX:EL5;
    setAt(["root","type"],v==="none"?null:v);
    setAt(["root","elements"],v==="none"?[]:pool.slice(0,cnt).map(e=>e[0]));
    flash("เปลี่ยนรากปราณเป็น「"+(ROOTM.get(v)?.th||v)+"」· ปรับธาตุให้ตรงจำนวนแล้ว",true);
    quick();
  };
  const pur=document.createElement("input");pur.type="number";pur.step="any";pur.placeholder="ความบริสุทธิ์";pur.title="ความบริสุทธิ์ของราก 1–100";
  pur.value=rootObj&&typeof rootObj.purity==="number"?rootObj.purity:"";
  pur.onchange=()=>{
    const n=parseFloat(pur.value);
    if(!Number.isFinite(n)){pur.value=rootObj&&typeof rootObj.purity==="number"?rootObj.purity:"";return}
    if(!state.root||typeof state.root!=="object"||Array.isArray(state.root))state.root={};
    setAt(["root","purity"],n);
  };
  const kn=document.createElement("input");kn.type="checkbox";kn.title="รากถูกเปิดเผย/รู้จักแล้ว (root.known)";kn.checked=!!(rootObj&&rootObj.known);
  kn.onchange=()=>{
    if(!state.root||typeof state.root!=="object"||Array.isArray(state.root))state.root={};
    setAt(["root","known"],kn.checked);
  };
  r2.append(rtSel,pur,kn);w.appendChild(r2);
  const need=ROOTM.get(rtSel.value)?.count||0,pool=rtSel.value==="special"?ELX:EL5;
  const curEls=Array.isArray(rootObj&&rootObj.elements)?rootObj.elements:[];
  const r3=document.createElement("div");r3.className="ctl";r3.style.flexWrap="wrap";
  const cap=document.createElement("label");cap.style.cssText="flex:1 1 100%;font-size:12px;color:var(--mut)";
  const capTxt=()=>"ธาตุของราก "+curEls.filter(x=>pool.some(e=>e[0]===x)).length+"/"+need+(need?" · เลือกให้ครบตามระดับราก":"");
  cap.textContent=capTxt();r3.appendChild(cap);
  const boxes=new Map();
  for(const[id,th,en]of pool){
    const lab=document.createElement("label");lab.style.cssText="display:inline-flex;gap:4px;align-items:center;font-size:13px";
    const cb=document.createElement("input");cb.type="checkbox";cb.checked=curEls.includes(id);cb.style.cssText="width:18px;height:18px;min-height:0";
    cb.title=en;
    cb.onchange=()=>{
      const arr=pool.filter(x=>boxes.get(x[0]).checked).map(x=>x[0]);
      if(arr.length>need){cb.checked=false;flash("รากระดับนี้รับได้ "+need+" ธาตุเท่านั้น",false);return}
      if(!state.root||typeof state.root!=="object"||Array.isArray(state.root))state.root={};
      setAt(["root","elements"],arr);cap.textContent=capTxt();
    };
    boxes.set(id,cb);lab.append(cb,th);r3.appendChild(lab);
  }
  w.appendChild(r3);
  const r4=document.createElement("div");r4.className="ctl";
  const swLb=document.createElement("label");swLb.textContent="เส้นเอ็น";swLb.style.cssText="flex:0 0 4em;font-size:13px";
  const swSel=mkSel(SINEW,state.sinew,"เส้นเอ็น (sinew)");swSel.onchange=()=>setAt(["sinew"],swSel.value);
  r4.append(swLb,swSel);w.appendChild(r4);
  const h=document.createElement("small");h.style.cssText="color:var(--mut);font-size:12px";
  h.textContent="รหัส/ชื่อตรงกับตารางในไฟล์เกม: พื้นหลัง 12 แบบ · โครงสร้าง 4 แบบ · ราก 7 ระดับ · ธาตุ 5+3 · เส้นเอ็น 5 แบบ · ตัวเลขในวงเล็บคือคะแนนสร้างตัวละคร (ใช้เช็กความสมเหตุสมผลเท่านั้น)";
  w.appendChild(h);box.appendChild(w);
}
/* แก้ดวงชะตา: เกมเก็บ {tier,id} — tier คือระดับดาวที่โชว์/ใช้ตั้งเงื่อนไข, id คือเรื่องราวที่ผูกไว้ */
function fateUI(box){
  const w=document.createElement("div");w.className="row";w.style.gridTemplateColumns="1fr";
  const lb=document.createElement("label");lb.textContent="ดวงชะตา (destiny)";
  const sm=document.createElement("small");
  sm.textContent="แรงผลัก ไม่ใช่คำตัดสิน · เปลี่ยนระดับดาวได้ แต่เรื่องราวที่ผูกไว้ (id) ยังเป็นของเดิมจนกว่าจะแก้ช่องด้านล่าง";
  lb.appendChild(sm);w.appendChild(lb);
  const row=document.createElement("div");row.className="ctl";
  const sel=document.createElement("select");sel.style.cssText="flex:0 0 11em;width:auto;max-width:none";sel.title="ระดับดวงชะตา";
  const none=document.createElement("option");none.value="";none.textContent="— ยังไม่มี —";sel.appendChild(none);
  for(const[id,th,en,cost]of FATE){const o=document.createElement("option");o.value=id;o.textContent=th+" · "+en+(cost?" ("+cost+")":"");sel.appendChild(o)}
  const cur=state.destiny&&typeof state.destiny==="object"&&!Array.isArray(state.destiny)?state.destiny.tier:null;
  sel.value=FATEM.has(cur)?cur:"";
  sel.onchange=()=>{
    if(!state.destiny||typeof state.destiny!=="object"||Array.isArray(state.destiny))state.destiny={};
    setAt(["destiny","tier"],sel.value||null);
    flash(sel.value?"เปลี่ยนดวงชะตาเป็น「"+FATEM.get(sel.value)[1]+"」แล้ว":"ลบระดับดวงชะตา",true);
  };
  const id=document.createElement("input");id.type="text";id.placeholder="รหัสเรื่องราว (story id) · เว้นไว้ = ไม่ผูกเรื่อง";
  id.value=state.destiny&&typeof state.destiny==="object"&&!Array.isArray(state.destiny)&&state.destiny.id!=null?String(state.destiny.id):"";
  id.title="รหัสเรื่องราวดวงชะตาที่เกมจะเล่น เว้นไว้ให้เป็น null";
  id.onchange=()=>{
    if(!state.destiny||typeof state.destiny!=="object"||Array.isArray(state.destiny))state.destiny={};
    setAt(["destiny","id"],id.value.trim()||null);
    flash(id.value.trim()?"ผูกเรื่องราวดวงชะตาเป็น "+id.value.trim():"ยกเลิกการผูกเรื่องราวดวงชะตา",true);
  };
  row.append(sel,id);w.appendChild(row);
  const h=document.createElement("small");h.style.cssText="color:var(--mut);font-size:12px";
  h.textContent="ข้อมูลจากไฟล์เกมจริง: passing/support/falling/dark/rival/lead (ค่าในวงเล็บคือคะแนนตอนสร้างตัวละคร) · ระดับ dark ยังถูกเกมใช้ตัดสินเส้นทางมืด · แก้แล้วจะติดป้ายชีวิตที่ถูกแก้ไขเหมือนค่าอื่น";
  w.appendChild(h);box.appendChild(w);
}
function quick(){
  const box=$("#p1");box.textContent="";
  const cap=n=>state.capSeen&&state.capSeen[n];
  const maxStats=()=>{for(const n of Yh)if(state.stats&&n in state.stats&&cap(n)!=null)setStat(n,cap(n))};
  const top=document.createElement("div");top.style.cssText="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px";
  const mk=(t,f)=>{const b=document.createElement("button");b.textContent=t;b.onclick=()=>{f();dirty();quick()};top.appendChild(b)};
  mk("ค่าสถานะทั้ง 5 → สูงสุด",maxStats);
  mk("เต็มทุกอย่าง",()=>{maxStats();for(const[,p,m]of Q)if(m!=null&&typeof get(p)==="number")setAt(p,m)});
  box.appendChild(top);originUI(box);fateUI(box);talentsUI(box);
  const list=Q.slice();let cur="",shownG="";const GRP={"ชื่อ (ไทย)":"ตัวตน","เงิน (ตำลึง)":"ทรัพย์และชื่อเสียง","อายุ (เดือน)":"ชีวิตและการบำเพ็ญ","กาย":"ค่าสถานะ 5 ด้าน","ชื่อเสียงเสีย (infamy)":"อื่น ๆ"};
  if(state.personality&&typeof state.personality==="object"&&!Array.isArray(state.personality))
    for(const k of Object.keys(state.personality))list.push(["บุคลิก · "+k,["personality",k]]);
  for(const[lb,p,m]of list){
    if(GRP[lb])cur=GRP[lb];else if(lb.startsWith("บุคลิก"))cur="บุคลิก";
    const v=get(p);if(v===undefined||v===null||typeof v==="object")continue;
    if(cur!==shownG){shownG=cur;const hd=document.createElement("h2");hd.className="grp";hd.textContent=cur;box.appendChild(hd)}
    const isStat=p[0]==="stats";
    let el=ctl(p,v);
    const mx=isStat?cap(p[1]):m;
    if(mx!=null&&typeof v==="number"){
      const w=document.createElement("div");w.style.cssText="display:flex;gap:6px";
      const b=document.createElement("button");b.className="ghost";b.textContent="สูงสุด "+mx;b.style.whiteSpace="nowrap";
      b.onclick=()=>{isStat?setStat(p[1],mx):setAt(p,mx);dirty();quick()};
      w.append(el,b);el=w;
    }
    box.appendChild(row(lb,p.join("."),el));
  }
  const hint=document.createElement("p");hint.className="sub";hint.style.marginTop="10px";
  hint.textContent="อยากแก้ค่าอื่นที่ไม่อยู่ในรายการนี้ ไปที่แท็บ “ข้อมูลทั้งหมด” ได้ทุกค่า";
  box.appendChild(hint);
}
function tab(n){
  $("#p1").classList.toggle("hide",n!==1);$("#p2").classList.toggle("hide",n!==2);
  $("#t1").className=n===1?"":"off";$("#t2").className=n===2?"":"off";
  if(n===1)quick();else search($("#q").value);
}
$("#t1").onclick=()=>tab(1);$("#t2").onclick=()=>tab(2);
let tm;$("#q").oninput=()=>{clearTimeout(tm);tm=setTimeout(()=>search($("#q").value),250)};

async function readText(file){
  let buf=new Uint8Array(await file.arrayBuffer());
  if(buf[0]===0x1f&&buf[1]===0x8b){
    const ds=new Blob([buf]).stream().pipeThrough(new DecompressionStream("gzip"));
    buf=new Uint8Array(await new Response(ds).arrayBuffer());
  }
  return new TextDecoder("utf-8").decode(buf).replace(/^\uFEFF/,"").replace(/[\r\n]+$/,"");
}
$("#f").onchange=async e=>{
  const f=e.target.files[0];if(!f)return;
  const st=$("#st");
  try{
    const raw=await readText(f);
    const text=unseal(raw);
    state=JSON.parse(text);edited=false;
    base=f.name.replace(/\.[^.]+$/,"");
    const same=seal(JSON.stringify(state))===raw;
    st.className="sub ok";
    st.textContent="✓ เปิด "+f.name+" สำเร็จ · ตราตรวจสอบถูกต้อง · "+Object.keys(state).length+" คีย์"+(same?" · เข้ารหัสกลับได้ไฟล์เดิมตรงทุกตัวอักษร":" · (เข้ารหัสกลับไม่ตรงไฟล์เดิมเป๊ะ แต่เกมอ่านได้)");
    if(state.tampered)st.textContent+=" · ⚠ เกมติดธง tampered ("+(state.tampered.why||"?")+") ไว้ในเซฟนี้แล้ว";
    $("#app").classList.remove("hide");$("#msg").textContent="";tab(1);
  }catch(err){state=null;$("#app").classList.add("hide");st.className="sub warn";st.textContent="เปิดไม่ได้: "+err.message}
};
$("#sv").onclick=async()=>{
  if(!state)return;
  try{
    /* ชีวิตที่ถูกแก้ด้วยมือ เกมจะเล่นต่อได้ปกติ แต่ไม่ขึ้นทำเนียบ/แข่งออนไลน์ ตัวแก้ไขนี้ใส่ป้ายตามที่เกมทำเองเสมอเมื่อมีการแก้ · savedAt อัปเดตเป็นเวลาบันทึก เหมือนที่เกมทำทุกครั้งที่เซฟ (ใช้ตัดสินสล็อตเมื่อ seed และ ageMonths เท่ากัน) */
    if(edited&&!state.tampered)state.tampered={at:Date.now(),why:"hand"};
    if(edited)state.savedAt=Math.max(Date.now(),(+state.savedAt||0)+1);
    const text=JSON.stringify(state),out=seal(text);
    if(unseal(out)!==text)throw new Error("ตรวจย้อนกลับไม่ผ่าน");
    let dl=null;try{dl=window.claude?await window.claude.use("downloads"):null}catch(e){}
    if(dl)await dl.save({filename:base+"-edited.json",data:out});
    else if(!localSave(base+"-edited.json",out,text.length))return;
    flash("บันทึกแล้ว: "+base+"-edited.json"+(state.tampered?" · ติดป้ายชีวิตที่ถูกแก้ไข (เล่นเดี่ยวได้ปกติ)":""),true);
  }catch(err){
    if(err&&err.code==="declined"){flash("ยกเลิกการบันทึก");return}
    flash("บันทึกไม่สำเร็จ: "+(err.message||err.code));
  }
};

/* ใช้นอกแอป Claude: ดาวน์โหลดผ่านเบราว์เซอร์ตรง ๆ ถ้าไม่ได้ให้คัดลอกข้อความไปวางเองได้ */
function localSave(name,data){
  try{
    const u=URL.createObjectURL(new Blob([data],{type:"application/json"}));
    const a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(u),30000);return true;
  }catch(e){
    let ta=$("#raw");
    if(!ta){ta=document.createElement("textarea");ta.id="raw";ta.readOnly=true;ta.style.marginTop="8px";$("#app").appendChild(ta)}
    ta.value=data;ta.focus();ta.select();
    flash("ดาวน์โหลดไม่ได้ในหน้านี้ คัดลอกข้อความด้านล่างไปวางเป็นไฟล์เอง");return false;
  }
}
