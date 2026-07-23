/* =========================================================================
   main.js
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. Mobile navigation dropdown
   ------------------------------------------------------------------------- */
(function initNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.getElementById('primary-nav');
  if (!navToggle || !navLinks) return;

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  navToggle.addEventListener('click', () => {
    setMenu(!navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 600) setMenu(false);
  });
})();

/* -------------------------------------------------------------------------
   2. Translations
   ------------------------------------------------------------------------- */
let currentLang = 'en';
let selected = false;
let selectedKey = null;

const translations = {
  en: {
    nav_home: 'Home', nav_about: 'About', nav_services: 'Services', nav_visit: 'Visit Us', nav_apply: 'Apply Now',
    current_hours: 'Current Hours:', status_checking: 'Checking hours…',
    status_open: 'Open', status_closed: 'Closed', status_holiday: 'On Holiday',
    status_open_until: 'Open until {time}', status_closed_until: 'Closed until {time}',
    status_closed_tomorrow: 'Closed until tomorrow', status_closed_until_day: 'Closed until {day}',
    call_now: 'Call Now', or: '-or-', text_label: 'Text',
    our_providers: 'Our Providers:', info_back: '← Back to menu', info_hint: 'Click a provider to see more information',
    blurb_ryan: 'Board-certified in family medicine, Dr. Ryan Wang focuses on preventive care and chronic disease management for patients of every age.',
    blurb_ida: "Dr. Ida Wang provides comprehensive primary care with a special interest in women's health and geriatric medicine.",
    skip_link: 'Skip to main content',
    about_title: 'About Us', about_body: 'Wang Family Medicine is a family-owned primary care practice serving Arcadia and the San Gabriel Valley. Drs. Ryan and Ida Wang provide personalized, whole-family care. From routine checkups and vaccinations to managing ongoing conditions, all in a safe and multilingual setting.',
    np_eyebrow: 'New Patients', np_title: 'Getting started is easy',
    np_lead: "New Patient? Here's what to expect for your first visit.",
    np_1: 'Call or text us to book your first appointment.',
    np_2: 'Complete intake forms online at our patient portal, or in person 15 minutes before your appointment.',
    np_3: 'Bring a photo ID and your insurance card.',
    np_4: 'Bring a list of any medications you currently take.',
    home_h1: 'Wang Family Medicine — Primary Care in Arcadia, CA',
    privacy_link: 'Notice of Privacy Practices',
    insurance_title: 'Insurance',
    insurance_body: "We accept most major PPO and HMO plans. Not sure about yours? Give us a call and we'll be glad to check.",
    insurance_foot: "This list isn't exhaustive — call us and we'll confirm whether we take your specific plan.",
    services_title: 'Our Services', services_body: 'Comprehensive primary care for every stage of life.',
    svc_checkups_t: 'Checkups', svc_checkups_b: 'Annual visits and health screenings',
    svc_vaccinations_t: 'Vaccinations', svc_vaccinations_b: 'Routine and travel immunizations',
    svc_adult_t: 'Adult Care', svc_adult_b: 'Disease management and health planning',
    svc_geriatric_t: 'Geriatric Care', svc_geriatric_b: 'Wellness plans and personal care goals',
    svc_women_t: "Women's Health", svc_women_b: 'Preventative screenings and reproductive health services',
    svc_telehealth_t: 'Telehealth', svc_telehealth_b: 'Digital delivery of healthcare services and health education',
    office_hours: 'Office Hours',
    day_mon: 'Monday', day_tue: 'Tuesday', day_wed: 'Wednesday', day_thu: 'Thursday', day_fri: 'Friday', day_sat: 'Saturday', day_sun: 'Sunday',
    hours_full: '9 AM–1 PM, 2–6 PM', hours_half: '9 AM–1 PM', closed: 'Closed',
    visit_title: 'Visit Us', get_directions: '➤ Get Directions',
     
    // Apply page
    apply_eyebrow: 'Careers',
    apply_title: 'Join the team',
    apply_lead: "We're a growing, community-focused practice in Arcadia. If you'd like to be part of the team, reach out to our practice manager directly.",
    apply_step1: "Email your résumé and a short note about the role you're interested in.",
    apply_step2: 'Our practice manager will reach out to set up a time to talk.',
    apply_step3: 'Meet the team and see the clinic in person.',
    manager_label: 'Your point of contact', manager_role: 'Practice Manager',
    contact_email: 'Email', contact_call: 'Call', contact_text: 'Text', contact_office: 'Office',
    manager_cta: '✉ Email Ron',
    footer: '© {year} Wang Family Medicine. All rights reserved.',
    announcement: '📢 Now accepting <a href="#about">new patients</a>! &nbsp;•&nbsp; Flu shots available &nbsp;•&nbsp; walk-ins welcome. &nbsp;•&nbsp; Call <a href="tel:+16264478000">(626) 447-8000</a> or text <a href="sms:+16267757054">(626) 775-7054</a> to schedule.',
    holiday_prefix: ' &nbsp;•&nbsp; <span style="color: #D4A857;">🎄 Holiday closures: ',
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  },
  es: {
    nav_home: 'Inicio', nav_about: 'Nosotros', nav_services: 'Servicios', nav_visit: 'Visítenos', nav_apply: 'Solicitar ahora',
    current_hours: 'Horario actual:', status_checking: 'Verificando horario…',
    status_open: 'Abierto', status_closed: 'Cerrado', status_holiday: 'Cerrado por festivo',
    status_open_until: 'Abierto hasta las {time}', status_closed_until: 'Cerrado hasta las {time}',
    status_closed_tomorrow: 'Cerrado hasta mañana', status_closed_until_day: 'Cerrado hasta el {day}',
    call_now: 'Llamar', or: '-o-', text_label: 'Mensaje',
    our_providers: 'Nuestros médicos:', info_back: '← Volver al menú', info_hint: 'Haga clic en un médico para ver más información',
    blurb_ryan: 'Certificado en medicina familiar, el Dr. Ryan Wang se enfoca en la atención preventiva y el manejo de enfermedades crónicas para pacientes de todas las edades.',
    blurb_ida: 'La Dra. Ida Wang ofrece atención primaria integral, con un interés especial en la salud de la mujer y la medicina geriátrica.',
    skip_link: 'Saltar al contenido principal',
    about_title: 'Sobre nosotros', about_body: 'Wang Family Medicine es una consulta de atención primaria de gestión familiar que presta servicio en Arcadia y el Valle de San Gabriel. Los doctores Ryan e Ida Wang ofrecen una atención personalizada para toda la familia. Desde revisiones rutinarias y vacunas hasta el tratamiento de enfermedades crónicas, todo ello en un entorno seguro y multilingüe.',
    np_eyebrow: 'Nuevos pacientes', np_title: 'Comenzar es muy fácil',
    np_lead: '¿Es un paciente nuevo? Esto es lo que puede esperar en su primera visita.',
    np_1: 'Llámenos o envíenos un mensaje para reservar su primera cita.',
    np_2: 'Complete los formularios de admisión en línea en nuestro portal del paciente, o en persona 15 minutos antes de su cita.',
    np_3: 'Traiga una identificación con foto y su tarjeta del seguro.',
    np_4: 'Traiga una lista de los medicamentos que toma actualmente.',
    home_h1: 'Wang Family Medicine — Atención primaria en Arcadia, CA',
    privacy_link: 'Aviso de Prácticas de Privacidad',
    insurance_title: 'Seguros',
    insurance_body: 'Aceptamos la mayoría de los planes PPO y HMO principales. ¿No está seguro del suyo? Llámenos y con gusto lo verificamos.',
    insurance_foot: 'Esta lista no es exhaustiva: llámenos y confirmaremos si aceptamos su plan específico.',
    services_title: 'Nuestros Servicios', services_body: 'Atención primaria integral para cada etapa de la vida.',
    svc_checkups_t: 'Chequeos', svc_checkups_b: 'Visitas anuales y exámenes de salud',
    svc_vaccinations_t: 'Vacunas', svc_vaccinations_b: 'Inmunizaciones de rutina y de viaje',
    svc_adult_t: 'Atención para adultos', svc_adult_b: 'Manejo de enfermedades y planificación de la salud',
    svc_geriatric_t: 'Atención geriátrica', svc_geriatric_b: 'Planes de bienestar y objetivos de cuidado personal',
    svc_women_t: 'Salud de la mujer', svc_women_b: 'Exámenes preventivos y servicios de salud reproductiva',
    svc_telehealth_t: 'Telemedicina', svc_telehealth_b: 'Prestación digital de servicios de salud y educación sanitaria',
    office_hours: 'Horario de atención',
    day_mon: 'Lunes', day_tue: 'Martes', day_wed: 'Miércoles', day_thu: 'Jueves', day_fri: 'Viernes', day_sat: 'Sábado', day_sun: 'Domingo',
    hours_full: '9:00–13:00, 14:00–18:00', hours_half: '9:00–13:00', closed: 'Cerrado',
    visit_title: 'Visítenos', get_directions: '➤ Cómo llegar',
     
    // Apply page
    apply_eyebrow: 'Empleo',
    apply_title: 'Únase al equipo',
    apply_lead: 'Somos una consulta en crecimiento y centrada en la comunidad en Arcadia. Si desea formar parte del equipo, comuníquese directamente con nuestra gerente de la consulta.',
    apply_step1: 'Envíe su currículum y una breve nota sobre el puesto que le interesa.',
    apply_step2: 'Nuestra gerente de la consulta se pondrá en contacto para coordinar una cita.',
    apply_step3: 'Conozca al equipo y visite la clínica en persona.',
    manager_label: 'Su persona de contacto', manager_role: 'Gerente de la consulta',
    contact_email: 'Correo', contact_call: 'Llamar', contact_text: 'Mensaje', contact_office: 'Oficina',
    manager_cta: '✉ Escribir a Ron',
    footer: '© {year} Wang Family Medicine. Todos los derechos reservados.',
    announcement: '📢 ¡Aceptamos <a href="#about">nuevos pacientes</a>! &nbsp;•&nbsp; Vacunas contra la gripe disponibles &nbsp;•&nbsp; sin cita previa. &nbsp;•&nbsp; Llame al <a href="tel:+16264478000">(626) 447-8000</a> o envíe un mensaje de texto al <a href="sms:+16267757054">(626) 775-7054</a> para agendar.',
    holiday_prefix: ' &nbsp;•&nbsp; <span style="color: #D4A857;">🎄 Cierres por festivos: ',
    months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  },
  zh: {
    nav_home: '首页', nav_about: '关于我们', nav_services: '服务', nav_visit: '就诊信息', nav_apply: '立即申请',
    current_hours: '当前营业时间：', status_checking: '正在查询…',
    status_open: '营业中', status_closed: '已关闭', status_holiday: '假期休息',
    status_open_until: '营业至{time}', status_closed_until: '休息至{time}',
    status_closed_tomorrow: '休息至明天', status_closed_until_day: '休息至{day}',
    call_now: '致电', or: '或', text_label: '短信',
    our_providers: '我们的医生：', info_back: '← 返回菜单', info_hint: '点击医生查看更多信息',
    blurb_ryan: '王瑞恩医生是家庭医学认证医生，专注于各年龄段患者的预防保健和慢性病管理。',
    blurb_ida: '王伊达医生提供全面的初级保健服务，尤其专注于妇科健康和老年医学领域。',
    skip_link: '跳至主要内容',
    about_title: '关于我们', about_body: '王氏家庭医学诊所是一家家族经营的初级保健诊所，服务于阿卡迪亚和圣加布里埃尔谷地区。王瑞恩医生和王伊达医生为患者提供个性化的全家人医疗服务。从常规体检和疫苗接种到慢性病管理，所有服务均在安全且支持多语言的环境中进行。',
    np_eyebrow: '新患者', np_title: '轻松开始就诊',
    np_lead: '新患者？以下是首次就诊的须知。',
    np_1: '致电或发短信预约您的首次就诊。',
    np_2: '请通过我们的患者门户网站在线填写就诊表格，或于就诊前 15 分钟到诊所现场填写。',
    np_3: '请携带带照片的身份证件和保险卡。',
    np_4: '请携带您目前服用的所有药物清单。',
    home_h1: '王氏家庭医学诊所 — 加州阿卡迪亚的初级保健',
    privacy_link: '隐私实践声明',
    insurance_title: '保险',
    insurance_body: '我们接受大多数主要的 PPO 和 HMO 保险计划。不确定您的保险？请致电我们，我们很乐意为您查询。',
    insurance_foot: '此列表并不完整——请致电我们，我们将确认是否接受您的具体保险计划。',
    services_title: '我们的服务', services_body: '为人生各个阶段提供全面的初级保健服务。',
    svc_checkups_t: '健康检查', svc_checkups_b: '年度就诊和健康筛查',
    svc_vaccinations_t: '疫苗接种', svc_vaccinations_b: '常规和旅行免疫接种',
    svc_adult_t: '成人护理', svc_adult_b: '疾病管理和健康规划',
    svc_geriatric_t: '老年护理', svc_geriatric_b: '健康计划和个人护理目标',
    svc_women_t: '妇女健康', svc_women_b: '预防性筛查和生殖健康服务',
    svc_telehealth_t: '远程医疗', svc_telehealth_b: '数字化医疗服务和健康教育',
    office_hours: '营业时间',
    day_mon: '星期一', day_tue: '星期二', day_wed: '星期三', day_thu: '星期四', day_fri: '星期五', day_sat: '星期六', day_sun: '星期日',
    hours_full: '上午9点–下午1点，下午2点–6点', hours_half: '上午9点–下午1点', closed: '休息',
    visit_title: '就诊信息', get_directions: '➤ 获取路线',
     
    // Apply page
    apply_eyebrow: '招聘',
    apply_title: '加入团队',
    apply_lead: '我们是一家位于阿卡迪亚、以社区为导向且正在不断发展的诊所。如果您希望加入我们的团队，请直接联系我们的诊所经理。',
    apply_step1: '发送您的简历，并简要说明您感兴趣的职位。',
    apply_step2: '我们的诊所经理会与您联系，安排面谈时间。',
    apply_step3: '与团队见面，并实地参观诊所。',
    manager_label: '您的联系人', manager_role: '诊所经理',
    contact_email: '电子邮件', contact_call: '致电', contact_text: '短信', contact_office: '地址',
    manager_cta: '✉ 给 Ron 发邮件',
    footer: '© {year} Wang Family Medicine. 版权所有。',
    announcement: '📢 正在接收 <a href="#about">新患者</a>！&nbsp;•&nbsp; 提供流感疫苗 &nbsp;•&nbsp; 无需预约。&nbsp;•&nbsp; 请致电 <a href="tel:+16264478000">(626) 447-8000</a> 或发送短信至 <a href="sms:+16267757054">(626) 775-7054</a> 进行预约。',
    holiday_prefix: ' &nbsp;•&nbsp;  <span style="color: #D4A857;">🎄 假期休息：',
    months: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  }
};

