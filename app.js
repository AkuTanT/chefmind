/* ════════════════════════════════════════════
   ChefMind v3.0 — Google Gemini AI
   Бесплатный API, без кредитной карты
════════════════════════════════════════════ */

// ══════════════════════════════════════════
// ⚙️  КОНФИГ — ВСТАВЬТЕ ВАШ КЛЮЧ СЮДА
// ══════════════════════════════════════════
const GEMINI_API_KEY = 'AIzaSyD1LqTjcP4jZC4JJ-3_zOJg6LBiJROmIlw';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// ══════════════════════════════════════════
// РЕЗЕРВНАЯ БАЗА (когда нет ключа / оффлайн)
// ══════════════════════════════════════════
const FALLBACK_DB = [
  { emoji:"🍳", title:"Яичница с сыром и помидорами", description:"Классический завтрак за 10 минут. Нежные яйца, расплавленный сыр и сочные помидоры.", time:"10 мин", servings:"1 порция", difficulty:"Легко", tags:["fast","cheap"], keywords:["яйца","сыр","помидоры","масло"], ingredients:["2 яйца","50г тёртого сыра","1 помидор","1 ч.л. масла","соль, перец"], steps:["Разогрейте сковороду на среднем огне, добавьте масло.","Разбейте яйца, посолите и поперчите.","Нарежьте помидор и выложите рядом с яйцами.","Посыпьте тёртым сыром и накройте крышкой на 1 минуту.","Подавайте горячей с хлебом."] },
  { emoji:"🥪", title:"Горячий сэндвич с сыром", description:"Хрустящий снаружи, тягучий внутри. Простой и сытный перекус.", time:"7 мин", servings:"1 порция", difficulty:"Легко", tags:["fast","cheap"], keywords:["хлеб","сыр","масло"], ingredients:["2 ломтика хлеба","60г сыра","1 ч.л. сливочного масла"], steps:["Разогрейте сковороду на среднем огне.","Намажьте хлеб маслом с одной стороны.","Положите сыр между ломтями (маслом наружу).","Жарьте 2–3 минуты с каждой стороны до золотистой корочки.","Нарежьте по диагонали и подавайте сразу."] },
  { emoji:"🍜", title:"Паста Карбонара без бекона", description:"Сливочная паста с яйцом и сыром за 15 минут.", time:"15 мин", servings:"2 порции", difficulty:"Средне", tags:["fast","cheap"], keywords:["яйца","сыр","макароны","паста","чеснок"], ingredients:["200г макарон","2 яйца","50г тёртого пармезана","1 зубчик чеснока","соль, чёрный перец","1 ст.л. оливкового масла"], steps:["Сварите макароны al dente, оставьте 100мл воды от варки.","Взбейте яйца с тёртым сыром и щепоткой перца.","Обжарьте чеснок в масле 1 минуту, уберите.","Смешайте горячие макароны с яично-сырной смесью.","Добавляйте воду от варки по ложке, помешивая."] },
  { emoji:"🥗", title:"Греческий салат", description:"Средиземноморская классика без готовки. Свежо и ярко.", time:"10 мин", servings:"2 порции", difficulty:"Легко", tags:["fast","vegan","no-dairy"], keywords:["помидоры","огурец","перец","маслины","фета"], ingredients:["3 помидора","1 огурец","1 болгарский перец","½ красной луковицы","100г феты","горсть маслин","3 ст.л. оливкового масла","орегано, соль, перец"], steps:["Нарежьте помидоры, огурец и перец крупными кусками.","Тонко нарежьте красный лук.","Смешайте всё в миске, добавьте маслины.","Сверху разломайте фету.","Полейте оливковым маслом, посыпьте орегано."] },
  { emoji:"🍕", title:"Пицца на сковороде", description:"Быстрая домашняя пицца без духовки. Хрустящая корочка за 20 минут.", time:"20 мин", servings:"2 порции", difficulty:"Средне", tags:["fast"], keywords:["хлеб","мука","сыр","помидоры"], ingredients:["150г муки","½ ч.л. соды","100мл кефира","3 ст.л. томатного соуса","100г тёртого сыра"], steps:["Замесите тесто из муки, соды, соли и кефира.","Раскатайте круг диаметром ~24см.","Разогрейте сковороду с крышкой на среднем огне.","Выложите тесто, смажьте соусом, посыпьте сыром.","Накройте крышкой и жарьте 7–10 минут."] },
  { emoji:"🍲", title:"Яичный суп с зеленью", description:"Лёгкий горячий суп за 10 минут. Питательный и согревающий.", time:"10 мин", servings:"2 порции", difficulty:"Легко", tags:["fast","cheap"], keywords:["яйца","лук","чеснок","зелень","бульон"], ingredients:["3 яйца","500мл бульона","1 луковица","2 зубчика чеснока","зелень","соль, перец"], steps:["Доведите бульон до кипения.","Добавьте лук и чеснок, варите 3 минуты.","Взбейте яйца и тонкой струёй влейте в бульон, помешивая.","Варите ещё 2 минуты, посолите.","Подавайте со свежей зеленью."] },
  { emoji:"🥞", title:"Оладьи на кефире", description:"Пышные, золотистые оладьи. Идеальный завтрак для всей семьи.", time:"20 мин", servings:"3 порции", difficulty:"Легко", tags:["cheap"], keywords:["яйца","мука","кефир","сахар"], ingredients:["1 яйцо","250мл кефира","150г муки","1 ст.л. сахара","½ ч.л. соды","соль","масло"], steps:["Смешайте яйцо с кефиром, сахаром и солью.","Добавьте муку и соду, перемешайте.","Разогрейте сковороду с маслом.","Выкладывайте тесто ложкой, жарьте 2–3 мин с каждой стороны.","Подавайте со сметаной или вареньем."] },
  { emoji:"🧀", title:"Сырный омлет", description:"Пышный французский омлет с расплавленным сыром за 8 минут.", time:"8 мин", servings:"1 порция", difficulty:"Средне", tags:["fast","cheap"], keywords:["яйца","сыр","масло","молоко"], ingredients:["3 яйца","2 ст.л. молока","50г тёртого сыра","1 ч.л. сливочного масла","соль, перец"], steps:["Взбейте яйца с молоком, солью и перцем.","Растопите масло на сковороде.","Вылейте яичную смесь, помешивайте первые 30 секунд.","Посыпьте сыром одну половину.","Сложите омлет пополам и подавайте."] },
  { emoji:"🥘", title:"Картофель с сыром в духовке", description:"Нежный картофель с хрустящей сырной корочкой.", time:"45 мин", servings:"3 порции", difficulty:"Легко", tags:["cheap"], keywords:["картофель","сыр","масло","чеснок"], ingredients:["5 картофелин","100г тёртого сыра","2 ст.л. сливочного масла","2 зубчика чеснока","соль, перец, паприка"], steps:["Разогрейте духовку до 200°C.","Нарежьте картофель дольками, смешайте с маслом и специями.","Выложите на противень в один слой.","Запекайте 30 минут, затем посыпьте сыром.","Запекайте ещё 10 минут."] },
  { emoji:"🍗", title:"Курица в соевом соусе", description:"Сочная курица в глазури из соевого соуса и мёда. Азиатский колорит.", time:"30 мин", servings:"3 порции", difficulty:"Легко", tags:["fast","no-dairy"], keywords:["курица","соевый соус","мёд","чеснок"], ingredients:["500г куриного филе","4 ст.л. соевого соуса","2 ст.л. мёда","3 зубчика чеснока","1 ч.л. имбиря","кунжут"], steps:["Смешайте соевый соус, мёд, чеснок и имбирь.","Нарежьте курицу, замаринуйте 10 минут.","Обжарьте курицу 4 минуты.","Добавьте маринад и тушите 5 минут.","Посыпьте кунжутом и подавайте с рисом."] },
];

