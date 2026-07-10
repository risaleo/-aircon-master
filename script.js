const questions = [{"cat": "basic", "q": "100Vエアコンを200Vコンセントへそのまま接続できる？", "choices": ["できる", "できない"], "answer": 1, "exp": "電圧が異なるため接続できません。必ず本体とコンセントの電圧を確認します。"}, {"cat": "basic", "q": "専用回路とは？", "choices": ["延長コード", "エアコンだけが使う電気回路", "アース線", "化粧カバー"], "answer": 1, "exp": "エアコン専用に用意された電気回路です。"}, {"cat": "price", "q": "配管が標準の長さを超えた場合は？", "choices": ["追加なし", "配管延長の追加工事になる", "必ず設置不可", "必ず200Vになる"], "answer": 1, "exp": "標準範囲を超えた配管は追加工事確認が必要です。"}, {"cat": "price", "q": "屋外化粧カバーの主な役割は？", "choices": ["冷房能力を上げる", "配管の保護と見た目の向上", "電気代を下げる", "室外機を軽くする"], "answer": 1, "exp": "配管を守り、外観もきれいにします。"}, {"cat": "quality", "q": "真空引きの目的は？", "choices": ["ガスを増やす", "配管内の空気・水分を除去する", "室外機を冷やす", "音を小さくする"], "answer": 1, "exp": "性能低下や故障リスクを防ぎます。"}, {"cat": "quality", "q": "スリーブを使用する理由は？", "choices": ["壁を補強する", "壁内結露・虫・小動物の侵入を防ぐ", "配管を太くする", "室外機を固定する"], "answer": 1, "exp": "配管穴の保護に役立ちます。"}, {"cat": "talk", "q": "追加料金について適切な説明は？", "choices": ["絶対ありません", "設置状況により追加工事が必要な場合があります", "工事会社に聞いてくださいだけ", "全部無料です"], "answer": 1, "exp": "設置条件を確認しながら案内します。"}, {"cat": "talk", "q": "他店の方が安いと言われた時は？", "choices": ["すぐ値引きします", "本体価格だけでなく工事内容も確認しましょう", "他店は悪いです", "無理です"], "answer": 1, "exp": "価格差の理由を確認します。"}];
const pricingItems = [{"id": "cover_out_2m", "name": "標準配管カバー（屋外）2mストレート", "price": 6600, "type": "check"}, {"id": "cover_out_ext", "name": "配管カバー延長 1mごと", "price": 3300, "type": "qty"}, {"id": "cover_out_corner", "name": "カバー曲がり 1ヶ所", "price": 2200, "type": "qty"}, {"id": "cover_in_1m", "name": "室内配管カバー 1m以内", "price": 11000, "type": "check"}, {"id": "pipe_ext", "name": "配管延長 1mごと", "price": 4400, "type": "qty"}, {"id": "pipe_ext_big", "name": "配管延長 6.3kW以上 1mごと", "price": 5500, "type": "qty"}, {"id": "outlet_replace", "name": "コンセント交換", "price": 3300, "type": "check"}, {"id": "voltage_change", "name": "電圧切替工事", "price": 6600, "type": "check"}, {"id": "circuit_same", "name": "専用回路 同一階 10m以内", "price": 17600, "type": "check"}, {"id": "circuit_diff", "name": "専用回路 2階→1階 10m以内", "price": 28600, "type": "check"}, {"id": "breaker", "name": "ブレーカー取付", "price": 5500, "type": "check"}, {"id": "hole_wood", "name": "木造穴あけ追加", "price": 2750, "type": "check"}, {"id": "hole_tile", "name": "タイル・ガルバ穴あけ", "price": 6600, "type": "check"}, {"id": "hole_concrete", "name": "コンクリート穴あけ", "price": 17600, "type": "check"}, {"id": "sleeve", "name": "貫通スリーブ使用", "price": 3300, "type": "check"}, {"id": "hole_close", "name": "穴塞ぎ工事", "price": 2200, "type": "check"}, {"id": "recycle", "name": "リサイクル料金", "price": 550, "type": "check"}, {"id": "collect", "name": "収集運搬料", "price": 3520, "type": "check"}];

let quizSet=[], current=0, score=0, answered=false;
let estimateState={};

function $(id){return document.getElementById(id);}
function yen(n){return "¥" + n.toLocaleString();}
function hideAll(){["home","quiz","finish","diagnosis","score","estimate"].forEach(id=>$(id).classList.add("hidden"));}
function stats(){return JSON.parse(localStorage.getItem("airconStats")||'{"total":0,"correct":0}');}
function saveStats(t,c){const s=stats();s.total+=t;s.correct+=c;localStorage.setItem("airconStats",JSON.stringify(s));}
function updateHome(){const s=stats();const acc=s.total?Math.round(s.correct/s.total*100):0;$("totalSolved").textContent=s.total;$("accuracy").textContent=acc+"%";$("rank").textContent=acc>=90&&s.total>=30?"マスター":acc>=80?"ゴールド":acc>=60?"ブロンズ":"新人";}
function showHome(){hideAll();updateHome();$("home").classList.remove("hidden");}

