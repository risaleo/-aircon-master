const standardPrices={"2.2〜3.6kW": 20350, "4.0〜5.6kW": 24750, "6.3kW以上": 28050};
const pricingItems=[{"id": "standard_22_36", "name": "標準工事 2.2〜3.6kW", "price": 20350, "type": "check"}, {"id": "standard_40_56", "name": "標準工事 4.0〜5.6kW", "price": 24750, "type": "check"}, {"id": "standard_63", "name": "標準工事 6.3kW以上", "price": 28050, "type": "check"}, {"id": "asbestos_survey", "name": "穴あけ事前調査", "price": 3300, "type": "check"}, {"id": "asbestos_work", "name": "石綿対策工事", "price": 15400, "type": "check"}, {"id": "cover_out_2m", "name": "標準配管カバー（屋外）2mストレート", "price": 6600, "type": "check"}, {"id": "cover_out_ext", "name": "配管カバー延長 1mごと", "price": 3300, "type": "qty"}, {"id": "cover_out_corner", "name": "カバー曲がり 1ヶ所", "price": 2200, "type": "qty"}, {"id": "cover_in_1m", "name": "室内配管カバー 1m以内", "price": 11000, "type": "check"}, {"id": "pipe_ext", "name": "配管延長 1mごと", "price": 4400, "type": "qty"}, {"id": "outlet_replace", "name": "コンセント交換", "price": 3300, "type": "check"}, {"id": "voltage_change", "name": "電圧切替工事", "price": 6600, "type": "check"}, {"id": "circuit_same", "name": "専用回路 同一階 10m以内", "price": 17600, "type": "check"}, {"id": "circuit_diff", "name": "専用回路 2階→1階 10m以内", "price": 28600, "type": "check"}, {"id": "breaker", "name": "ブレーカー取付", "price": 5500, "type": "check"}, {"id": "hole_wood", "name": "木造穴あけ追加", "price": 2750, "type": "check"}, {"id": "hole_tile", "name": "タイル・ガルバ穴あけ", "price": 6600, "type": "check"}, {"id": "hole_concrete", "name": "コンクリート穴あけ", "price": 17600, "type": "check"}, {"id": "sleeve", "name": "貫通スリーブ使用", "price": 3300, "type": "check"}, {"id": "hole_close", "name": "穴塞ぎ工事", "price": 2200, "type": "check"}, {"id": "recycle", "name": "リサイクル料金", "price": 550, "type": "check"}, {"id": "collect", "name": "収集運搬料", "price": 3520, "type": "check"}];
const questions=[{"cat": "basic", "q": "100Vエアコンを200Vコンセントへそのまま接続できる？", "choices": ["できる", "できない"], "answer": 1, "exp": "電圧が異なるため、そのまま接続できません。"}, {"cat": "price", "q": "2.2〜3.6kWの標準工事料金は？", "choices": ["20,350円", "24,750円", "28,050円", "15,400円"], "answer": 0, "exp": "2.2〜3.6kWの標準工事料金は20,350円です。"}, {"cat": "price", "q": "4.0〜5.6kWの標準工事料金は？", "choices": ["20,350円", "24,750円", "28,050円", "17,600円"], "answer": 1, "exp": "4.0〜5.6kWの標準工事料金は24,750円です。"}, {"cat": "price", "q": "6.3kW以上の標準工事料金は？", "choices": ["20,350円", "24,750円", "28,050円", "15,400円"], "answer": 2, "exp": "6.3kW以上の標準工事料金は28,050円です。"}, {"cat": "price", "q": "2006年8月31日以前着工の建物で穴あけが必要な場合、追加される料金は？", "choices": ["事前調査3,300円＋石綿対策15,400円", "石綿対策3,300円のみ", "穴あけ2,750円のみ", "追加なし"], "answer": 0, "exp": "穴あけ事前調査3,300円と石綿対策工事15,400円を加算します。"}, {"cat": "quality", "q": "真空引きの目的は？", "choices": ["ガスを増やす", "配管内の空気・水分を除去する", "室外機を冷やす", "音を小さくする"], "answer": 1, "exp": "性能低下や故障リスクを防ぐためです。"}, {"cat": "talk", "q": "追加料金について適切な説明は？", "choices": ["絶対ありません", "設置状況により追加工事が必要な場合があります", "全部無料です", "確認しません"], "answer": 1, "exp": "設置条件を確認し、概算と現地確認の違いを説明します。"}];

