/* ════════════════════════════════════════════
   ChefMind v6.0 — 13 новых фич
════════════════════════════════════════════ */

const GEMINI_API_KEY = 'ВСТАВЬТЕ_ВАШ_КЛЮЧ_СЮДА';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
function hasApiKey(){ return GEMINI_API_KEY&&GEMINI_API_KEY!==''&&GEMINI_API_KEY.length>10; }

// ── RECIPE DB ─────────────────────────────
const RECIPE_DB = [
  {emoji:"🍳",title:"Яичница с сыром и помидорами",description:"Классический завтрак за 10 минут.",time:"10 мин",timeMin:10,servings:"1 порция",servingsNum:1,difficulty:"Легко",tags:["fast","cheap"],keywords:["яйца","сыр","помидоры"],cuisine:"european",ingredients:["2 яйца","50г тёртого сыра","1 помидор","1 ч.л. масла","соль, перец"],steps:["Разогрейте сковороду, добавьте масло.","Разбейте яйца, посолите и поперчите.","Нарежьте помидор и выложите рядом.","Посыпьте сыром, накройте крышкой на 1 мин.","Подавайте горячей."],stepTimers:[0,0,0,60,0],kbju:{cal:320,protein:22,fat:24,carbs:4}},
  {emoji:"🥪",title:"Горячий сэндвич с сыром",description:"Хрустящий снаружи, тягучий внутри.",time:"7 мин",timeMin:7,servings:"1 порция",servingsNum:1,difficulty:"Легко",tags:["fast","cheap"],keywords:["хлеб","сыр","масло"],cuisine:"european",ingredients:["2 ломтика хлеба","60г сыра","1 ч.л. сливочного масла"],steps:["Разогрейте сковороду.","Намажьте хлеб маслом с одной стороны.","Положите сыр между ломтями (маслом наружу).","Жарьте 2–3 мин с каждой стороны.","Нарежьте и подавайте."],stepTimers:[0,0,0,150,0],kbju:{cal:410,protein:18,fat:22,carbs:36}},
  {emoji:"🍜",title:"Паста Карбонара",description:"Сливочная паста с яйцом и сыром.",time:"15 мин",timeMin:15,servings:"2 порции",servingsNum:2,difficulty:"Средне",tags:["fast","cheap"],keywords:["яйца","сыр","макароны","паста"],cuisine:"italian",ingredients:["200г макарон","2 яйца","50г пармезана","1 зубчик чеснока","соль, перец","1 ст.л. оливкового масла"],steps:["Сварите макароны al dente, оставьте 100мл воды.","Взбейте яйца с сыром и перцем.","Обжарьте чеснок 1 мин.","Смешайте горячие макароны с яичной смесью.","Добавляйте воду по ложке, помешивая."],stepTimers:[600,0,60,0,0],kbju:{cal:480,protein:22,fat:16,carbs:58}},
  {emoji:"🥗",title:"Греческий салат",description:"Средиземноморская классика без готовки.",time:"10 мин",timeMin:10,servings:"2 порции",servingsNum:2,difficulty:"Легко",tags:["fast","vegan","no-dairy"],keywords:["помидоры","огурец","перец","маслины","фета"],cuisine:"mediterranean",ingredients:["3 помидора","1 огурец","1 болгарский перец","½ красной луковицы","100г феты","горсть маслин","3 ст.л. оливкового масла","орегано, соль, перец"],steps:["Нарежьте помидоры, огурец и перец.","Тонко нарежьте красный лук.","Смешайте всё в миске, добавьте маслины.","Сверху разломайте фету.","Полейте маслом, посыпьте орегано."],stepTimers:[0,0,0,0,0],kbju:{cal:220,protein:9,fat:16,carbs:12}},
  {emoji:"🍕",title:"Пицца на сковороде",description:"Быстрая домашняя пицца без духовки.",time:"20 мин",timeMin:20,servings:"2 порции",servingsNum:2,difficulty:"Средне",tags:["fast"],keywords:["мука","сыр","помидоры"],cuisine:"italian",ingredients:["150г муки","½ ч.л. соды","100мл кефира","3 ст.л. томатного соуса","100г тёртого сыра"],steps:["Замесите тесто из муки, соды, соли и кефира.","Раскатайте круг ~24см.","Разогрейте сковороду с крышкой.","Выложите тесто, смажьте соусом, посыпьте сыром.","Жарьте под крышкой 7–10 мин."],stepTimers:[0,0,0,0,540],kbju:{cal:560,protein:24,fat:18,carbs:72}},
  {emoji:"🍲",title:"Яичный суп",description:"Лёгкий горячий суп за 10 минут.",time:"10 мин",timeMin:10,servings:"2 порции",servingsNum:2,difficulty:"Легко",tags:["fast","cheap"],keywords:["яйца","лук","чеснок","бульон"],cuisine:"european",ingredients:["3 яйца","500мл бульона","1 луковица","2 зубчика чеснока","зелень","соль, перец"],steps:["Доведите бульон до кипения.","Добавьте лук и чеснок, варите 3 мин.","Взбейте яйца, влейте тонкой струёй.","Варите 2 мин, посолите.","Подавайте со свежей зеленью."],stepTimers:[0,180,0,120,0],kbju:{cal:180,protein:14,fat:10,carbs:8}},
  {emoji:"🥞",title:"Оладьи на кефире",description:"Пышные, золотистые оладьи.",time:"20 мин",timeMin:20,servings:"3 порции",servingsNum:3,difficulty:"Легко",tags:["cheap"],keywords:["яйца","мука","кефир","сахар"],cuisine:"european",ingredients:["1 яйцо","250мл кефира","150г муки","1 ст.л. сахара","½ ч.л. соды","соль","масло"],steps:["Смешайте яйцо с кефиром, сахаром и солью.","Добавьте муку и соду.","Разогрейте сковороду с маслом.","Жарьте по 2–3 мин с каждой стороны.","Подавайте со сметаной."],stepTimers:[0,0,0,150,0],kbju:{cal:380,protein:14,fat:12,carbs:52}},
  {emoji:"🧀",title:"Сырный омлет",description:"Пышный французский омлет за 8 минут.",time:"8 мин",timeMin:8,servings:"1 порция",servingsNum:1,difficulty:"Средне",tags:["fast","cheap"],keywords:["яйца","сыр","масло","молоко"],cuisine:"european",ingredients:["3 яйца","2 ст.л. молока","50г тёртого сыра","1 ч.л. масла","соль, перец"],steps:["Взбейте яйца с молоком, солью и перцем.","Растопите масло на сковороде.","Вылейте смесь, мешайте 30 сек.","Посыпьте сыром одну половину.","Сложите пополам и подавайте."],stepTimers:[0,0,30,0,0],kbju:{cal:380,protein:28,fat:28,carbs:3}},
  {emoji:"🥘",title:"Картофель с сыром",description:"Нежный картофель с хрустящей сырной корочкой.",time:"45 мин",timeMin:45,servings:"3 порции",servingsNum:3,difficulty:"Легко",tags:["cheap"],keywords:["картофель","сыр","масло","чеснок"],cuisine:"european",ingredients:["5 картофелин","100г тёртого сыра","2 ст.л. масла","2 зубчика чеснока","соль, перец, паприка"],steps:["Разогрейте духовку до 200°C.","Нарежьте картофель дольками, смешайте с маслом и специями.","Выложите на противень.","Запекайте 30 мин.","Посыпьте сыром и запекайте ещё 10 мин."],stepTimers:[0,0,0,1800,600],kbju:{cal:320,protein:12,fat:14,carbs:40}},
  {emoji:"🍗",title:"Курица в соевом соусе",description:"Сочная курица в глазури из соевого соуса и мёда.",time:"30 мин",timeMin:30,servings:"3 порции",servingsNum:3,difficulty:"Легко",tags:["fast","no-dairy"],keywords:["курица","соевый соус","мёд","чеснок"],cuisine:"asian",ingredients:["500г куриного филе","4 ст.л. соевого соуса","2 ст.л. мёда","3 зубчика чеснока","1 ч.л. имбиря","кунжут"],steps:["Смешайте соевый соус, мёд, чеснок и имбирь.","Нарежьте курицу, замаринуйте 10 мин.","Обжарьте курицу 4 мин.","Добавьте маринад, тушите 5 мин.","Посыпьте кунжутом."],stepTimers:[0,600,240,300,0],kbju:{cal:290,protein:36,fat:8,carbs:18}},
  {emoji:"🫕",title:"Чечевичный суп",description:"Согревающий суп из красной чечевицы.",time:"25 мин",timeMin:25,servings:"4 порции",servingsNum:4,difficulty:"Легко",tags:["vegan","cheap","no-dairy"],keywords:["чечевица","лук","морковь","чеснок"],cuisine:"mediterranean",ingredients:["200г красной чечевицы","1 луковица","1 морковь","2 зубчика чеснока","400мл томатного соуса","1 ч.л. зиры","соль, перец","1 л воды"],steps:["Промойте чечевицу.","Обжарьте лук и морковь 5 мин.","Добавьте чеснок и зиру, жарьте 1 мин.","Добавьте чечевицу, томаты и воду.","Варите 20 мин, посолите."],stepTimers:[0,300,60,0,1200],kbju:{cal:210,protein:14,fat:3,carbs:34}},
  {emoji:"🍛",title:"Рис с яйцом по-японски",description:"Tamago gohan — горячий рис с яйцом.",time:"15 мин",timeMin:15,servings:"1 порция",servingsNum:1,difficulty:"Легко",tags:["fast","cheap","no-dairy"],keywords:["рис","яйца","соевый соус"],cuisine:"japanese",ingredients:["150г варёного риса","1 яйцо","1 ст.л. соевого соуса","зелёный лук"],steps:["Сварите рис.","Выложите горячий рис в миску.","Разбейте яйцо прямо на рис.","Добавьте соевый соус, перемешайте.","Посыпьте зелёным луком."],stepTimers:[600,0,0,0,0],kbju:{cal:320,protein:14,fat:8,carbs:48}},
  {emoji:"🌮",title:"Шакшука",description:"Яичница в пряном томатном соусе.",time:"20 мин",timeMin:20,servings:"2 порции",servingsNum:2,difficulty:"Легко",tags:["fast","cheap","no-dairy"],keywords:["яйца","помидоры","перец","лук","чеснок"],cuisine:"middle-east",ingredients:["4 яйца","400мл томатного соуса","1 болгарский перец","1 луковица","3 зубчика чеснока","1 ч.л. зиры","1 ч.л. паприки","соль, перец","зелень"],steps:["Обжарьте лук и перец 5 мин.","Добавьте чеснок и специи, жарьте 1 мин.","Влейте томатный соус, тушите 5 мин.","Сделайте углубления, разбейте яйца.","Накройте крышкой, готовьте 5–7 мин."],stepTimers:[300,60,300,0,360],kbju:{cal:220,protein:16,fat:12,carbs:14}},
  {emoji:"🍝",title:"Томатная паста",description:"Настоящий итальянский вкус за 20 минут.",time:"20 мин",timeMin:20,servings:"2 порции",servingsNum:2,difficulty:"Легко",tags:["vegan","cheap","no-dairy"],keywords:["макароны","паста","помидоры","чеснок","базилик"],cuisine:"italian",ingredients:["200г спагетти","400мл томатного соуса","3 зубчика чеснока","свежий базилик","3 ст.л. оливкового масла","соль, перец"],steps:["Сварите спагетти al dente.","Обжарьте чеснок 1–2 мин.","Добавьте томатный соус, тушите 7 мин.","Посолите, добавьте базилик.","Смешайте с пастой."],stepTimers:[600,90,420,0,0],kbju:{cal:420,protein:14,fat:12,carbs:64}},
  {emoji:"🥔",title:"Драники",description:"Хрустящие картофельные оладьи.",time:"25 мин",timeMin:25,servings:"3 порции",servingsNum:3,difficulty:"Легко",tags:["cheap","vegan"],keywords:["картофель","лук","яйца","мука"],cuisine:"european",ingredients:["5 картофелин","1 луковица","1 яйцо","2 ст.л. муки","соль, перец","масло"],steps:["Натрите картофель и лук на тёрке.","Отожмите лишний сок.","Добавьте яйцо, муку, соль, перец.","Выложите ложкой на сковороду.","Жарьте по 3–4 мин с каждой стороны."],stepTimers:[0,0,0,0,210],kbju:{cal:240,protein:6,fat:10,carbs:32}},
  {emoji:"🍱",title:"Онигири",description:"Японские рисовые треугольники.",time:"20 мин",timeMin:20,servings:"2 порции",servingsNum:2,difficulty:"Средне",tags:["fast","no-dairy"],keywords:["рис","нори","тунец","огурец"],cuisine:"japanese",ingredients:["300г клейкого риса","4 листа нори","100г тунца","1 ст.л. соевого соуса","соль","кунжут"],steps:["Сварите клейкий рис, посолите.","Смочите руки водой.","Возьмите горсть риса, вложите начинку.","Сформируйте треугольник.","Оберните нори, посыпьте кунжутом."],stepTimers:[600,0,0,0,0],kbju:{cal:280,protein:16,fat:4,carbs:46}},
  {emoji:"🫘",title:"Плов с курицей",description:"Ароматный рассыпчатый плов.",time:"50 мин",timeMin:50,servings:"4 порции",servingsNum:4,difficulty:"Средне",tags:["cheap"],keywords:["рис","курица","морковь","лук","чеснок"],cuisine:"kazakh",ingredients:["300г риса","400г куриного филе","2 моркови","2 луковицы","1 головка чеснока","4 ст.л. масла","зира, куркума, соль","600мл воды"],steps:["Обжарьте курицу до золотистого цвета.","Добавьте лук и морковь, жарьте 5 мин.","Добавьте специи, перемешайте.","Выложите промытый рис поверх.","Залейте кипятком, варите 25 мин под крышкой."],stepTimers:[0,300,0,0,1500],kbju:{cal:380,protein:28,fat:12,carbs:42}},
  {emoji:"🥘",title:"Бешбармак",description:"Традиционное казахское блюдо из мяса и теста.",time:"90 мин",timeMin:90,servings:"6 порций",servingsNum:6,difficulty:"Сложно",tags:["cheap"],keywords:["баранина","говядина","лук","тесто","мука"],cuisine:"kazakh",ingredients:["1кг баранины","500г муки","2 яйца","3 луковицы","соль, перец, лавровый лист","зелень"],steps:["Варите мясо 1–1.5ч с луком, солью и лавровым листом.","Замесите тесто из муки, яиц и воды.","Раскатайте тесто, нарежьте ромбами.","Отварите тесто в бульоне 5–7 мин.","Подавайте тесто с мясом, полейте бульоном с луком."],stepTimers:[5400,0,0,360,0],kbju:{cal:520,protein:34,fat:22,carbs:46}},
  {emoji:"🍜",title:"Рамен домашний",description:"Насыщенный японский суп с яйцом.",time:"30 мин",timeMin:30,servings:"2 порции",servingsNum:2,difficulty:"Средне",tags:["fast","no-dairy"],keywords:["лапша","яйца","куриный бульон","соевый соус","имбирь"],cuisine:"japanese",ingredients:["2 порции рамен-лапши","2 яйца","700мл куриного бульона","3 ст.л. соевого соуса","1 ст.л. имбиря","2 зубчика чеснока","зелёный лук","кунжутное масло"],steps:["Доведите бульон до кипения с соевым соусом, имбирём и чесноком.","Варите яйца 7 минут, очистите.","Отварите лапшу по инструкции.","Разложите лапшу по мискам, залейте бульоном.","Разрежьте яйцо пополам, выложите сверху."],stepTimers:[0,420,300,0,0],kbju:{cal:380,protein:22,fat:12,carbs:46}},
  {emoji:"🥜",title:"Хумус",description:"Нежный ближневосточный хумус из нута.",time:"10 мин",timeMin:10,servings:"4 порции",servingsNum:4,difficulty:"Легко",tags:["fast","vegan","cheap","no-dairy"],keywords:["нут","чеснок","кунжут","лимон","оливковое масло"],cuisine:"middle-east",ingredients:["400г нута (консервированного)","2 ст.л. тахини","1 лимон (сок)","2 зубчика чеснока","3 ст.л. оливкового масла","соль, зира","паприка"],steps:["Слейте жидкость с нута, оставьте немного.","Пробейте нут с тахини, чесноком и лимоном.","Добавляйте масло и воду для нужной консистенции.","Посолите, добавьте зиру.","Выложите в тарелку, полейте маслом."],stepTimers:[0,0,0,0,0],kbju:{cal:180,protein:8,fat:10,carbs:16}},
];