function formatHoliday(key) {
  const t = translations[currentLang];
  const parts = key.split('-').map(Number);
  const m = parts[1], d = parts[2];
  if (currentLang === 'zh') return `${m}月${d}日`;
  if (currentLang === 'es') return `${d} ${t.months[m - 1]}`;
  return `${t.months[m - 1]} ${d}`;
}

function applyLanguage(lang) {
  currentLang = translations[lang] ? lang : 'en';
  try { localStorage.setItem('wfm-lang', currentLang); } catch (e) {}
  const t = translations[currentLang];
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = (t[key] != null) ? t[key] : translations.en[key];
    if (value != null) el.textContent = value;
  });
  const footerLine = document.getElementById('footer-line');
  if (footerLine) footerLine.textContent = t.footer.replace('{year}', new Date().getFullYear());
  if (typeof refreshStatus === 'function') refreshStatus();
  if (typeof buildAnnouncement === 'function') buildAnnouncement();
  if (typeof infoPanel !== 'undefined' && infoPanel) {
    if (selected && selectedKey && typeof showInfo === 'function') showInfo(selectedKey);
    else if (!selected && typeof showHint === 'function') showHint();
  }
  const sel = document.getElementById('lang-select');
  if (sel && sel.value !== currentLang) sel.value = currentLang;
}