// ══════════════════════════════════════════
// ОПРЕДЕЛЯЕМ: есть ли ключ
// ══════════════════════════════════════════
function hasApiKey() {
  return GEMINI_API_KEY && GEMINI_API_KEY !== 'ВСТАВЬТЕ_ВАШ_КЛЮЧ_СЮДА' && GEMINI_API_KEY.length > 10;
}

// ══════════════════════════════════════════
// ВЫЗОВ GEMINI API
// ══════════════════════════════════════════
async function callGemini(prompt) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 2048 }
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  // Убираем markdown-блоки если есть
  return text.replace(/```json|```/g, '').trim();
}

// ══════════════════════════════════════════
// AI: НАЙТИ РЕЦЕПТЫ
// ══════════════════════════════════════════
async function findRecipesAI(ingredients, mood, filters) {
  const filterLabels = {
    vegan: 'веганское (без мяса, рыбы, яиц, молочных продуктов)',
    cheap: 'из дешёвых доступных продуктов',
    fast:  'быстрое (не дольше 20 минут)',
    'no-dairy': 'без молочных продуктов'
  };
  const filterText = filters.map(f => filterLabels[f]).filter(Boolean).join(', ');

  const prompt = `Ты кулинарный помощник. Ответь ТОЛЬКО JSON-массивом из 3 рецептов, без пояснений и без markdown.

Ингредиенты пользователя: ${ingredients.length ? ingredients.join(', ') : 'не указаны — предложи универсальные блюда'}.
${mood ? `Пожелание: «${mood}».` : ''}
${filterText ? `Ограничения: ${filterText}.` : ''}

Каждый объект массива:
{
  "emoji": "один эмодзи блюда",
  "title": "название блюда",
  "description": "2–3 предложения о блюде, вкусе и подаче",
  "time": "время готовки, например «15 мин»",
  "servings": "порции, например «2 порции»",
  "difficulty": "Легко или Средне или Сложно",
  "ingredients": ["ингредиент с количеством", "..."],
  "steps": ["подробный шаг 1", "шаг 2", "шаг 3", "..."]
}`;

  const raw = await callGemini(prompt);
  return JSON.parse(raw);
}

