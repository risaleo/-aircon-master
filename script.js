const questions = [{"cat": "basic", "q": "100Vエアコンを200Vコンセントへそのまま接続できる？", "choices": ["できる", "できない"], "answer": 1, "exp": "電圧が異なるため接続できません。必ず本体とコンセントの電圧を確認します。"}, {"cat": "basic", "q": "専用回路とは？", "choices": ["延長コード", "エアコンだけが使う電気回路", "アース線", "化粧カバー"], "answer": 1, "exp": "エアコン専用に用意された電気回路です。"}, {"cat": "basic", "q": "配管穴がない場合に確認する工事は？", "choices": ["穴あけ工事", "リモコン交換", "テレビ配線", "冷蔵庫搬入"], "answer": 0, "exp": "配管穴がない場合は穴あけ工事の可能性があります。"}, {"cat": "basic", "q": "ドレンホースの役割は？", "choices": ["電気を流す", "室内機の水を外へ排水する", "冷媒を増やす", "室外機を固定する"], "answer": 1, "exp": "冷房・除湿時に出る水を外へ逃がすためのホースです。"}, {"cat": "basic", "q": "隠蔽配管とは？", "choices": ["配管が壁の中などに隠れている状態", "室外機がない状態", "配管が不要な工事", "コンセントがない状態"], "answer": 0, "exp": "壁内や天井内などに既設配管が通っている場合があります。"}, {"cat": "price", "q": "2階設置でまず確認することは？", "choices": ["室外機の設置場所", "リモコンの色", "メーカー名だけ", "カタログの表紙"], "answer": 0, "exp": "室外機がどこに置けるかで追加工事の可能性が変わります。"}, {"cat": "price", "q": "配管が標準の長さを超えた場合は？", "choices": ["追加なし", "配管延長の追加工事になる", "必ず設置不可", "必ず200Vになる"], "answer": 1, "exp": "標準範囲を超えた配管は追加工事確認が必要です。"}, {"cat": "price", "q": "屋外化粧カバーの主な役割は？", "choices": ["冷房能力を上げる", "配管の保護と見た目の向上", "電気代を下げる", "室外機を軽くする"], "answer": 1, "exp": "配管を守り、外観もきれいにします。"}, {"cat": "price", "q": "専用回路がない場合に確認することは？", "choices": ["専用回路工事の必要性", "テレビの型番", "冷蔵庫の色", "掃除機の紙パック"], "answer": 0, "exp": "エアコン専用回路が必要なケースがあります。"}, {"cat": "price", "q": "壁面・屋根置き・天吊などは？", "choices": ["特殊設置", "通常の標準床置き", "リモコン設定", "フィルター掃除"], "answer": 0, "exp": "室外機の特殊設置は追加工事になる可能性があります。"}, {"cat": "quality", "q": "真空引きの目的は？", "choices": ["ガスを増やす", "配管内の空気・水分を除去する", "室外機を冷やす", "音を小さくする"], "answer": 1, "exp": "性能低下や故障リスクを防ぎます。"}, {"cat": "quality", "q": "スリーブを使用する理由は？", "choices": ["壁を補強する", "壁内結露・虫・小動物の侵入を防ぐ", "配管を太くする", "室外機を固定する"], "answer": 1, "exp": "配管穴の保護に役立ちます。"}, {"cat": "quality", "q": "養生をする目的は？", "choices": ["部屋を汚さない・傷つけないため", "工事時間を短くするため", "電気代を下げるため", "リモコンを増やすため"], "answer": 0, "exp": "作業前の養生は良質工事の大事なポイントです。"}, {"cat": "quality", "q": "キャンバスを下から巻く理由は？", "choices": ["水の侵入を防ぐため", "見た目だけ", "音を下げるため", "室外機を重くするため"], "answer": 0, "exp": "下から巻くことで雨水が入りにくくなります。"}, {"cat": "quality", "q": "良質工事の説明で大切なのは？", "choices": ["早さだけ", "長く安心して使える施工", "見た目は関係ない", "真空引きは不要"], "answer": 1, "exp": "安心して長く使える工事の価値を伝えます。"}, {"cat": "talk", "q": "追加料金について適切な説明は？", "choices": ["絶対ありません", "設置状況により追加工事が必要な場合があります", "工事会社に聞いてくださいだけ", "全部無料です"], "answer": 1, "exp": "設置条件を確認しながら案内します。"}, {"cat": "talk", "q": "他店の方が安いと言われた時は？", "choices": ["すぐ値引きします", "本体価格だけでなく工事内容も確認しましょう", "他店は悪いです", "無理です"], "answer": 1, "exp": "価格差の理由を確認します。"}, {"cat": "talk", "q": "2階なんだけど追加かかる？と聞かれたら最初に？", "choices": ["室外機はどこに置けそうか", "好きな色", "テレビの有無", "家族構成"], "answer": 0, "exp": "室外機置場で追加工事の可能性が変わります。"}, {"cat": "talk", "q": "100Vか200Vか分からない時の案内は？", "choices": ["確認不要", "コンセント写真や分電盤を確認できると安心", "200Vで決める", "100Vで決める"], "answer": 1, "exp": "写真で確認できると販売ミスを減らせます。"}, {"cat": "talk", "q": "工事費が高いと言われた時は？", "choices": ["安さだけでなく安心して使える施工も大切です", "買わないでください", "全部無料です", "工事は適当です"], "answer": 0, "exp": "良質工事の価値を伝えます。"}];