(function initLangSelect() {
  const langSelect = document.getElementById('lang-select');
  if (langSelect) langSelect.addEventListener('change', () => applyLanguage(langSelect.value));
})();

/* -------------------------------------------------------------------------
   3. Office hours: live status badge and scrolling announcement bar
   ------------------------------------------------------------------------- */
// Ranges are minutes from midnight; keys match JS getDay() (0 = Sun … 6 = Sat).
const OFFICE_HOURS = {
  0: [],                          // Sunday    — Closed
  1: [[540, 780], [840, 1080]],   // Monday    — 9–1, 2–6
  2: [[540, 780], [840, 1080]],   // Tuesday   — 9–1, 2–6
  3: [[540, 780]],                // Wednesday — 9–1
  4: [[540, 780], [840, 1080]],   // Thursday  — 9–1, 2–6
  5: [[540, 780], [840, 1080]],   // Friday    — 9–1, 2–6
  6: []                           // Saturday  — Closed
};

// Holiday closures as 'YYYY-MM-DD'.
const HOLIDAYS = [
  '2026-09-07',   // Labor Day
  '2026-11-26',   // Thanksgiving
  '2026-12-25',   // Christmas
  '2027-01-01',   // New Year's Day
];

function clinicNow() {
  const laString = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  return new Date(laString);
}
function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
const DAY_KEYS = ['day_sun', 'day_mon', 'day_tue', 'day_wed', 'day_thu', 'day_fri', 'day_sat'];
function dayName(wd) {
  return translations[currentLang][DAY_KEYS[wd]];
}
function formatTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (currentLang === 'zh') {
    const period = h < 12 ? '上午' : '下午';
    let hh = h % 12; if (hh === 0) hh = 12;
    return period + hh + '点' + (m ? m + '分' : '');
  }
  if (currentLang === 'es') {
    return h + ':' + String(m).padStart(2, '0');
  }
  const period = h < 12 ? 'AM' : 'PM';
  let hh = h % 12; if (hh === 0) hh = 12;
  return m ? `${hh}:${String(m).padStart(2, '0')} ${period}` : `${hh} ${period}`;
}
function computeStatus() {
  const now  = clinicNow();
  const day  = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const todayHoliday = HOLIDAYS.includes(dateKey(now));
  const closedState = todayHoliday ? 'holiday' : 'closed';
  if (!todayHoliday) {
    for (const [start, end] of (OFFICE_HOURS[day] || [])) {
      if (mins >= start && mins < end) return { state: 'open', kind: 'open_until', value: end };
    }
    for (const [start] of (OFFICE_HOURS[day] || [])) {
      if (start > mins) return { state: closedState, kind: 'closed_until_time', value: start };
    }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    if (HOLIDAYS.includes(dateKey(d))) continue;
    if ((OFFICE_HOURS[d.getDay()] || []).length) {
      if (offset === 1) return { state: closedState, kind: 'closed_tomorrow' };
      return { state: closedState, kind: 'closed_until_day', value: d.getDay() };
    }
  }
  return { state: closedState, kind: 'closed_generic' };
}
function statusText(res) {
  const t = translations[currentLang];
  switch (res.kind) {
    case 'open_until':        return t.status_open_until.replace('{time}', formatTime(res.value));
    case 'closed_until_time': return t.status_closed_until.replace('{time}', formatTime(res.value));
    case 'closed_tomorrow':   return t.status_closed_tomorrow;
    case 'closed_until_day':  return t.status_closed_until_day.replace('{day}', dayName(res.value));
    default:                  return res.state === 'holiday' ? t.status_holiday : t.status_closed;
  }
}
function refreshStatus() {
  const now = clinicNow();
  const day = now.getDay();
  const res = computeStatus();
  const badge = document.getElementById('status-badge');
  if (badge) {
    badge.classList.toggle('open', res.state === 'open');
    badge.classList.toggle('closed', res.state === 'closed');
    badge.classList.toggle('holiday', res.state === 'holiday');
    badge.querySelector('.status-text').textContent = statusText(res);
  }
  
  document.querySelectorAll('.hours-list li').forEach((li) => {
    li.classList.toggle('today', Number(li.dataset.day) === day);
  });
}
function nextDayKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return dateKey(new Date(y, m - 1, d + 1));
}
function groupHolidays(keys) {
  const groups = [];
  keys.forEach((key) => {
    const last = groups[groups.length - 1];
    if (last && nextDayKey(last.end) === key) last.end = key;
    else groups.push({ start: key, end: key });
  });
  return groups;
}
function formatHolidayRange(startKey, endKey) {
  const t = translations[currentLang];
  const [, m1, d1] = startKey.split('-').map(Number);
  const [, m2, d2] = endKey.split('-').map(Number);
  const sameMonth = m1 === m2;
  if (currentLang === 'zh') {
    return sameMonth ? `${m1}月${d1}日–${d2}日` : `${m1}月${d1}日–${m2}月${d2}日`;
  }
  if (currentLang === 'es') {
    return sameMonth ? `${d1}–${d2} ${t.months[m1 - 1]}` : `${d1} ${t.months[m1 - 1]} – ${d2} ${t.months[m2 - 1]}`;
  }
  return sameMonth ? `${t.months[m1 - 1]} ${d1}–${d2}` : `${t.months[m1 - 1]} ${d1} – ${t.months[m2 - 1]} ${d2}`;
}
function formatHolidayEntry(group) {
  return group.start === group.end
    ? formatHoliday(group.start)
    : formatHolidayRange(group.start, group.end);
}
function buildAnnouncement() {
  const track = document.getElementById('announcement-track');
  if (!track) return;
  const t = translations[currentLang];
  const bar = track.parentElement;
  const todayKey = dateKey(clinicNow());
  const upcoming = HOLIDAYS.filter((h) => h >= todayKey).sort();
  let msg = t.announcement;
  if (upcoming.length) {
    msg += t.holiday_prefix + groupHolidays(upcoming).map(formatHolidayEntry).join(', ') + '</span>';
  }
  const unit = msg;
  track.style.animation = 'none';
  track.innerHTML = unit;
  let chunk = unit;
  while (track.scrollWidth < bar.offsetWidth && track.children.length < 50) {
    chunk += unit;
    track.innerHTML = chunk;
  }
  const chunkWidth = track.scrollWidth;
  track.innerHTML = chunk + chunk;
  track.style.animation = '';
  track.style.animationDuration = Math.max(chunkWidth / 60, 12) + 's';
}

