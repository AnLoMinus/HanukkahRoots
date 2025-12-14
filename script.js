/* HanukkahRoots (HR)
   Built: כ״ג בכסלו תשפ״ו | 14 Dec 2025 | 19:12 (Asia/Jerusalem)
   Credits: AnLoMinus
*/

const DATA = [
  {
    id: "bereshit-light",
    book: "בראשית",
    icon: "📘",
    title: "🌟 ויהי אור — אור לפני המאורות",
    tags: ["אור", "בריאה", "ניצוץ", "זהות"],
    body:
`האור נברא לפני המאורות — זה “אור פנימי” שאינו תלוי במציאות החיצונית.
חנוכה מדגיש בדיוק את זה: נר קטן שמחזיק אמת גדולה גם כשאין ‘שמש’ או ‘ירח’.
זה יסוד של אמונה: האור מתחיל מבפנים, ואז מקרין החוצה.`
  },
  {
    id: "shemot-fire",
    book: "שמות",
    icon: "📕",
    title: "🔥 הסנה הבוער — אש שאינה אוכלת",
    tags: ["אש", "מסירות", "גאולה", "ניצחון"],
    body:
`הסנה בוער באש ואיננו אוכל — תמונה של אש קדושה שממשיכה בלי להיכבות.
זה קו חנוכה: אור שמחזיק מול חושך, זהות שמחזיקה מול תרבות זרה.
האש כאן אינה הרס — היא התגלות ושליחות.`
  },
  {
    id: "shemot-mishkan",
    book: "שמות",
    icon: "📕",
    title: "⛪ המשכן — השראת שכינה בתוך העולם",
    tags: ["מנורה", "שמן", "קדושה", "בניין"],
    body:
`בניית המשכן היא שיא של “אור בתוך חומר”.
כל פרט מדויק — כדי שהקדושה תופיע בעולם.
חנוכה הוא חידוש של אותו רעיון: לא להתפשר על טוהר האור — להדליק, לסדר, להקדיש.`
  },
  {
    id: "vayikra-ner",
    book: "ויקרא",
    icon: "📗",
    title: "🕎 להעלות נר תמיד — שמן זית זך",
    tags: ["שמן", "מנורה", "טהרה", "אור"],
    body:
`ציווי שמן זית זך והדלקת נר תמיד בונה תודעה:
אור לא ‘קורה’ לבד — הוא עבודה.
חנוכה מלמד: גם אם יש מעט, כשזה זך — זה מאיר יותר מהרבה שאינו טהור.`
  },
  {
    id: "bamidbar-chanukat",
    book: "במדבר",
    icon: "📙",
    title: "🎉 חנוכת המזבח — ימים של חידוש",
    tags: ["חנוכה", "חידוש", "מזבח", "ימים"],
    body:
`חנוכת המזבח בפרשת נשא: תהליך של ימים, סדר, ושייכות.
כל נשיא מביא “נר” משלו — אבל כולם בונים אור אחד.
חנוכה ממשיך את הציר: חידוש הקודש לאחר פגיעה רוחנית.`
  },
  {
    id: "devarim-identity",
    book: "דברים",
    icon: "📒",
    title: "⚔️ זהות ומסירות — מלחמה על הנשמה",
    tags: ["מסירות", "זהות", "ניצחון", "תורה"],
    body:
`בדברים מודגש: הכוח של ישראל הוא חיבור לערכים — לא רק כוח פיזי.
חנוכה הוא מאבק של אמת מול בלבול, של תורה מול טשטוש.
הניצחון נולד ממסירות פנימית: ‘אני מדליק גם כשאין תנאים’.`
  }
];

const el = (id) => document.getElementById(id);

const cardsGrid = el("cardsGrid");
const emptyState = el("emptyState");
const searchInput = el("searchInput");
const clearSearch = el("clearSearch");
const statCount = el("statCount");

const modal = el("modal");
const modalTitle = el("modalTitle");
const modalTags = el("modalTags");
const modalBody = el("modalBody");
const closeModal = el("closeModal");
const copyCard = el("copyCard");
const shareCard = el("shareCard");

let activeFilter = "all";
let activeCard = null;

function render(items){
  cardsGrid.innerHTML = "";
  emptyState.hidden = items.length !== 0;

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "cardItem";
    card.tabIndex = 0;
    card.setAttribute("role","button");
    card.setAttribute("aria-label", `פתח כרטיסייה: ${item.title}`);

    card.innerHTML = `
      <div class="cardItem__top">
        <div class="cardItem__title">${item.icon} ${item.title}</div>
        <span class="badge">${item.book}</span>
      </div>
      <div class="cardItem__text">${preview(item.body)}</div>
      <div class="tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    `;

    card.addEventListener("click", () => openCard(item));
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        openCard(item);
      }
    });

    cardsGrid.appendChild(card);
  });

  statCount.textContent = String(items.length);
}

function preview(text){
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 160 ? clean.slice(0, 160) + "…" : clean;
}