// ══════════════════════════════════════════
// AI: ГЕНЕРАТОР РЕЦЕПТА
// ══════════════════════════════════════════
async function generateRecipeAI(idea) {
  const prompt = `Ты креативный шеф-повар. Придумай оригинальный авторский рецепт по идее: «${idea}».
Ответь ТОЛЬКО одним JSON-объектом, без пояснений и без markdown:
{
  "emoji": "один эмодзи",
  "title": "название блюда",
  "description": "3–4 предложения о вкусе, подаче и особенностях",
  "time": "время готовки",
  "servings": "порции",
  "difficulty": "Легко или Средне или Сложно",
  "ingredients": ["ингредиент и количество", "..."],
  "steps": ["подробный шаг 1", "шаг 2", "..."]
}`;

  const raw = await callGemini(prompt);
  return JSON.parse(raw);
}

// ══════════════════════════════════════════
// РЕЗЕРВНЫЙ ПОИСК (без ключа)
// ══════════════════════════════════════════
const MOOD_MAP = [
  { keys:["остр","пикант"],       filterBoost:"",       extraKw:["перец","чеснок"] },
  { keys:["быстр"],               filterBoost:"fast",   extraKw:[] },
  { keys:["сытн"],                filterBoost:"",       extraKw:["картофель","рис","макароны"] },
  { keys:["лёгк","легк","диет"],  filterBoost:"vegan",  extraKw:[] },
  { keys:["уютн","тёпл","тепл"],  filterBoost:"",       extraKw:["суп","картофель"] },
  { keys:["завтр"],               filterBoost:"",       extraKw:["яйца","хлеб"] },
  { keys:["итальян"],             filterBoost:"",       extraKw:["паста","томаты","сыр"] },
  { keys:["азиат","япон"],        filterBoost:"",       extraKw:["рис","соевый соус"] },
  { keys:["дёшев","деш"],         filterBoost:"cheap",  extraKw:[] },
  { keys:["веган","постн"],       filterBoost:"vegan",  extraKw:[] },
];
const TWISTS = [
  { name:"по-мексикански",      extra:["1 ч.л. чили","½ лайма","кинза"],           emoji:"🌶️" },
  { name:"по-азиатски",         extra:["1 ст.л. соевого соуса","имбирь","кунжут"], emoji:"🥢" },
  { name:"по-средиземноморски", extra:["оливки","тимьян","оливковое масло"],        emoji:"🫒" },
  { name:"с травами",           extra:["розмарин","тимьян","базилик"],             emoji:"🌿" },
  { name:"с пикантной ноткой",  extra:["1 ч.л. паприки","кайенский перец"],        emoji:"🔥" },
  { name:"по-домашнему",        extra:["сметана","укроп"],                         emoji:"🏡" },
  { name:"с сырной корочкой",   extra:["100г тёртого сыра","мускатный орех"],      emoji:"🧀" },
  { name:"в кокосовом соусе",   extra:["100мл кокосового молока","карри"],         emoji:"🥥" },
];