/* -------------------------------------------------------------------------
   4. Provider carousel
   ------------------------------------------------------------------------- */

const carousel  = document.getElementById('carousel');
const infoPanel = document.getElementById('info-panel');

function showInfo(key) {
  if (!infoPanel) return;
  const t = translations[currentLang];
  infoPanel.innerHTML = `
    <div class="info-card">
      <h3 class="info-title">${PROVIDERS[key]}</h3>
      <p class="info-blurb">${t['blurb_' + key]}</p>
      <button class="info-back" type="button">${t.info_back}</button>
    </div>
  `;
  infoPanel.querySelector('.info-back').addEventListener('click', resume);
}
function showHint() {
  if (!infoPanel) return;
  const t = translations[currentLang];
  infoPanel.innerHTML = `
    <div class="unhighlightable info-hint">
      <span class="hint-cursor" aria-hidden="true">&#11013;</span>
      ${t.info_hint}
    </div>
  `;
}
function resume() {
  selected = false;
  selectedKey = null;
  showHint();
}

const PROVIDERS = {
  ryan: 'Dr. Ryan Wang DO',
  ida: 'Dr. Ida Wang MD'
};

(function initCarousel() {
  if (!carousel) return;

  const items     = Array.from(carousel.querySelectorAll('.carousel-btn'));
  const radius    = 160;
  const theta     = 360 / items.length;
  const autoSpeed = 0.1;
  const reduceMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let angle       = 0;   // current ring rotation
  let targetAngle = 0;   // where we ease to when a card is selected
  let dragging    = false;
  let lastX       = 0;
  let moved       = 0;
  let pressTarget = null;

  function render() {
    carousel.style.transform = `translateZ(-${radius}px)`;
    items.forEach((item, i) => {
      const itemAngle = i * theta + angle;
      item.style.transform =
        `rotateY(${itemAngle}deg) translateZ(${radius}px) rotateY(${-itemAngle}deg)`;
    });
  }
  function tick() {
    if (selected) {
      angle += (targetAngle - angle) * (reduceMotion ? 1 : 0.12);
    } else if (!dragging && !reduceMotion) {
      angle += autoSpeed;
    }
    render();
    requestAnimationFrame(tick);
  }
  tick();

  function selectButton(btn) {
    const key = btn.dataset.key;
    if (!PROVIDERS[key]) return;
    items.forEach((b) => b.classList.remove('inviting'));
    const i = items.indexOf(btn);
    let target = -i * theta;
    while (target - angle > 180)  target -= 360;
    while (target - angle < -180) target += 360;
    targetAngle = target;
    selected = true;
    selectedKey = key;
    showInfo(key);
  }

  function startDrag(x, target) {
    dragging = true;
    lastX = x;
    moved = 0;
    pressTarget = target ? target.closest('.carousel-btn') : null;
    carousel.classList.add('dragging');
  }
  function moveDrag(x) {
    if (!dragging) return;
    const dx = x - lastX;
    lastX = x;
    moved += Math.abs(dx);
    if (!selected) angle += dx * 0.5;
  }
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    carousel.classList.remove('dragging');
    if (moved < 6 && pressTarget) selectButton(pressTarget);
    pressTarget = null;
  }

  carousel.addEventListener('mousedown', (e) => { startDrag(e.clientX, e.target); e.preventDefault(); });
  window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
  window.addEventListener('mouseup', endDrag);
  carousel.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX, e.target), { passive: true });
  window.addEventListener('touchmove', (e) => { if (dragging) moveDrag(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend', endDrag);

  items.forEach((btn) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectButton(btn);
      }
    });
  });

  items.forEach((btn) => btn.classList.add('inviting'));
  showHint();
})();

/* -------------------------------------------------------------------------
   5. Boot
   ------------------------------------------------------------------------- */

setInterval(refreshStatus, 60 * 1000);

let savedLang = 'en';
try {
  const s = localStorage.getItem('wfm-lang');
  if (s && translations[s]) savedLang = s;
} catch (e) {}
applyLanguage(savedLang);

let announcementTimer;
window.addEventListener('resize', () => {
  clearTimeout(announcementTimer);
  announcementTimer = setTimeout(buildAnnouncement, 200);
});
