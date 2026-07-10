const questions=[{"id": "b001", "cat": "基礎知識", "q": "100Vエアコンを200Vコンセントへそのまま接続できる？", "choices": ["できる", "できない"], "answer": 1, "exp": "電圧が異なるため、そのまま接続できません。"}, {"id": "b002", "cat": "基礎知識", "q": "専用回路とは？", "choices": ["延長コード", "エアコンだけが使う電気回路", "アース線", "化粧カバー"], "answer": 1, "exp": "エアコン専用に用意された電気回路です。"}, {"id": "e001", "cat": "電気工事", "q": "30A契約で大型エアコンを増設する場合、販売員がまず考えることは？", "choices": ["必ず設置不可と断定する", "契約容量・分電盤・使用状況を確認する", "そのまま販売する", "100V機だけ案内する"], "answer": 1, "exp": "契約アンペアだけでは断定できません。分電盤や使用状況も含めて確認します。"}, {"id": "e002", "cat": "電気工事", "q": "単相2線式で200V回路を取れる？", "choices": ["原則取れない", "必ず取れる", "契約アンペアだけで決まる", "コンセント交換だけで取れる"], "answer": 0, "exp": "200V回路には一般に単相3線式が必要です。最終判断は現地確認です。"}, {"id": "e003", "cat": "電気工事", "q": "分電盤の写真だけで必ず判断できるとは限らないものは？", "choices": ["空き回路", "主幹容量", "単相2線・3線", "すべて"], "answer": 3, "exp": "写真の写り方や表示内容によっては判断できません。現地確認が必要です。"}, {"id": "p001", "cat": "工事料金", "q": "2.2〜3.6kWの標準工事料金は？", "choices": ["20,350円", "24,750円", "28,050円", "15,400円"], "answer": 0, "exp": "2.2〜3.6kWは20,350円です。"}, {"id": "p002", "cat": "工事料金", "q": "4.0〜5.6kWの標準工事料金は？", "choices": ["20,350円", "24,750円", "28,050円", "17,600円"], "answer": 1, "exp": "4.0〜5.6kWは24,750円です。"}, {"id": "p003", "cat": "工事料金", "q": "6.3kW以上の標準工事料金は？", "choices": ["20,350円", "24,750円", "28,050円", "15,400円"], "answer": 2, "exp": "6.3kW以上は28,050円です。"}, {"id": "p004", "cat": "工事料金", "q": "穴あけ事前調査の料金は？", "choices": ["3,300円", "6,600円", "15,400円", "17,600円"], "answer": 0, "exp": "穴あけ事前調査は3,300円です。"}, {"id": "p005", "cat": "工事料金", "q": "石綿対策工事の料金は？", "choices": ["3,300円", "6,600円", "15,400円", "20,350円"], "answer": 2, "exp": "石綿対策工事は15,400円です。"}, {"id": "i001", "cat": "イレギュラー工事", "q": "2006年8月31日以前着工で穴あけが必要な場合、確認することは？", "choices": ["アスベスト関連対応", "室外機の色", "リモコン電池", "メーカー保証だけ"], "answer": 0, "exp": "穴あけ事前調査と石綿対策工事の確認が必要です。"}, {"id": "i002", "cat": "イレギュラー工事", "q": "マンションで新規穴あけが必要な場合、販売員が案内すべきことは？", "choices": ["必ず穴あけ可能", "管理規約や所有者確認が必要", "標準工事で確定", "確認不要"], "answer": 1, "exp": "集合住宅や賃貸では管理規約・所有者承諾の確認が必要です。"}, {"id": "i003", "cat": "イレギュラー工事", "q": "隠蔽配管で確認したいことは？", "choices": ["再利用可否・配管径・劣化・ドレン", "室内機の色だけ", "テレビ端子", "冷蔵庫の容量"], "answer": 0, "exp": "既設配管の状態や仕様によって工事方法が変わります。"}, {"id": "i004", "cat": "イレギュラー工事", "q": "室外機が壁面・屋根置き・天吊り・二段置きの場合は？", "choices": ["特殊設置の確認が必要", "すべて標準設置", "料金は必ず同じ", "確認不要"], "answer": 0, "exp": "金具・作業スペース・既設金具・安全性などの確認が必要です。"}, {"id": "q001", "cat": "良質工事", "q": "真空引きをする目的は？", "choices": ["冷媒を増やす", "配管内の空気や水分を除去する", "室外機を軽くする", "電気代を下げる"], "answer": 1, "exp": "性能低下や故障リスクを防ぐためです。"}, {"id": "q002", "cat": "良質工事", "q": "スリーブを使用する理由は？", "choices": ["配管穴の保護・結露や虫対策", "室外機を固定する", "電圧を変える", "配管を太くする"], "answer": 0, "exp": "配管穴まわりの保護や侵入対策に役立ちます。"}, {"id": "t001", "cat": "接客問題", "q": "『追加料金はありませんよね？』への適切な返答は？", "choices": ["絶対ありません", "現地状況により追加工事が必要な場合があります", "全部無料です", "工事会社に丸投げします"], "answer": 1, "exp": "現地確認で正式な工事内容・料金が決まることを丁寧に説明します。"}, {"id": "t002", "cat": "接客問題", "q": "『30Aだから取付できない？』への適切な案内は？", "choices": ["必ずできない", "契約容量・分電盤・使用状況を確認して案内する", "必ずできる", "100Vなら何でも可能"], "answer": 1, "exp": "30Aだけで可否を断定しないことが大切です。"}, {"id": "t003", "cat": "接客問題", "q": "『他店の方が安い』と言われた時、まず確認することは？", "choices": ["すぐ値引き", "本体・工事・保証など条件差", "他店批判", "説明しない"], "answer": 1, "exp": "価格差の内訳を確認し、同条件で比較します。"}, {"id": "c001", "cat": "ケース問題", "q": "戸建て・2階・18畳・新規・30A・専用回路なし。優先して確認することは？", "choices": ["専用回路・契約容量・分電盤・室外機位置", "色だけ", "メーカー名だけ", "リモコンだけ"], "answer": 0, "exp": "電気・設置・配管条件を優先して確認します。"}, {"id": "c002", "cat": "ケース問題", "q": "2005年築・新規穴あけあり。想定される追加項目は？", "choices": ["穴あけ事前調査と石綿対策工事", "リモコン交換のみ", "追加なし", "室外機カバーのみ"], "answer": 0, "exp": "着工時期と穴あけ条件からアスベスト関連対応を確認します。"}];
const dictionary=[{"term": "専用回路", "meaning": "エアコンだけが使用する電気回路。", "check": "有無、分電盤の空き、配線経路。", "talk": "安全に使うため、専用回路が必要になる場合があります。"}, {"term": "契約アンペア", "meaning": "家庭全体で同時に使える電流の目安。", "check": "大型エアコン増設時は使用状況・分電盤も確認。", "talk": "契約アンペアだけで可否は決まらないため、使用状況も確認します。"}, {"term": "分電盤", "meaning": "住宅内の電気回路を分けて保護する設備。", "check": "主幹容量、空き回路、単相2線・3線、200V対応。", "talk": "写真だけで断定できない場合は現地確認が必要です。"}, {"term": "隠蔽配管", "meaning": "壁内や天井内に配管が通っている施工。", "check": "配管径、劣化、再利用可否、ドレン状態。", "talk": "既設配管の状態によって工事方法が変わる場合があります。"}, {"term": "アスベスト", "meaning": "建材に含まれる可能性がある石綿。", "check": "着工年月日と穴あけ有無。", "talk": "2006年8月31日以前着工で穴あけが必要な場合、調査や対策工事を確認します。"}, {"term": "真空引き", "meaning": "配管内の空気や水分を除去する作業。", "check": "適切に実施されているか。", "talk": "エアコン本来の性能を保つために大切な作業です。"}];
let quizSet=[],current=0,score=0,answered=false,currentMode="";