const wizardQuestions=[
{key:"capacity",q:"エアコン能力を選んでください",choices:["2.2〜3.6kW","4.0〜5.6kW","6.3kW以上"]},
{key:"built",q:"建物の着工年月日は？",choices:["2006年8月31日以前","2006年9月1日以降","分からない"]},
{key:"hole",q:"配管穴あけは必要ですか？",choices:["必要","不要","分からない"]},
{key:"floor",q:"設置場所は？",choices:["1階","2階","3階以上"]},
{key:"outdoor",q:"室外機の置き場所は？",choices:["地面","ベランダ","壁面","屋根置き","天吊","二段置","分からない"]},
{key:"circuit",q:"専用回路は？",choices:["ある","ない","分からない"]},
{key:"voltage",q:"電圧・コンセントは？",choices:["そのまま使える","コンセント交換","電圧切替","分からない"]},
{key:"pipe",q:"標準4mから何m延長？",choices:["なし","1m","2m","3m","4m以上","分からない"]},
{key:"cover",q:"化粧カバーは？",choices:["不要","屋外2m","屋外2m＋延長1m","室内カバー","分からない"]}
];

let wizardIndex=0,wizardAnswers={},estimateState={},quizSet=[],current=0,score=0,answered=false;
function $(id){return document.getElementById(id);}
function yen(n){return"¥"+n.toLocaleString();}
function hideAll(){["home","wizard","estimate","quiz","finish","diagnosis","score"].forEach(id=>$(id).classList.add("hidden"));}
function showHome(){hideAll();updateHome();$("home").classList.remove("hidden");}
function stats(){return JSON.parse(localStorage.getItem("airconStats")||'{"total":0,"correct":0}');}
function updateHome(){const s=stats(),a=s.total?Math.round(s.correct/s.total*100):0;$("totalSolved").textContent=s.total;$("accuracy").textContent=a+"%";$("rank").textContent=a>=90?"マスター":a>=80?"ゴールド":a>=60?"ブロンズ":"新人";}

function showWizard(){hideAll();wizardIndex=0;wizardAnswers={};$("wizardResult").classList.add("hidden");$("wizard").classList.remove("hidden");renderWizard();}
function renderWizard(){const w=wizardQuestions[wizardIndex];$("wizardProgress").textContent=`質問 ${wizardIndex+1} / ${wizardQuestions.length}`;$("wizardQuestion").textContent=w.q;$("wizardChoices").innerHTML="";w.choices.forEach(choice=>{const b=document.createElement("button");b.textContent=choice;b.onclick=()=>{wizardAnswers[w.key]=choice;wizardIndex++;wizardIndex>=wizardQuestions.length?showWizardResult():renderWizard();};$("wizardChoices").appendChild(b);});}
function addLine(lines,name,price){lines.push({name,price});}
function showWizardResult(){
$("wizardQuestion").textContent="診断結果";$("wizardChoices").innerHTML="";
let lines=[],alerts=[];
addLine(lines,`標準工事（${wizardAnswers.capacity}）`,standardPrices[wizardAnswers.capacity]);
if(wizardAnswers.built==="2006年8月31日以前"&&wizardAnswers.hole==="必要"){addLine(lines,"穴あけ事前調査",3300);addLine(lines,"石綿対策工事",15400);}
if(wizardAnswers.built==="分からない"&&wizardAnswers.hole!=="不要")alerts.push("着工年月日の確認が必要");
if(wizardAnswers.hole==="分からない")alerts.push("穴あけの有無を確認");
if(wizardAnswers.circuit==="ない")addLine(lines,"専用回路 同一階 10m以内",17600);
if(wizardAnswers.circuit==="分からない")alerts.push("専用回路の有無を確認");
if(wizardAnswers.voltage==="コンセント交換")addLine(lines,"コンセント交換",3300);
if(wizardAnswers.voltage==="電圧切替")addLine(lines,"電圧切替工事",6600);
if(wizardAnswers.voltage==="分からない")alerts.push("電圧・コンセント形状を確認");
if(wizardAnswers.pipe==="1m")addLine(lines,"配管延長 1m",4400);
if(wizardAnswers.pipe==="2m")addLine(lines,"配管延長 2m",8800);
if(wizardAnswers.pipe==="3m")addLine(lines,"配管延長 3m",13200);
if(wizardAnswers.pipe==="4m以上")alerts.push("配管延長は実測後に計算");
if(wizardAnswers.cover==="屋外2m")addLine(lines,"標準配管カバー（屋外）2m",6600);
if(wizardAnswers.cover==="屋外2m＋延長1m"){addLine(lines,"標準配管カバー（屋外）2m",6600);addLine(lines,"配管カバー延長 1m",3300);}
if(wizardAnswers.cover==="室内カバー")addLine(lines,"室内配管カバー 1m以内",11000);
if(["壁面","屋根置き","天吊","二段置"].includes(wizardAnswers.outdoor))alerts.push("特殊設置料金を別途確認");
if(wizardAnswers.floor!=="1階")alerts.push("高所作業・配管経路を確認");
const total=lines.reduce((s,x)=>s+x.price,0);
$("wizardResult").innerHTML=`<div class="totalBox"><p>概算合計</p><strong>${yen(total)}</strong></div><strong>内訳</strong><ul>${lines.map(x=>`<li>${x.name}：<strong>${yen(x.price)}</strong></li>`).join("")}</ul>${alerts.length?`<div class="warn"><strong>⚠ 要確認</strong><ul>${alerts.map(a=>`<li>${a}</li>`).join("")}</ul></div>`:""}<div class="talkBox"><strong>お客様への説明例</strong><br>こちらは概算です。建物の着工年月日、穴あけ、専用回路、配管経路などを現地で確認後、正式金額が確定します。</div><p class="note">※正式料金は現地確認・最新版料金表で確定してください。</p>`;
$("wizardResult").classList.remove("hidden");
}

