'use strict';

const DAILY_MESSAGES=[
  '商品を紹介する前に、お客様のお困り事を聞こう。',
  '説明より質問。質問より理解。',
  '人気商品より、お客様に合う商品を考えよう。',
  '工事の不安まで解消して、本当の安心を届けよう。',
  '提案の前に「一番大切なこと」を一緒に確認しよう。',
  '売るのではなく、安心して選べるように支えよう。',
  '畳数だけでなく、日当たり・使い方・暮らしまで見よう。'
];

const MAKERS={
  'ダイキン':{feature:'空調専業メーカーとして、気流・除湿・清潔機能など幅広い選択肢がある。',point:'お客様が快適性や除湿、サポートを重視するか確認する。'},
  '三菱電機':{feature:'センサーを活用した気流制御や、使う人に合わせた運転を得意とする機種がある。',point:'風当たりや家族の温度差が気になるお客様に理由を添えて提案する。'},
  'パナソニック':{feature:'ナノイーXなど清潔・空気環境を意識した機能を持つ機種がある。',point:'清潔性だけでなく、日常のお手入れや使い方も確認する。'},
  '日立':{feature:'凍結洗浄など熱交換器の清潔維持を意識した機能を持つ機種がある。',point:'掃除の負担や内部清潔への関心を確認する。'},
  'シャープ':{feature:'プラズマクラスターを搭載した機種があり、空気環境を意識した提案がしやすい。',point:'機能効果を断定せず、希望する使い方に合わせて案内する。'},
  '東芝':{feature:'空気清浄や省エネを意識した機種を展開している。',point:'価格・清潔・省エネの優先順位を確認する。'},
  '富士通ゼネラル':{feature:'コンパクト性や気流、設置性を意識した機種がある。',point:'室内機や室外機の設置スペースも含めて確認する。'}
};

const baseQuestions=[
  q('beginner','エアコン基礎','冷房運転の主な役割は？',['室内の熱を外へ移す','室外の熱を室内へ移す','空気を加湿する','電圧を変える'],0,'冷房は室内の熱を室外へ移し、室温を下げます。'),
  q('beginner','エアコン基礎','暖房運転の主な役割は？',['室外の熱を利用して室内を暖める','室内の熱を外へ捨てる','配管を冷やす','湿度だけを下げる'],0,'暖房はヒートポンプで外気の熱を取り込み、室内を暖めます。'),
  q('beginner','電気工事','100Vと200Vを確認する主な理由は？',['機種とコンセント・電源条件を合わせるため','本体色を決めるため','メーカーを決めるため','リモコンの電池を決めるため'],0,'電圧やプラグ形状が合わない場合、電圧切替やコンセント交換が必要になることがあります。'),
  q('beginner','工事料金','標準工事に含まれない可能性が高いものは？',['特殊な室外機設置','室内機の取り付け','基本的な配管接続','試運転'],0,'屋根置き・壁面・天吊りなどは追加工事になる可能性があります。'),
  q('standard','販売力アップ','お客様が「おすすめは？」と聞いた時、最初にすることは？',['使い方や困り事を聞く','一番人気を紹介する','最上位機種を紹介する','値引きを伝える'],0,'おすすめは、お客様の暮らしや優先順位を聞いてから決まります。'),
  q('standard','販売力アップ','お客様が「工事が心配」と言った時の最初の対応は？',['何が一番心配か聞く','大丈夫と断言する','工事担当へ任せる','商品説明を続ける'],0,'不安の中身を具体化すると、必要な説明が見えてきます。'),
  q('master','総合判断','18畳・吹き抜け・西日が強い部屋で最初に考えることは？',['部屋条件と使い方を詳しく確認する','18畳用を即決する','最安機種を選ぶ','人気メーカーを決める'],0,'畳数だけでなく、日射・天井高・断熱・人数・使用時間を含めて判断します。')
];

