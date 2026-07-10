const questions=[{"cat": "basic", "q": "100Vエアコンを200Vコンセントへそのまま接続できる？", "choices": ["できる", "できない"], "answer": 1, "exp": "電圧が異なるため接続できません。"}, {"cat": "basic", "q": "専用回路とは？", "choices": ["延長コード", "エアコンだけが使う電気回路", "アース線", "化粧カバー"], "answer": 1, "exp": "エアコン専用に用意された電気回路です。"}, {"cat": "price", "q": "配管が標準の長さを超えた場合は？", "choices": ["追加なし", "配管延長の追加工事になる", "必ず設置不可", "必ず200Vになる"], "answer": 1, "exp": "標準範囲を超えた配管は追加工事確認が必要です。"}, {"cat": "price", "q": "屋外化粧カバーの役割は？", "choices": ["冷房能力を上げる", "配管保護と見た目の向上", "電気代を下げる", "室外機を軽くする"], "answer": 1, "exp": "配管を保護し、外観もきれいにします。"}, {"cat": "quality", "q": "真空引きの目的は？", "choices": ["ガスを増やす", "配管内の空気・水分を除去する", "室外機を冷やす", "音を小さくする"], "answer": 1, "exp": "性能低下や故障リスクを防ぎます。"}, {"cat": "quality", "q": "スリーブを使う理由は？", "choices": ["壁を補強する", "結露・虫・小動物侵入対策", "配管を太くする", "室外機を固定する"], "answer": 1, "exp": "配管穴を保護し、壁内トラブルを防ぎます。"}, {"cat": "talk", "q": "追加料金について適切な説明は？", "choices": ["絶対ありません", "設置状況により追加工事が必要な場合があります", "全部無料です", "確認しません"], "answer": 1, "exp": "設置条件を確認しながら案内します。"}, {"cat": "talk", "q": "他店の方が安いと言われた時は？", "choices": ["すぐ値引きします", "本体価格だけでなく工事内容も確認しましょう", "他店は悪いです", "無理です"], "answer": 1, "exp": "価格差の理由を確認します。"}];
const pricingItems=[{"id": "cover_out_2m", "name": "標準配管カバー（屋外）2mストレート", "price": 6600, "type": "check"}, {"id": "cover_out_ext", "name": "配管カバー延長 1mごと", "price": 3300, "type": "qty"}, {"id": "cover_out_corner", "name": "カバー曲がり 1ヶ所", "price": 2200, "type": "qty"}, {"id": "cover_in_1m", "name": "室内配管カバー 1m以内", "price": 11000, "type": "check"}, {"id": "pipe_ext", "name": "配管延長 1mごと", "price": 4400, "type": "qty"}, {"id": "outlet_replace", "name": "コンセント交換", "price": 3300, "type": "check"}, {"id": "voltage_change", "name": "電圧切替工事", "price": 6600, "type": "check"}, {"id": "circuit_same", "name": "専用回路 同一階 10m以内", "price": 17600, "type": "check"}, {"id": "circuit_diff", "name": "専用回路 2階→1階 10m以内", "price": 28600, "type": "check"}, {"id": "breaker", "name": "ブレーカー取付", "price": 5500, "type": "check"}, {"id": "hole_wood", "name": "木造穴あけ追加", "price": 2750, "type": "check"}, {"id": "hole_tile", "name": "タイル・ガルバ穴あけ", "price": 6600, "type": "check"}, {"id": "hole_concrete", "name": "コンクリート穴あけ", "price": 17600, "type": "check"}, {"id": "sleeve", "name": "貫通スリーブ使用", "price": 3300, "type": "check"}, {"id": "hole_close", "name": "穴塞ぎ工事", "price": 2200, "type": "check"}, {"id": "recycle", "name": "リサイクル料金", "price": 550, "type": "check"}, {"id": "collect", "name": "収集運搬料", "price": 3520, "type": "check"}];
const wizardQuestions=[
{key:"floor",q:"設置場所は？",choices:["1階","2階","3階以上"]},
{key:"outdoor",q:"室外機の置き場所は？",choices:["地面","ベランダ","壁面","屋根置き","天吊","二段置","分からない"]},
{key:"circuit",q:"専用回路は？",choices:["ある","ない","分からない"]},
{key:"voltage",q:"電圧・コンセントは？",choices:["そのまま使える","コンセント交換","電圧切替","分からない"]},
{key:"hole",q:"配管穴は？",choices:["ある","ない","分からない"]},
{key:"pipe",q:"標準4mから何m延長？",choices:["なし","1m","2m","3m","4m以上","分からない"]},
{key:"cover",q:"化粧カバーは？",choices:["不要","屋外2m","屋外2m＋延長1m","室内カバー","分からない"]},
{key:"recycle",q:"既設エアコンの処分は？",choices:["不要","リサイクルのみ","収集運搬も必要","分からない"]}
];

let quizSet=[],current=0,score=0,answered=false;
let estimateState={},wizardIndex=0,wizardAnswers={};

