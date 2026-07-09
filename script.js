const questions = [
  {cat:"basic", q:"100Vエアコンを200Vコンセントへそのまま接続できる？", choices:["できる","できない"], answer:1, exp:"電圧が異なるため接続できません。必ず本体とコンセントの電圧を確認します。"},
  {cat:"basic", q:"専用回路とは？", choices:["延長コード","エアコンだけが使う電気回路","アース線","化粧カバー"], answer:1, exp:"専用回路は、エアコン専用に用意された電気回路です。"},
  {cat:"quality", q:"真空引きを行う目的は？", choices:["ガスを増やす","配管内の空気・水分を除去する","室外機を冷やす","音を小さくする"], answer:1, exp:"配管内の空気や水分を抜き、性能低下や故障リスクを防ぎます。"},
  {cat:"quality", q:"スリーブを使用する理由は？", choices:["壁を補強する","壁内結露・虫・小動物の侵入を防ぐ","配管を太くする","室外機を固定する"], answer:1, exp:"スリーブは配管穴の保護に役立ちます。良質工事の説明ポイントです。"},
  {cat:"price", q:"屋外化粧カバーの主な役割は？", choices:["冷房能力を上げる","配管の保護と見た目の向上","電気代を下げる","室外機を軽くする"], answer:1, exp:"化粧カバーは配管を守り、外観もきれいにします。"},
  {cat:"price", q:"配管が標準工事の長さを超えた場合は？", choices:["追加なし","配管延長の追加工事になる","必ず設置不可","必ず200Vになる"], answer:1, exp:"標準範囲を超えた配管は、追加工事の確認が必要です。"},
  {cat:"basic", q:"100V・200Vが分からない場合、販売員がすべきことは？", choices:["勘で判断する","お客様に写真や分電盤確認を依頼する","とりあえず100Vを売る","確認しない"], answer:1, exp:"コンセント形状や分電盤など、確認できる情報を案内します。"},
  {cat:"price", q:"お客様が『2階に取り付けたい』と言った時、最初に確認したいことは？", choices:["色","室外機の設置場所","メーカー名だけ","リモコンの形"], answer:1, exp:"室外機がどこに置けるかで、配管延長や特殊設置の可能性が変わります。"},
  {cat:"quality", q:"良質工事の説明として適切なのは？", choices:["早く終わればよい","長く安心して使える施工を重視する","見た目は関係ない","真空引きは不要"], answer:1, exp:"価格だけでなく、安心して長く使える工事の価値を伝えます。"},
  {cat:"basic", q:"追加料金についての説明で適切なのは？", choices:["絶対ありません","設置状況により追加工事が必要な場合があります","工事会社に聞いてくださいだけで終える","全部無料です"], answer:1, exp:"設置場所・配管・電気工事などを確認しながら案内します。"}
];

let quizSet = [];
let current = 0;
let score = 0;
let answered = false;

function $(id){ return document.getElementById(id); }
function hideAll(){ ["home","quiz","finish","diagnosis","score"].forEach(id=>$(id).classList.add("hidden")); }
function stats(){
  return JSON.parse(localStorage.getItem("airconStats") || '{"total":0,"correct":0}');
}
function saveStats(addTotal, addCorrect){
  const s = stats();
  s.total += addTotal;
  s.correct += addCorrect;
  localStorage.setItem("airconStats", JSON.stringify(s));
}
function updateHome(){
  const s = stats();
  const acc = s.total ? Math.round(s.correct/s.total*100) : 0;
  $("totalSolved").textContent = s.total;
  $("accuracy").textContent = acc + "%";
  $("rank").textContent = acc >= 90 && s.total >= 30 ? "マスター" : acc >= 80 ? "ゴールド" : acc >= 60 ? "ブロンズ" : "新人";
}
function showHome(){ hideAll(); updateHome(); $("home").classList.remove("hidden"); }

function startQuiz(cat){
  hideAll();
  current = 0; score = 0;
  const pool = cat === "today" ? [...questions] : questions.filter(x=>x.cat===cat);
  quizSet = pool.sort(()=>Math.random()-.5).slice(0,10);
  $("quizTitle").textContent = cat==="today" ? "今日の10問" : cat==="basic" ? "基礎知識" : cat==="price" ? "工事料金" : "良質工事";
  $("quiz").classList.remove("hidden");
  showQuestion();
}
function showQuestion(){
  answered = false;
  const q = quizSet[current];
  $("progressText").textContent = `問題 ${current+1} / ${quizSet.length}`;
  $("progressBar").style.width = `${current / quizSet.length * 100}%`;
  $("questionText").textContent = q.q;
  $("result").classList.add("hidden");
  $("nextBtn").classList.add("hidden");
  $("choices").innerHTML = "";
  q.choices.forEach((choice,i)=>{
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => answer(i, btn);
    $("choices").appendChild(btn);
  });
}
function answer(i){
  if(answered) return;
  answered = true;
  const q = quizSet[current];
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach((b,idx)=>{
    if(idx === q.answer) b.classList.add("correct");
    if(idx === i && i !== q.answer) b.classList.add("wrong");
  });
  if(i === q.answer) score++;
  $("result").innerHTML = `<strong>${i===q.answer ? "⭕ 正解！" : "❌ 不正解"}</strong><br>${q.exp}`;
  $("result").classList.remove("hidden");
  $("nextBtn").classList.remove("hidden");
}
function nextQuestion(){
  current++;
  if(current >= quizSet.length){ finishQuiz(); return; }
  showQuestion();
}
function finishQuiz(){
  saveStats(quizSet.length, score);
  hideAll();
  const percent = Math.round(score/quizSet.length*100);
  $("finishScore").textContent = percent;
  $("finishMessage").textContent = percent >= 90 ? "すばらしい！接客マスター級です。" : percent >= 70 ? "いい感じです。苦手だけ復習しましょう。" : "基礎からもう一度確認しましょう。";
  $("finish").classList.remove("hidden");
}
function showDiagnosis(){ hideAll(); $("diagnosis").classList.remove("hidden"); }
function checkDiagnosis(){
  const checks = [...document.querySelectorAll(".check")];
  const count = checks.filter(c=>c.checked).length;
  const missing = checks.length - count;
  $("diagnosisResult").innerHTML = missing === 0
    ? "⭕ 確認漏れなし！そのまま工事条件の説明に進めます。"
    : `⚠ ${missing}項目が未確認です。専用回路・電圧・室外機・配管穴は特に注意。`;
  $("diagnosisResult").classList.remove("hidden");
}
function showScore(){
  hideAll();
  const s = stats();
  const acc = s.total ? Math.round(s.correct/s.total*100) : 0;
  $("scoreTotal").textContent = s.total;
  $("scoreCorrect").textContent = s.correct;
  $("scoreAccuracy").textContent = acc + "%";
  $("score").classList.remove("hidden");
}
function resetStats(){
  localStorage.removeItem("airconStats");
  showScore();
}
showHome();