const CUISINES = [
  {id:"italian",    name:"Итальянская",  flag:"🇮🇹", color:"#c8102e"},
  {id:"asian",      name:"Азиатская",    flag:"🥢",  color:"#d4200c"},
  {id:"japanese",   name:"Японская",     flag:"🇯🇵", color:"#bc002d"},
  {id:"kazakh",     name:"Казахская",    flag:"🇰🇿", color:"#00AFCA"},
  {id:"mediterranean",name:"Средиземноморская",flag:"🫒",color:"#228B22"},
  {id:"middle-east",name:"Ближневосточная",flag:"🌙",color:"#C8860A"},
  {id:"european",   name:"Европейская",  flag:"🇪🇺", color:"#003399"},
];

const MOOD_MAP=[
  {keys:["остр","пикант"],filterBoost:"",extraKw:["перец","чеснок"]},
  {keys:["быстр"],filterBoost:"fast",extraKw:[]},
  {keys:["сытн"],filterBoost:"",extraKw:["картофель","рис","макароны"]},
  {keys:["лёгк","легк","диет"],filterBoost:"vegan",extraKw:[]},
  {keys:["уютн","тёпл"],filterBoost:"",extraKw:["суп","картофель"]},
  {keys:["завтр"],filterBoost:"",extraKw:["яйца","хлеб"]},
  {keys:["итальян"],filterBoost:"",extraKw:["паста","томаты","сыр"]},
  {keys:["азиат","япон"],filterBoost:"",extraKw:["рис","соевый соус"]},
  {keys:["казах"],filterBoost:"",extraKw:["баранина","рис","тесто"]},
  {keys:["дёшев","деш"],filterBoost:"cheap",extraKw:[]},
  {keys:["веган"],filterBoost:"vegan",extraKw:[]},
];
const TWISTS=[
  {name:"по-мексикански",extra:["чили","½ лайма","кинза"],emoji:"🌶️"},
  {name:"по-азиатски",extra:["1 ст.л. соевого соуса","имбирь","кунжут"],emoji:"🥢"},
  {name:"по-средиземноморски",extra:["оливки","тимьян","оливковое масло"],emoji:"🫒"},
  {name:"с травами",extra:["розмарин","тимьян","базилик"],emoji:"🌿"},
  {name:"с пикантной ноткой",extra:["паприка","кайенский перец"],emoji:"🔥"},
  {name:"по-домашнему",extra:["сметана","укроп"],emoji:"🏡"},
];

