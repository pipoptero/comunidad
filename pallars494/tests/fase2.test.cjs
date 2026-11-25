const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('app/Pallars494_derrames_v2_2.html','utf8');
const source=html.split('<script>')[1].split('</script>')[0];
function app(initial={}){
 const store=new Map(Object.entries(initial)), elements=new Map(), alerts=[];
 function element(id){if(!elements.has(id))elements.set(id,{id,value:'0',hidden:false,dataset:{},classList:{toggle(){}},setAttribute(){},addEventListener(type,fn){this['on'+type]=fn},click(){},remove(){}});return elements.get(id)}
 const localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,v)};
 const document={getElementById:element,querySelectorAll:()=>[],createElement:()=>element('created'),body:{appendChild(){}}};
 const context=vm.createContext({localStorage,document,window:{scrollTo(){},print(){}},alert:m=>alerts.push(m),confirm:()=>true,console,Blob,URL,setTimeout});
 vm.runInContext(source,context);
 return {run:s=>vm.runInContext(s,context),store,elements,alerts};
}
const clone=x=>JSON.parse(JSON.stringify(x));
test('32 viviendas y ejemplos de cálculo',()=>{let a=app(); assert.equal(a.run('state.homes.length'),32);assert.equal(a.run('totals(rows()).coef'),100);assert.equal(a.run('calc(state.homes[0]).balance'),12000);a.run('state.homes[0].aero=true;state.homes[0].splits=2');assert.equal(a.run('calc(state.homes[0]).balance'),16100);a.run('state.homes[0].aero=false;state.homes[0].splits=0;state.homes[0].moves=1');assert.equal(a.run('calc(state.homes[0]).balance'),12450)});
test('ayudas, excedente y modalidades',()=>{let a=app();a.run('state.homes[0].aid=13000');assert.equal(a.run('calc(state.homes[0]).credit'),1000);assert.equal(a.run("finance(12000,'cash',0).capital"),0);assert.equal(a.run("finance(12000,'mixed',15000).capital"),0);assert.equal(a.run("finance(12000,'pending',0).potential"),12000);a.run('state.settings.rate=0');assert.equal(a.run("finance(12000,'finance',0).monthly"),100)});
test('JSON actual preserva datos y confirmación',()=>{let a=app();a.run("state.homes[0].confirmed=true;state.homes[0].inventoryStatus='confirmed';state.homes[0].aero=true;state.homes[0].mode='mixed';state.homes[0].initial=1000");assert.deepEqual(clone(a.run('normalize(JSON.parse(JSON.stringify(state)))')),clone(a.run('state')))});
test('JSON v1 auténtico acepta Entlo. y parámetros de texto',()=>{let a=app();assert.equal(a.run(`(()=>{const d=defaults();d.version=1;delete d.dataStatus;delete d.scenario;delete d.settings.collective;for(const k in d.settings)d.settings[k]=String(d.settings[k]);d.homes.forEach((h,i)=>{delete h.confirmed;delete h.inventoryStatus;delete h.prices;if(i>=4&&i<8)h.name=h.name.replace('Entresuelo','Entlo.')});return normalize(d).homes[4].name})()`),'Entresuelo 1ª')});
test('rechaza orden, duplicados, ausencia de campo y valores inválidos',()=>{let a=app();for(const mutation of ["[d.homes[0],d.homes[1]]=[d.homes[1],d.homes[0]]","d.homes[1].name=d.homes[0].name","delete d.homes[0].paid","d.homes[0].splits=5","d.homes[0].coef=-1","d.settings.common='incorrecto'"]){assert.throws(()=>a.run(`(()=>{let d=defaults();${mutation};return normalize(d)})()`))}});
test('copia escenario anterior sin sobrescribirlo',()=>{let a=app(), raw=JSON.stringify(clone(a.run('defaults()'))), b=app({'p494-derrames-v2':raw});assert.equal(b.store.get('p494-derrames-v2'),raw);assert.equal(b.run('state.homes.length'),32);assert.ok(b.store.has('p494-derrames-v2.2-dev'))});
test('datos corruptos permanecen intactos y se bloquea guardado',()=>{let key='p494-derrames-v2.2-dev',a=app({[key]:'{roto'});assert.equal(a.store.get(key),'{roto');assert.equal(a.run('storageBlocked'),true);assert.equal(a.run('recoveryRaw'),'{roto');a.run('state.settings.common=1;save()');assert.equal(a.store.get(key),'{roto')});
test('importación inválida no cambia escenario',async()=>{let a=app(),before=JSON.stringify(clone(a.run('state'))),input=a.elements.get('load');await input.onchange({target:{files:[{text:async()=>'{"version":2}'}],value:'archivo'}});assert.equal(JSON.stringify(clone(a.run('state'))),before);assert.match(a.alerts[0],/no se ha modificado/)});