function searchFallback(userIngredients, mood, filters) {
  const ml = mood.toLowerCase();
  let moodKw=[], moodFilters=[...filters];
  for(const m of MOOD_MAP){
    if(m.keys.some(k=>ml.includes(k))){ moodKw.push(...m.extraKw); if(m.filterBoost) moodFilters.push(m.filterBoost); }
  }
  const allKw = [...userIngredients, ...moodKw];
  const scored = FALLBACK_DB.map(r => {
    let s=0;
    for(const kw of allKw) for(const rk of r.keywords) if(rk.includes(kw)||kw.includes(rk)) s+=3;
    for(const f of moodFilters) if(r.tags.includes(f)) s+=2;
    for(const f of filters) if(!r.tags.includes(f)) s-=1;
    return {r,s};
  }).sort((a,b)=>b.s-a.s);
  if(scored.slice(0,3).every(x=>x.s<=0)) return [...FALLBACK_DB].sort(()=>Math.random()-.5).slice(0,3);
  return scored.slice(0,3).map(x=>x.r);
}

function generateFallback(idea) {
  const words = idea.toLowerCase().split(/\s+/);
  const base = searchFallback(words, idea, [])[0];
  let twist = TWISTS[Math.floor(Math.random()*TWISTS.length)];
  if(/остр|пикант/.test(idea)) twist=TWISTS[4];
  else if(/азиат|япон/.test(idea)) twist=TWISTS[1];
  else if(/мексик/.test(idea)) twist=TWISTS[0];
  else if(/сыр/.test(idea)) twist=TWISTS[6];
  else if(/кокос|карри/.test(idea)) twist=TWISTS[7];
  return {
    emoji: twist.emoji,
    title: `${base.title} ${twist.name}`,
    description: `Авторская вариация классического рецепта. ${base.description}`,
    time: base.time, servings: base.servings, difficulty: base.difficulty,
    ingredients: [...base.ingredients, ...twist.extra],
    steps: [...base.steps.slice(0,-1), `Добавьте ${twist.extra.join(', ')} за 2 минуты до готовности.`, base.steps[base.steps.length-1]]
  };
}

// ══════════════════════════════════════════
// AUTH HELPERS
// ══════════════════════════════════════════
function getUsers()       { return JSON.parse(localStorage.getItem('chefmind_users') || '{}'); }
function saveUsers(u)     { localStorage.setItem('chefmind_users', JSON.stringify(u)); }
function hashStr(s)       { let h=0; for(let i=0;i<s.length;i++) h=(Math.imul(31,h)+s.charCodeAt(i))|0; return h.toString(36); }

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let ingredients  = [];
let currentUser  = JSON.parse(localStorage.getItem('chefmind_session') || 'null');
let savedRecipes = currentUser
  ? JSON.parse(localStorage.getItem(`chefmind_saved_${currentUser.username}`) || '[]')
  : [];