function searchFallback(userIngredients,mood,filters,maxTime){
  const ml=mood.toLowerCase();
  let moodKw=[],moodFilters=[...filters];
  for(const m of MOOD_MAP){if(m.keys.some(k=>ml.includes(k))){moodKw.push(...m.extraKw);if(m.filterBoost)moodFilters.push(m.filterBoost);}}
  const allKw=[...userIngredients,...moodKw];
  const scored=RECIPE_DB.filter(r=>!maxTime||r.timeMin<=maxTime).map(r=>{
    let s=0;
    for(const kw of allKw)for(const rk of r.keywords)if(rk.includes(kw)||kw.includes(rk))s+=3;
    for(const f of moodFilters)if(r.tags.includes(f))s+=2;
    for(const f of filters)if(!r.tags.includes(f))s-=1;
    return{r,s};
  }).sort((a,b)=>b.s-a.s);
  if(!scored.length)return RECIPE_DB.slice(0,3);
  return scored.slice(0,3).map(x=>x.r);
}
function generateFallback(idea){
  const base=searchFallback(idea.toLowerCase().split(/\s+/),idea,[],null)[0];
  let twist=TWISTS[Math.floor(Math.random()*TWISTS.length)];
  if(/остр|пикант/.test(idea))twist=TWISTS[4];
  else if(/азиат|япон/.test(idea))twist=TWISTS[1];
  return{...base,emoji:twist.emoji,title:`${base.title} ${twist.name}`,description:`Авторская вариация. ${base.description}`,ingredients:[...base.ingredients,...twist.extra],steps:[...base.steps.slice(0,-1),`Добавьте ${twist.extra.join(', ')} за 2 мин до готовности.`,base.steps[base.steps.length-1]],stepTimers:[...(base.stepTimers||[]),0,0]};
}

// ── GEMINI ────────────────────────────────
async function callGemini(prompt,maxTokens=2048){
  const res=await fetch(GEMINI_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:.8,maxOutputTokens:maxTokens}})});
  if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error?.message||`HTTP ${res.status}`);}
  const data=await res.json();
  return(data.candidates?.[0]?.content?.parts?.[0]?.text||'').replace(/```json|```/g,'').trim();
}
async function findRecipesAI(ingredients,mood,filters,maxTime){
  const fl={vegan:'веганское',cheap:'дешёвое',fast:'быстрое до 20 мин','no-dairy':'без молочных'};
  const ft=filters.map(f=>fl[f]).filter(Boolean).join(', ');
  const prompt=`Ответь ТОЛЬКО JSON-массивом из 3 рецептов.
Ингредиенты: ${ingredients.length?ingredients.join(', '):'не указаны'}.${mood?`\nПожелание: «${mood}».`:''}${ft?`\nОграничения: ${ft}.`:''}${maxTime?`\nМаксимум времени: ${maxTime} мин.`:''}
Каждый объект: {"emoji":"","title":"","description":"","time":"15 мин","timeMin":15,"servings":"2 порции","servingsNum":2,"difficulty":"Легко","tags":[],"keywords":[],"cuisine":"european","ingredients":[],"steps":[],"stepTimers":[],"kbju":{"cal":0,"protein":0,"fat":0,"carbs":0}}`;
  return JSON.parse(await callGemini(prompt));
}
async function generateRecipeAI(idea){
  const prompt=`Придумай оригинальный рецепт по идее: «${idea}». ТОЛЬКО JSON-объект:{"emoji":"","title":"","description":"","time":"","timeMin":0,"servings":"","servingsNum":2,"difficulty":"","tags":[],"keywords":[],"cuisine":"european","ingredients":[],"steps":[],"stepTimers":[],"kbju":{"cal":0,"protein":0,"fat":0,"carbs":0}}`;
  return JSON.parse(await callGemini(prompt));
}
async function analyzePhotoAI(base64Image){
  const res=await fetch(GEMINI_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{inline_data:{mime_type:'image/jpeg',data:base64Image}},{text:'Посмотри на это фото холодильника или продуктов. Перечисли только названия продуктов которые видишь, через запятую, на русском языке. Только список без пояснений.'}]}],generationConfig:{temperature:.1,maxOutputTokens:200}})});
  if(!res.ok)throw new Error('Ошибка анализа фото');
  const data=await res.json();
  return(data.candidates?.[0]?.content?.parts?.[0]?.text||'').trim();
}
async function chatWithChefAI(messages){
  const history=messages.map(m=>`${m.role==='user'?'Пользователь':'Шеф'}: ${m.text}`).join('\n');
  const prompt=`Ты опытный шеф-повар и кулинарный эксперт. Отвечай кратко, по делу, на русском языке. Если спрашивают о замене ингредиентов, готовке, рецептах или кулинарных советах — отвечай экспертно. Если вопрос не о еде — мягко перенаправь к кулинарной теме.\n\nИстория диалога:\n${history}\n\nШеф:`;
  return await callGemini(prompt,500);
}

// ── AUTH ─────────────────────────────────
function getUsers(){return JSON.parse(localStorage.getItem('chefmind_users')||'{}');}
function saveUsers(u){localStorage.setItem('chefmind_users',JSON.stringify(u));}
function hashStr(s){let h=0;for(let i=0;i<s.length;i++)h=(Math.imul(31,h)+s.charCodeAt(i))|0;return h.toString(36);}

// ── STATE ─────────────────────────────────
let ingredients=[];
let currentUser=JSON.parse(localStorage.getItem('chefmind_session')||'null');
let savedRecipes=currentUser?JSON.parse(localStorage.getItem(`chefmind_saved_${currentUser.username}`)||'[]'):[];
let searchHistory=JSON.parse(localStorage.getItem('chefmind_history')||'[]');
let currentRecipeForModal=null;
let cookmodeRecipe=null,cookmodeStep=0,timerInterval=null,timerSeconds=0;
let stepTimerInterval=null;
let weekPlan=JSON.parse(localStorage.getItem('chefmind_plan')||'{}');
let chatHistory=[];
let isDark=localStorage.getItem('chefmind_theme')==='dark';

const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const $=id=>document.getElementById(id);

// ── INIT ─────────────────────────────────
applyTheme();
updateProfileUI();
updateApiBadge();
renderHistory();
initOnboarding();
initRotd();
initWeekPlan();
initWorldCuisines();
initNotifications();

// ── THEME ─────────────────────────────────
function applyTheme(){document.documentElement.setAttribute('data-theme',isDark?'dark':'light');const b=$('themeBtn');if(b)b.textContent=isDark?'☀️':'🌙';}
$('themeBtn').addEventListener('click',()=>{isDark=!isDark;localStorage.setItem('chefmind_theme',isDark?'dark':'light');applyTheme();});

