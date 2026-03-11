import { useState } from "react";

/* ─────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────── */
const SCORES = {
  "901234567": 1245,
  "935556677": 720,
  "917654321": 1890,
  "981234567": 85,
};

const NAV_LINKS = [
  { href: "#check", label: "Баллы" },
  { href: "#prizes", label: "Призы" },
  { href: "#how", label: "Участие" },
  { href: "#tariff", label: "Тарифы" },
];

const STATS = [
  { value: "1.60", label: "сом в день" },
  { value: "175",  label: "баллов макс./день" },
  { value: "25",   label: "вопросов в день" },
  { value: "3",    label: "победителя в месяц" },
];

const PRIZES = [
  { place: "1 место", icon: "📱", name: "iPhone 17\nPro Max",      pts: "> 1 800 баллов" },
  { place: "2 место", icon: "⌚", name: "Apple Watch\nSeries 11",   pts: "> 1 600 баллов" },
  { place: "3 место", icon: "🎧", name: "AirPods 4\nActive Noise", pts: "> 800 баллов" },
];

const HOW_STEPS = [
  { n: "Шаг 01", icon: "📨", title: "Подпишитесь",    desc: "1,60 сом в день. Для всех операторов Таджикистана." },
  { n: "Шаг 02", icon: "❓", title: "Отвечайте",       desc: "До 15 вопросов в день. +10 за 90 дирам в доп. пакете." },
  { n: "Шаг 03", icon: "⭐", title: "Копите баллы",   desc: "5–10 баллов за ответ. Максимум 175 в день." },
  { n: "Шаг 04", icon: "🏆", title: "Забирайте приз", desc: "Топ-3 в конце месяца получают настоящие Apple-устройства." },
];

const WINNERS = [
  { medal: "🥇", phone: "+992 90 *** 78XX", pts: "2 145 баллов", prize: "📱 iPhone 17 Pro Max", dark: true },
  { medal: "🥈", phone: "+992 93 *** 44XX", pts: "1 890 баллов", prize: "⌚ Apple Watch",        dark: false },
  { medal: "🥉", phone: "+992 98 *** 12XX", pts: "1 023 балла",  prize: "🎧 AirPods 4",         dark: false },
];

const TARIFFS = [
  {
    light: true,
    tag: "Базовая подписка",
    price: "1.60",
    per: "сом в день",
    items: [
      "15 вопросов каждый день",
      "5 баллов за правильный ответ",
      "До 75 баллов в день",
      "Участие в ежемесячном розыгрыше",
    ],
  },
  {
    light: false,
    tag: "Доп. пакет",
    price: "0.90",
    per: "сом / день (по запросу)",
    items: [
      "+10 дополнительных вопросов",
      "10 баллов за правильный ответ",
      "+100 баллов в день",
      "Только с подтверждением",
    ],
  },
];

const RULES = [
  { icon: "📱", title: "1 номер = 1 участник", desc: "Каждый номер регистрируется один раз. Мультиаккаунты запрещены." },
  { icon: "⏱️", title: "15 минут на ответ",    desc: "Таймер запускается при получении вопроса. Первый ответ принимается." },
  { icon: "🔄", title: "Сброс 1-го числа",     desc: "Баллы обнуляются каждый месяц. Победители участвуют снова." },
  { icon: "⚡", title: "Джекпот",               desc: "Если порог не набран — приз переходит и суммируется в следующем месяце." },
  { icon: "🛡️", title: "Антифрод",              desc: "Боты выявляются автоматически. Нарушитель дисквалифицируется." },
  { icon: "🚪", title: "Отписка: STOP",         desc: "Отправьте STOP на номер оператора для отключения в любой момент." },
];

