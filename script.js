const GI={
Deltoids:["Deltoids","Shoulder","Raises the arm forward, sideways, and backward.","Lateral raise, overhead press"],
Chest:["Pectorals","Chest","Pushes and draws the arm toward the middle of the body.","Push-ups, bench press"],
Trapezius:["Trapezius","Upper back and neck","Lifts and steadies the shoulder blades; helps tilt the head back.","Shrugs, face pulls"],
Lats:["Latissimus Dorsi","Sides and middle of the back","Pulls the arm down and back; the broad muscle of the back.","Pull-ups, rows"],
Abdominals:["Abdominals","Belly (core)","Bends the trunk forward and stabilizes the core.","Crunches, planks"],
Obliques:["Obliques","Sides of the abdomen","Rotates and bends the trunk sideways.","Russian twists, side plank"],
Biceps:["Biceps Brachii","Front of the upper arm","Bends the elbow and rotates the forearm.","Curls, pull-ups"],
Triceps:["Triceps Brachii","Back of the upper arm","Straightens the elbow; the opposite of the biceps.","Dips, triceps extension"],
Forearms:["Forearm Muscles","Lower arm","Controls the wrist and fingers; gives you grip strength.","Wrist curls, farmer's carry"],
Glutes:["Glutes","Buttocks","Extends the hips; the gluteus maximus is the largest muscle in the body.","Squats, hip thrusts"],
Quadriceps:["Quadriceps","Front of the thigh","Straightens the knee; a group of four muscles.","Squats, lunges"],
Hamstrings:["Hamstrings","Back of the thigh","Bends the knee and assists the hips.","Deadlifts, leg curls"],
Calves:["Calves","Back of the lower leg","Lifts you onto your toes; helps with jumping and running.","Calf raises, jump rope"],
"Lower legs":["Lower Leg Muscles","Shin and side of the leg","Controls foot movement and balance.","Toe raises, heel walks"],
Neck:["Neck Muscles","Neck","Rotates, tilts, and supports the head.","Neck rotations, chin tucks"],
"Rotator cuff":["Rotator Cuff","Deep in the shoulder","Stabilizes the shoulder joint and helps rotate the arm.","External rotations, band pull-aparts"],
Adductors:["Adductors","Inner thigh","Pulls the thigh toward the midline.","Side lunges, sumo squats"],
"Upper back":["Upper Back Muscles","Upper back","Pulls and stabilizes the shoulder blades.","Rows, reverse flys"],
"Spinal extensors":["Spinal Extensors","Along the spine","Extends and straightens the back.","Back extensions, supermans"],
"Hip flexors":["Hip Flexors","Front of the hip","Lifts the knee upward.","High knees, leg raises"],
Serratus:["Serratus Anterior","Side of the rib cage","Draws the shoulder blade forward.","Push-up plus, punches"]
};
const cv=document.getElementById("cv"),stage=cv.parentElement,$=id=>document.getElementById(id);
const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,1.5));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(38,1,.1,100);C.position.set(0,0,8.4);
S.add(new THREE.HemisphereLight(0xffffff,0x554444,.7));
const d1=new THREE.DirectionalLight(0xffffff,.8);d1.position.set(3,4,6);S.add(d1);
const d2=new THREE.DirectionalLight(0xffffff,.5);d2.position.set(-3,2,-6);S.add(d2);
const G=new THREE.Group();S.add(G);
const all=[],GM={},GF={},MC={};let dirty=true,vis=true;
let sel=null,ry=0,ty=.5,auto=true,zoom=8.4,ray=new THREE.Raycaster();
function pick(e){const r=cv.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1),C);const h=ray.intersectObjects(all,false);return h.length?h[0].object:null}
function select(x){const str=typeof x=="string",g=str?x:x.userData.group;if(!g||!GM[g])return;sel=g;dirty=true;
for(const k in GM)GM[k].forEach(m=>{m.material.emissive.setHex(k===g?0xff5a1f:0);m.material.emissiveIntensity=.55});
const i=GI[g]||[g,"Part of the muscular system","Helps with movement and stability.","Full-body workouts"],u=str?null:x.userData;
$("nm").textContent=i[0];$("loc").textContent=u?u.label+" ("+(u.side=="left"?"left":"right")+") · "+i[1]:i[1];$("fn").textContent=i[2];$("ex").textContent=i[3];
document.querySelectorAll(".chips .b").forEach(b=>b.classList.toggle("on",b.dataset.id===g));
ty=GF[g]?0:Math.PI}
if(!THREE.GLTFLoader){$("ld").textContent="The 3D loader failed to load. Please refresh the page."}else{
setTimeout(()=>fetch("data:model/gltf-binary;base64,"+B64).then(r=>r.arrayBuffer()).then(buf=>new THREE.GLTFLoader().parse(buf,"",gl=>{const root=gl.scene;
const mk=(c,r)=>new THREE.MeshStandardMaterial({color:c,roughness:r,side:THREE.DoubleSide});
root.traverse(n=>{if(!n.isMesh)return;const u=n.userData,nm=n.name||"";
if(u.group){n.material=MC[u.group+u.layer]||(MC[u.group+u.layer]=mk(u.layer=="deep"?0x8f2430:0xb8323d,.5));(GM[u.group]=GM[u.group]||[]).push(n);all.push(n)}
else if(/skeleton/.test(nm))n.material=mk(0xd8d0bb,.8);
else if(/connective/.test(nm))n.visible=false;
else n.material=mk(0xa02a36,.55)});
const b1=new THREE.Box3().setFromObject(root);root.scale.setScalar(4.4/(b1.max.y-b1.min.y));
const b2=new THREE.Box3().setFromObject(root),c=b2.getCenter(new THREE.Vector3());root.position.set(-c.x,-c.y,-c.z);
G.add(root);dirty=true;const ry0=G.rotation.y;G.rotation.y=0;G.updateMatrixWorld(true);
for(const k in GM){const bx=new THREE.Box3();GM[k].forEach(m=>bx.expandByObject(m));GF[k]=bx.getCenter(new THREE.Vector3()).z>=0}
G.rotation.y=ry0;
Object.keys(GM).sort((a,b)=>(GI[a]?0:1)-(GI[b]?0:1)).forEach(k=>{const b=document.createElement("button");b.className="b";b.textContent=(GI[k]?GI[k][0]:k).split(" ")[0];b.dataset.id=k;
b.onclick=()=>{auto=false;$("ba").classList.remove("on");select(k)};$("chips").appendChild(b)});
$("ld").remove()},e=>{$("ld").textContent="Couldn't load the model. Please refresh the page."})).catch(()=>{$("ld").textContent="Couldn't load the model. Please refresh the page."}),80)}
let down=false,moved=0,lx=0,lt=0;
cv.addEventListener('pointerdown',e=>{down=true;moved=0;lx=e.clientX;cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing'});
cv.addEventListener('pointermove',e=>{if(down){const dx=e.clientX-lx;lx=e.clientX;moved+=Math.abs(dx);ty+=dx*.01;ry=ty;auto=false;$('ba').classList.remove('on')}});
cv.addEventListener('pointerup',e=>{down=false;cv.style.cursor='grab';if(moved<5){const id=pick(e);if(id)select(id)}});
cv.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.min(12,Math.max(4.5,zoom+e.deltaY*.005))},{passive:false});
$('bf').onclick=()=>{auto=false;$('ba').classList.remove('on');ty=0};
$('bb').onclick=()=>{auto=false;$('ba').classList.remove('on');ty=Math.PI};
$('ba').onclick=e=>{auto=!auto;e.target.classList.toggle('on',auto)};
function size(){const w=stage.clientWidth,h=stage.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()}
new ResizeObserver(size).observe(stage);size();
new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(stage);
new ResizeObserver(()=>{dirty=true}).observe(stage);
(function loop(){requestAnimationFrame(loop);if(!vis||document.hidden)return;
if(auto&&!down)ty+=.006;
const dr=ty-ry,dz=zoom-C.position.z;
if(Math.abs(dr)<.0004&&Math.abs(dz)<.002&&!dirty)return;
dirty=false;ry+=dr*.12;G.rotation.y=ry;C.position.z+=dz*.15;R.render(S,C)})();
const zs=d=>{zoom=Math.min(12,Math.max(4.5,zoom+d))};
$('zi').onclick=()=>zs(-1.2);$('zo').onclick=()=>zs(1.2);
if(matchMedia('(prefers-reduced-motion:reduce)').matches){auto=false;$('ba').classList.remove('on')}