// ── TABS ─────────────────────────────────
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab=btn.dataset.tab;
    ['tabCook','tabSaved','tabGenerate','tabPlan','tabWorld','tabChat'].forEach(id=>{const el=$(id);if(el)el.style.display='none';});
    $('resultsSection').style.display='none';
    if(tab==='cook'){$('tabCook').style.display='block';if($('recipeGrid').children.length)$('resultsSection').style.display='block';}
    else if(tab==='saved'){$('tabSaved').style.display='block';renderSaved();}
    else if(tab==='generate'){$('tabGenerate').style.display='block';}
    else if(tab==='plan'){$('tabPlan').style.display='block';}
    else if(tab==='world'){$('tabWorld').style.display='block';}
    else if(tab==='chat'){$('tabChat').style.display='block';}
  });
});

// ── TAGS ─────────────────────────────────
function addIngredient(val){const v=val.trim().toLowerCase();if(!v||ingredients.includes(v))return;ingredients.push(v);renderTags();}
function renderTags(){$('tagArea').innerHTML=ingredients.map(ing=>`<span class="tag">${ing}<button class="tag-remove" data-ing="${ing}">×</button></span>`).join('');}
$('tagArea').addEventListener('click',e=>{if(e.target.classList.contains('tag-remove')){ingredients=ingredients.filter(i=>i!==e.target.dataset.ing);renderTags();}});
$('addBtn').addEventListener('click',()=>{addIngredient($('ingredientInput').value);$('ingredientInput').value='';$('ingredientInput').focus();});
$('ingredientInput').addEventListener('keydown',e=>{if(e.key==='Enter'){addIngredient($('ingredientInput').value);$('ingredientInput').value='';}});

const getFilters=()=>[...document.querySelectorAll('.chip input:checked')].map(el=>el.value);

// ── TIME SLIDER ───────────────────────────
$('timeSlider').addEventListener('input',()=>{const v=parseInt($('timeSlider').value);$('timeSliderVal').textContent=v>=120?'Любое':`до ${v} мин`;});
function getMaxTime(){const v=parseInt($('timeSlider').value);return v>=120?null:v;}

// ── 6. HISTORY ────────────────────────────
function saveToHistory(q){if(!q)return;searchHistory=[q,...searchHistory.filter(h=>h!==q)].slice(0,5);localStorage.setItem('chefmind_history',JSON.stringify(searchHistory));renderHistory();}
function renderHistory(){if(!searchHistory.length){$('historyRow').style.display='none';return;}$('historyRow').style.display='flex';$('historyChips').innerHTML=searchHistory.map(h=>`<button class="history-chip" data-q="${h}">${h}</button>`).join('');$('historyChips').querySelectorAll('.history-chip').forEach(c=>c.addEventListener('click',()=>{$('moodInput').value=c.dataset.q;}));}
$('historyClear').addEventListener('click',()=>{searchHistory=[];localStorage.removeItem('chefmind_history');renderHistory();});

// ── 2. VOICE INPUT ───────────────────────
$('micBtn').addEventListener('click',()=>{
  if(!('webkitSpeechRecognition' in window||'SpeechRecognition' in window)){showToast('Браузер не поддерживает голосовой ввод');return;}
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const rec=new SR();
  rec.lang='ru-RU';rec.interimResults=false;rec.maxAlternatives=1;
  $('micBtn').textContent='🔴';$('micBtn').style.animation='timerPulse .6s infinite';
  rec.start();
  rec.onresult=e=>{
    const text=e.results[0][0].transcript;
    text.split(/[,،\s]+/).forEach(w=>{if(w.trim())addIngredient(w.trim());});
    showToast(`Распознано: "${text}" 🎤`);
    trackStat('voice_used');
  };
  rec.onend=()=>{$('micBtn').textContent='🎤';$('micBtn').style.animation='';};
  rec.onerror=()=>{$('micBtn').textContent='🎤';$('micBtn').style.animation='';showToast('Ошибка микрофона');};
});

// ── 1. PHOTO RECOGNITION ─────────────────
$('photoBtn').addEventListener('click',()=>$('photoInput').click());
$('photoInput').addEventListener('change',async e=>{
  const file=e.target.files[0];if(!file)return;
  if(!hasApiKey()){showToast('Для распознавания фото нужен API ключ');return;}
  showToast('📸 Анализирую фото...');
  $('photoBtn').textContent='⏳';
  const base64=await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.readAsDataURL(file);});
  try{
    const result=await analyzePhotoAI(base64);
    result.split(/[,،]+/).forEach(w=>{if(w.trim())addIngredient(w.trim());});
    showToast(`Найдено: ${result} 📸`);
    trackStat('photo_used');
  }catch(err){showToast('Не удалось распознать фото');}
  finally{$('photoBtn').textContent='📸';$('photoInput').value='';}
});

// ── FIND RECIPES ──────────────────────────
$('findBtn').addEventListener('click',async()=>{
  if(!ingredients.length&&!$('moodInput').value.trim()){showToast('Добавьте продукт или пожелание 🥕');return;}
  const query=[...ingredients,$('moodInput').value.trim()].filter(Boolean).join(', ');
  saveToHistory(query);
  $('tabCook').style.display='block';$('resultsSection').style.display='block';
  $('recipeGrid').innerHTML=[1,2,3].map(()=>skelCard()).join('');
  $('recipeGrid').scrollIntoView({behavior:'smooth',block:'start'});
  $('findBtn').disabled=true;
  $('findBtn').querySelector('.btn-find-inner').textContent=hasApiKey()?'🤖 ИИ думает...':'🔍 Ищу...';
  try{
    let recipes=hasApiKey()?await findRecipesAI(ingredients,$('moodInput').value,getFilters(),getMaxTime()):(await new Promise(r=>setTimeout(()=>r(searchFallback(ingredients,$('moodInput').value,getFilters(),getMaxTime())),600)));
    renderRecipes(recipes);
    trackStat('search_count');
    checkAchievements();
  }catch(err){console.error(err);showToast('Ошибка AI — офлайн база');renderRecipes(searchFallback(ingredients,$('moodInput').value,getFilters(),getMaxTime()));}
  finally{$('findBtn').disabled=false;$('findBtn').querySelector('.btn-find-inner').textContent='✨ Найти рецепты';}
});

// ── GENERATE ─────────────────────────────
$('genBtn').addEventListener('click',async()=>{
  const idea=$('genPrompt').value.trim();if(!idea){showToast('Опиши идею 💡');return;}
  $('genBtn').disabled=true;$('genBtn').textContent=hasApiKey()?'🤖 Создаю...':'⏳ Генерирую...';
  $('genResult').style.display='none';
  try{
    const r=hasApiKey()?await generateRecipeAI(idea):(await new Promise(res=>setTimeout(()=>res(generateFallback(idea)),800)));
    $('genResult').style.display='block';$('genResult').innerHTML=recipeDetailHTML(r,false);
    $('genResult').scrollIntoView({behavior:'smooth',block:'start'});
    trackStat('generated');
  }catch(err){const r=generateFallback(idea);$('genResult').style.display='block';$('genResult').innerHTML=recipeDetailHTML(r,false);}
  finally{$('genBtn').disabled=false;$('genBtn').textContent='🍽️ Создать рецепт';}
});

// ── RENDER CARDS ─────────────────────────
function renderRecipes(recipes){
  $('recipeGrid').innerHTML='';
  recipes.forEach((r,i)=>{
    const card=document.createElement('div');card.className='recipe-card';card.style.animationDelay=`${i*.12}s`;
    const isSaved=savedRecipes.some(s=>s.title===r.title);
    const rating=getRecipeRating(r.title);
    card.innerHTML=`
      <div class="recipe-card-img">${r.emoji}</div>
      <div class="recipe-card-body">
        <div class="recipe-card-title">${r.title}</div>
        <div class="recipe-card-desc">${r.description}</div>
        <div class="stars-row">${renderStars(r.title,rating)}</div>
        ${r.kbju?`<div class="kbju-row"><span class="kbju-item kbju-cal">🔥${r.kbju.cal}</span><span class="kbju-item">Б ${r.kbju.protein}г</span><span class="kbju-item">Ж ${r.kbju.fat}г</span><span class="kbju-item">У ${r.kbju.carbs}г</span></div>`:''}
        <div class="recipe-card-meta">
          <span class="recipe-meta-item">⏱ <strong>${r.time}</strong></span>
          <span class="recipe-meta-item">👤 ${r.servings}</span>
          <span class="recipe-meta-item">${dot(r.difficulty)} ${r.difficulty}</span>
        </div>
        <div class="recipe-card-actions">
          <button class="btn-open">Открыть рецепт</button>
          <button class="btn-plan-add" title="Добавить в план">📅</button>
          <button class="btn-save ${isSaved?'saved':''}">♥</button>
        </div>
      </div>`;
    card.querySelector('.btn-open').addEventListener('click',()=>openModal(r));
    card.querySelector('.btn-save').addEventListener('click',e=>toggleSave(r,e.currentTarget));
    card.querySelector('.btn-plan-add').addEventListener('click',e=>{e.stopPropagation();openAddToPlan(r);});
    $('recipeGrid').appendChild(card);
  });
}