function matches(item, q){
  if(!q) return true;
  const hay = `${item.book} ${item.title} ${item.tags.join(" ")} ${item.body}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}

function matchesFilter(item){
  if(activeFilter === "all") return true;
  return item.tags.includes(activeFilter) || item.title.includes(activeFilter) || item.body.includes(activeFilter);
}

function apply(){
  const q = searchInput.value.trim();
  const items = DATA.filter(x => matchesFilter(x) && matches(x, q));
  render(items);
}

function openCard(item){
  activeCard = item;
  modalTitle.textContent = `${item.icon} ${item.title}`;
  modalTags.textContent = `📚 ${item.book} • 🏷️ ${item.tags.join(" • ")}`;
  modalBody.textContent = item.body;
  if(typeof modal.showModal === "function") modal.showModal();
}

function close(){
  if(modal.open) modal.close();
}

function copyToClipboard(text){
  navigator.clipboard?.writeText(text).then(()=>toast("✅ הועתק!")).catch(()=>fallbackCopy(text));
}

function fallbackCopy(text){
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
  toast("✅ הועתק!");
}

function toast(msg){
  const t = document.createElement("div");
  t.style.position = "fixed";
  t.style.bottom = "18px";
  t.style.left = "18px";
  t.style.padding = "12px 14px";
  t.style.borderRadius = "14px";
  t.style.border = "1px solid rgba(255,255,255,.18)";
  t.style.background = "rgba(0,0,0,.55)";
  t.style.backdropFilter = "blur(10px)";
  t.style.color = "white";
  t.style.fontWeight = "800";
  t.style.zIndex = "99999";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.opacity="0"; t.style.transition="opacity .2s"; }, 900);
  setTimeout(()=> t.remove(), 1200);
}

// Theme toggle
const toggleTheme = el("toggleTheme");
function setTheme(mode){
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("hr-theme", mode);
}
toggleTheme?.addEventListener("click", ()=>{
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(cur === "dark" ? "light" : "dark");
});
setTheme(localStorage.getItem("hr-theme") || "dark");

// Search / clear
searchInput?.addEventListener("input", apply);
clearSearch?.addEventListener("click", ()=>{
  searchInput.value = "";
  activeFilter = "all";
  document.querySelectorAll(".chip").forEach(c=>c.classList.remove("is-active"));
  document.querySelector('.chip[data-filter="all"]')?.classList.add("is-active");
  apply();
});

// Chips
document.querySelectorAll(".chip").forEach(chip=>{
  chip.addEventListener("click", ()=>{
    document.querySelectorAll(".chip").forEach(c=>c.classList.remove("is-active"));
    chip.classList.add("is-active");
    activeFilter = chip.dataset.filter || "all";
    apply();
  });
});
document.querySelector('.chip[data-filter="all"]')?.classList.add("is-active");

// Modal buttons
closeModal?.addEventListener("click", close);
modal?.addEventListener("click", (e)=>{
  const rect = modal.querySelector(".modal__inner")?.getBoundingClientRect();
  if(!rect) return;
  const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if(!inside) close();
});

copyCard?.addEventListener("click", ()=>{
  if(!activeCard) return;
  const text = `${activeCard.icon} ${activeCard.title}\n📚 ${activeCard.book}\n🏷️ ${activeCard.tags.join(", ")}\n\n${activeCard.body}\n\n— AnLoMinus • HanukkahRoots (HR)`;
  copyToClipboard(text);
});

shareCard?.addEventListener("click", ()=>{
  if(!activeCard) return;
  const text =
`🕯️ ${activeCard.title}
📚 ${activeCard.book}
${activeCard.body}

🔗 https://anlominus.github.io/HanukkahRoots/
— AnLoMinus • HanukkahRoots (HR)`;
  copyToClipboard(text);
});

// Share buttons
const copyLink = el("copyLink");
const copyLink2 = el("copyLink2");
[copyLink, copyLink2].forEach(btn=>{
  btn?.addEventListener("click", ()=> copyToClipboard("https://anlominus.github.io/HanukkahRoots/"));
});

const copySummary = el("copySummary");
copySummary?.addEventListener("click", ()=>{
  const text =
`HanukkahRoots (HR) — לקט חנוכה מן החומש
🌟 אור • 🔥 אש • 🫒 שמן • 🕎 מנורה • 🎉 חנוכה • ⚔️ מסירות

🔗 https://anlominus.github.io/HanukkahRoots/
— AnLoMinus`;
  copyToClipboard(text);
});

// Footer dates (fixed + live clock)
el("year").textContent = String(new Date().getFullYear());

// תאריך לועזי “יפה”
const fmtDate = new Intl.DateTimeFormat("he-IL", { dateStyle:"full", timeZone:"Asia/Jerusalem" });
const fmtTime = new Intl.DateTimeFormat("he-IL", { timeStyle:"medium", timeZone:"Asia/Jerusalem" });
el("dateG").textContent = fmtDate.format(new Date());
function tick(){
  el("timeNow").textContent = fmtTime.format(new Date());
}
tick();
setInterval(tick, 1000);

// תאריך עברי (Intl)
try{
  const heb = new Intl.DateTimeFormat("he-IL-u-ca-hebrew", { dateStyle:"full", timeZone:"Asia/Jerusalem" });
  el("dateH").textContent = heb.format(new Date());
}catch{
  el("dateH").textContent = "כ״ג בכסלו תשפ״ו";
}

// init
render(DATA);