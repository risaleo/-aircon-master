
"use strict";
const DATA=window.APP_DATA;
const QUESTIONS=DATA.questions;
const PRICE_QUESTIONS=DATA.priceQuestions;
const CASES=DATA.cases;
const K={name:"aircon_v31_name",stats:"aircon_v31_stats"};

let quizPool=[],quizIndex=0,currentQuiz=null,quizCorrect=0;
let activeCase=null,salesStep=0,salesScore=0;

function showPage(id){
  document.querySelectorAll("main>section").forEach(s=>s.classList.add("hidden"));
  const page=document.getElementById(id);
  if(!page)return alert("画面を開けませんでした。");
  page.classList.remove("hidden");
  window.scrollTo(0,0);
  if(id==="home")updateHome();
}
function shuffled(items){
  const arr=items.map((text,index)=>({text,index}));
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
function getStats(){try{return JSON.parse(localStorage.getItem(K.stats)||'{"answered":0,"correct":0,"sales":0}')}catch{return{answered:0,correct:0,sales:0}}}
function saveStats(s){localStorage.setItem(K.stats,JSON.stringify(s))}
function getName(){return(localStorage.getItem(K.name)||"").trim()}
function todayKey(){return"aircon_v31_today_"+new Date().toISOString().slice(0,10)}
function todaySales(){return Number(localStorage.getItem(todayKey())||0)}
function addTodaySales(){localStorage.setItem(todayKey(),String(todaySales()+1))}
function updateHome(){
  const s=getStats(),name=getName(),exp=s.correct*20+s.sales*30,lv=Math.floor(exp/100)+1,within=exp%100;
  document.getElementById("nameChip").textContent=name?name+"さん":"";
  document.getElementById("helloText").textContent=name?name+"さん、今日も一件、丁寧にご案内しましょう。":"今日も一件、丁寧にご案内しましょう。";
  document.getElementById("levelText").textContent="Lv."+lv;
  document.getElementById("rankText").textContent=lv>=20?"販売マスター":lv>=10?"エアコンアドバイザー":lv>=5?"接客デビュー":"新人スタッフ";
  document.getElementById("levelBar").style.width=within+"%";
  document.getElementById("nextExp").textContent="次のレベルまで あと"+(100-within)+"EXP";
  document.getElementById("missionHome").textContent=Math.min(todaySales(),3)+" / 3";
}
function registerName(){
  const n=document.getElementById("firstName").value.trim();
  if(!n)return alert("名前を入力してください。");
  localStorage.setItem(K.name,n);
  document.getElementById("nameModal").classList.add("hidden");
  updateHome();
}
function openSettings(){showPage("settings");document.getElementById("settingsName").value=getName()}
function saveNameFromSettings(){
  const n=document.getElementById("settingsName").value.trim();
  if(!n)return alert("名前を入力してください。");
  localStorage.setItem(K.name,n);alert(n+"さんで保存しました。");updateHome();
}
function openMission(){
  const c=Math.min(todaySales(),3);
  document.getElementById("missionText").textContent=c+" / 3";
  document.getElementById("missionBar").style.width=(c/3*100)+"%";
  document.getElementById("missionModal").classList.remove("hidden");
}
function closeMission(){document.getElementById("missionModal").classList.add("hidden")}

function startQuiz(type){
  const source=type==="price"?PRICE_QUESTIONS:QUESTIONS;
  if(!Array.isArray(source)||source.length===0){
    alert(type==="price"?"工事料金問題がありません。":"練習問題がありません。");
    return;
  }
  quizPool=[...source];
  for(let i=quizPool.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [quizPool[i],quizPool[j]]=[quizPool[j],quizPool[i]];
  }
  quizIndex=0;quizCorrect=0;
  document.getElementById("quizTitle").textContent=type==="price"?"工事料金":"練習問題";
  showPage("quiz");
  renderQuiz();
}
function renderQuiz(){
  if(quizIndex>=Math.min(10,quizPool.length)){finishQuiz();return}
  currentQuiz=quizPool[quizIndex];
  document.getElementById("quizProgress").textContent=(quizIndex+1)+" / "+Math.min(10,quizPool.length);
  document.getElementById("quizQuestion").textContent=currentQuiz.q;
  const box=document.getElementById("quizChoices");
  box.innerHTML="";
  shuffled(currentQuiz.choices).forEach((item,displayIndex)=>{
    const b=document.createElement("button");
    b.className="choice";
    b.textContent=(displayIndex+1)+"　"+item.text;
    b.dataset.originalIndex=String(item.index);
    b.onclick=()=>answerQuiz(item.index,b);
    box.appendChild(b);
  });
  document.getElementById("quizExplain").classList.add("hidden");
  document.getElementById("quizNext").classList.add("hidden");
}
function answerQuiz(originalIndex,button){
  document.querySelectorAll("#quizChoices button").forEach(b=>b.disabled=true);
  const answerIndex=Number.isInteger(currentQuiz.answer)?currentQuiz.answer:currentQuiz.a;
  const ok=originalIndex===answerIndex;
  button.classList.add(ok?"correct":"wrong");
  if(ok)quizCorrect++;
  else{
    const correct=[...document.querySelectorAll("#quizChoices button")].find(b=>Number(b.dataset.originalIndex)===answerIndex);
    if(correct)correct.classList.add("correct");
  }
  const s=getStats();s.answered++;if(ok)s.correct++;saveStats(s);
  const ex=document.getElementById("quizExplain");
  ex.textContent=currentQuiz.ex||"正解を確認しましょう。";
  ex.classList.remove("hidden");
  quizIndex++;
  document.getElementById("quizNext").classList.remove("hidden");
}
function nextQuiz(){renderQuiz()}
function finishQuiz(){
  document.getElementById("quizQuestion").textContent="終了";
  document.getElementById("quizChoices").innerHTML=`<div class="report"><h2>${quizCorrect} / ${Math.min(10,quizPool.length)} 正解</h2><button class="primary" onclick="showPage('home')">ホームへ戻る</button></div>`;
  document.getElementById("quizNext").classList.add("hidden");
  document.getElementById("quizExplain").classList.add("hidden");
  updateHome();
}

function showCases(){
  showPage("cases");
  const grid=document.getElementById("caseGrid");grid.innerHTML="";
  CASES.forEach((c,i)=>{
    const b=document.createElement("button");b.className="case";
    b.innerHTML=`<div class="avatar">${c.avatar}</div><span>${c.type}・${c.difficulty}</span><h3>${c.title}</h3><p>${c.customer}<br>${c.home}／${c.room}</p>`;
    b.onclick=()=>startSales(i);grid.appendChild(b);
  });
}
function startRandomSales(){startSales(Math.floor(Math.random()*CASES.length))}
function resetAnswerPane(){document.getElementById("answerPane").innerHTML='<h3 id="salesQuestion"></h3><div id="salesChoices" class="choices"></div><div id="salesFeedback" class="explain hidden"></div>'}
function startSales(i){activeCase=CASES[i];salesStep=0;salesScore=0;showPage("sales");resetAnswerPane();renderSales()}
function renderSales(){
  const step=activeCase.steps[salesStep],response=(activeCase.responses||[])[salesStep]||activeCase.first;
  document.getElementById("stepper").innerHTML=activeCase.steps.map((_,i)=>`<div class="${i<=salesStep?"on":""}"></div>`).join("");
  document.getElementById("customerPane").innerHTML=`<div class="avatar">${activeCase.avatar}</div><h3>${activeCase.title}</h3><div class="facts"><div>🏠 ${activeCase.home}</div><div>📍 ${activeCase.room}</div><div>ℹ️ ${activeCase.extra}</div><div>💰 ${activeCase.budget}</div></div><div class="speech">${response}</div>`;
  document.getElementById("salesQuestion").textContent=step.q;
  const box=document.getElementById("salesChoices");box.innerHTML="";
  shuffled(step.choices).forEach((item,displayIndex)=>{
    const b=document.createElement("button");b.className="choice";
    b.textContent=(displayIndex+1)+"　"+item.text;b.dataset.originalIndex=String(item.index);
    b.onclick=()=>answerSales(item.index,b);box.appendChild(b);
  });
  document.getElementById("salesFeedback").classList.add("hidden");
}
function answerSales(originalIndex,button){
  const step=activeCase.steps[salesStep],ok=originalIndex===step.a;
  document.querySelectorAll("#salesChoices button").forEach(b=>b.disabled=true);
  button.classList.add(ok?"correct":"wrong");
  if(ok)salesScore++;else{
    const correct=[...document.querySelectorAll("#salesChoices button")].find(b=>Number(b.dataset.originalIndex)===step.a);
    if(correct)correct.classList.add("correct");
  }
  const f=document.getElementById("salesFeedback");
  f.textContent=ok?"正解です。次の確認へ進みます。":"不正解です。正しい確認内容を見直しましょう。";
  f.classList.remove("hidden");
  setTimeout(()=>{salesStep++;salesStep<activeCase.steps.length?renderSales():finishSales()},700);
}
function finishSales(){
  document.getElementById("answerPane").innerHTML=`<div class="report"><h2>販売レポート</h2><div class="grade">${salesScore===activeCase.steps.length?"A":salesScore>=3?"B+":"B"}</div><p>正解 ${salesScore} / ${activeCase.steps.length}</p><button class="primary" onclick="startRandomSales()">別のお客様</button><button class="primary" onclick="showCases()">カルテから選ぶ</button><button class="primary" onclick="showPage('home')">ホームへ</button></div>`;
  const s=getStats();s.sales++;saveStats(s);addTodaySales();updateHome();
}


function showStats(){
  showPage("statsPage");const s=getStats(),rate=s.answered?Math.round(s.correct/s.answered*100):0;
  document.getElementById("statsGrid").innerHTML=`<div class="stat"><span>回答数</span><strong>${s.answered}</strong></div><div class="stat"><span>正答率</span><strong>${rate}%</strong></div><div class="stat"><span>販買モード</span><strong>${s.sales}件</strong></div>`;
}
function showHistory(){showPage("historyPage");document.getElementById("historyContent").textContent="学習履歴は成績画面に反映されます。"}

window.addEventListener("DOMContentLoaded",()=>{updateHome();if(!getName())document.getElementById("nameModal").classList.remove("hidden")});