const dot=d=>d==='Легко'?'🟢':d==='Средне'?'🟡':'🔴';
const skelCard=()=>`<div class="skeleton-card"><div class="skel skel-img"></div><div class="skel-body"><div class="skel skel-line w60"></div><div class="skel skel-line w80"></div><div class="skel skel-line w40"></div></div></div>`;

// ── 5. RATINGS ────────────────────────────
function getRecipeRating(title){return parseInt(localStorage.getItem(`chefmind_rating_${title}`)||'0');}
function setRecipeRating(title,val){localStorage.setItem(`chefmind_rating_${title}`,val);}
function getRecipeNote(title){return localStorage.getItem(`chefmind_note_${title}`)||'';}
function setRecipeNote(title,val){localStorage.setItem(`chefmind_note_${title}`,val);}
function renderStars(title,current){return[1,2,3,4,5].map(n=>`<button class="star ${n<=current?'star-on':''}" data-title="${title}" data-val="${n}">★</button>`).join('');}
document.addEventListener('click',e=>{
  const star=e.target.closest('.star');if(!star)return;
  const{title,val}=star.dataset;setRecipeRating(title,parseInt(val));
  document.querySelectorAll('.stars-row').forEach(row=>{const fs=row.querySelector('.star');if(fs&&fs.dataset.title===title)row.innerHTML=renderStars(title,parseInt(val));});
  showToast(`Оценка: ${'★'.repeat(parseInt(val))}`);
  trackStat('rated');checkAchievements();
});

// ── MODAL ─────────────────────────────────
function openModal(r){
  currentRecipeForModal=r;
  $('modalContent').innerHTML=recipeDetailHTML(r,true);
  $('modalContent').querySelector('.btn-save-modal')?.addEventListener('click',e=>toggleSave(r,e.currentTarget));
  $('modalContent').querySelector('.btn-shoplist')?.addEventListener('click',()=>openShopList(r));
  const na=$('modalContent').querySelector('.recipe-note-area');
  if(na){na.value=getRecipeNote(r.title);na.addEventListener('input',()=>setRecipeNote(r.title,na.value));}
  $('modalOverlay').style.display='flex';document.body.style.overflow='hidden';
}
$('modalClose').addEventListener('click',closeModal);
$('modalOverlay').addEventListener('click',e=>{if(e.target===$('modalOverlay'))closeModal();});
function closeModal(){$('modalOverlay').style.display='none';document.body.style.overflow='';}

// ── 4. KBJU + PORTIONS ───────────────────
function recipeDetailHTML(r,withSave){
  const isSaved=savedRecipes.some(s=>s.title===r.title);
  const rating=getRecipeRating(r.title);
  const note=getRecipeNote(r.title);
  const bs=r.servingsNum||2;
  return`<span class="modal-emoji">${r.emoji}</span>
<div class="modal-title">${r.title}</div>
<p class="modal-desc">${r.description}</p>
<div class="stars-row" style="margin-bottom:12px">${renderStars(r.title,rating)}</div>
${r.kbju?`<div class="kbju-modal"><div class="kbju-circle kbju-cal-c"><div class="kbju-num">${r.kbju.cal}</div><div class="kbju-lbl">ккал</div></div><div class="kbju-circle kbju-p"><div class="kbju-num">${r.kbju.protein}г</div><div class="kbju-lbl">белки</div></div><div class="kbju-circle kbju-f"><div class="kbju-num">${r.kbju.fat}г</div><div class="kbju-lbl">жиры</div></div><div class="kbju-circle kbju-c"><div class="kbju-num">${r.kbju.carbs}г</div><div class="kbju-lbl">углев.</div></div></div>`:''}
<div class="modal-meta"><div class="modal-meta-item"><span class="val">${r.time}</span><span class="lbl">Время</span></div><div class="modal-meta-item"><span class="val">${dot(r.difficulty)}</span><span class="lbl">${r.difficulty}</span></div></div>
<div class="portions-calc"><span class="portions-label">🍽️ Порции:</span><button class="portions-btn" id="portionsMinus">−</button><span class="portions-val" id="portionsVal">${bs}</span><button class="portions-btn" id="portionsPlus">+</button></div>
${withSave?`<div class="modal-action-row"><button class="btn-find btn-save-modal" style="flex:1">${isSaved?'♥ Сохранено':'♡ Сохранить'}</button><button class="btn-shoplist btn-outline">🛒 Список покупок</button></div>`:''}
<div class="modal-section-title">Ингредиенты</div>
<ul class="ingredients-list" id="ingredientsList" data-base="${bs}" data-current="${bs}">${r.ingredients.map(ing=>`<li data-orig="${ing}">${ing}</li>`).join('')}</ul>
<div class="modal-section-title">Приготовление</div>
<ol class="steps-list">${r.steps.map((s,i)=>{const t=r.stepTimers?.[i]||0;const tb=t>0?`<button class="step-timer-btn" data-sec="${t}">⏱ ${formatTime(t)}</button>`:'';return`<li><span class="step-num">${i+1}</span><span>${s}${tb}</span></li>`;}).join('')}</ol>
<div class="modal-section-title">📝 Моя заметка</div>
<textarea class="recipe-note-area" placeholder="Напишите заметку...">${note}</textarea>`;
}

document.addEventListener('click',e=>{
  const target=e.target;
  if(target.id==='portionsPlus'||target.id==='portionsMinus'){
    const ve=$('portionsVal'),list=$('ingredientsList');if(!ve||!list)return;
    let cur=parseInt(ve.textContent);const base=parseInt(list.dataset.base);
    if(target.id==='portionsMinus')cur=Math.max(1,cur-1);else cur=Math.min(20,cur+1);
    ve.textContent=cur;
    list.querySelectorAll('li').forEach(li=>{li.textContent=scaleIngredient(li.dataset.orig,base,cur);});
  }
});
function scaleIngredient(text,base,current){
  if(base===current)return text;const ratio=current/base;
  return text.replace(/(\d+(?:[.,]\d+)?)/g,(m,n)=>{const s=parseFloat(n.replace(',','.'))*ratio;return s%1===0?s:s.toFixed(1).replace('.0','');});
}