test('la carga válida sustituye tras confirmación y mantiene las 32 identidades',async()=>{let a=app(), d=clone(a.run('defaults()'));d.scenario='Alternativa';d.homes[31].moves=1;let input=a.elements.get('load');await input.onchange({target:{files:[{text:async()=>JSON.stringify(d)}],value:'archivo'}});assert.equal(a.run('state.scenario'),'Alternativa');assert.equal(a.run('state.homes[31].name'),'6.º 4ª');assert.equal(a.run('state.homes[31].moves'),1)});
test('un dato desconocido en v2 no se descarta silenciosamente',()=>{let a=app();assert.throws(()=>a.run('(()=>{let d=defaults();d.homes[0].tarifaEspecial=100;return normalize(d)})()'),/campos no reconocidos/)});

test('migración v2 conserva inventario y preferencias',()=>{let a=app();assert.equal(a.run(`(()=>{let d=defaults();d.version=2;d.homes.forEach(h=>{delete h.inventoryStatus;delete h.prices});d.homes[0].aero=true;d.homes[0].confirmed=true;d.homes[0].moves=1;d.homes[0].mode='cash';let h=normalize(d).homes[0];return [h.inventoryStatus,h.moves,h.mode,h.prices.aero].join('|')})()`),'confirmed|1|cash|')});
test('rechaza sin alterar los escenarios antiguos con más de un traslado',()=>{let a=app();assert.throws(()=>a.run(`(()=>{let d=defaults();d.version=2;d.homes.forEach(h=>{delete h.inventoryStatus;delete h.prices});d.homes[0].moves=2;return normalize(d)})()`),/más de una compresora/)});
test('tarifas individuales sustituyen tarifas generales sin perder inventario',()=>{let a=app();a.run('state.homes[0].aero=true;state.homes[0].splits=2;state.homes[0].moves=1;state.homes[0].prices={aero:2000,splits:0,move:300}');assert.equal(a.run('calc(state.homes[0]).extras'),2300);assert.equal(a.run('state.homes[0].splits'),2);a.run('state.homes[0].prices.splits=null');assert.equal(a.run('calc(state.homes[0]).extras'),3900)});
test('estados pendientes, provisionales y confirmación sin actuaciones',()=>{let a=app();assert.equal(a.run('state.homes[0].inventoryStatus'),'pending');let e=a.elements.get('homeform');e.onchange({target:{dataset:{home:'moves'},value:'1'}});assert.equal(a.run('state.homes[0].inventoryStatus'),'provisional');a.run('confirmHome()');assert.equal(a.run('state.homes[0].inventoryStatus'),'confirmed');a.run('noExtras()');assert.equal(a.run('state.homes[0].inventoryStatus'),'none');assert.equal(a.run('state.homes[0].moves'),0)});
test('ejemplo ficticio de dos splits traslado y anticipo',()=>{let a=app();a.run('state.homes[0].splits=2;state.homes[0].moves=1;state.homes[0].paid=2000');assert.equal(a.run('calc(state.homes[0]).balance'),12050)});