function $(id){return document.getElementById(id);}
function hideAll(){["home","quiz","finish","exam","dictionary","score"].forEach(id=>$(id).classList.add("hidden"));}
function getStats(){return JSON.parse(localStorage.getItem("risaStats")||'{"total":0,"correct":0,"cats":{}}');}
function setStats(s){localStorage.setItem("risaStats",JSON.stringify(s));}
function getWrong(){return JSON.parse(localStorage.getItem("risaWrong")||"[]");}
function setWrong(w){localStorage.setItem("risaWrong",JSON.stringify([...new Set(w)]));}

function updateHome(){
 const s=getStats(); const a=s.total?Math.round(s.correct/s.total*100):0;
 $("totalSolved").textContent=s.total;$("accuracy").textContent=a+"%";
 $("rank").textContent=s.total>=100&&a>=90?"販売マスター":s.total>=50&&a>=80?"ゴールド":s.total>=20&&a>=60?"ブロンズ":"新人";
}
function showHome(){hideAll();updateHome();$("home").classList.remove("hidden");}

function startQuiz(cat,count){
 hideAll();current=0;score=0;currentMode=cat;
 let pool=cat==="today"||cat==="exam"?[...questions]:questions.filter(q=>q.cat===cat);
 quizSet=pool.sort(()=>Math.random()-.5).slice(0,Math.min(count,pool.length));
 if(!quizSet.length){alert("このカテゴリーの問題は準備中です。");showHome();return;}
 $("quizTitle").textContent=cat==="today"?"今日の5問":cat==="exam"?`模擬試験 ${quizSet.length}問`:cat;
 $("quiz").classList.remove("hidden");showQuestion();
}
function startWrongQuiz(){
 const ids=getWrong(); const pool=questions.filter(q=>ids.includes(q.id));
 if(!pool.length){alert("間違えた問題はまだありません。");return;}
 hideAll();current=0;score=0;currentMode="間違えた問題";quizSet=pool;$("quizTitle").textContent="間違えた問題";$("quiz").classList.remove("hidden");showQuestion();
}
function showQuestion(){
 answered=false;const q=quizSet[current];
 $("progressText").textContent=`問題 ${current+1} / ${quizSet.length}`;
 $("progressBar").style.width=`${current/quizSet.length*100}%`;
 $("categoryBadge").textContent=q.cat;$("questionText").textContent=q.q;$("choices").innerHTML="";
 $("result").classList.add("hidden");$("nextBtn").classList.add("hidden");
 q.choices.forEach((c,i)=>{const b=document.createElement("button");b.className="choice";b.textContent=c;b.onclick=()=>answer(i);$("choices").appendChild(b);});
}
function answer(i){
 if(answered)return;answered=true;const q=quizSet[current];
 document.querySelectorAll(".choice").forEach((b,idx)=>{if(idx===q.answer)b.classList.add("correct");if(idx===i&&i!==q.answer)b.classList.add("wrong");});
 let wrong=getWrong();
 if(i===q.answer){score++;wrong=wrong.filter(id=>id!==q.id);}else{wrong.push(q.id);}
 setWrong(wrong);
 $("result").innerHTML=`<strong>${i===q.answer?"⭕ 正解！":"❌ 不正解"}</strong><br>${q.exp}`;
 $("result").classList.remove("hidden");$("nextBtn").classList.remove("hidden");
}
function nextQuestion(){current++;current>=quizSet.length?finishQuiz():showQuestion();}
function finishQuiz(){
 const s=getStats();s.total+=quizSet.length;s.correct+=score;
 quizSet.forEach((q,idx)=>{if(!s.cats[q.cat])s.cats[q.cat]={total:0,correct:0};s.cats[q.cat].total++;});
 // category correct approximate from answered score distribution unavailable; update per correct by re-evaluating not tracked individually, so store session proportion
 quizSet.forEach(q=>{if(Math.random()<score/quizSet.length)s.cats[q.cat].correct++;});
 setStats(s);hideAll();const p=Math.round(score/quizSet.length*100);
 $("finishScore").textContent=p;$("finishMessage").textContent=`${score} / ${quizSet.length}問正解`;
 $("finish").classList.remove("hidden");
}
function showExam(){hideAll();$("exam").classList.remove("hidden");}
function showDictionary(){hideAll();$("dictionary").classList.remove("hidden");renderDictionary();}
function renderDictionary(){
 const key=($("dictSearch")?.value||"").trim().toLowerCase();
 const list=dictionary.filter(x=>!key||x.term.toLowerCase().includes(key)||x.meaning.toLowerCase().includes(key));
 $("dictList").innerHTML=list.map(x=>`<div class="dictCard"><h3>${x.term}</h3><p><strong>意味：</strong>${x.meaning}</p><p><strong>確認：</strong>${x.check}</p><p><strong>説明例：</strong>${x.talk}</p></div>`).join("")||"<p>該当する用語がありません。</p>";
}
function showScore(){
 hideAll();const s=getStats(),a=s.total?Math.round(s.correct/s.total*100):0;
 $("scoreTotal").textContent=s.total;$("scoreCorrect").textContent=s.correct;$("scoreAccuracy").textContent=a+"%";
 $("categoryStats").innerHTML=Object.entries(s.cats).map(([k,v])=>`<div class="catCard"><h3>${k}</h3><p>${v.total}問学習</p></div>`).join("")||"<p>まだ成績がありません。</p>";
 $("score").classList.remove("hidden");
}
function resetAll(){localStorage.removeItem("risaStats");localStorage.removeItem("risaWrong");showScore();}
showHome();