// ══════════════════════════════════════════
// DOM REFS
// ══════════════════════════════════════════
const $ = id => document.getElementById(id);
const tagArea=$('tagArea'), ingredientInput=$('ingredientInput'), addBtn=$('addBtn');
const findBtn=$('findBtn'), resultsSection=$('resultsSection'), recipeGrid=$('recipeGrid');
const moodInput=$('moodInput'), modalOverlay=$('modalOverlay'), modalClose=$('modalClose');
const modalContent=$('modalContent'), profileBtn=$('profileBtn'), profileLabel=$('profileLabel');
const savedGrid=$('savedGrid'), savedEmpty=$('savedEmpty');
const genBtn=$('genBtn'), genPrompt=$('genPrompt'), genResult=$('genResult'), toast=$('toast');
const authOverlay=$('authOverlay'), authClose=$('authClose');
const tabLogin=$('tabLogin'), tabRegister=$('tabRegister');
const loginForm=$('loginForm'), registerForm=$('registerForm');
const loginSubmit=$('loginSubmit'), registerSubmit=$('registerSubmit');
const logoutBtn=$('logoutBtn'), userPanel=$('userPanel'), userGreeting=$('userGreeting');
const apiStatusBadge=$('apiStatusBadge');

// ══════════════════════════════════════════
// API STATUS BADGE
// ══════════════════════════════════════════
function updateApiBadge() {
  if (!apiStatusBadge) return;
  if (hasApiKey()) {
    apiStatusBadge.textContent = '🟢 AI активен';
    apiStatusBadge.className = 'api-badge api-badge--on';
  } else {
    apiStatusBadge.textContent = '🟡 Режим офлайн';
    apiStatusBadge.className = 'api-badge api-badge--off';
  }
}

// ══════════════════════════════════════════
// MAIN NAV TABS
// ══════════════════════════════════════════
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    $('tabCook').style.display = $('tabSaved').style.display = $('tabGenerate').style.display = 'none';
    resultsSection.style.display = 'none';
    if (tab==='cook')     { $('tabCook').style.display='block'; if(recipeGrid.children.length) resultsSection.style.display='block'; }
    else if (tab==='saved')    { $('tabSaved').style.display='block'; renderSaved(); }
    else if (tab==='generate') { $('tabGenerate').style.display='block'; }
  });
});

// ══════════════════════════════════════════
// INGREDIENT TAGS
// ══════════════════════════════════════════
function addIngredient(val) {
  const v = val.trim().toLowerCase();
  if (!v || ingredients.includes(v)) return;
  ingredients.push(v);
  renderTags();
}
function renderTags() {
  tagArea.innerHTML = ingredients.map(ing =>
    `<span class="tag">${ing}<button class="tag-remove" data-ing="${ing}">×</button></span>`
  ).join('');
}
tagArea.addEventListener('click', e => {
  if (e.target.classList.contains('tag-remove')) {
    ingredients = ingredients.filter(i => i !== e.target.dataset.ing);
    renderTags();
  }
});
addBtn.addEventListener('click', () => { addIngredient(ingredientInput.value); ingredientInput.value=''; ingredientInput.focus(); });
ingredientInput.addEventListener('keydown', e => { if(e.key==='Enter'){ addIngredient(ingredientInput.value); ingredientInput.value=''; } });

// ══════════════════════════════════════════
// FILTERS
// ══════════════════════════════════════════
const getFilters = () => [...document.querySelectorAll('.chip input:checked')].map(el => el.value);