function $(id){return document.getElementById(id);}
function yen(n){return"¥"+n.toLocaleString();}
function hideAll(){["home","quiz","finish","diagnosis","score","estimate","wizard"].forEach(id=>$(id).classList.add("hidden"));}
function stats(){return JSON.parse(localStorage.getItem("airconStats")||'{"total":0,"correct":0}');}
function saveStats(t,c){const s=stats();s.total+=t;s.correct+=c;localStorage.setItem("airconStats",JSON.stringify(s));}
function updateHome(){const s=stats();const acc=s.total?Math.round(s.correct/s.total*100):0;$("totalSolved").textContent=s.total;$("accuracy").textContent=acc+"%";$("rank").textContent=acc>=90&&s.total>=30?"マスター":acc>=80?"ゴールド":acc>=60?"ブロンズ":"新人";}
function showHome(){hideAll();updateHome();$("home").classList.remove("hidden");}

function startQuiz(cat){hideAll();current=0;score=0;const pool=cat==="today"?[...questions]:questions.filter(x=>x.cat===cat);quizSet=pool.sort(()=>Math.random()-.5).slice(0,10);$("quizTitle").textContent=cat==="today"?"今日の10問":cat==="basic"?"基礎知識":cat==="price"?"工事料金問題":cat==="quality"?"良質工事":"接客問題";$("quiz").classList.remove("hidden");showQuestion();}
function catName(cat){return cat==="basic"?"基礎":cat==="price"?"料金":cat==="quality"?"良質工事":"接客";}
function showQuestion(){answered=false;const q=quizSet[current];$("progressText").textContent=`問題 ${current+1} / ${quizSet.length}`;$("progressBar").style.width=`${current/quizSet.length*100}%`;$("categoryBadge").textContent=catName(q.cat);$("questionText").textContent=q.q;$("result").classList.add("hidden");$("nextBtn").classList.add("hidden");$("choices").innerHTML="";q.choices.forEach((choice,i)=>{const btn=document.createElement("button");btn.className="choice";btn.textContent=choice;btn.onclick=()=>answer(i);$("choices").appendChild(btn);});}
function answer(i){if(answered)return;answered=true;const q=quizSet[current];document.querySelectorAll(".choice").forEach((b,idx)=>{if(idx===q.answer)b.classList.add("correct");if(idx===i&&i!==q.answer)b.classList.add("wrong");});if(i===q.answer)score++;$("result").innerHTML=`<strong>${i===q.answer?"⭕ 正解！":"❌ 不正解"}</strong><br>${q.exp}`;$("result").classList.remove("hidden");$("nextBtn").classList.remove("hidden");}
function nextQuestion(){current++;if(current>=quizSet.length){finishQuiz();return;}showQuestion();}
function finishQuiz(){saveStats(quizSet.length,score);hideAll();const percent=Math.round(score/quizSet.length*100);$("finishScore").textContent=percent;$("finishMessage").textContent=percent>=90?"すばらしい！接客マスター級です。":percent>=70?"いい感じです。苦手だけ復習しましょう。":"基礎からもう一度確認しましょう。";$("finish").classList.remove("hidden");}