function q(level,category,text,choices,answer,explanation){return {id:'',level,category,text,choices,answer,explanation};}

function buildQuestions(){
  const out=[...baseQuestions];
  let seq=1;
  const add=(item)=>{item.id=`v14-${String(seq++).padStart(4,'0')}`;out.push(item)};
  baseQuestions.forEach((x,i)=>x.id=`v14-base-${i+1}`);

  const rooms=['6畳の子ども部屋','8畳の寝室','10畳の洋室','14畳のリビング','18畳のLDK','20畳の吹き抜けリビング'];
  const conditions=['西日が強い','最上階','大きな窓がある','キッチンとつながっている','断熱性能が不明','天井が高い'];
  const uses=['夜だけ使う','朝まで使う','日中も長時間使う','ペットが留守番する','暖房をよく使う','冷房中心で使う'];
  const concerns=['電気代','風当たり','音','掃除','臭い','工事費'];

  // Beginner: 293 generated + 7 base = 300
  const beginnerCats=['エアコン基礎','メーカー別特徴','電気工事','工事料金','設置確認'];
  for(let i=0;out.filter(x=>x.level==='beginner').length<300;i++){
    const cat=beginnerCats[i%beginnerCats.length];
    if(cat==='メーカー別特徴'){
      const names=Object.keys(MAKERS); const name=names[i%names.length]; const m=MAKERS[name];
      add(q('beginner',cat,`${name}の特徴を案内する時に大切なことは？（基礎${i+1}）`,[
        'お客様の重視点に合う特徴を選んで説明する','メーカー名だけで決めてもらう','すべての機能を一度に説明する','価格だけで比較する'
      ],0,`${m.feature} ${m.point}`));
    }else if(cat==='電気工事'){
      const scenario=[
        ['18畳用を検討中で、現在のコンセント形状が不明','電圧とコンセント形状を確認する'],
        ['ブレーカーがよく落ちる','契約アンペアと専用回路を確認する'],
        ['エアコンを3台まとめて設置したい','分電盤容量と専用回路を確認する'],
        ['200V機種を希望している','現在の電源条件を確認する']
      ][i%4];
      add(q('beginner',cat,`${scenario[0]}。最初にすることは？（基礎${i+1}）`,[scenario[1],'人気機種を紹介する','色を決める','工事日だけ決める'],0,'電気条件は安全な設置と追加工事の説明に関わるため、事前確認が重要です。'));
    }else if(cat==='工事料金'){
      const work=['配管延長','電圧切替','コンセント交換','屋根置き','天吊り','配管カバー','取り外し・リサイクル'][i%7];
      add(q('beginner',cat,`${work}について案内する時に適切なのは？（基礎${i+1}）`,[
        '追加費用の可能性と確認方法を事前に説明する','必ず無料と伝える','現場で初めて説明する','説明しない'
      ],0,'追加工事は断定せず、店舗基準と現地状況を踏まえて事前に説明します。'));
    }else if(cat==='設置確認'){
      const place=['2階室内機・1階室外機','狭いベランダ','隠ぺい配管','新規穴あけ','既設配管カバー再利用'][i%5];
      add(q('beginner',cat,`${place}の設置で最初に確認することは？（基礎${i+1}）`,[
        '設置条件と追加工事の可能性','人気ランキング','本体色','リモコンの形'],0,'設置条件は工事可否・追加費用・機種選定に影響します。'));
    }else{
      const term=['APF','年間消費電力量','冷房能力','暖房能力','除湿','内部クリーン'][i%6];
      add(q('beginner',cat,`${term}を説明する時に最も大切なのは？（基礎${i+1}）`,[
        '専門用語だけでなく暮らしへの影響に置き換える','数値だけを読む','難しい言葉を増やす','説明を省く'
      ],0,'数値や機能は、お客様が実際にどう感じるかに置き換えると伝わりやすくなります。'));
    }
  }

  // Standard until 710 total standard count 410
  const phrases=['安いのでいい','冷えれば十分','今日は見るだけ','主人に相談します','ネットの方が安い','工事が心配','掃除が面倒','電気代が気になる','静かな方がいい','おすすめを教えて'];
  while(out.filter(x=>x.level==='standard').length<410){
    const i=out.filter(x=>x.level==='standard').length;
    const phrase=phrases[i%phrases.length];
    const room=rooms[i%rooms.length], use=uses[(i*2)%uses.length], concern=concerns[(i*3)%concerns.length];
    const variants=[
      q('standard','ヒアリング',`お客様「${phrase}」。最初の対応として最も適切なのは？（実践${i+1}）`,[
        '理由や背景を確認する','すぐ商品を紹介する','値引きを始める','会話を終える'
      ],0,'言葉をそのまま受け取らず、なぜそう思うのかを確認すると本当の希望が見えてきます。'),
      q('standard','暮らし提案',`${room}で、${use}予定。さらに${concern}が気になるお客様への提案前に必要なのは？（実践${i+1}）`,[
        '優先順位を一緒に整理する','最上位機種を即提案する','メーカーだけで決める','本体価格だけ説明する'
      ],0,'複数条件がある時は、優先順位を確認してから理由のある提案につなげます。'),
      q('standard','クロージング',`お客様が「もう少し考えます」と言いました。最も良い対応は？（実践${i+1}）`,[
        '一番迷っている点を確認し、比較しやすく整理する','今日だけと急かす','値引きだけ提案する','何も言わず終了する'
      ],0,'クロージングは契約を迫ることではなく、残っている不安を一緒に整理することです。'),
      q('standard','工事説明',`お客様が「追加料金が怖い」と言いました。適切な説明は？（実践${i+1}）`,[
        '事前に分かる内容と現地確認が必要な内容を分けて説明する','追加は絶対ないと断言する','工事担当だけに任せる','本体説明へ戻る'
      ],0,'注意点も先に伝えることで「聞いていない」を防ぎ、安心につながります。'),
      q('standard','メーカー比較',`メーカー比較で最初に確認することは？（実践${i+1}）`,[
        'お客様が何を重視して比較したいか','販売員の好きなメーカー','一番高いメーカー','知名度だけ'
      ],0,'メーカーの良し悪しではなく、お客様の重視点との相性で比較します。')
    ];
    add(variants[i%variants.length]);
  }

  // Master until 300
  while(out.filter(x=>x.level==='master').length<300){
    const i=out.filter(x=>x.level==='master').length;
    const room=rooms[(i+2)%rooms.length], cond=conditions[i%conditions.length], use=uses[(i+1)%uses.length], concern=concerns[(i+4)%concerns.length];
    const masterVariants=[
      q('master','総合判断',`${room}、${cond}、${use}、${concern}も重視。最初の一手は？（マスター${i+1}）`,[
        '能力・暮らし・工事条件を整理して優先順位を確認する','畳数だけで機種を決める','最上位モデルを即決する','価格だけで絞る'
      ],0,'条件が複雑なほど、商品提案の前に情報を整理し、お客様と判断基準を共有します。'),
      q('master','工事応用',`築年数が古く、複数台設置、電源状況が不明です。販売員の対応は？（マスター${i+1}）`,[
        '分電盤・契約容量・専用回路を確認し、必要なら現地確認を案内する','すべて標準工事で案内する','本体だけ販売する','追加費用はないと伝える'
      ],0,'複数台や古い設備では電気条件の確認が重要です。判断できない場合は現地確認につなげます。'),
      q('master','比較提案',`他店と能力選定が異なり、お客様が迷っています。最も適切なのは？（マスター${i+1}）`,[
        '他店を否定せず、判断条件の違いを一緒に確認する','他店が間違いと断言する','同じ機種へ変更する','値引きだけで決めてもらう'
      ],0,'他店批判ではなく、日当たり・断熱・使用状況など判断基準を透明に説明します。'),
      q('master','接客判断',`ご夫婦で希望が異なり、片方が黙っています。最も良い進め方は？（マスター${i+1}）`,[
        '双方の重視点を自然に確認し、共通点を整理する','話す方だけに合わせる','高い機種でまとめる','価格だけで決める'
      ],0,'決定に関わる全員の希望を確認し、共通する優先順位を見つけます。'),
      q('master','クレーム予防',`過去の工事で嫌な経験があるお客様への最初の対応は？（マスター${i+1}）`,[
        '何があったか最後まで伺い、不安の内容を確認する','今回は大丈夫と断言する','前の業者を否定する','すぐ商品説明を始める'
      ],0,'まず事実と気持ちを丁寧に聞き、同じ不安を繰り返さないための説明へつなげます。')
    ];
    add(masterVariants[i%masterVariants.length]);
  }

  // Exactly 1010: 300 + 410 + 300
  return out.slice(0,1010);
}