/* ─────────────────────────────────────────
   SVG DEVICES
───────────────────────────────────────── */
function WatchSVG() {
  return (
    <svg width="130" height="210" viewBox="0 0 130 210"
      className="block mx-auto transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-2.5"
      style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.14))" }}>
      <rect x="48" y="4"   width="34" height="10"  rx="3.5" fill="#aeaeb2"/>
      <rect x="48" y="196" width="34" height="10"  rx="3.5" fill="#aeaeb2"/>
      <rect x="14" y="26"  width="102" height="158" rx="26" fill="#1c1c1e"/>
      <rect x="17" y="29"  width="96"  height="152" rx="23" fill="#2c2c2e"/>
      <rect x="19" y="31"  width="92"  height="148" rx="21" fill="#111"/>
      <rect x="24" y="40"  width="82"  height="130" rx="16" fill="url(#wgrad)"/>
      <text x="65" y="88"  fontFamily="sans-serif" fontSize="20" fontWeight="700" fill="white" textAnchor="middle">10:09</text>
      <text x="65" y="105" fontFamily="sans-serif" fontSize="7"  fill="rgba(255,255,255,0.45)" textAnchor="middle">ПТ, 4 МАР 2026</text>
      <path d="M42 128 Q46 119 50 128 Q54 119 58 131 Q62 119 66 128 Q70 119 74 128 Q78 119 82 128 Q86 119 88 128"
        stroke="#ff375f" strokeWidth="1.8" fill="none"/>
      <rect x="112" y="70" width="5" height="28" rx="2.5" fill="#3a3a3c"/>
      <defs>
        <linearGradient id="wgrad" x1="24" y1="40" x2="24" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0"  stopColor="#1a3888" stopOpacity=".55"/>
          <stop offset="1"  stopColor="#03071e" stopOpacity=".85"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function IPhoneSVG() {
  return (
    <svg width="190" height="380" viewBox="0 0 190 380"
      className="block mx-auto transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-2.5"
      style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.14))" }}>
      <rect x="5" y="3"   width="180" height="374" rx="46" fill="#2c2c2e"/>
      <rect x="7" y="5"   width="176" height="370" rx="44" fill="#1c1c1e"/>
      <rect x="9" y="7"   width="172" height="366" rx="42" fill="url(#sgrad)"/>
      <rect x="68" y="20" width="54"  height="14"  rx="7"  fill="#000"/>
      <text x="26" y="44" fontFamily="sans-serif" fontSize="9" fill="white" fontWeight="600">9:41</text>
      <rect x="18" y="60" width="154" height="72" rx="14" fill="rgba(255,255,255,0.07)"/>
      <text x="95" y="84"  fontFamily="sans-serif" fontSize="8.5" fill="rgba(255,255,255,0.85)" textAnchor="middle" fontWeight="600">Вопрос 12 из 15</text>
      <text x="95" y="100" fontFamily="sans-serif" fontSize="7.5" fill="rgba(255,255,255,0.45)" textAnchor="middle">Столица Таджикистана?</text>
      <text x="95" y="117" fontFamily="sans-serif" fontSize="7"   fill="rgba(255,255,255,0.3)"  textAnchor="middle">⏱ 12:34 осталось</text>
      <rect x="18" y="142" width="154" height="30" rx="10" fill="rgba(0,113,227,0.75)"/>
      <text x="95" y="161" fontFamily="sans-serif" fontSize="9" fill="white" textAnchor="middle" fontWeight="500">✓ Душанбе</text>
      <rect x="18" y="178" width="154" height="28" rx="10" fill="rgba(255,255,255,0.06)"/>
      <text x="95" y="196" fontFamily="sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">Худжанд</text>
      <rect x="18" y="212" width="154" height="28" rx="10" fill="rgba(255,255,255,0.06)"/>
      <text x="95" y="230" fontFamily="sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle">Хорог</text>
      <text x="18" y="260" fontFamily="sans-serif" fontSize="7" fill="rgba(255,255,255,0.35)">Баллы в этом месяце</text>
      <rect x="18" y="266" width="154" height="5" rx="2.5" fill="rgba(255,255,255,0.07)"/>
      <rect x="18" y="266" width="105" height="5" rx="2.5" fill="url(#pgrad)"/>
      <text x="18"  y="288" fontFamily="sans-serif" fontSize="13" fill="white" fontWeight="700">1 245</text>
      <text x="163" y="288" fontFamily="sans-serif" fontSize="7"  fill="rgba(255,255,255,0.35)" textAnchor="end">из 1 800</text>
      <rect x="75"  y="355" width="40" height="4"  rx="2"   fill="rgba(255,255,255,0.2)"/>
      <rect x="185" y="95"  width="5"  height="50" rx="2.5" fill="#3a3a3c"/>
      <rect x="185" y="154" width="5"  height="34" rx="2.5" fill="#3a3a3c"/>
      <rect x="0"   y="104" width="5"  height="24" rx="2.5" fill="#3a3a3c"/>
      <rect x="0"   y="135" width="5"  height="42" rx="2.5" fill="#3a3a3c"/>
      <rect x="0"   y="184" width="5"  height="42" rx="2.5" fill="#3a3a3c"/>
      <defs>
        <linearGradient id="sgrad" x1="9" y1="7" x2="9" y2="373" gradientUnits="userSpaceOnUse">
          <stop offset="0"   stopColor="#1a3888" stopOpacity=".4"/>
          <stop offset=".45" stopColor="#0d1840" stopOpacity=".35"/>
          <stop offset="1"   stopColor="#000"    stopOpacity=".65"/>
        </linearGradient>
        <linearGradient id="pgrad" x1="18" y1="0" x2="172" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0071e3"/>
          <stop offset="1" stopColor="#34aadc"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function AirPodsSVG() {
  return (
    <svg width="120" height="200" viewBox="0 0 120 200"
      className="block mx-auto transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-2.5"
      style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.14))" }}>
      <rect x="16" y="38" width="88" height="140" rx="22" fill="#e8e8ea"/>
      <rect x="18" y="40" width="84" height="136" rx="20" fill="#f5f5f7"/>
      <rect x="26" y="84" width="68" height="2"   rx="1"  fill="#d4d4d6"/>
      <ellipse cx="40" cy="62" rx="12" ry="18" fill="#e0e0e2"/>
      <ellipse cx="40" cy="62" rx="9"  ry="14" fill="white"/>
      <ellipse cx="40" cy="71" rx="3.5" ry="5.5" fill="#d4d4d6"/>
      <circle  cx="40" cy="57" r="1.8" fill="#c7c7cc"/>
      <ellipse cx="80" cy="62" rx="12" ry="18" fill="#e0e0e2"/>
      <ellipse cx="80" cy="62" rx="9"  ry="14" fill="white"/>
      <ellipse cx="80" cy="71" rx="3.5" ry="5.5" fill="#d4d4d6"/>
      <circle  cx="80" cy="57" r="1.8" fill="#c7c7cc"/>
      <circle  cx="60" cy="152" r="3.5" fill="#34c759" opacity=".85"/>
      <rect x="50" y="172" width="20" height="4" rx="2" fill="#d4d4d6"/>
      <rect x="26" y="40"  width="84" height="8" rx="20" fill="rgba(255,255,255,0.6)"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function SMSQuiz() {
  const [phone, setPhone]         = useState("");
  const [result, setResult]       = useState(null);
  const [fillWidth, setFillWidth] = useState(0);

  const handleCheck = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8) { alert("Введите корректный номер"); return; }
    const pts = SCORES[digits] ?? Math.floor(Math.random() * 1500) + 50;
    const pct = Math.min(100, Math.round((pts / 1800) * 100));
    let status = "";
    if      (pts >= 1800) status = "🥇 Вы претендуете на iPhone 17 Pro Max!";
    else if (pts >= 1600) status = "🥈 Вы претендуете на Apple Watch!";
    else if (pts >= 800)  status = "🥉 Вы претендуете на AirPods 4!";
    else if (pts >= 600)  status = "🎯 Вы в зоне призов — продолжайте!";
    else                  status = `До допуска: ещё ${600 - pts} баллов`;
    setResult({ pts, pct, status });
    setFillWidth(0);
    setTimeout(() => setFillWidth(pct), 100);
  };

  return (
    <div className="bg-white text-[#1d1d1f] overflow-x-hidden" style={{ fontFamily: "'Figtree', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes au    { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        @keyframes popIn { from { opacity:0; transform:scale(.97); }      to { opacity:1; transform:scale(1); } }
        .anim-0   { animation: au .7s ease both; }
        .anim-1   { animation: au .7s .1s ease both; }
        .anim-2   { animation: au .7s .2s ease both; }
        .anim-3   { animation: au .7s .3s ease both; }
        .anim-4   { animation: au .7s .4s ease both; }
        .anim-pop { animation: popIn .25s ease both; }
        .rf-bar   { transition: width 1s cubic-bezier(.4,0,.2,1); }
      `}</style>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-12 px-5 flex items-center justify-between border-b border-black/[0.08] bg-white/[0.82] backdrop-saturate-[180%] backdrop-blur-xl">
        <span className="text-[1.1rem] font-bold tracking-tight">SMS Викторина</span>
        <ul className="hidden md:flex list-none gap-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={e => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[#6e6e73] hover:text-[#1d1d1f] no-underline text-[0.8rem] px-3 h-12 flex items-center transition-colors duration-150 cursor-pointer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#check"
          onClick={e => {
            e.preventDefault();
            document.querySelector("#check")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-[#0071e3] hover:bg-[#0077ed] text-white no-underline rounded-full px-4 py-[7px] text-[0.8rem] font-semibold transition-colors duration-150 cursor-pointer"
        >
          Проверить баллы
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="text-center px-[5%] pt-[148px] bg-white overflow-hidden">
        <p className="anim-0 text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#0071e3] mb-3">
          SMS-Викторина · Таджикистан · Апрель 2026
        </p>
        <h1 className="anim-1 font-extrabold tracking-[-0.045em] leading-[1.02] mb-4" style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>
          Отвечай.<br />Побеждай.
        </h1>
        <p className="anim-2 font-light text-[#6e6e73] max-w-[520px] mx-auto mb-9 leading-[1.5]" style={{ fontSize: "clamp(1rem,2.5vw,1.35rem)" }}>
          Ежедневные вопросы по SMS. Набирай баллы и выигрывай Apple каждый месяц.
        </p>
        <div className="anim-3 flex gap-3.5 justify-center flex-wrap mb-[72px]">
          <a href="#check"
            className="bg-[#0071e3] hover:bg-[#0077ed] hover:scale-[1.02] text-white no-underline rounded-full px-6 py-[13px] text-base font-semibold inline-flex items-center gap-1.5 transition-all duration-200">
            Проверить баллы
          </a>
          <a href="#how"
            className="bg-transparent text-[#0071e3] border border-[rgba(0,113,227,0.35)] hover:border-[#0071e3] rounded-full px-6 py-[13px] text-base font-semibold no-underline transition-all duration-200">
            Как участвовать
          </a>
        </div>

        {/* Device stage */}
        <div className="anim-4 flex justify-center items-end gap-8">
          <div className="group text-center">
            <WatchSVG />
            <p className="text-[0.88rem] font-semibold tracking-[-0.01em] mt-3.5 mb-0.5">Apple Watch Series 11</p>
            <p className="text-[0.75rem] text-[#86868b]">2-е место</p>
          </div>
          <div className="group text-center">
            <IPhoneSVG />
            <p className="text-[0.88rem] font-semibold tracking-[-0.01em] mt-3.5 mb-0.5">iPhone 17 Pro Max</p>
            <p className="text-[0.75rem] text-[#86868b]">1-е место</p>
          </div>
          <div className="group text-center">
            <AirPodsSVG />
            <p className="text-[0.88rem] font-semibold tracking-[-0.01em] mt-3.5 mb-0.5">AirPods 4 Active Noise</p>
            <p className="text-[0.75rem] text-[#86868b]">3-е место</p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-[#f5f5f7] border-t border-b border-black/[0.08] flex justify-center">
        {STATS.map(({ value, label }, i) => (
          <div key={label}
            className={`flex-1 max-w-[220px] py-7 px-5 text-center ${i < STATS.length - 1 ? "border-r border-black/[0.08]" : ""}`}>
            <p className="text-[2rem] font-bold tracking-[-0.03em] leading-none">{value}</p>
            <p className="text-[0.78rem] text-[#86868b] mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* ── CHECK ── */}
      <section id="check" className="py-20 px-[5%] text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#0071e3] mb-2.5">Личный кабинет</p>
        <h2 className="font-bold tracking-[-0.03em] leading-[1.08] mb-3" style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>Ваши баллы</h2>
        <p className="text-[0.95rem] text-[#6e6e73] max-w-[460px] mx-auto mb-12 leading-[1.6] font-light">
          Введите номер и мгновенно узнайте результат и ближайший приз.
        </p>
        <div className="max-w-[540px] mx-auto bg-[#f5f5f7] rounded-[20px] p-9 text-left">
          <p className="text-[0.8rem] font-medium text-[#6e6e73] mb-2">Номер телефона</p>
          <div className="flex">
            <div className="bg-white border border-black/[0.12] border-r-0 rounded-l-[10px] px-3.5 py-3 text-[0.9rem] font-medium text-[#6e6e73]">
              +992
            </div>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onKeyPress={e => { if (e.key === "Enter") handleCheck(); }}
              placeholder="90 123 45 67"
              maxLength={12}
              className="flex-1 border border-black/[0.12] rounded-r-[10px] px-3.5 py-3 text-[0.9rem] font-medium bg-white outline-none focus:border-[#0071e3] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.12)] placeholder:text-black/[0.22] transition-all duration-200"
              style={{ fontFamily: "inherit" }}
            />
          </div>
          <button
            onClick={handleCheck}
            className="mt-3 w-full bg-[#0071e3] hover:bg-[#0077ed] hover:scale-[1.02] text-white rounded-full py-[13px] px-6 text-base font-semibold cursor-pointer transition-all duration-200 border-none"
            style={{ fontFamily: "inherit" }}>
            Проверить →
          </button>

          {result && (
            <div className="anim-pop mt-3.5 bg-white rounded-xl p-5 border border-black/[0.08]">
              <p className="text-[2.8rem] font-bold tracking-[-0.04em] leading-none">
                {result.pts.toLocaleString("ru")}
              </p>
              <p className="text-[0.76rem] text-[#86868b] mt-1 mb-3.5">баллов в этом месяце</p>
              <div className="h-1 bg-[#f5f5f7] rounded-full overflow-hidden mb-1.5">
                <div
                  className="rf-bar h-full rounded-full"
                  style={{ width: `${fillWidth}%`, background: "linear-gradient(90deg,#0071e3,#34aadc)" }}
                />
              </div>
              <div className="flex justify-between text-[0.7rem] text-[#86868b] mb-2.5">
                <span>0</span><span>{result.pct}%</span><span>1 800 (iPhone)</span>
              </div>
              <p className="text-[0.88rem] font-semibold text-[#0071e3]">{result.status}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PRIZES DARK ── */}
      <section id="prizes" className="bg-[#1d1d1f] py-20 px-[5%] text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#2997ff] mb-2.5">Призы этого месяца</p>
        <h2 className="font-bold tracking-[-0.03em] leading-[1.08] mb-3 text-white" style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>
          Выиграйте Apple.
        </h2>
        <p className="text-[0.95rem] text-white/55 max-w-[460px] mx-auto mb-12 leading-[1.6] font-light">
          Три победителя каждый месяц. Если порог не набран — приз суммируется со следующим.
        </p>
        <div className="flex gap-px max-w-[860px] mx-auto bg-white/[0.07] rounded-[18px] overflow-hidden">
          {PRIZES.map(p => (
            <div key={p.place}
              className="flex-1 py-10 px-6 bg-white/[0.04] hover:bg-white/[0.09] text-center transition-colors duration-200 relative
                         after:content-[''] after:absolute after:top-0 after:left-[15%] after:right-[15%] after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/[0.12] after:to-transparent">
              <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-white/35 mb-5">{p.place}</p>
              <span className="text-[3rem] block mb-4">{p.icon}</span>
              <p className="text-base font-semibold text-white leading-[1.3] mb-3.5 whitespace-pre-line">{p.name}</p>
              <span className="inline-block bg-white/[0.07] border border-white/[0.1] rounded-full px-3 py-1 text-[0.74rem] text-white/50">
                {p.pts}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW ── */}
      <section id="how" className="py-20 px-[5%] text-center bg-[#f5f5f7]">
        <p className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#0071e3] mb-2.5">Участие</p>
        <h2 className="font-bold tracking-[-0.03em] leading-[1.08] mb-12" style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>
          Просто. Каждый день.
        </h2>
        <div className="grid grid-cols-4 border border-black/[0.08] rounded-[18px] overflow-hidden bg-white max-w-[960px] mx-auto">
          {HOW_STEPS.map((h, i) => (
            <div key={h.n}
              className={`py-8 px-5 text-center hover:bg-[#f5f5f7] transition-colors duration-150 ${i < HOW_STEPS.length - 1 ? "border-r border-black/[0.08]" : ""}`}>
              <p className="text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-[#86868b] mb-3.5">{h.n}</p>
              <p className="text-[2rem] mb-3">{h.icon}</p>
              <p className="text-[0.9rem] font-semibold mb-1.5">{h.title}</p>
              <p className="text-[0.78rem] text-[#86868b] leading-[1.55] font-light">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WINNERS ── */}
      <section id="winners" className="py-20 px-[5%] text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#0071e3] mb-2.5">Зал победителей</p>
        <h2 className="font-bold tracking-[-0.03em] leading-[1.08] mb-3" style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>
          Победители месяца
        </h2>
        <p className="text-[0.95rem] text-[#6e6e73] max-w-[460px] mx-auto mb-12 leading-[1.6] font-light">
          Апрель 2026 · Номера скрыты из соображений приватности.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          {WINNERS.map(w => (
            <div key={w.phone}
              className={`rounded-[18px] p-8 w-[220px] text-center transition-all duration-200 border border-transparent
                ${w.dark
                  ? "bg-[#1d1d1f] hover:border-white/10"
                  : "bg-[#f5f5f7] hover:bg-white hover:border-black/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                }`}>
              <p className="text-[2rem] mb-3">{w.medal}</p>
              <p className={`text-[0.92rem] font-semibold tracking-[0.02em] mb-0.5 ${w.dark ? "text-white" : "text-[#1d1d1f]"}`}>
                {w.phone}
              </p>
              <p className={`text-[0.78rem] mb-2.5 ${w.dark ? "text-white/40" : "text-[#86868b]"}`}>{w.pts}</p>
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.72rem] font-semibold
                ${w.dark ? "bg-white/10 text-white/75" : "bg-[rgba(0,113,227,0.08)] text-[#0071e3]"}`}>
                {w.prize}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TARIFF DARK ── */}
      <section id="tariff" className="bg-[#1d1d1f] py-20 px-[5%] text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#2997ff] mb-2.5">Тарифы</p>
        <h2 className="font-bold tracking-[-0.03em] leading-[1.08] mb-3 text-white" style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>
          Прозрачные цены.
        </h2>
        <p className="text-[0.95rem] text-white/55 max-w-[460px] mx-auto mb-12 leading-[1.6] font-light">
          Никаких скрытых платежей. Доп. пакет — только с вашего согласия.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          {TARIFFS.map(tc => (
            <div key={tc.tag}
              className={`rounded-[18px] p-8 w-[260px] text-left transition-colors duration-200
                ${tc.light
                  ? "bg-white border border-transparent hover:bg-[#f9f9fb]"
                  : "bg-white/[0.05] border border-white/10 hover:bg-white/[0.09]"
                }`}>
              <p className={`text-[0.67rem] font-semibold tracking-[0.08em] uppercase mb-3 ${tc.light ? "text-[#86868b]" : "text-white/35"}`}>
                {tc.tag}
              </p>
              <p className={`text-[2.6rem] font-bold tracking-[-0.04em] leading-none mb-0.5 ${tc.light ? "text-[#0071e3]" : "text-[#2997ff]"}`}>
                {tc.price}
              </p>
              <p className={`text-[0.8rem] mb-5 ${tc.light ? "text-[#86868b]" : "text-white/35"}`}>{tc.per}</p>
              <div className={`h-px mb-4 ${tc.light ? "bg-black/[0.08]" : "bg-white/[0.07]"}`} />
              <ul className="list-none flex flex-col gap-2.5">
                {tc.items.map(item => (
                  <li key={item} className={`text-[0.82rem] flex gap-1.5 ${tc.light ? "text-[#6e6e73]" : "text-white/65"}`}>
                    <span className="text-[#30d158] font-bold shrink-0">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── RULES ── */}
      <section id="rules" className="py-20 px-[5%] text-center bg-[#f5f5f7]">
        <p className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#0071e3] mb-2.5">Правила</p>
        <h2 className="font-bold tracking-[-0.03em] leading-[1.08] mb-12" style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>
          Условия участия
        </h2>
        <div className="grid grid-cols-3 gap-3.5 max-w-[820px] mx-auto">
          {RULES.map(r => (
            <div key={r.title}
              className="bg-white border border-black/[0.08] rounded-[14px] p-6 text-left transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
              <p className="text-[1.4rem] mb-2.5">{r.icon}</p>
              <p className="text-[0.88rem] font-semibold mb-1.5">{r.title}</p>
              <p className="text-[0.78rem] text-[#86868b] leading-[1.55] font-light">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#f5f5f7] border-t border-black/[0.08] px-5 py-[18px] flex justify-between">
        <span className="text-[0.72rem] text-[#86868b]">Copyright © 2026 SMS Викторина. Таджикистан.</span>
        <span className="text-[0.72rem] text-[#86868b]">Tcell · MLT · Babilon Mobile · Anor</span>
      </footer>
    </div>
  );
}