function startQuiz(cat){
  hideAll(); current=0; score=0;
  const pool=cat==="today"?[...questions]:questions.filter(x=>x.cat===cat);
  quizSet=pool.sort(()=>Math.random()-.5).slice(0,10);
  $("quizTitle").textContent=cat==="today"?"今日の10問":cat==="basic"?"基礎知識":cat==="price"?"工事料金":cat==="quality"?"良質工事":"接客問題";
  $("quiz").classList.remove("hidden"); showQuestion();
}
function catName(cat){return cat==="basic"?"基礎":cat==="price"?"料金":cat==="quality"?"良質工事":"接客";}
function showQuestion(){
  answered=false; const q=quizSet[current];
  $("progressText").textContent=`問題 ${current+1} / ${quizSet.length}`;
  $("progressBar").style.width=`${current/quizSet.length*100}%`;
  $("categoryBadge").textContent=catName(q.cat);
  $("questionText").textContent=q.q;
  $("result").classList.add("hidden"); $("nextBtn").classList.add("hidden"); $("choices").innerHTML="";
  q.choices.forEach((choice,i)=>{const btn=document.createElement("button");btn.className="choice";btn.textContent=choice;btn.onclick=()=>answer(i);$("choices").appendChild(btn);});
}
function answer(i){
  if(answered)return; answered=true; const q=quizSet[current]; const buttons=document.querySelectorAll(".choice");
  buttons.forEach((b,idx)=>{if(idx===q.answer)b.classList.add("correct");if(idx===i&&i!==q.answer)b.classList.add("wrong");});
  if(i===q.answer) score++;
  $("result").innerHTML=`<strong>${i===q.answer?"⭕ 正解！":"❌ 不正解"}</strong><br>${q.exp}`;
  $("result").classList.remove("hidden"); $("nextBtn").classList.remove("hidden");
}
function nextQuestion(){current++; if(current>=quizSet.length){finishQuiz(); return;} showQuestion();}
function finishQuiz(){saveStats(quizSet.length,score); hideAll(); const percent=Math.round(score/quizSet.length*100); $("finishScore").textContent=percent; $("finishMessage").textContent=percent>=90?"すばらしい！接客マスター級です。":percent>=70?"いい感じです。苦手だけ復習しましょう。":"基礎からもう一度確認しましょう。"; $("finish").classList.remove("hidden");}

function showEstimate(){
  hideAll();
  $("estimate").classList.remove("hidden");
  if(Object.keys(estimateState).length===0) pricingItems.forEach(x=>estimateState[x.id]=0);
  renderEstimate();
}
function renderEstimate(){
  const area=$("estimateItems");
  area.innerHTML="";
  pricingItems.forEach(item=>{
    const row=document.createElement("div");
    row.className="estimateRow";
    const left=document.createElement("div");
    const checked = estimateState[item.id]>0 ? "checked" : "";
    left.innerHTML=`<label><input type="checkbox" onchange="toggleEstimate('${item.id}')" ${checked}> ${item.name}</label><div class="priceText">${yen(item.price)}${item.type==="qty"?" × 数量":""}</div>`;
    row.appendChild(left);
    if(item.type==="qty"){
      const qty=document.createElement("div");
      qty.className="qty";
      qty.innerHTML=`<button onclick="changeQty('${item.id}',-1)">−</button><span>${estimateState[item.id]||0}</span><button onclick="changeQty('${item.id}',1)">＋</button>`;
      row.appendChild(qty);
    }
    area.appendChild(row);
  });
  updateEstimateTotal();
}
function toggleEstimate(id){
  const item=pricingItems.find(x=>x.id===id);
  estimateState[id]=estimateState[id]>0 ? 0 : 1;
  renderEstimate();
}
function changeQty(id,delta){
  estimateState[id]=Math.max(0,(estimateState[id]||0)+delta);
  renderEstimate();
}
function updateEstimateTotal(){
  let total=0, lines=[];
  pricingItems.forEach(item=>{
    const qty=estimateState[item.id]||0;
    if(qty>0){
      const sub=item.price*qty;
      total+=sub;
      lines.push(`<li>${item.name}：${yen(item.price)} × ${qty} = <strong>${yen(sub)}</strong></li>`);
    }
  });
  $("estimateTotal").textContent=yen(total);
  $("estimateBreakdown").innerHTML=lines.length ? `<strong>内訳</strong><ul>${lines.join("")}</ul>` : "工事項目を選択してください。";
}

function showDiagnosis(){hideAll();$("diagnosis").classList.remove("hidden");}
function checkDiagnosis(){const checks=[...document.querySelectorAll(".check")];const count=checks.filter(c=>c.checked).length;const missing=checks.length-count;$("diagnosisResult").innerHTML=missing===0?"⭕ 確認漏れなし！そのまま工事条件の説明に進めます。":`⚠ ${missing}項目が未確認です。専用回路・電圧・室外機・配管穴は特に注意。`; $("diagnosisResult").classList.remove("hidden");}
function showScore(){hideAll();const s=stats();const acc=s.total?Math.round(s.correct/s.total*100):0;$("scoreTotal").textContent=s.total;$("scoreCorrect").textContent=s.correct;$("scoreAccuracy").textContent=acc+"%";$("score").classList.remove("hidden");}
function resetStats(){localStorage.removeItem("airconStats");showScore();}
showHome();