const QUESTIONS=buildQuestions();
const LEVELS={
  beginner:{title:'新人',description:'基礎・メーカー・電気・工事の基本を身につけます。'},
  standard:{title:'販売力アップ',description:'お客様のお困り事を聞き、理由のある提案につなげます。'},
  master:{title:'エアコンマスター',description:'複雑な設置条件や家族の希望を総合的に判断します。'}
};

let selectedLevel='beginner';
let quizItems=[];let index=0;let score=0;let answered=false;let sessionCats={};
const $=id=>document.getElementById(id);
const screens=[...document.querySelectorAll('.screen')];
function show(id){screens.forEach(s=>s.classList.toggle('hidden',s.id!==id));window.scrollTo({top:0,behavior:'smooth'});}
function shuffle(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x;}
function stats(){return JSON.parse(localStorage.getItem('airconV14Stats')||'{"total":0,"correct":0,"cats":{}}');}
function saveStats(s){localStorage.setItem('airconV14Stats',JSON.stringify(s));}
function rankFor(total,rate){if(total>=800&&rate>=85)return'エアコンマスター';if(total>=500&&rate>=80)return'プラチナ';if(total>=300&&rate>=75)return'ゴールド';if(total>=150)return'シルバー';if(total>=50)return'ブロンズ';return'新人';}
function updateHome(){const s=stats(),rate=s.total?Math.round(s.correct/s.total*100):0;$('total').textContent=s.total;$('rate').textContent=rate+'%';$('rank').textContent=rankFor(s.total,rate);$('dailyMessage').textContent=DAILY_MESSAGES[new Date().getDate()%DAILY_MESSAGES.length];}
function seenKey(level){return `airconV14Seen-${level}`;}
function chooseQuestions(level,count=10){
  const pool=QUESTIONS.filter(q=>q.level===level);let seen=JSON.parse(localStorage.getItem(seenKey(level))||'[]');
  let unseen=pool.filter(q=>!seen.includes(q.id));
  if(unseen.length<count){seen=[];unseen=[...pool];}
  const picked=shuffle(unseen).slice(0,count);seen.push(...picked.map(q=>q.id));localStorage.setItem(seenKey(level),JSON.stringify(seen));return picked;
}
function openLevel(level){selectedLevel=level;const info=LEVELS[level];$('levelTitle').textContent=info.title;$('levelDescription').textContent=info.description;const pool=QUESTIONS.filter(q=>q.level===level);$('levelCount').textContent=pool.length;const cats=[...new Set(pool.map(q=>q.category))];$('categoryChips').innerHTML=cats.map(c=>`<span>${c}</span>`).join('');show('level');}
function startQuiz(){quizItems=chooseQuestions(selectedLevel,10);index=0;score=0;answered=false;sessionCats={};$('quizTitle').textContent=LEVELS[selectedLevel].title;show('quiz');renderQuestion();}
function renderQuestion(){answered=false;const item=quizItems[index];$('progressText').textContent=`${index+1} / ${quizItems.length}`;$('barFill').style.width=`${index/quizItems.length*100}%`;$('category').textContent=item.category;$('question').textContent=item.text;$('explain').classList.add('hidden');$('next').classList.add('hidden');
  const shuffled=shuffle(item.choices.map((text,original)=>({text,correct:original===item.answer})));
  $('choices').innerHTML='';shuffled.forEach((c,n)=>{const b=document.createElement('button');b.className='choice';b.textContent=`${['①','②','③','④'][n]} ${c.text}`;b.dataset.correct=c.correct;b.addEventListener('click',()=>answer(b,item,c.correct));$('choices').appendChild(b);});
}
function answer(button,item,isCorrect){if(answered)return;answered=true;const buttons=[...document.querySelectorAll('.choice')];buttons.forEach(b=>{b.disabled=true;if(b.dataset.correct==='true')b.classList.add('correct')});button.classList.add(isCorrect?'correct':'wrong');if(isCorrect)score++;
  const s=stats();s.total++;if(isCorrect)s.correct++;s.cats[item.category]??={total:0,correct:0};s.cats[item.category].total++;if(isCorrect)s.cats[item.category].correct++;saveStats(s);sessionCats[item.category]??={total:0,correct:0};sessionCats[item.category].total++;if(isCorrect)sessionCats[item.category].correct++;
  $('explain').innerHTML=`<strong>${isCorrect?'正解です':'正解を確認しましょう'}</strong><br>${item.explanation}`;$('explain').classList.remove('hidden');$('next').textContent=index===quizItems.length-1?'結果を見る':'次へ';$('next').classList.remove('hidden');
}
function next(){if(index<quizItems.length-1){index++;renderQuestion()}else finish();}
function finish(){const points=score*10;$('scoreValue').textContent=points;$('scoreText').textContent=points>=90?'素晴らしいです。理由を持って提案できています。':points>=70?'よくできました。間違えた分野をもう一度確認しましょう。':'焦らず、解説を読みながら繰り返しましょう。';$('resultBreakdown').innerHTML=Object.entries(sessionCats).map(([c,v])=>`<div><span>${c}</span><strong>${v.correct}/${v.total}</strong></div>`).join('');$('barFill').style.width='100%';show('result');updateHome();}
function openScores(){const s=stats(),rate=s.total?Math.round(s.correct/s.total*100):0;$('sTotal').textContent=s.total;$('sCorrect').textContent=s.correct;$('sRate').textContent=rate+'%';const entries=Object.entries(s.cats||{}).sort((a,b)=>b[1].total-a[1].total);$('categoryScores').innerHTML='<h3>分野別</h3>'+(entries.length?entries.map(([c,v])=>`<div><span>${c}</span><strong>${Math.round(v.correct/v.total*100)}%（${v.correct}/${v.total}）</strong></div>`).join(''):'<p>まだ回答がありません。</p>');show('scores');}

document.querySelectorAll('[data-level]').forEach(b=>b.addEventListener('click',()=>openLevel(b.dataset.level)));
document.querySelectorAll('[data-home]').forEach(b=>b.addEventListener('click',()=>{show('home');updateHome()}));
$('startQuiz').addEventListener('click',startQuiz);$('next').addEventListener('click',next);$('scoreBtn').addEventListener('click',openScores);$('resetStats').addEventListener('click',()=>{if(confirm('成績をすべてリセットしますか？')){localStorage.removeItem('airconV14Stats');['beginner','standard','master'].forEach(l=>localStorage.removeItem(seenKey(l)));updateHome();openScores();}});
if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
updateHome();
console.log(`Ver.14 questions: ${QUESTIONS.length}`,QUESTIONS.reduce((a,q)=>(a[q.level]=(a[q.level]||0)+1,a),{}));