// ── 1. STEP TIMER ─────────────────────────
document.addEventListener('click',e=>{
  const btn=e.target.closest('.step-timer-btn');if(!btn)return;
  if(stepTimerInterval){clearInterval(stepTimerInterval);stepTimerInterval=null;}
  let sec=parseInt(btn.dataset.sec);
  btn.classList.add('timer-running');
  stepTimerInterval=setInterval(()=>{
    sec--;btn.textContent=`⏱ ${formatTime(sec)}`;
    if(sec<=0){clearInterval(stepTimerInterval);stepTimerInterval=null;btn.textContent='✅ Готово!';btn.classList.remove('timer-running');btn.classList.add('timer-done');showToast('⏰ Таймер завершён!');}
  },1000);
});
function formatTime(sec){const m=Math.floor(sec/60),s=sec%60;return`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}

// ── 7. COOK MODE ──────────────────────────
$('cookModeBtn')?.addEventListener('click',()=>{if(!currentRecipeForModal)return;startCookMode(currentRecipeForModal);closeModal();});
function startCookMode(r){cookmodeRecipe=r;cookmodeStep=0;$('cookmodeOverlay').style.display='flex';document.body.style.overflow='hidden';renderCookmodeStep();if('Notification'in window&&Notification.permission==='default')Notification.requestPermission();}
function renderCookmodeStep(){
  const r=cookmodeRecipe;
  $('cookmodeTitle').textContent=`${r.emoji} ${r.title}`;
  $('cookmodeStepNum').textContent=`Шаг ${cookmodeStep+1}`;
  $('cookmodeStepTotal').textContent=`из ${r.steps.length}`;
  $('cookmodeStepText').textContent=r.steps[cookmodeStep];
  $('cookmodePrev').disabled=cookmodeStep===0;
  $('cookmodeNext').textContent=cookmodeStep===r.steps.length-1?'✅ Готово!':'Далее →';
  const t=r.stepTimers?.[cookmodeStep]||0;
  if(t>0){$('cookmodeTimerWrap').style.display='block';timerSeconds=t;$('cookmodeTimer').textContent=formatTime(timerSeconds);$('cookmodeTimerStart').textContent='▶ Старт';clearInterval(timerInterval);timerInterval=null;}
  else{$('cookmodeTimerWrap').style.display='none';clearInterval(timerInterval);timerInterval=null;}
}
$('cookmodeTimerStart').addEventListener('click',()=>{
  if(timerInterval){clearInterval(timerInterval);timerInterval=null;$('cookmodeTimerStart').textContent='▶ Старт';return;}
  $('cookmodeTimerStart').textContent='⏸ Пауза';
  timerInterval=setInterval(()=>{timerSeconds--;$('cookmodeTimer').textContent=formatTime(timerSeconds);if(timerSeconds<=0){clearInterval(timerInterval);timerInterval=null;$('cookmodeTimer').textContent='00:00';$('cookmodeTimerStart').textContent='✅';showToast('⏰ Таймер!');}},1000);
});
$('cookmodeTimerReset').addEventListener('click',()=>{clearInterval(timerInterval);timerInterval=null;timerSeconds=cookmodeRecipe.stepTimers?.[cookmodeStep]||0;$('cookmodeTimer').textContent=formatTime(timerSeconds);$('cookmodeTimerStart').textContent='▶ Старт';});
$('cookmodeNext').addEventListener('click',()=>{clearInterval(timerInterval);timerInterval=null;if(cookmodeStep===cookmodeRecipe.steps.length-1){closeCookMode();return;}cookmodeStep++;renderCookmodeStep();});
$('cookmodePrev').addEventListener('click',()=>{clearInterval(timerInterval);timerInterval=null;if(cookmodeStep>0){cookmodeStep--;renderCookmodeStep();}});
$('cookmodeExit').addEventListener('click',closeCookMode);
function closeCookMode(){clearInterval(timerInterval);timerInterval=null;$('cookmodeOverlay').style.display='none';document.body.style.overflow='';}

// ── 3. SHOPPING LIST ─────────────────────
function openShopList(r){
  $('shopList').innerHTML=r.ingredients.map((ing,i)=>`<label class="shop-item"><input type="checkbox" class="shop-check" id="shop_${i}"/><span class="shop-text">${ing}</span></label>`).join('');
  $('shopOverlay').style.display='flex';document.body.style.overflow='hidden';
  $('shopList').querySelectorAll('.shop-check').forEach(cb=>{cb.addEventListener('change',()=>{cb.nextElementSibling.style.textDecoration=cb.checked?'line-through':'none';cb.nextElementSibling.style.opacity=cb.checked?'.4':'1';});});
}
$('shopClose').addEventListener('click',()=>{$('shopOverlay').style.display='none';document.body.style.overflow='';});
$('shopOverlay').addEventListener('click',e=>{if(e.target===$('shopOverlay')){$('shopOverlay').style.display='none';document.body.style.overflow='';}});
$('shopCopyBtn').addEventListener('click',()=>{
  const text=[...$('shopList').querySelectorAll('.shop-item')].filter(li=>!li.querySelector('input').checked).map(li=>li.querySelector('.shop-text').textContent).join('\n');
  navigator.clipboard.writeText(text||'Всё есть!').then(()=>showToast('Список скопирован! 📋'));
});

// ── 4. RECIPE OF THE DAY ─────────────────
function initRotd(){
  const today=new Date().toDateString();
  const last=localStorage.getItem('chefmind_rotd_date');
  let idx=parseInt(localStorage.getItem('chefmind_rotd_idx')||'0');
  if(last!==today){idx=(idx+1)%RECIPE_DB.length;localStorage.setItem('chefmind_rotd_date',today);localStorage.setItem('chefmind_rotd_idx',idx);}
  const r=RECIPE_DB[idx];
  $('rotdEmoji').textContent=r.emoji;$('rotdTitle').textContent=r.title;$('rotdMeta').textContent=`${r.time} · ${r.difficulty}`;
  $('rotdBanner').style.display='block';
  $('rotdBtn').addEventListener('click',()=>openModal(r));
  $('rotdClose').addEventListener('click',()=>$('rotdBanner').style.display='none');
}

// ── 3. MEAL PLAN ──────────────────────────
function initWeekPlan(){
  const wg=$('weekGrid');if(!wg)return;
  wg.innerHTML=DAYS.map(day=>`
    <div class="week-day" data-day="${day}">
      <div class="week-day-name">${day}</div>
      <div class="week-slots">
        ${['🌅 Завтрак','☀️ Обед','🌙 Ужин'].map(meal=>`
          <div class="week-slot" data-day="${day}" data-meal="${meal}">
            <div class="week-slot-label">${meal}</div>
            <div class="week-slot-content">${weekPlan[day+meal]?`<div class="week-recipe-card">${weekPlan[day+meal].emoji} ${weekPlan[day+meal].title}<button class="week-remove" data-day="${day}" data-meal="${meal}">✕</button></div>`:''}</div>
          </div>`).join('')}
      </div>
    </div>`).join('');
  wg.querySelectorAll('.week-remove').forEach(btn=>{btn.addEventListener('click',e=>{e.stopPropagation();delete weekPlan[btn.dataset.day+btn.dataset.meal];localStorage.setItem('chefmind_plan',JSON.stringify(weekPlan));initWeekPlan();});});
  $('planShopBtn').addEventListener('click',openWeekShopList);
  $('planClearBtn').addEventListener('click',()=>{weekPlan={};localStorage.setItem('chefmind_plan',JSON.stringify(weekPlan));initWeekPlan();showToast('Меню очищено');});
}
function openAddToPlan(r){
  const day=prompt('Выберите день (Пн/Вт/Ср/Чт/Пт/Сб/Вс):','Пн');
  if(!day||!DAYS.includes(day)){showToast('Неверный день');return;}
  const meal=prompt('Приём пищи (🌅 Завтрак / ☀️ Обед / 🌙 Ужин):','☀️ Обед');
  if(!meal){return;}
  weekPlan[day+meal]=r;localStorage.setItem('chefmind_plan',JSON.stringify(weekPlan));
  initWeekPlan();showToast(`«${r.title}» добавлен в ${day} ${meal} 📅`);
}
function openWeekShopList(){
  const all=Object.values(weekPlan).flatMap(r=>r.ingredients||[]);
  const unique=[...new Set(all)];
  $('shopList').innerHTML=unique.map((ing,i)=>`<label class="shop-item"><input type="checkbox" class="shop-check" id="shop_${i}"/><span class="shop-text">${ing}</span></label>`).join('');
  $('shopOverlay').style.display='flex';document.body.style.overflow='hidden';
  $('shopList').querySelectorAll('.shop-check').forEach(cb=>{cb.addEventListener('change',()=>{cb.nextElementSibling.style.textDecoration=cb.checked?'line-through':'none';cb.nextElementSibling.style.opacity=cb.checked?'.4':'1';});});
}

// ── 5. WORLD CUISINES ─────────────────────
function initWorldCuisines(){
  const wg=$('worldGrid');if(!wg)return;
  wg.innerHTML=CUISINES.map(c=>`
    <button class="cuisine-card" data-cuisine="${c.id}" style="--c:${c.color}">
      <span class="cuisine-flag">${c.flag}</span>
      <span class="cuisine-name">${c.name}</span>
    </button>`).join('');
  wg.querySelectorAll('.cuisine-card').forEach(btn=>{
    btn.addEventListener('click',()=>{
      wg.querySelectorAll('.cuisine-card').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const recipes=RECIPE_DB.filter(r=>r.cuisine===btn.dataset.cuisine);
      const wr=$('worldRecipes');wr.innerHTML='';
      if(!recipes.length){wr.innerHTML='<p class="empty-msg">Рецепты этой кухни появятся скоро</p>';return;}
      recipes.forEach((r,i)=>{
        const card=document.createElement('div');card.className='recipe-card';card.style.animationDelay=`${i*.1}s`;
        const isSaved=savedRecipes.some(s=>s.title===r.title);
        card.innerHTML=`<div class="recipe-card-img">${r.emoji}</div><div class="recipe-card-body"><div class="recipe-card-title">${r.title}</div><div class="recipe-card-desc">${r.description}</div><div class="recipe-card-meta"><span class="recipe-meta-item">⏱ <strong>${r.time}</strong></span><span class="recipe-meta-item">👤 ${r.servings}</span><span class="recipe-meta-item">${dot(r.difficulty)} ${r.difficulty}</span></div><div class="recipe-card-actions"><button class="btn-open">Открыть</button><button class="btn-save ${isSaved?'saved':''}">♥</button></div></div>`;
        card.querySelector('.btn-open').addEventListener('click',()=>openModal(r));
        card.querySelector('.btn-save').addEventListener('click',e=>toggleSave(r,e.currentTarget));
        wr.appendChild(card);
      });
    });
  });
}

// ── 6. AI CHAT ────────────────────────────
$('chatSend').addEventListener('click',sendChat);
$('chatInput').addEventListener('keydown',e=>{if(e.key==='Enter')sendChat();});
document.querySelectorAll('.chat-suggest').forEach(btn=>{btn.addEventListener('click',()=>{$('chatInput').value=btn.textContent;sendChat();});});
async function sendChat(){
  const text=$('chatInput').value.trim();if(!text)return;
  appendChatMsg('user',text);$('chatInput').value='';
  chatHistory.push({role:'user',text});
  const thinking=appendChatMsg('ai','...',true);
  if(!hasApiKey()){thinking.querySelector('.chat-bubble').textContent='Для чата нужен API ключ Gemini.';return;}
  try{
    const reply=await chatWithChefAI(chatHistory);
    thinking.querySelector('.chat-bubble').textContent=reply;
    chatHistory.push({role:'ai',text:reply});
    trackStat('chat_messages');
  }catch(err){thinking.querySelector('.chat-bubble').textContent='Ошибка соединения. Попробуйте ещё раз.';}
}
function appendChatMsg(role,text,temp=false){
  const div=document.createElement('div');div.className=`chat-msg chat-msg--${role}`;
  div.innerHTML=`<span class="chat-avatar">${role==='user'?'👤':'👨‍🍳'}</span><div class="chat-bubble">${text}</div>`;
  $('chatMessages').appendChild(div);$('chatMessages').scrollTop=$('chatMessages').scrollHeight;
  return div;
}

// ── 8. PRINT ─────────────────────────────
$('printBtn')?.addEventListener('click',()=>{
  if(!currentRecipeForModal)return;
  const r=currentRecipeForModal;
  $('printArea').innerHTML=`<div class="print-recipe">
    <h1>${r.emoji} ${r.title}</h1>
    <p>${r.description}</p>
    <p><strong>Время:</strong> ${r.time} · <strong>Порции:</strong> ${r.servings} · <strong>Сложность:</strong> ${r.difficulty}</p>
    <h2>Ингредиенты</h2><ul>${r.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul>
    <h2>Приготовление</h2><ol>${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol>
    <p style="margin-top:24px;font-size:12px;color:#888">ChefMind — ИИ-помощник на кухне</p>
  </div>`;
  $('printArea').style.display='block';
  window.print();
  setTimeout(()=>{$('printArea').style.display='none';},1000);
});

// ── SAVE ─────────────────────────────────
function toggleSave(recipe,btn){
  if(!currentUser){showToast('Войдите, чтобы сохранять рецепты 👤');openAuthModal('login');return;}
  const idx=savedRecipes.findIndex(s=>s.title===recipe.title);
  if(idx===-1){savedRecipes.push(recipe);btn.classList.add('saved');if(btn.classList.contains('btn-save-modal'))btn.textContent='♥ Сохранено';showToast(`«${recipe.title}» сохранён ♥`);trackStat('saved_count');checkAchievements();}
  else{savedRecipes.splice(idx,1);btn.classList.remove('saved');if(btn.classList.contains('btn-save-modal'))btn.textContent='♡ Сохранить';showToast(`«${recipe.title}» удалён`);}
  localStorage.setItem(`chefmind_saved_${currentUser.username}`,JSON.stringify(savedRecipes));
}

// ── 12. SAVED: SEARCH + SORT ─────────────
function renderSaved(){
  $('savedGrid').innerHTML='';
  if(!currentUser){$('savedEmpty').textContent='Войдите чтобы видеть сохранённые рецепты';$('savedEmpty').style.display='block';return;}
  let list=[...savedRecipes];
  const q=($('savedSearch')?.value||'').toLowerCase();
  if(q)list=list.filter(r=>r.title.toLowerCase().includes(q));
  const sort=$('savedSort')?.value||'date';
  if(sort==='rating')list.sort((a,b)=>getRecipeRating(b.title)-getRecipeRating(a.title));
  else if(sort==='time')list.sort((a,b)=>(a.timeMin||999)-(b.timeMin||999));
  if(!list.length){$('savedEmpty').textContent='Ничего не найдено';$('savedEmpty').style.display='block';return;}
  $('savedEmpty').style.display='none';
  list.forEach((r,i)=>{
    const card=document.createElement('div');card.className='recipe-card';card.style.animationDelay=`${i*.1}s`;
    const rating=getRecipeRating(r.title);
    card.innerHTML=`<div class="recipe-card-img">${r.emoji}</div><div class="recipe-card-body"><div class="recipe-card-title">${r.title}</div><div class="recipe-card-desc">${r.description}</div><div class="stars-row">${renderStars(r.title,rating)}</div><div class="recipe-card-meta"><span class="recipe-meta-item">⏱ <strong>${r.time}</strong></span><span class="recipe-meta-item">👤 ${r.servings}</span><span class="recipe-meta-item">${dot(r.difficulty)} ${r.difficulty}</span></div><div class="recipe-card-actions"><button class="btn-open">Открыть</button><button class="btn-save saved">♥</button></div></div>`;
    card.querySelector('.btn-open').addEventListener('click',()=>openModal(r));
    card.querySelector('.btn-save').addEventListener('click',e=>{toggleSave(r,e.currentTarget);renderSaved();});
    $('savedGrid').appendChild(card);
  });
}
$('savedSearch')?.addEventListener('input',renderSaved);
$('savedSort')?.addEventListener('change',renderSaved);

// ── 7. STATS ─────────────────────────────
function trackStat(key){const k=`chefmind_stat_${key}`;localStorage.setItem(k,(parseInt(localStorage.getItem(k)||'0')+1).toString());}
function getStat(key){return parseInt(localStorage.getItem(`chefmind_stat_${key}`)||'0');}
function getStreakDays(){
  const dates=JSON.parse(localStorage.getItem('chefmind_streak')||'[]');
  const today=new Date().toDateString();
  if(!dates.includes(today)){dates.unshift(today);localStorage.setItem('chefmind_streak',JSON.stringify(dates.slice(0,30)));}
  let streak=1;const d=new Date();
  for(let i=1;i<30;i++){d.setDate(d.getDate()-1);if(dates.includes(d.toDateString()))streak++;else break;}
  return streak;
}
getStreakDays();
$('statsBtn')?.addEventListener('click',()=>{
  const searches=getStat('search_count'),saved=getStat('saved_count'),rated=getStat('rated');
  const generated=getStat('generated'),chatMsgs=getStat('chat_messages'),voiceUsed=getStat('voice_used');
  const streak=getStreakDays();
  const topIngr=ingredients.length?ingredients[0]:'—';
  $('statsContent').innerHTML=`
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-num">${searches}</div><div class="stat-lbl">🔍 Поисков</div></div>
      <div class="stat-card"><div class="stat-num">${saved}</div><div class="stat-lbl">♥ Сохранено</div></div>
      <div class="stat-card"><div class="stat-num">${rated}</div><div class="stat-lbl">★ Оценено</div></div>
      <div class="stat-card"><div class="stat-num">${generated}</div><div class="stat-lbl">🍽️ Сгенерировано</div></div>
      <div class="stat-card"><div class="stat-num">${streak}</div><div class="stat-lbl">🔥 Дней подряд</div></div>
      <div class="stat-card"><div class="stat-num">${chatMsgs}</div><div class="stat-lbl">💬 Чат с шефом</div></div>
    </div>
    <div class="achievements-section"><div class="ach-section-title">🏆 Достижения</div><div class="ach-grid">${renderAchievementsGrid()}</div></div>`;
  $('statsOverlay').style.display='flex';document.body.style.overflow='hidden';
});
$('statsClose').addEventListener('click',()=>{$('statsOverlay').style.display='none';document.body.style.overflow='';});
$('statsOverlay').addEventListener('click',e=>{if(e.target===$('statsOverlay')){$('statsOverlay').style.display='none';document.body.style.overflow='';}});

// ── 10. ACHIEVEMENTS ─────────────────────
const ACHIEVEMENTS=[
  {id:'first_search',icon:'🔍',title:'Первый поиск',desc:'Найдите первый рецепт',check:()=>getStat('search_count')>=1},
  {id:'saved_5',icon:'♥',title:'Коллекционер',desc:'Сохраните 5 рецептов',check:()=>getStat('saved_count')>=5},
  {id:'rated_3',icon:'★',title:'Критик',desc:'Оцените 3 рецепта',check:()=>getStat('rated')>=3},
  {id:'generated_1',icon:'🍽️',title:'Изобретатель',desc:'Сгенерируйте рецепт',check:()=>getStat('generated')>=1},
  {id:'streak_3',icon:'🔥',title:'3 дня подряд',desc:'Заходите 3 дня подряд',check:()=>getStreakDays()>=3},
  {id:'streak_7',icon:'🏆',title:'Неделя!',desc:'Заходите 7 дней подряд',check:()=>getStreakDays()>=7},
  {id:'chat_5',icon:'💬',title:'Разговорчивый',desc:'Отправьте 5 сообщений шефу',check:()=>getStat('chat_messages')>=5},
  {id:'voice_1',icon:'🎤',title:'Голос кухни',desc:'Используйте голосовой ввод',check:()=>getStat('voice_used')>=1},
  {id:'searches_10',icon:'🌟',title:'Гурман',desc:'Сделайте 10 поисков',check:()=>getStat('search_count')>=10},
];
function getUnlocked(){return JSON.parse(localStorage.getItem('chefmind_ach')||'[]');}
function checkAchievements(){
  const unlocked=getUnlocked();let newOnes=[];
  ACHIEVEMENTS.forEach(a=>{if(!unlocked.includes(a.id)&&a.check()){unlocked.push(a.id);newOnes.push(a);}});
  localStorage.setItem('chefmind_ach',JSON.stringify(unlocked));
  newOnes.forEach((a,i)=>setTimeout(()=>showAchievement(a),i*2000));
}
function showAchievement(a){
  $('achIcon').textContent=a.icon;$('achTitle').textContent=a.title;$('achSub').textContent=a.desc;
  $('achievementPopup').style.display='flex';
  setTimeout(()=>$('achievementPopup').style.display='none',4000);
}
function renderAchievementsGrid(){
  const unlocked=getUnlocked();
  return ACHIEVEMENTS.map(a=>`<div class="ach-item ${unlocked.includes(a.id)?'ach-unlocked':'ach-locked'}"><div class="ach-item-icon">${a.icon}</div><div class="ach-item-title">${a.title}</div><div class="ach-item-desc">${a.desc}</div></div>`).join('');
}

// ── 11. ONBOARDING ───────────────────────
function initOnboarding(){
  if(localStorage.getItem('chefmind_onboarded'))return;
  $('onboardingOverlay').style.display='flex';
  let step=0;
  const steps=[$('ob1'),$('ob2'),$('ob3')];
  const dots=document.querySelectorAll('.ob-dot');
  function goTo(n){
    steps.forEach((s,i)=>{s.classList.toggle('active',i===n);});
    dots.forEach((d,i)=>{d.classList.toggle('active',i===n);});
    $('obNext').textContent=n===2?'Начать! 🍳':'Далее →';step=n;
  }
  $('obNext').addEventListener('click',()=>{if(step<2)goTo(step+1);else{localStorage.setItem('chefmind_onboarded','1');$('onboardingOverlay').style.display='none';}});
  $('obSkip').addEventListener('click',()=>{localStorage.setItem('chefmind_onboarded','1');$('onboardingOverlay').style.display='none';});
  dots.forEach(d=>d.addEventListener('click',()=>goTo(parseInt(d.dataset.s))));
}

// ── 9. NOTIFICATIONS ─────────────────────
function initNotifications(){
  $('notifBtn').addEventListener('click',()=>{
    if(!('Notification' in window)){showToast('Браузер не поддерживает уведомления');return;}
    if(Notification.permission==='granted'){scheduleNotification();showToast('Уведомления включены! 🔔');}
    else Notification.requestPermission().then(p=>{if(p==='granted'){scheduleNotification();showToast('Уведомления включены! 🔔');}else showToast('Уведомления отклонены');});
  });
}
function scheduleNotification(){
  const r=RECIPE_DB[Math.floor(Math.random()*RECIPE_DB.length)];
  setTimeout(()=>{if(document.hidden)new Notification('ChefMind — Что приготовить?',{body:`${r.emoji} ${r.title} — ${r.time}`,icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍳</text></svg>'});},5000);
}

// ── AUTH ─────────────────────────────────
function openAuthModal(tab='login'){$('authOverlay').style.display='flex';document.body.style.overflow='hidden';switchAuthTab(tab);}
function closeAuthModal(){$('authOverlay').style.display='none';document.body.style.overflow='';clearAuthErrors();}
$('authClose').addEventListener('click',closeAuthModal);
$('authOverlay').addEventListener('click',e=>{if(e.target===$('authOverlay'))closeAuthModal();});
$('tabLogin').addEventListener('click',()=>switchAuthTab('login'));
$('tabRegister').addEventListener('click',()=>switchAuthTab('register'));
function switchAuthTab(tab){
  $('tabLogin').classList.toggle('auth-tab-active',tab==='login');
  $('tabRegister').classList.toggle('auth-tab-active',tab==='register');
  $('loginForm').style.display=tab==='login'?'block':'none';
  $('registerForm').style.display=tab==='register'?'block':'none';
  clearAuthErrors();
}
function clearAuthErrors(){document.querySelectorAll('.auth-error').forEach(el=>{el.textContent='';el.style.display='none';});}
function showAuthError(id,msg){const el=$(id);el.textContent=msg;el.style.display='block';}
$('registerSubmit').addEventListener('click',()=>{
  clearAuthErrors();
  const name=$('regName').value.trim(),username=$('regUsername').value.trim().toLowerCase();
  const password=$('regPassword').value,confirm=$('regConfirm').value;
  if(!name)return showAuthError('regNameError','Введите имя');
  if(!username||username.length<3)return showAuthError('regUsernameError','Логин минимум 3 символа');
  if(/[^a-z0-9_]/.test(username))return showAuthError('regUsernameError','Только латиница, цифры, _');
  if(password.length<6)return showAuthError('regPasswordError','Пароль минимум 6 символов');
  if(password!==confirm)return showAuthError('regConfirmError','Пароли не совпадают');
  const users=getUsers();if(users[username])return showAuthError('regUsernameError','Логин занят');
  users[username]={name,username,passwordHash:hashStr(password)};saveUsers(users);loginUser({name,username});closeAuthModal();showToast(`Добро пожаловать, ${name}! 🎉`);
});
$('loginSubmit').addEventListener('click',()=>{
  clearAuthErrors();
  const username=$('loginUsername').value.trim().toLowerCase(),password=$('loginPassword').value;
  if(!username)return showAuthError('loginUsernameError','Введите логин');
  if(!password)return showAuthError('loginPasswordError','Введите пароль');
  const users=getUsers();if(!users[username])return showAuthError('loginUsernameError','Не найден');
  if(users[username].passwordHash!==hashStr(password))return showAuthError('loginPasswordError','Неверный пароль');
  loginUser(users[username]);closeAuthModal();showToast(`С возвращением, ${users[username].name}! 👋`);
});
function loginUser(user){currentUser={name:user.name,username:user.username};localStorage.setItem('chefmind_session',JSON.stringify(currentUser));savedRecipes=JSON.parse(localStorage.getItem(`chefmind_saved_${user.username}`)||'[]');updateProfileUI();}
$('logoutBtn').addEventListener('click',()=>{currentUser=null;savedRecipes=[];localStorage.removeItem('chefmind_session');updateProfileUI();showToast('Вы вышли');});
$('profileBtn').addEventListener('click',()=>{if(currentUser)$('userPanel').style.display=$('userPanel').style.display==='block'?'none':'block';else openAuthModal('login');});
document.addEventListener('click',e=>{const up=$('userPanel');if(up&&!$('profileBtn').contains(e.target)&&!up.contains(e.target))up.style.display='none';});
function updateProfileUI(){if(currentUser){$('profileLabel').textContent=`👤 ${currentUser.name}`;$('userGreeting').textContent=`${currentUser.name} (@${currentUser.username})`;if($('userPanel'))$('userPanel').style.display='none';}else{$('profileLabel').textContent='Войти';if($('userPanel'))$('userPanel').style.display='none';}}
function updateApiBadge(){const b=$('apiStatusBadge');if(!b)return;b.textContent=hasApiKey()?'🟢 AI активен':'🟡 Офлайн';b.className='api-badge '+(hasApiKey()?'api-badge--on':'api-badge--off');}

let toastTimer;
function showToast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3000);}