const flowQuestions = [
  {key:"replace", q:"買い替えですか？", choices:["はい","いいえ"]},
  {key:"floor", q:"設置場所は何階ですか？", choices:["1階","2階","3階以上"]},
  {key:"outdoor", q:"室外機の置き場所は？", choices:["地面","壁面","屋根置き","天吊","二段置","ベランダ","分からない"]},
  {key:"circuit", q:"専用回路はありますか？", choices:["ある","ない","分からない"]},
  {key:"voltage", q:"コンセント電圧は？", choices:["100V","200V","分からない"]},
  {key:"hole", q:"配管穴はありますか？", choices:["ある","ない","分からない"]},
  {key:"cover", q:"化粧カバーは希望ありますか？", choices:["屋外","室内","両方","不要","分からない"]},
  {key:"pipe", q:"配管長さは？", choices:["4m以内","5m","6m","7m以上","分からない"]}
];

let quizSet=[], current=0, score=0, answered=false;
let flowIndex=0, flowAnswers={};

function $(id){return document.getElementById(id);}
function hideAll(){["home","quiz","finish","diagnosis","score","priceFlow"].forEach(id=>$(id).classList.add("hidden"));}
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

function showPriceFlow(){hideAll();flowIndex=0;flowAnswers={};$("flowResult").classList.add("hidden");$("priceFlow").classList.remove("hidden");renderFlow();}
function renderFlow(){const f=flowQuestions[flowIndex];$("flowProgress").textContent=`質問 ${flowIndex+1} / ${flowQuestions.length}`;$("flowQuestion").textContent=f.q;$("flowChoices").innerHTML="";f.choices.forEach(choice=>{const btn=document.createElement("button");btn.textContent=choice;btn.onclick=()=>{flowAnswers[f.key]=choice;flowIndex++;if(flowIndex>=flowQuestions.length){showFlowResult();}else{renderFlow();}};$("flowChoices").appendChild(btn);});}
function showFlowResult(){
  $("flowQuestion").textContent="診断結果"; $("flowChoices").innerHTML="";
  let items=[], alerts=[];
  if(flowAnswers.floor!=="1階") items.push("配管延長・高所作業の確認");
  if(["壁面","屋根置き","天吊","二段置"].includes(flowAnswers.outdoor)) items.push("特殊設置金具・既設金具確認");
  if(flowAnswers.outdoor==="分からない") alerts.push("室外機置き場が未確認です");
  if(flowAnswers.circuit==="ない") items.push("専用回路工事");
  if(flowAnswers.circuit==="分からない") alerts.push("専用回路の有無を確認");
  if(flowAnswers.voltage==="分からない") alerts.push("100V・200Vを確認");
  if(flowAnswers.hole==="ない") items.push("穴あけ工事");
  if(flowAnswers.hole==="分からない") alerts.push("配管穴の有無を確認");
  if(["屋外","室内","両方"].includes(flowAnswers.cover)) items.push("化粧カバー工事");
  if(["5m","6m","7m以上"].includes(flowAnswers.pipe)) items.push("配管延長");
  if(flowAnswers.pipe==="分からない") alerts.push("配管長さを確認");
  if(items.length===0) items.push("標準工事内の可能性あり");
  $("flowResult").innerHTML = `<strong>追加工事候補</strong><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul>${alerts.length?`<strong>⚠ 要確認</strong><ul>${alerts.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}<p class="note">※概算です。最終料金は現地確認・正式な料金表で確定してください。</p><button class="primary" onclick="showPriceFlow()">もう一度診断</button>`;
  $("flowResult").classList.remove("hidden");
}

function showDiagnosis(){hideAll();$("diagnosis").classList.remove("hidden");}
function checkDiagnosis(){const checks=[...document.querySelectorAll(".check")];const count=checks.filter(c=>c.checked).length;const missing=checks.length-count;$("diagnosisResult").innerHTML=missing===0?"⭕ 確認漏れなし！そのまま工事条件の説明に進めます。":`⚠ ${missing}項目が未確認です。専用回路・電圧・室外機・配管穴は特に注意。`; $("diagnosisResult").classList.remove("hidden");}
function showScore(){hideAll();const s=stats();const acc=s.total?Math.round(s.correct/s.total*100):0;$("scoreTotal").textContent=s.total;$("scoreCorrect").textContent=s.correct;$("scoreAccuracy").textContent=acc+"%";$("score").classList.remove("hidden");}
function resetStats(){localStorage.removeItem("airconStats");showScore();}
showHome();