// ══════════════════════════════════════════
// FIND RECIPES
// ══════════════════════════════════════════
findBtn.addEventListener('click', async () => {
  if (!ingredients.length && !moodInput.value.trim()) { showToast('Добавьте продукт или пожелание 🥕'); return; }

  $('tabCook').style.display='block';
  resultsSection.style.display='block';
  recipeGrid.innerHTML = [1,2,3].map(()=>skelCard()).join('');
  recipeGrid.scrollIntoView({behavior:'smooth',block:'start'});
  findBtn.disabled = true;
  findBtn.querySelector('.btn-find-inner').textContent = hasApiKey() ? '🤖 ИИ думает...' : '🔍 Ищу...';

  try {
    let recipes;
    if (hasApiKey()) {
      recipes = await findRecipesAI(ingredients, moodInput.value, getFilters());
    } else {
      await new Promise(r => setTimeout(r, 600));
      recipes = searchFallback(ingredients, moodInput.value, getFilters());
    }
    renderRecipes(recipes);
  } catch(err) {
    console.error(err);
    showToast('Ошибка AI — используем офлайн базу');
    await new Promise(r => setTimeout(r, 300));
    renderRecipes(searchFallback(ingredients, moodInput.value, getFilters()));
  } finally {
    findBtn.disabled = false;
    findBtn.querySelector('.btn-find-inner').textContent = '✨ Найти рецепты';
  }
});

// ══════════════════════════════════════════
// GENERATE RECIPE
// ══════════════════════════════════════════
genBtn.addEventListener('click', async () => {
  const idea = genPrompt.value.trim();
  if (!idea) { showToast('Опиши идею блюда 💡'); return; }

  genBtn.disabled = true;
  genBtn.textContent = hasApiKey() ? '🤖 ИИ создаёт рецепт...' : '⏳ Генерирую...';
  genResult.style.display = 'none';

  try {
    let recipe;
    if (hasApiKey()) {
      recipe = await generateRecipeAI(idea);
    } else {
      await new Promise(r => setTimeout(r, 800));
      recipe = generateFallback(idea);
    }
    genResult.style.display = 'block';
    genResult.innerHTML = recipeDetailHTML(recipe, false);
    genResult.scrollIntoView({behavior:'smooth',block:'start'});
  } catch(err) {
    console.error(err);
    showToast('Ошибка AI — используем офлайн генератор');
    const recipe = generateFallback(idea);
    genResult.style.display = 'block';
    genResult.innerHTML = recipeDetailHTML(recipe, false);
  } finally {
    genBtn.disabled = false;
    genBtn.textContent = '🍽️ Создать рецепт';
  }
});

// ══════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════
function renderRecipes(recipes) {
  recipeGrid.innerHTML = '';
  recipes.forEach((r,i) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.style.animationDelay = `${i*.12}s`;
    const isSaved = savedRecipes.some(s=>s.title===r.title);
    card.innerHTML = `
      <div class="recipe-card-img">${r.emoji}</div>
      <div class="recipe-card-body">
        <div class="recipe-card-title">${r.title}</div>
        <div class="recipe-card-desc">${r.description}</div>
        <div class="recipe-card-meta">
          <span class="recipe-meta-item">⏱ <strong>${r.time}</strong></span>
          <span class="recipe-meta-item">👤 ${r.servings}</span>
          <span class="recipe-meta-item">${dot(r.difficulty)} ${r.difficulty}</span>
        </div>
        <div class="recipe-card-actions">
          <button class="btn-open">Открыть рецепт</button>
          <button class="btn-save ${isSaved?'saved':''}">♥</button>
        </div>
      </div>`;
    card.querySelector('.btn-open').addEventListener('click', ()=>openModal(r));
    card.querySelector('.btn-save').addEventListener('click', e=>toggleSave(r,e.currentTarget));
    recipeGrid.appendChild(card);
  });
}

const dot = d => d==='Легко'?'🟢':d==='Средне'?'🟡':'🔴';
const skelCard = () => `<div class="skeleton-card"><div class="skel skel-img"></div><div class="skel-body"><div class="skel skel-line w60"></div><div class="skel skel-line w80"></div><div class="skel skel-line w40"></div></div></div>`;

// ══════════════════════════════════════════
// MODAL
// ══════════════════════════════════════════
function openModal(r) {
  modalContent.innerHTML = recipeDetailHTML(r, true);
  modalContent.querySelector('.btn-save-modal')?.addEventListener('click', e=>toggleSave(r,e.currentTarget));
  modalOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e=>{ if(e.target===modalOverlay) closeModal(); });
function closeModal() { modalOverlay.style.display='none'; document.body.style.overflow=''; }