function showEstimate(){hideAll();$("estimate").classList.remove("hidden");if(Object.keys(estimateState).length===0)pricingItems.forEach(x=>estimateState[x.id]=0);renderEstimate();}
function renderEstimate(){const a=$("estimateItems");a.innerHTML="";pricingItems.forEach(item=>{const r=document.createElement("div");r.className="estimateRow";const checked=estimateState[item.id]>0?"checked":"";r.innerHTML=`<div><label><input type="checkbox" onchange="toggleEstimate('${item.id}')" ${checked}> ${item.name}</label><small>${yen(item.price)}${item.type==="qty"?" × 数量":""}</small></div>${item.type==="qty"?`<div class="qty"><button onclick="changeQty('${item.id}',-1)">−</button><span>${estimateState[item.id]||0}</span><button onclick="changeQty('${item.id}',1)">＋</button></div>`:""}`;a.appendChild(r);});updateEstimateTotal();}
function toggleEstimate(id){estimateState[id]=estimateState[id]>0?0:1;renderEstimate();}
function changeQty(id,d){estimateState[id]=Math.max(0,(estimateState[id]||0)+d);renderEstimate();}
function updateEstimateTotal(){let total=0,lines=[];pricingItems.forEach(i=>{const q=estimateState[i.id]||0;if(q>0){const sub=i.price*q;total+=sub;lines.push(`<li>${i.name}：${yen(sub)}</li>`);}});$("estimateTotal").textContent=yen(total);$("estimateBreakdown").innerHTML=lines.length?`<ul>${lines.join("")}</ul>`:"項目を選択してください。";}
function resetEstimate(){estimateState={};renderEstimate();}

function startQuiz(cat){hideAll();current=0;score=0;quizSet=(cat==="today"?questions:questions.filter(q=>q.cat===cat)).sort(()=>Math.random()-.5).slice(0,10);$("quizTitle").textContent=cat==="today"?"今日の10問":cat==="price"?"工事料金問題":cat==="quality"?"良質工事":"接客問題";$("quiz").classList.remove("hidden");showQuestion();}
function showQuestion(){answered=false;const q=quizSet[current];$("progressText").textContent=`問題 ${current+1} / ${quizSet.length}`;$("progressBar").style.width=`${current/quizSet.length*100}%`;$("questionText").textContent=q.q;$("choices").innerHTML="";$("result").classList.add("hidden");$("nextBtn").classList.add("hidden");q.choices.forEach((c,i)=>{const b=document.createElement("button");b.textContent=c;b.onclick=()=>answer(i);$("choices").appendChild(b);});}
function answer(i){if(answered)return;answered=true;const q=quizSet[current];if(i===q.answer)score++;$("result").innerHTML=`<strong>${i===q.answer?"⭕ 正解":"❌ 不正解"}</strong><br>${q.exp}`;$("result").classList.remove("hidden");$("nextBtn").classList.remove("hidden");}
function nextQuestion(){current++;current>=quizSet.length?finishQuiz():showQuestion();}
function finishQuiz(){const s=stats();s.total+=quizSet.length;s.correct+=score;localStorage.setItem("airconStats",JSON.stringify(s));hideAll();$("finishScore").textContent=Math.round(score/quizSet.length*100);$("finishMessage").textContent=`${score} / ${quizSet.length}問正解`;$("finish").classList.remove("hidden");}

function showDiagnosis(){hideAll();$("diagnosis").classList.remove("hidden");}
function checkDiagnosis(){const c=[...document.querySelectorAll(".check")],m=c.filter(x=>!x.checked).length;$("diagnosisResult").innerHTML=m===0?"⭕ 確認漏れなし！":`⚠ ${m}項目が未確認です。`;$("diagnosisResult").classList.remove("hidden");}
function showScore(){hideAll();const s=stats(),a=s.total?Math.round(s.correct/s.total*100):0;$("scoreTotal").textContent=s.total;$("scoreCorrect").textContent=s.correct;$("scoreAccuracy").textContent=a+"%";$("score").classList.remove("hidden");}
showHome();