function showWizard(){hideAll();wizardIndex=0;wizardAnswers={};$("wizardResult").classList.add("hidden");$("wizard").classList.remove("hidden");renderWizard();}
function renderWizard(){const w=wizardQuestions[wizardIndex];$("wizardProgress").textContent=`質問 ${wizardIndex+1} / ${wizardQuestions.length}`;$("wizardQuestion").textContent=w.q;$("wizardChoices").innerHTML="";w.choices.forEach(choice=>{const btn=document.createElement("button");btn.textContent=choice;btn.onclick=()=>{wizardAnswers[w.key]=choice;wizardIndex++;if(wizardIndex>=wizardQuestions.length)showWizardResult();else renderWizard();};$("wizardChoices").appendChild(btn);});}
function addLine(lines,name,price){lines.push({name,price});}
function showWizardResult(){
$("wizardQuestion").textContent="診断結果";$("wizardChoices").innerHTML="";
let lines=[],alerts=[];
if(wizardAnswers.circuit==="ない")addLine(lines,"専用回路 同一階 10m以内",17600);
if(wizardAnswers.circuit==="分からない")alerts.push("専用回路の有無を確認");
if(wizardAnswers.voltage==="コンセント交換")addLine(lines,"コンセント交換",3300);
if(wizardAnswers.voltage==="電圧切替")addLine(lines,"電圧切替工事",6600);
if(wizardAnswers.voltage==="分からない")alerts.push("電圧・コンセント形状を確認");
if(wizardAnswers.hole==="ない")addLine(lines,"木造穴あけ追加",2750);
if(wizardAnswers.hole==="分からない")alerts.push("配管穴の有無を確認");
if(wizardAnswers.pipe==="1m")addLine(lines,"配管延長 1m",4400);
if(wizardAnswers.pipe==="2m")addLine(lines,"配管延長 2m",8800);
if(wizardAnswers.pipe==="3m")addLine(lines,"配管延長 3m",13200);
if(wizardAnswers.pipe==="4m以上")alerts.push("配管延長は実測後に計算");
if(wizardAnswers.cover==="屋外2m")addLine(lines,"標準配管カバー（屋外）2m",6600);
if(wizardAnswers.cover==="屋外2m＋延長1m"){addLine(lines,"標準配管カバー（屋外）2m",6600);addLine(lines,"配管カバー延長 1m",3300);}
if(wizardAnswers.cover==="室内カバー")addLine(lines,"室内配管カバー 1m以内",11000);
if(wizardAnswers.recycle==="リサイクルのみ")addLine(lines,"リサイクル料金",550);
if(wizardAnswers.recycle==="収集運搬も必要"){addLine(lines,"リサイクル料金",550);addLine(lines,"収集運搬料",3520);}
if(["壁面","屋根置き","天吊","二段置"].includes(wizardAnswers.outdoor))alerts.push("特殊設置料金を別途確認");
if(wizardAnswers.floor!=="1階")alerts.push("高所作業・配管経路を確認");
const total=lines.reduce((s,x)=>s+x.price,0);
const breakdown=lines.length?`<ul>${lines.map(x=>`<li>${x.name}：<strong>${yen(x.price)}</strong></li>`).join("")}</ul>`:"<p>選択内容では金額加算なし。</p>";
const talk=lines.length?"選択内容から追加工事の可能性があります。表示金額は概算で、正式金額は現地確認後に確定します。":"大きな追加工事は少なそうですが、電圧・専用回路・配管経路は現地確認で確定します。";
$("wizardResult").innerHTML=`<div class="totalBox"><p>概算合計</p><strong>${yen(total)}</strong></div><strong>内訳</strong>${breakdown}${alerts.length?`<div class="warn"><strong>⚠ 要確認</strong><ul>${alerts.map(a=>`<li>${a}</li>`).join("")}</ul></div>`:""}<div class="talkBox"><strong>お客様への説明例</strong><br>${talk}</div><p class="note">※正式料金は現地確認・最新版料金表で確定してください。</p><button class="primary" onclick="showWizard()">もう一度診断</button>`;
$("wizardResult").classList.remove("hidden");
}

function showEstimate(){hideAll();$("estimate").classList.remove("hidden");if(Object.keys(estimateState).length===0)pricingItems.forEach(x=>estimateState[x.id]=0);renderEstimate();}
function renderEstimate(){const area=$("estimateItems");area.innerHTML="";pricingItems.forEach(item=>{const row=document.createElement("div");row.className="estimateRow";const left=document.createElement("div");const checked=estimateState[item.id]>0?"checked":"";left.innerHTML=`<label><input type="checkbox" onchange="toggleEstimate('${item.id}')" ${checked}> ${item.name}</label><div class="priceText">${yen(item.price)}${item.type==="qty"?" × 数量":""}</div>`;row.appendChild(left);if(item.type==="qty"){const qty=document.createElement("div");qty.className="qty";qty.innerHTML=`<button onclick="changeQty('${item.id}',-1)">−</button><span>${estimateState[item.id]||0}</span><button onclick="changeQty('${item.id}',1)">＋</button>`;row.appendChild(qty);}area.appendChild(row);});updateEstimateTotal();}
function toggleEstimate(id){estimateState[id]=estimateState[id]>0?0:1;renderEstimate();}
function changeQty(id,delta){estimateState[id]=Math.max(0,(estimateState[id]||0)+delta);renderEstimate();}
function updateEstimateTotal(){let total=0,lines=[];pricingItems.forEach(item=>{const qty=estimateState[item.id]||0;if(qty>0){const sub=item.price*qty;total+=sub;lines.push(`<li>${item.name}：${yen(item.price)} × ${qty} = <strong>${yen(sub)}</strong></li>`);}});$("estimateTotal").textContent=yen(total);$("estimateBreakdown").innerHTML=lines.length?`<strong>内訳</strong><ul>${lines.join("")}</ul>`:"工事項目を選択してください。";}
function resetEstimate(){estimateState={};pricingItems.forEach(x=>estimateState[x.id]=0);renderEstimate();}

function showDiagnosis(){hideAll();$("diagnosis").classList.remove("hidden");}
function checkDiagnosis(){const checks=[...document.querySelectorAll(".check")];const count=checks.filter(c=>c.checked).length;const missing=checks.length-count;$("diagnosisResult").innerHTML=missing===0?"⭕ 確認漏れなし！そのまま工事条件の説明に進めます。":`⚠ ${missing}項目が未確認です。専用回路・電圧・室外機・配管穴は特に注意。`;$("diagnosisResult").classList.remove("hidden");}
function resetChecks(){document.querySelectorAll(".check").forEach(c=>c.checked=false);$("diagnosisResult").classList.add("hidden");}
function showScore(){hideAll();const s=stats();const acc=s.total?Math.round(s.correct/s.total*100):0;$("scoreTotal").textContent=s.total;$("scoreCorrect").textContent=s.correct;$("scoreAccuracy").textContent=acc+"%";$("score").classList.remove("hidden");}
function resetStats(){localStorage.removeItem("airconStats");showScore();}
showHome();