function recipeDetailHTML(r, withSave) {
  const isSaved = savedRecipes.some(s=>s.title===r.title);
  return `<span class="modal-emoji">${r.emoji}</span>
    <div class="modal-title">${r.title}</div>
    <p class="modal-desc">${r.description}</p>
    <div class="modal-meta">
      <div class="modal-meta-item"><span class="val">${r.time}</span><span class="lbl">Время</span></div>
      <div class="modal-meta-item"><span class="val">${r.servings}</span><span class="lbl">Порции</span></div>
      <div class="modal-meta-item"><span class="val">${dot(r.difficulty)}</span><span class="lbl">${r.difficulty}</span></div>
    </div>
    ${withSave?`<button class="btn-find btn-save-modal" style="margin-bottom:8px">${isSaved?'♥ Сохранено':'♡ Сохранить рецепт'}</button>`:''}
    <div class="modal-section-title">Ингредиенты</div>
    <ul class="ingredients-list">${r.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul>
    <div class="modal-section-title">Приготовление</div>
    <ol class="steps-list">${r.steps.map((s,i)=>`<li><span class="step-num">${i+1}</span><span>${s}</span></li>`).join('')}</ol>`;
}

// ══════════════════════════════════════════
// SAVE / UNSAVE
// ══════════════════════════════════════════
function toggleSave(recipe, btn) {
  if (!currentUser) { showToast('Войдите, чтобы сохранять рецепты 👤'); openAuthModal('login'); return; }
  const idx = savedRecipes.findIndex(s=>s.title===recipe.title);
  if (idx===-1) {
    savedRecipes.push(recipe); btn.classList.add('saved');
    if(btn.classList.contains('btn-save-modal')) btn.textContent='♥ Сохранено';
    showToast(`«${recipe.title}» сохранён ♥`);
  } else {
    savedRecipes.splice(idx,1); btn.classList.remove('saved');
    if(btn.classList.contains('btn-save-modal')) btn.textContent='♡ Сохранить рецепт';
    showToast(`«${recipe.title}» удалён из сохранённых`);
  }
  localStorage.setItem(`chefmind_saved_${currentUser.username}`, JSON.stringify(savedRecipes));
}

// ══════════════════════════════════════════
// SAVED TAB
// ══════════════════════════════════════════
function renderSaved() {
  savedGrid.innerHTML = '';
  if (!currentUser) { savedEmpty.textContent='Войдите, чтобы видеть сохранённые рецепты'; savedEmpty.style.display='block'; return; }
  if (!savedRecipes.length) { savedEmpty.textContent='Нет сохранённых рецептов. Найдите что-нибудь вкусное!'; savedEmpty.style.display='block'; return; }
  savedEmpty.style.display = 'none';
  savedRecipes.forEach((r,i) => {
    const card = document.createElement('div');
    card.className = 'recipe-card'; card.style.animationDelay=`${i*.1}s`;
    card.innerHTML=`<div class="recipe-card-img">${r.emoji}</div><div class="recipe-card-body"><div class="recipe-card-title">${r.title}</div><div class="recipe-card-desc">${r.description}</div><div class="recipe-card-meta"><span class="recipe-meta-item">⏱ <strong>${r.time}</strong></span><span class="recipe-meta-item">👤 ${r.servings}</span><span class="recipe-meta-item">${dot(r.difficulty)} ${r.difficulty}</span></div><div class="recipe-card-actions"><button class="btn-open">Открыть</button><button class="btn-save saved">♥</button></div></div>`;
    card.querySelector('.btn-open').addEventListener('click',()=>openModal(r));
    card.querySelector('.btn-save').addEventListener('click',e=>{ toggleSave(r,e.currentTarget); renderSaved(); });
    savedGrid.appendChild(card);
  });
}

// ══════════════════════════════════════════
// AUTH MODAL
// ══════════════════════════════════════════
function openAuthModal(tab='login') { authOverlay.style.display='flex'; document.body.style.overflow='hidden'; switchAuthTab(tab); }
function closeAuthModal() { authOverlay.style.display='none'; document.body.style.overflow=''; clearAuthErrors(); }

authClose.addEventListener('click', closeAuthModal);
authOverlay.addEventListener('click', e=>{ if(e.target===authOverlay) closeAuthModal(); });
tabLogin.addEventListener('click', ()=>switchAuthTab('login'));
tabRegister.addEventListener('click', ()=>switchAuthTab('register'));

function switchAuthTab(tab) {
  tabLogin.classList.toggle('auth-tab-active', tab==='login');
  tabRegister.classList.toggle('auth-tab-active', tab==='register');
  loginForm.style.display    = tab==='login'    ? 'block' : 'none';
  registerForm.style.display = tab==='register' ? 'block' : 'none';
  clearAuthErrors();
}
function clearAuthErrors() { document.querySelectorAll('.auth-error').forEach(el=>{ el.textContent=''; el.style.display='none'; }); }
function showAuthError(id, msg) { const el=$(id); el.textContent=msg; el.style.display='block'; }

registerSubmit.addEventListener('click', () => {
  clearAuthErrors();
  const name=$('regName').value.trim(), username=$('regUsername').value.trim().toLowerCase();
  const password=$('regPassword').value, confirm=$('regConfirm').value;
  if(!name) return showAuthError('regNameError','Введите имя');
  if(!username||username.length<3) return showAuthError('regUsernameError','Логин минимум 3 символа');
  if(/[^a-z0-9_]/.test(username)) return showAuthError('regUsernameError','Только латинские буквы, цифры, _');
  if(password.length<6) return showAuthError('regPasswordError','Пароль минимум 6 символов');
  if(password!==confirm) return showAuthError('regConfirmError','Пароли не совпадают');
  const users=getUsers();
  if(users[username]) return showAuthError('regUsernameError','Этот логин уже занят');
  users[username]={name,username,passwordHash:hashStr(password)};
  saveUsers(users);
  loginUser({name,username});
  closeAuthModal();
  showToast(`Добро пожаловать, ${name}! 🎉`);
});

loginSubmit.addEventListener('click', () => {
  clearAuthErrors();
  const username=$('loginUsername').value.trim().toLowerCase(), password=$('loginPassword').value;
  if(!username) return showAuthError('loginUsernameError','Введите логин');
  if(!password) return showAuthError('loginPasswordError','Введите пароль');
  const users=getUsers();
  if(!users[username]) return showAuthError('loginUsernameError','Пользователь не найден');
  if(users[username].passwordHash!==hashStr(password)) return showAuthError('loginPasswordError','Неверный пароль');
  loginUser(users[username]);
  closeAuthModal();
  showToast(`С возвращением, ${users[username].name}! 👋`);
});

function loginUser(user) {
  currentUser={name:user.name,username:user.username};
  localStorage.setItem('chefmind_session',JSON.stringify(currentUser));
  savedRecipes=JSON.parse(localStorage.getItem(`chefmind_saved_${user.username}`)||'[]');
  updateProfileUI();
}

logoutBtn.addEventListener('click', () => {
  currentUser=null; savedRecipes=[];
  localStorage.removeItem('chefmind_session');
  updateProfileUI();
  showToast('Вы вышли из аккаунта');
});

profileBtn.addEventListener('click', () => {
  if(currentUser) userPanel.style.display = userPanel.style.display==='block' ? 'none' : 'block';
  else openAuthModal('login');
});

document.addEventListener('click', e => {
  if(userPanel && !profileBtn.contains(e.target) && !userPanel.contains(e.target)) userPanel.style.display='none';
});

function updateProfileUI() {
  if(currentUser) {
    profileLabel.textContent=`👤 ${currentUser.name}`;
    userGreeting.textContent=`${currentUser.name} (@${currentUser.username})`;
    userPanel.style.display='none';
  } else {
    profileLabel.textContent='Войти';
    if(userPanel) userPanel.style.display='none';
  }
}

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
let toastTimer;
function showToast(msg) { toast.textContent=msg; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),3000); }

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
updateProfileUI();
updateApiBadge();
