/* Nexora CRM — customer and sales workspace. Browser-based demo data. */
'use strict';
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const icons = { dashboard: 'grid', customers: 'users', leads: 'user-plus', deals: 'chart', tasks: 'checks', calendar: 'calendar', invoices: 'file', quotes: 'file', tickets: 'message', reports: 'pie', team: 'users', activity: 'clock', settings: 'settings' };
const labels = { dashboard: 'Dashboard', customers: 'Customers', leads: 'Leads', deals: 'Sales Pipeline', tasks: 'Tasks', calendar: 'Calendar', invoices: 'Invoices', quotes: 'Quotations', tickets: 'Support Tickets', reports: 'Reports', team: 'Team', activity: 'Activity Log', settings: 'Settings' };
const groups = [['dashboard', 'customers', 'leads', 'deals', 'tasks', 'calendar'], ['invoices', 'quotes', 'tickets', 'reports', 'team', 'activity'], ['settings']];
const icon = (name, css = '') => `<svg class="icon ${css}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => '$' + Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 0 });
const day = (offset = 0) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + offset); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'); };
const stamp = (offset = 0) => new Date(Date.now() + offset * 86400000).toISOString();
const fmtDay = x => x ? new Date(String(x).slice(0, 10) + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const shortDay = x => x ? new Date(String(x).slice(0, 10) + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';
const fresh = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
const nameInitial = s => String(s || '?').split(/\s+/).slice(0, 2).map(x => x[0]?.toUpperCase() || '').join('');
const avatar = (name, size = 'sm') => { const n = [...String(name)].reduce((a, c) => a + c.charCodeAt(0), 0) % 5; return `<span class="avatar ${size}" style="background:${['#ece7ff', '#e5f2ff', '#fcecec', '#e5f7ed', '#fff0e4'][n]};color:${['#7556e9', '#347fcb', '#ca6572', '#219270', '#bc833b'][n]}">${esc(nameInitial(name))}</span>`; };
const badge = (status) => {
    const key = String(status || '').toLowerCase();
    const color = /^(inactive|high|overdue|lost|cancelled|rejected)$/.test(key) ? 'red'
        : /^(active|won|paid|resolved|accepted|completed|done|approved)$/.test(key) ? 'green'
        : /^(new|new lead|lead|open|sent|in progress)$/.test(key) ? 'blue'
        : /^(negotiation|pending|proposal|draft|medium|in review)$/.test(key) ? 'orange'
        : 'purple';
    return `<span class="badge ${color}">${esc(status)}</span>`;
};
const btn = (label, action, extra = '') => `<button class="btn ${extra}" data-action="${esc(action)}">${label}</button>`;
const toTitle = s => String(s || '').replace(/\b\w/g, x => x.toUpperCase());
function makeSeed() {
    const customers = [
        ['Olivia Rhye', 'olivia@luminex.ae', 'Luminex', 'Active', 'Website', 'Alex Carter', '+971 50 123 4088', -1],
        ['Phoenix Baker', 'phoenix@risehub.co', 'RiseHub', 'Lead', 'Referral', 'Sarah Lee', '+971 52 220 1554', -2],
        ['Lana Steiner', 'lana@orbitex.co', 'Orbitex', 'Active', 'LinkedIn', 'Omar Khaled', '+971 55 311 0991', -3],
        ['Demi Wilkinson', 'demi@purehealth.ae', 'Pure Health', 'Inactive', 'Instagram', 'Alex Carter', '+971 55 187 2080', -9],
        ['Candice Wu', 'candice@skyline.com', 'Skyline', 'Active', 'Google Ads', 'Sarah Lee', '+971 50 611 4322', -4],
        ['Noah Williams', 'noah@nexontechnologies.com', 'Nexon Technologies', 'Active', 'Referral', 'Omar Khaled', '+971 50 804 2568', -1],
        ['Sara Johnson', 'sara@marble.ae', 'Marble Studio', 'Lead', 'Website', 'Alex Carter', '+971 52 683 1988', -4],
        ['Daniel Reed', 'daniel@northpoint.io', 'Northpoint', 'Active', 'LinkedIn', 'Sarah Lee', '+971 55 600 1144', -12],
        ['Emily Parker', 'emily@bluepeak.ae', 'Bluepeak', 'Lead', 'Instagram', 'Omar Khaled', '+971 50 202 4463', -7],
        ['Ahmed Salah', 'ahmed@vertex.ae', 'Vertex Digital', 'Active', 'Google Ads', 'Alex Carter', '+971 56 300 1002', -2],
        ['Mia Roberts', 'mia@studioeight.com', 'Studio Eight', 'Active', 'Website', 'Sarah Lee', '+971 58 567 3890', -6],
        ['James Walker', 'james@horizon.ae', 'Horizon Group', 'Inactive', 'Referral', 'Omar Khaled', '+971 54 200 1666', -40]
    ];
    const cs = customers.map(([name, email, company, status, source, owner, phone, age], i) => ({ id: 'c' + (i + 1), name, email, company, status, source, owner, phone, lastContact: day(age), createdAt: stamp(age - 15), notes: i === 0 ? ['Interested in new enterprise package; requested a proposal.'] : [] }));
    const ds = [['Website Redesign', 'Luminex', 18500, 'Proposal', 'Alex Carter', 'c1'], ['CRM Implementation', 'RiseHub', 25000, 'Qualified', 'Sarah Lee', 'c2'], ['Annual Marketing Retainer', 'Orbitex', 32000, 'Negotiation', 'Omar Khaled', 'c3'], ['Brand Refresh', 'Skyline', 9500, 'New Lead', 'Sarah Lee', 'c5'], ['Analytics Suite', 'Nexon Technologies', 21000, 'Won', 'Omar Khaled', 'c6'], ['Mobile App Discovery', 'Vertex Digital', 15000, 'Proposal', 'Alex Carter', 'c10'], ['Support Contract', 'Northpoint', 5600, 'Lost', 'Sarah Lee', 'c8'], ['SEO Growth Plan', 'Studio Eight', 8000, 'Qualified', 'Sarah Lee', 'c11']].map(([title, company, value, stage, owner, customerId], i) => ({ id: 'd' + (i + 1), title, company, value, stage, owner, customerId, createdAt: stamp(-i * 3), due: day(i + 2) }));
    const ts = [['Follow up with Luminex', 'Alex Carter', 'c1', 'High', day(0), 'Open'], ['Send quotation to Orbitex', 'Sarah Lee', 'c3', 'Medium', day(0), 'Open'], ['Prepare meeting with RiseHub', 'Omar Khaled', 'c2', 'Medium', day(1), 'Open'], ['Review contract details', 'Sarah Lee', 'c5', 'Low', day(-1), 'Open'], ['Update account notes', 'Alex Carter', 'c10', 'Low', day(2), 'Done'], ['Plan Q4 outreach', 'Omar Khaled', 'c11', 'Medium', day(3), 'Open']].map(([title, owner, customerId, priority, due, status], i) => ({ id: 't' + (i + 1), title, owner, customerId, priority, due, status }));
    const invoices = [['INV-2026-1042', 'Luminex', 5200, 'Paid', day(-5), 'c1'], ['INV-2026-1043', 'Orbitex', 8900, 'Pending', day(4), 'c3'], ['INV-2026-1044', 'Nexon Technologies', 12500, 'Paid', day(-8), 'c6'], ['INV-2026-1045', 'Skyline', 2950, 'Overdue', day(-2), 'c5']].map(([number, company, amount, status, due, customerId], i) => ({ id: 'i' + (i + 1), number, company, amount, status, due, customerId }));
    const quotes = [['QUO-1001', 'Luminex', 18500, 'Sent', day(6), 'c1'], ['QUO-1002', 'RiseHub', 25000, 'Draft', day(8), 'c2'], ['QUO-1003', 'Vertex Digital', 15000, 'Accepted', day(4), 'c10']].map(([number, company, amount, status, validUntil, customerId], i) => ({ id: 'q' + (i + 1), number, company, amount, status, validUntil, customerId }));
    const tickets = [['Login issue with dashboard', 'Luminex', 'High', 'Open', 'Alex Carter', 'c1'], ['Billing clarification', 'Orbitex', 'Medium', 'In Progress', 'Sarah Lee', 'c3'], ['Data export help', 'Nexon Technologies', 'Low', 'Resolved', 'Omar Khaled', 'c6']].map(([subject, company, priority, status, owner, customerId], i) => ({ id: 'k' + (i + 1), subject, company, priority, status, owner, customerId, createdAt: stamp(-i) }));
    const events = [['Client Meeting', 'Nexon Technologies', '10:00', 'c6', day(0)], ['Team Sync', 'Marketing Team', '12:30', '', day(0)], ['Follow Up Call', 'Sara Johnson', '15:00', 'c7', day(0)], ['Discovery Session', 'RiseHub', '11:00', 'c2', day(1)], ['Proposal Review', 'Luminex', '14:00', 'c1', day(3)]].map(([title, description, time, customerId, date], i) => ({ id: 'e' + (i + 1), title, description, time, customerId, date }));
    return { customers: cs, deals: ds, tasks: ts, invoices, quotes, tickets, events, activities: [{ id: 'a1', message: 'Alex Carter added a new customer', detail: 'Luminex', at: stamp(-.01) }, { id: 'a2', message: 'Sarah Lee updated a deal', detail: 'Orbitex · Website Redesign', at: stamp(-.06) }, { id: 'a3', message: 'Omar Khaled created an invoice', detail: '#INV-2026-1042', at: stamp(-.14) }, { id: 'a4', message: 'New lead captured from Google Ads', detail: 'Sara Johnson', at: stamp(-.22) }], settings: { workspace: 'Nexora CRM', notifications: true, compact: false }, version: 3 };
}
const KEY = 'nexora_crm_v3_2026';
const validStore = data => data && data.version === 3 &&
    ['customers', 'deals', 'tasks', 'invoices', 'quotes', 'tickets', 'events', 'activities'].every(key => Array.isArray(data[key])) &&
    data.settings && typeof data.settings === 'object';
let db;
try {
    db = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!validStore(db))
        db = makeSeed();
}
catch (error) {
    db = makeSeed();
}
let storageWarningShown = false;
const save = () => { try {
    localStorage.setItem(KEY, JSON.stringify(db));
}
catch (e) {
    if (!storageWarningShown) {
        storageWarningShown = true;
        console.warn('Demo changes will not persist: browser storage is unavailable in this context.');
    }
} };
const track = (message, detail = '') => { db.activities.unshift({ id: fresh(), message, detail, at: stamp() }); db.activities = db.activities.slice(0, 75); save(); };
let ui = { page: 'dashboard', dashboardTab: 'customers', query: '', status: 'All Status', source: 'All Sources', owner: 'All Owners', selected: new Set(), calendarMonth: new Date().getMonth(), calendarYear: new Date().getFullYear(), selectedDay: day(), profileTab: 'overview', sort: 'newest' };
const findCustomer = id => db.customers.find(c => c.id === id);
const customersFiltered = (onlyLeads = false) => { let items = db.customers.filter(c => !onlyLeads || c.status === 'Lead'); const q = ui.query.trim().toLowerCase(); if (q)
    items = items.filter(c => [c.name, c.email, c.company, c.owner, c.phone, c.source].some(v => String(v).toLowerCase().includes(q))); if (ui.status !== 'All Status')
    items = items.filter(c => c.status === ui.status); if (ui.source !== 'All Sources')
    items = items.filter(c => c.source === ui.source); if (ui.owner !== 'All Owners')
    items = items.filter(c => c.owner === ui.owner); if (ui.sort === 'name')
    items.sort((a, b) => a.name.localeCompare(b.name)); if (ui.sort === 'recent')
    items.sort((a, b) => String(b.lastContact).localeCompare(String(a.lastContact))); return items; };
// Generate numbers from existing records rather than array length (deletions are allowed).
const nextNumber = (prefix, records) => {
    const year = new Date().getFullYear();
    const pattern = prefix === 'INV' ? /^INV-(?:\d{4}-)?(\d+)$/i : /^QUO-(\d+)$/i;
    const numbers = records.map(record => Number(String(record.number || '').match(pattern)?.[1] || 0));
    const used = new Set(records.map(record => String(record.number || '').toLowerCase()));
    let next = Math.max(1000, ...numbers) + 1;
    let candidate;
    do {
        candidate = prefix === 'INV' ? `INV-${year}-${next}` : `${prefix}-${next}`;
        next++;
    } while (used.has(candidate.toLowerCase()));
    return candidate;
};
const getStatusOptions = (items, selected) => items.map(x => `<option value="${esc(x)}" ${x === selected ? 'selected' : ''}>${esc(x)}</option>`).join('');
const options = (items, selected) => getStatusOptions(items, selected);
function navRender() { $('#mainNav').innerHTML = groups.map((arr, g) => `${g ? '<div class="nav-divider"></div>' : ''}${arr.map(p => `<button class="nav-item ${ui.page === p ? 'active' : ''}" data-page="${p}" title="${labels[p]}">${icon(icons[p])}${labels[p]}${p === 'tasks' ? `<span class="count">${db.tasks.filter(t => t.status !== 'Done').length}</span>` : ''}</button>`).join('')}`).join(''); }
const currencyStats = () => ({ total: db.customers.length, leads: db.customers.filter(x => x.status === 'Lead').length, openDeals: db.deals.filter(x => !['Won', 'Lost'].includes(x.stage)).length, revenue: db.invoices.filter(x => x.status === 'Paid').reduce((s, i) => s + Number(i.amount), 0) });
const statsCards = () => {
    const stats = currencyStats();
    const active = db.customers.filter(c => c.status === 'Active').length;
    const openValue = db.deals.filter(d => !['Won', 'Lost'].includes(d.stage)).reduce((sum, d) => sum + Number(d.value || 0), 0);
    const unpaid = db.invoices.filter(i => ['Pending', 'Overdue'].includes(i.status)).reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const items = [
        { title: 'Total customers', value: stats.total, detail: `${active} active accounts`, icon: 'users', tone: 'purple' },
        { title: 'Unqualified leads', value: stats.leads, detail: 'Waiting to be converted', icon: 'target', tone: 'orange' },
        { title: 'Open opportunities', value: stats.openDeals, detail: `${money(openValue)} in pipeline`, icon: 'chart', tone: 'blue' },
        { title: 'Payments received', value: money(stats.revenue), detail: `${money(unpaid)} outstanding`, icon: 'dollar', tone: 'green' }
    ];
    return `<div class="kpi-grid">${items.map(item => `<div class="kpi-card"><div class="kpi-overline">${item.title}</div><div class="kpi-value-line"><div class="value">${item.value}</div><span class="kpi-icon ${item.tone}">${icon(item.icon)}</span></div><div class="kpi-footer">${item.detail}</div></div>`).join('')}</div>`;
};
// Present only values that exist in the workspace. No decorative trend curve.
function revenueSVG() {
    const statuses = [['Paid', '#5b55bb'], ['Pending', '#bca6ff'], ['Overdue', '#e4a955'], ['Draft', '#ccd2dc']];
    const values = statuses.map(([status]) => db.invoices.filter(i => i.status === status).reduce((sum, i) => sum + Number(i.amount || 0), 0));
    const max = Math.max(1, ...values), top = Math.max(5000, Math.ceil(max / 5000) * 5000);
    const x0 = 57, y0 = 190, chartHeight = 144, step = 115, width = 56;
    let bars = statuses.map(([status, color], i) => {
        const h = values[i] / top * chartHeight, x = x0 + 37 + i * step, y = y0 - h;
        const label = values[i] >= 1000 ? `${(values[i] / 1000).toFixed(values[i] % 1000 ? 1 : 0)}k` : `${Math.round(values[i])}`;
        return `<rect x="${x}" y="${y.toFixed(1)}" width="${width}" height="${Math.max(h, 1).toFixed(1)}" rx="5" fill="${color}"/><text x="${x + width / 2}" y="${Math.max(28, y - 9).toFixed(1)}" text-anchor="middle" class="chart-amount">${values[i] ? `$${label}` : '—'}</text><text x="${x + width / 2}" y="215" text-anchor="middle">${status}</text>`;
    }).join('');
    return `<svg class="revenue-chart revenue-bars" viewBox="0 0 550 230" role="img" aria-label="Invoice amounts by status, based on saved invoices">${[0, .5, 1].map(f => { const y = y0 - chartHeight * f; return `<line class="gridline" x1="53" y1="${y}" x2="536" y2="${y}"/><text x="0" y="${y + 4}" class="axis-text">${f ? `$${Math.round(top * f / 1000)}k` : '$0'}</text>`; }).join('')}${bars}</svg>`;
}
const dealStages = ['New Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];
const stageColors = ['#5247af', '#9181d6', '#7fafe0', '#e5ac60', '#4d9e88', '#bd7470'];
function donutPanel() { let alive = dealStages.slice(0, 5), counts = alive.map(s => db.deals.filter(d => d.stage === s).length), total = counts.reduce((a, b) => a + b, 0), offset = 0; const parts = counts.map((n, i) => { let start = offset; offset += total ? n / total * 100 : 0; return `${stageColors[i]} ${start}% ${offset}%`; }).join(','); return `<section class="panel panel-pad"><div class="panel-head"><h3>Deals by Stage</h3><button class="btn btn-small" data-page="deals">View pipeline ${icon('arrow', 'mini')}</button></div><div class="stage-chart"><div class="donut" style="background:conic-gradient(${total ? parts : '#eee 0% 100%'})"><div class="donut-center"><b>${db.deals.filter(d => !['Lost', 'Won'].includes(d.stage)).length}</b><span>Open Deals</span></div></div><div class="stage-legend">${alive.map((s, i) => `<div class="legend-row"><span><i class="legend-dot" style="background:${stageColors[i]}"></i>${s}</span><b>${counts[i]}</b></div>`).join('')}</div></div></section>`; }
function salesPanel() {
    const count = db.invoices.length;
    return `<section class="panel panel-pad"><div class="panel-head"><div><div class="eyebrow">FINANCE</div><h3>Invoice overview</h3></div><button class="btn btn-small" data-page="invoices">View invoices ${icon('arrow', 'mini')}</button></div><p class="chart-context">Amounts grouped by payment status · ${count} invoices</p>${revenueSVG()}</section>`;
}
function calendarMarkup(large = false) { const year = ui.calendarYear, month = ui.calendarMonth, first = new Date(year, month, 1), start = first.getDay(), days = new Date(year, month + 1, 0).getDate(), prev = new Date(year, month, 0).getDate(), today = day(); let cells = []; for (let i = 0; i < 42; i++) {
    let num = i - start + 1, d, other = false;
    if (num <= 0) {
        d = new Date(year, month - 1, prev + num);
        other = true;
    }
    else if (num > days) {
        d = new Date(year, month + 1, num - days);
        other = true;
    }
    else
        d = new Date(year, month, num);
    let date = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
    let events = db.events.filter(x => x.date === date);
    if (large)
        cells.push(`<div class="cal-tile ${other ? 'muted-tile' : ''} ${date === today ? 'today' : ''}"><b>${d.getDate()}</b>${events.map(e => `<button class="cal-ev" data-action="edit-event" data-id="${e.id}" title="${esc(e.title)}">${esc(e.time)} ${esc(e.title)}</button>`).join('')}</div>`);
    else
        cells.push(`<button class="cal-day ${other ? 'other' : ''} ${ui.selectedDay === date ? 'selected' : ''} ${events.length ? 'has-event' : ''}" data-action="select-day" data-date="${date}" aria-label="${date}, ${events.length} events">${d.getDate()}</button>`);
} return `<div class="row-between"><h3 class="calendar-title">${new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3><div class="icon-row"><button class="icon-button" data-action="cal-prev" aria-label="Previous month">${icon('chevron-left')}</button><button class="icon-button" data-action="cal-next" aria-label="Next month">${icon('chevron-right')}</button><button class="icon-button" data-action="add-event" aria-label="Add event">${icon('plus')}</button></div></div><div class="cal-weekdays">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(n => `<span>${n}</span>`).join('')}</div><div class="${large ? 'calendar-large' : 'cal-days'}">${cells.join('')}</div>`; }
function scheduleMarkup() { const events = db.events.filter(e => e.date === ui.selectedDay).sort((a, b) => a.time.localeCompare(b.time)); return `<div class="row-between" style="margin-bottom:10px"><h3 class="calendar-title">${ui.selectedDay === day() ? "Today's" : fmtDay(ui.selectedDay)} Schedule</h3><button class="card-link" data-page="calendar">View All</button></div><div class="schedule-list">${events.length ? events.map((e, i) => `<div class="schedule-item"><span class="schedule-dot" style="background:${['#fcaa4c', '#42c3a4', '#f66d8d', '#7b5cf4'][i % 4]}"></span><span class="subtle">${esc(e.time)}</span><div><strong>${esc(e.title)}</strong><small>${esc(e.description)}</small></div><button class="icon-button" style="width:20px;height:20px" data-action="edit-event" data-id="${e.id}" aria-label="Edit event">${icon('more')}</button></div>`).join('') : '<p class="muted tiny">No events on this date. Select + to schedule one.</p>'}</div>`; }
function taskSide() { const items = db.tasks.filter(t => t.status !== 'Done').sort((a, b) => a.due.localeCompare(b.due)).slice(0, 3); return `<section class="panel side-panel"><div class="panel-head" style="margin-bottom:3px"><h3>Urgent Tasks</h3><button class="card-link" data-page="tasks">View All</button></div>${items.length ? items.map(t => `<label class="task-line"><input type="checkbox" data-action="toggle-task" data-id="${t.id}"><span class="grow"><strong>${esc(t.title)}</strong><small>${badge(t.priority)} ${t.due === day() ? 'Today' : shortDay(t.due)} · ${esc(t.owner)}</small></span>${avatar(t.owner, 'sm')}</label>`).join('') : '<p class="muted tiny">All caught up! No pending tasks.</p>'}</section>`; }
function relative(iso) { let min = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 60000)); return min < 60 ? `${min}m ago` : min < 1440 ? `${Math.floor(min / 60)}h ago` : `${Math.floor(min / 1440)}d ago`; }
function activitySide() { return `<section class="panel side-panel"><div class="panel-head" style="margin-bottom:4px"><h3>Recent Activity</h3><button class="card-link" data-page="activity">View All</button></div>${db.activities.slice(0, 4).map((a, i) => `<div class="activity-item"><span class="activity-icon" style="background:${['#eee7ff', '#e6f9ef', '#e6f2ff', '#fff1e0'][i % 4]};color:${['#7651ec', '#26a477', '#459dea', '#e69a35'][i % 4]}">${icon(['users', 'refresh', 'file', 'target'][i % 4])}</span><p><b>${esc(a.message)}</b><br><small>${esc(a.detail)}</small></p><time>${relative(a.at)}</time></div>`).join('')}</section>`; }
function customerTable(data, compact = false) { return `<div class="table-scroll"><table class="data-table"><thead><tr>${compact ? '<th><input type="checkbox" data-action="select-all" aria-label="Select all"></th>' : ''}<th>Customer</th><th>Company</th><th>Status</th><th>Source</th><th>Owner</th><th>Last Contact</th><th>Actions</th></tr></thead><tbody>${data.map(c => `<tr>${compact ? `<td><input type="checkbox" data-action="select-customer" data-id="${c.id}" ${ui.selected.has(c.id) ? 'checked' : ''} aria-label="Select ${esc(c.name)}"></td>` : ''}<td><div class="name-cell click-name" data-action="profile" data-id="${c.id}">${avatar(c.name)}<span><strong>${esc(c.name)}</strong><small>${esc(c.email)}</small></span></div></td><td>${esc(c.company)}</td><td>${badge(c.status)}</td><td>${badge(c.source)}</td><td><span class="row">${avatar(c.owner)} ${esc(c.owner)}</span></td><td>${fmtDay(c.lastContact)}</td><td><button class="mini-more" data-action="profile" data-id="${c.id}" aria-label="Open ${esc(c.name)}">${icon('more')}</button></td></tr>`).join('')}</tbody></table></div><div class="mobile-customer-list">${data.map(c => `<div class="mobile-customer-card"><div class="row-between"><div class="name-cell click-name" data-action="profile" data-id="${c.id}">${avatar(c.name, 'md')}<span><strong>${esc(c.name)}</strong><small>${esc(c.company)}</small></span></div>${badge(c.status)}</div><div class="row-between"><small class="muted">${esc(c.email)}</small><button class="btn btn-small btn-soft" data-action="profile" data-id="${c.id}">View profile</button></div></div>`).join('')}</div>${!data.length ? `<div class="empty">${icon('search')}<strong>No matching customers</strong><div>Try another search or filter.</div></div>` : ''}`; }
function filterMarkup() { return `<div class="table-toolbar"><label class="field-search">${icon('search')}<input data-filter="search" value="${esc(ui.query)}" placeholder="Search customers, companies, emails..."></label><div class="filter-controls"><select class="select" data-filter="status">${options(['All Status', 'Active', 'Lead', 'Inactive'], ui.status)}</select><select class="select" data-filter="source">${options(['All Sources', ...new Set(db.customers.map(x => x.source))], ui.source)}</select><select class="select" data-filter="owner">${options(['All Owners', ...new Set(db.customers.map(x => x.owner))], ui.owner)}</select></div></div>`; }
function dashboardCustomers() { let content = ui.dashboardTab === 'customers' ? `<div class="customer-results">${customerTable(customersFiltered().slice(0, 6), true)}</div>` : ui.dashboardTab === 'leads' ? `<div class="customer-results">${customerTable(customersFiltered(true).slice(0, 6), true)}</div>` : ui.dashboardTab === 'tasks' ? `<div class="table-scroll"><table class="data-table"><tbody>${db.tasks.slice(0, 6).map(t => `<tr><td>${badge(t.status)}</td><td>${esc(t.title)}</td><td>${esc(t.owner)}</td><td>${shortDay(t.due)}</td></tr>`).join('')}</tbody></table></div>` : `<div class="table-scroll"><table class="data-table"><tbody>${db.events.slice(0, 6).map(e => `<tr><td>${esc(e.title)}</td><td>${esc(e.description)}</td><td>${shortDay(e.date)}</td><td>${esc(e.time)}</td></tr>`).join('')}</tbody></table></div>`; return `<section class="panel customer-panel"><div class="row-between" style="padding:0 16px"><div class="tabs" style="padding:0;border-bottom:0">${[['customers', 'Recent Customers'], ['leads', 'Active Leads'], ['tasks', 'My Tasks'], ['meetings', 'Upcoming Meetings']].map(([k, v]) => `<button class="${ui.dashboardTab === k ? 'active' : ''}" data-action="dash-tab" data-id="${k}">${v}</button>`).join('')}</div><button class="btn btn-small" data-page="${ui.dashboardTab === 'meetings' ? 'calendar' : ui.dashboardTab === 'leads' ? 'leads' : ui.dashboardTab}">View All</button></div>${['customers', 'leads'].includes(ui.dashboardTab) ? filterMarkup() : ''}${content}</section>`; }
function dashboardView() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const due = db.tasks.filter(t => t.status !== 'Done' && t.due <= day()).length;
    return `<div class="dashboard-grid"><div class="primary-column"><section class="hero"><div class="hero-content"><div class="date">OVERVIEW <span class="hero-date">${today}</span></div><h1>Customer workspace</h1><p>Relationships, revenue and the work that needs your attention.</p></div><button class="btn" data-page="tasks">${icon('checks')} ${due} follow-ups due ${icon('arrow', 'mini')}</button></section>${statsCards()}<div class="chart-grid">${salesPanel()}${donutPanel()}</div>${dashboardCustomers()}</div><aside class="right-column"><section class="panel calendar-panel">${calendarMarkup()}<div class="section-rule"></div>${scheduleMarkup()}</section>${taskSide()}${activitySide()}</aside></div>`;
}
function pageHeader(title, desc, buttonLabel, kind) { return `<div class="page-header"><div><div class="page-kicker">NEXORA / CLIENT OPERATIONS</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div><div class="page-actions">${kind === 'customer' ? `<button class="btn" data-action="export">${icon('download')} Export customers</button>` : ''}${buttonLabel ? `<button class="btn btn-primary" data-action="add-${kind}">${icon('plus')} ${esc(buttonLabel)}</button>` : ''}</div></div>`; }
function summary(items) { return `<div class="summary-grid">${items.map(([n, value, detail]) => `<div class="summary-card"><div class="sub">${esc(n)}</div><div class="metric">${esc(value)}</div><div class="sub">${esc(detail)}</div></div>`).join('')}</div>`; }
function fullCustomerView(leads = false) { let arr = customersFiltered(leads), all = leads ? db.customers.filter(c => c.status === 'Lead') : db.customers; return `<div class="module-layout">${pageHeader(leads ? 'Lead Management' : 'Customer Management', leads ? 'Track prospects and convert interested contacts into customers.' : 'One connected view of your customers, contacts, and relationships.', leads ? 'Add Lead' : 'Add Customer', 'customer')}${summary([['Total ' + (leads ? 'Leads' : 'Customers'), all.length, 'All records'], ['Active Customers', db.customers.filter(c => c.status === 'Active').length, 'Current customers'], ['Follow-ups Due', db.tasks.filter(t => t.status !== 'Done' && t.due <= day()).length, 'Needs your attention'], ['New This Month', db.customers.filter(c => c.createdAt.slice(0, 7) === day().slice(0, 7)).length, 'Recently added']])}<section class="panel customer-panel"><div class="panel-head"><h3>${leads ? 'Prospect Directory' : 'All Customers'} <small>${arr.length} records</small></h3><div class="row"><select class="select" data-filter="sort">${[['newest', 'Default order'], ['name', 'Name A–Z'], ['recent', 'Last contacted']].map(([v, n]) => `<option value="${v}" ${ui.sort === v ? 'selected' : ''}>${n}</option>`).join('')}</select><button class="btn btn-small" data-action="clear-filters">Clear filters</button></div></div>${filterMarkup()}${ui.selected.size ? `<div class="bulk-bar">${ui.selected.size} selected <button class="btn btn-small" data-action="bulk-active">Mark active</button><button class="btn btn-small btn-danger" data-action="bulk-delete">Delete selected</button></div>` : ''}<div class="customer-results">${customerTable(arr, true)}</div><div class="table-bottom"><span>Showing ${arr.length} of ${all.length} records</span><button class="card-link" data-action="add-customer">+ New contact</button></div></section></div>`; }
function dealsView() { const active = db.deals.filter(d => d.stage === 'Won'), open = db.deals.filter(d => !['Won', 'Lost'].includes(d.stage)), potential = open.reduce((a, d) => a + Number(d.value), 0); return `<div class="module-layout">${pageHeader('Sales Pipeline', 'Move deals forward, track value and manage the complete sales journey.', 'New Deal', 'deal')}${summary([['Total Pipeline', money(potential), 'Open opportunities'], ['Active Deals', open.length, 'Across four stages'], ['Won Revenue', money(active.reduce((a, d) => a + Number(d.value), 0)), 'Closed wins'], ['Win Rate', db.deals.length ? Math.round(active.length / db.deals.length * 100) + '%' : '0%', 'Of all deals']])}<div class="panel full-panel"><div class="row-between" style="margin-bottom:16px"><h3>Opportunity Board</h3><span class="muted tiny">Drag a card between columns, or use its stage selector</span></div><div class="kanban-board">${dealStages.slice(0, 5).map((stage, i) => { let items = db.deals.filter(d => d.stage === stage); return `<section class="kanban-column" data-drop-stage="${stage}"><div class="kanban-head"><span><span class="legend-dot" style="background:${stageColors[i]}"></span>${stage}</span><span class="kanban-col-count">${items.length}</span></div><div class="muted tiny" style="margin-bottom:13px">${money(items.reduce((sum, d) => sum + Number(d.value), 0))}</div>${items.map(d => `<div class="deal-card" draggable="true" data-deal="${d.id}"><div class="row-between"><span class="badge purple" style="font-size:9px">${esc(d.id.toUpperCase())}</span><button class="mini-more" data-action="edit-deal" data-id="${d.id}">${icon('more')}</button></div><h4 style="margin-top:11px">${esc(d.title)}</h4><div class="deal-company">${esc(d.company)}</div><div class="deal-price">${money(d.value)}</div><footer><span class="row">${avatar(d.owner)} <span class="tiny muted">${shortDay(d.due)}</span></span></footer><select class="deal-stage-select" data-stage-id="${d.id}" aria-label="Move ${esc(d.title)} to stage">${options(dealStages, d.stage)}</select></div>`).join('')}${!items.length ? '<p class="muted tiny">Drop a deal here</p>' : ''}</section>`; }).join('')}</div></div>${db.deals.some(x => x.stage === 'Lost') ? `<section class="panel full-panel"><h3>Closed Lost</h3><div class="row" style="flex-wrap:wrap;margin-top:10px">${db.deals.filter(x => x.stage === 'Lost').map(d => `<button class="btn btn-small" data-action="edit-deal" data-id="${d.id}">${esc(d.title)} · ${money(d.value)}</button>`).join('')}</div></section>` : ''}</div>`; }
function tasksView() { const n = db.tasks.filter(t => t.status === 'Open').length; return `<div class="module-layout">${pageHeader('Task Manager', 'Keep every follow-up, to-do and customer commitment on track.', 'New Task', 'task')}${summary([['All Tasks', db.tasks.length, 'Across the workspace'], ['To Do', n, 'Pending actions'], ['Overdue', db.tasks.filter(x => x.due < day() && x.status !== 'Done').length, 'Needs attention'], ['Completed', db.tasks.filter(x => x.status === 'Done').length, 'Finished tasks']])}<div class="tasks-board">${[['Open', 'To Do'], ['Done', 'Completed'], ['Overdue', 'Overdue']].map(([status, title]) => { let tasks = db.tasks.filter(t => status === 'Overdue' ? t.status !== 'Done' && t.due < day() : status === 'Open' ? t.status !== 'Done' && t.due >= day() : t.status === 'Done'); return `<section class="panel full-panel"><div class="row-between" style="margin-bottom:14px"><h3>${title}</h3><span class="badge ${status === 'Done' ? 'green' : status === 'Overdue' ? 'red' : 'purple'}">${tasks.length}</span></div>${tasks.map(t => `<article class="task-board-card" style="margin-bottom:10px"><div class="row-between"><span>${badge(t.priority)}</span><button class="icon-button" data-action="edit-task" data-id="${t.id}" title="Edit task">${icon('edit')}</button></div><h3 style="margin-top:11px">${esc(t.title)}</h3><p>${esc(findCustomer(t.customerId)?.company || 'General task')}</p><footer><span class="tiny subtle">${shortDay(t.due)} · ${esc(t.owner)}</span><button class="btn btn-small ${t.status === 'Done' ? '' : 'btn-soft'}" data-action="toggle-task" data-id="${t.id}">${t.status === 'Done' ? 'Reopen' : 'Complete'}</button></footer></article>`).join('') || '<p class="muted tiny">Nothing here yet.</p>'}</section>`; }).join('')}</div></div>`; }
function calendarView() { return `<div class="module-layout">${pageHeader('Calendar & Meetings', 'Schedule client meetings and stay on top of upcoming activities.', 'New Event', 'event')}<section class="panel full-panel"><div class="row-between" style="margin-bottom:12px"><h3>Meeting Calendar</h3><button class="btn btn-small" data-action="cal-today">Today</button></div>${calendarMarkup(true)}</section><section class="panel full-panel"><div class="panel-head"><h3>Upcoming meetings</h3><span class="badge purple">${db.events.length} total</span></div><div class="table-scroll"><table class="data-table"><thead><tr><th>Event</th><th>Date</th><th>Time</th><th>Related contact</th><th>Action</th></tr></thead><tbody>${[...db.events].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map(e => `<tr><td><b>${esc(e.title)}</b><br><small>${esc(e.description)}</small></td><td>${fmtDay(e.date)}</td><td>${esc(e.time)}</td><td>${esc(findCustomer(e.customerId)?.name || '—')}</td><td><button class="btn btn-small" data-action="edit-event" data-id="${e.id}">Edit</button></td></tr>`).join('')}</tbody></table></div></section></div>`; }
function documentView(type) { const isInvoice = type === 'invoices', entries = db[type], noun = isInvoice ? 'Invoice' : 'Quotation'; let open = entries.filter(x => ['Pending', 'Overdue', 'Draft', 'Sent'].includes(x.status)); return `<div class="module-layout">${pageHeader(isInvoice ? 'Invoice Management' : 'Quotations', isInvoice ? 'Track customer invoices and payment statuses.' : 'Prepare, manage and approve your proposals.', `Create ${noun}`, isInvoice ? 'invoice' : 'quote')}${summary([[`Total ${noun}s`, entries.length, 'Documents created'], ['Total Value', money(entries.reduce((a, b) => a + Number(b.amount), 0)), 'All documents'], ['Open / Outstanding', open.length, 'Needs attention'], [isInvoice ? 'Paid Value' : 'Accepted Value', money(entries.filter(x => x.status === (isInvoice ? 'Paid' : 'Accepted')).reduce((a, b) => a + Number(b.amount), 0)), isInvoice ? 'Recorded payments' : 'Approved quotations']])}<section class="panel full-panel"><div class="panel-head"><h3>All ${noun}s</h3><span class="badge purple">Demo documents</span></div><div class="module-table"><table class="data-table"><thead><tr><th>Number</th><th>Company</th><th>Amount</th><th>Status</th><th>${isInvoice ? 'Due Date' : 'Valid Until'}</th><th>Actions</th></tr></thead><tbody>${entries.map(x => `<tr><td><b>${esc(x.number)}</b></td><td>${esc(x.company)}</td><td><b>${money(x.amount)}</b></td><td><select class="select" data-doc-status="${type}" data-id="${x.id}" style="width:132px">${options(isInvoice ? ['Draft', 'Pending', 'Paid', 'Overdue', 'Cancelled'] : ['Draft', 'Sent', 'Accepted', 'Rejected'], x.status)}</select></td><td>${fmtDay(isInvoice ? x.due : x.validUntil)}</td><td><button class="btn btn-small" data-action="edit-${isInvoice ? 'invoice' : 'quote'}" data-id="${x.id}">Edit</button> ${!isInvoice && x.status === 'Accepted' ? `<button class="btn btn-small btn-soft" data-action="quote-to-invoice" data-id="${x.id}">Invoice</button>` : ''}</td></tr>`).join('')}</tbody></table></div>${!entries.length ? '<div class="empty">No documents yet. Create one to get started.</div>' : ''}</section></div>`; }
function ticketsView() { return `<div class="module-layout">${pageHeader('Support Tickets', 'Manage incoming questions and resolve customer issues.', 'New Ticket', 'ticket')}${summary([['Total Tickets', db.tickets.length, 'All support requests'], ['Open', db.tickets.filter(t => t.status === 'Open').length, 'New and unassigned'], ['In Progress', db.tickets.filter(t => t.status === 'In Progress').length, 'Being handled'], ['Resolved', db.tickets.filter(t => t.status === 'Resolved').length, 'Completed requests']])}<section class="panel full-panel"><div class="panel-head"><h3>Customer Support Queue</h3><span class="badge purple">Customer care</span></div><div class="module-table"><table class="data-table"><thead><tr><th>Issue</th><th>Company</th><th>Priority</th><th>Status</th><th>Owner</th><th>Actions</th></tr></thead><tbody>${db.tickets.map(t => `<tr><td><b>${esc(t.subject)}</b></td><td>${esc(t.company)}</td><td>${badge(t.priority)}</td><td><select class="select" data-ticket-status="${t.id}">${options(['Open', 'In Progress', 'Resolved'], t.status)}</select></td><td>${esc(t.owner)}</td><td><button class="btn btn-small" data-action="edit-ticket" data-id="${t.id}">Edit</button></td></tr>`).join('')}</tbody></table></div></section></div>`; }
function reportsView() { let sourceCount = Object.entries(db.customers.reduce((obj, c) => (obj[c.source] = (obj[c.source] || 0) + 1, obj), {})).sort((a, b) => b[1] - a[1]); let ownerCount = Object.entries(db.deals.reduce((obj, d) => (obj[d.owner] = (obj[d.owner] || 0) + 1, obj), {})); return `<div class="module-layout">${pageHeader('Reports & Insights', 'Understand pipeline health, customer acquisition and performance.', null, null)}${statsCards()}<div class="report-grid">${salesPanel()}${donutPanel()}</div><div class="report-grid"><section class="panel full-panel"><h3>Customer Acquisition Sources</h3><p class="muted tiny" style="margin:4px 0 15px">Live data from saved contacts</p>${sourceCount.map(([name, count]) => `<div class="metric-bar"><span>${esc(name)}</span><div class="metric-track"><i style="width:${count / db.customers.length * 100}%"></i></div><b>${count}</b></div>`).join('')}</section><section class="panel full-panel"><h3>Team Deal Ownership</h3><p class="muted tiny" style="margin:4px 0 15px">Opportunities by team member</p>${ownerCount.map(([name, count]) => `<div class="metric-bar"><span>${esc(name)}</span><div class="metric-track"><i style="width:${count / db.deals.length * 100}%"></i></div><b>${count}</b></div>`).join('')}</section></div></div>`; }
function teamView() { const members = [['Alex Carter', 'Workspace Admin'], ['Sarah Lee', 'Account Manager'], ['Omar Khaled', 'Sales Specialist']]; return `<div class="module-layout">${pageHeader('Team & Ownership', 'Understand who is responsible for each customer, task and deal.', null, null)}<div class="team-grid">${members.map(([name, role]) => `<section class="panel team-card">${avatar(name, 'lg')}<h3>${name}</h3><p>${role}</p><div class="team-stats"><span><b>${db.customers.filter(c => c.owner === name).length}</b><br>Customers</span><span><b>${db.deals.filter(d => d.owner === name).length}</b><br>Deals</span><span><b>${db.tasks.filter(t => t.owner === name).length}</b><br>Tasks</span></div><button class="btn btn-small btn-soft" style="margin-top:15px" data-action="filter-owner" data-id="${esc(name)}">View customers</button></section>`).join('')}</div><div class="panel full-panel"><h3>Demo Roles</h3><p class="muted tiny" style="margin-top:8px">This prototype does not implement authentication or enforce permissions. Team ownership is demo data.</p></div></div>`; }
function activitiesView() { return `<div class="module-layout">${pageHeader('Activity History', 'A chronological log of actions taken within this browser demo.', null, null)}<section class="panel full-panel"><div class="panel-head"><h3>Recent workspace activity</h3><span class="badge purple">${db.activities.length} records</span></div>${db.activities.map((a, i) => `<div class="activity-item" style="border-bottom:1px solid #f0f1f8;padding:14px 0"><span class="activity-icon">${icon(['users', 'refresh', 'file', 'target'][i % 4])}</span><p><b>${esc(a.message)}</b><br><small>${esc(a.detail)}</small></p><time>${relative(a.at)} · ${fmtDay(a.at.slice(0, 10))}</time></div>`).join('')}</section></div>`; }
function settingsView() { return `<div class="module-layout">${pageHeader('Workspace Settings', 'Manage display preferences and the interview demo data.', null, null)}<div class="settings-grid"><section class="panel full-panel setting-group"><h3>General Settings</h3><p>Adjust how this workspace behaves in your browser.</p><div class="setting-row"><div><label>Workspace Name</label><small>Shown in this demo only</small></div><span class="badge purple">${esc(db.settings.workspace || 'Nexora CRM')}</span></div><div class="setting-row"><div><label>Demo Notifications</label><small>Show sample notification messages</small></div><input type="checkbox" data-action="setting-notify" ${db.settings.notifications ? 'checked' : ''}></div><div class="setting-row"><div><label>Browser Storage</label><small>Changes persist locally on this device</small></div>${badge('Enabled')}</div></section><section class="panel full-panel setting-group"><h3>Demo Management</h3><p>Everything here is fictional. Start over at any time.</p><div class="setting-row"><div><label>Export Customers</label><small>Download contacts as a CSV file</small></div><button class="btn btn-small" data-action="export">${icon('download')} Export</button></div><div class="setting-row"><div><label>Reset Demo Data</label><small>Remove browser changes and restore sample records</small></div><button class="btn btn-small btn-danger" data-action="reset">${icon('refresh')} Reset</button></div><div class="setting-row"><div><label>About This Prototype</label><small>HTML · CSS · JavaScript · no backend</small></div><button class="btn btn-small" data-action="open-guide">Guide</button></div></section></div></div>`; }
function render() { navRender(); let screens = { dashboard: dashboardView, customers: () => fullCustomerView(false), leads: () => fullCustomerView(true), deals: dealsView, tasks: tasksView, calendar: calendarView, invoices: () => documentView('invoices'), quotes: () => documentView('quotes'), tickets: ticketsView, reports: reportsView, team: teamView, activity: activitiesView, settings: settingsView }; $('#pageRoot').innerHTML = (screens[ui.page] || dashboardView)(); document.title = `${labels[ui.page]} · Nexora CRM`; }
function go(page) { if (!labels[page])
    return; ui.page = page; ui.query = ''; ui.status = 'All Status'; ui.source = 'All Sources'; ui.owner = 'All Owners'; ui.selected.clear(); $('.sidebar').classList.remove('open'); $('#mobileShade').classList.remove('open'); $('#quickDropdown').hidden = true; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function toast(msg) { const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = `${icon('check')}<span>${esc(msg)}</span>`; $('#toastArea').append(el); setTimeout(() => el.remove(), 3300); }
const closeOverlay = () => $('#overlayRoot').innerHTML = '';
function modal(title, description, body, footer, wide = false) { $('#overlayRoot').innerHTML = `<div class="overlay-backdrop" data-action="close-overlay"><section class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-header"><div><h2>${esc(title)}</h2><p>${esc(description)}</p></div><button class="icon-button" data-action="close-overlay" aria-label="Close">${icon('x')}</button></div><div class="modal-body">${body}</div>${footer || ''}</section></div>`; let inp = $('#overlayRoot input:not([type="hidden"]), #overlayRoot select'); if (inp)
    inp.focus(); }
const footer = (form) => `<div class="modal-footer"><button class="btn" data-action="close-overlay">Cancel</button><button class="btn btn-primary" type="submit" form="${form}">${icon('check')} Save Changes</button></div>`;
const field = (label, name, value = '', type = 'text', required = false) => `<div class="form-field"><label for="f-${name}">${esc(label)}</label><input id="f-${name}" name="${name}" type="${type}" value="${esc(value)}" ${required ? 'required' : ''} ${type === 'number' ? 'min="0" step="0.01"' : ''} ${type === 'email' ? 'maxlength="254"' : type === 'text' || type === 'tel' ? 'maxlength="160"' : ''}></div>`;
const selectField = (label, name, values, value) => `<div class="form-field"><label for="f-${name}">${esc(label)}</label><select id="f-${name}" name="${name}">${options(values, value)}</select></div>`;
const relationField = (selected = '') => `<div class="form-field"><label for="f-customerId">Related Customer</label><select id="f-customerId" name="customerId"><option value="">None</option>${db.customers.map(c => `<option value="${esc(c.id)}" ${selected === c.id ? 'selected' : ''}>${esc(c.name)} · ${esc(c.company)}</option>`).join('')}</select></div>`;
const owners = ['Alex Carter', 'Sarah Lee', 'Omar Khaled'];
const formOpen = (kind, id) => {
    let plural = { customer: 'customers', deal: 'deals', task: 'tasks', invoice: 'invoices', quote: 'quotes', ticket: 'tickets', event: 'events' }[kind];
    if (!plural)
        return;
    let entity = db[plural].find(x => x.id === id), isEdit = !!entity, obj = entity || {};
    const template = {
        customer: () => `${field('Full Name', 'name', obj.name, 'text', true)}${field('Email Address', 'email', obj.email, 'email', true)}${field('Company', 'company', obj.company, 'text', true)}${field('Phone Number', 'phone', obj.phone, 'tel')}${selectField('Status', 'status', ['Active', 'Lead', 'Inactive'], obj.status || (ui.page === 'leads' ? 'Lead' : 'Active'))}${selectField('Source', 'source', ['Website', 'Referral', 'LinkedIn', 'Instagram', 'Google Ads', 'Other'], obj.source || 'Website')}${selectField('Assigned Owner', 'owner', owners, obj.owner || owners[0])}${field('Last Contact', 'lastContact', obj.lastContact || day(), 'date')}`,
        deal: () => `${field('Deal Title', 'title', obj.title, 'text', true)}${relationField(obj.customerId)}${field('Company', 'company', obj.company, 'text', true)}${field('Deal Value (USD)', 'value', obj.value || 0, 'number', true)}${selectField('Stage', 'stage', dealStages, obj.stage || 'New Lead')}${selectField('Owner', 'owner', owners, obj.owner || owners[0])}${field('Expected Close', 'due', obj.due || day(7), 'date')}`,
        task: () => `${field('Task Name', 'title', obj.title, 'text', true)}${relationField(obj.customerId)}${selectField('Owner', 'owner', owners, obj.owner || owners[0])}${selectField('Priority', 'priority', ['Low', 'Medium', 'High'], obj.priority || 'Medium')}${field('Due Date', 'due', obj.due || day(1), 'date', true)}${selectField('Status', 'status', ['Open', 'Done'], obj.status || 'Open')}`,
        invoice: () => `${field('Invoice Number', 'number', obj.number || nextNumber('INV', db.invoices), 'text', true)}${relationField(obj.customerId)}${field('Company', 'company', obj.company, 'text', true)}${field('Amount (USD)', 'amount', obj.amount || 0, 'number', true)}${selectField('Payment Status', 'status', ['Draft', 'Pending', 'Paid', 'Overdue', 'Cancelled'], obj.status || 'Pending')}${field('Due Date', 'due', obj.due || day(7), 'date', true)}`,
        quote: () => `${field('Quote Number', 'number', obj.number || nextNumber('QUO', db.quotes), 'text', true)}${relationField(obj.customerId)}${field('Company', 'company', obj.company, 'text', true)}${field('Amount (USD)', 'amount', obj.amount || 0, 'number', true)}${selectField('Status', 'status', ['Draft', 'Sent', 'Accepted', 'Rejected'], obj.status || 'Draft')}${field('Valid Until', 'validUntil', obj.validUntil || day(14), 'date', true)}`,
        ticket: () => `${field('Issue / Subject', 'subject', obj.subject, 'text', true)}${relationField(obj.customerId)}${field('Company', 'company', obj.company, 'text', true)}${selectField('Priority', 'priority', ['Low', 'Medium', 'High'], obj.priority || 'Medium')}${selectField('Status', 'status', ['Open', 'In Progress', 'Resolved'], obj.status || 'Open')}${selectField('Assigned Owner', 'owner', owners, obj.owner || owners[0])}`,
        event: () => `${field('Event Title', 'title', obj.title, 'text', true)}${relationField(obj.customerId)}${field('Description / Location', 'description', obj.description)}${field('Date', 'date', obj.date || ui.selectedDay || day(), 'date', true)}${field('Time', 'time', obj.time || '10:00', 'time', true)}`
    }[kind];
    let body = `<form id="entityForm" data-form-kind="${kind}" data-id="${esc(id || '')}"><div class="form-grid">${template()}</div></form>`;
    let buttons = isEdit ? `<button class="btn btn-danger" data-action="delete-${kind}" data-id="${esc(id)}">${icon('trash')} Delete</button>` : '';
    let buttonsFooter = `<div class="modal-footer">${buttons}<div style="flex:1"></div><button class="btn" data-action="close-overlay">Cancel</button><button class="btn btn-primary" type="submit" form="entityForm">${icon('check')} ${isEdit ? 'Save Changes' : 'Create ' + toTitle(kind)}</button></div>`;
    modal(isEdit ? 'Edit ' + toTitle(kind) : 'New ' + toTitle(kind), `Manage ${kind} information in your workspace.`, body, buttonsFooter);
};
function profile(id, tab = 'overview') {
    const c = findCustomer(id);
    if (!c)
        return;
    ui.profileTab = tab;
    const cd = db.deals.filter(d => d.customerId === c.id), ct = db.tasks.filter(t => t.customerId === c.id), ci = db.invoices.filter(i => i.customerId === c.id);
    let content = { overview: () => `<div class="profile-stats"><div class="profile-stat"><b>${cd.length}</b><small>Deals</small></div><div class="profile-stat"><b>${ct.length}</b><small>Tasks</small></div><div class="profile-stat"><b>${ci.length}</b><small>Invoices</small></div></div><div class="profile-line">${icon('mail')} <strong>${esc(c.email)}</strong></div><div class="profile-line">${icon('phone')} <strong>${esc(c.phone || 'No phone')}</strong></div><div class="profile-line">${icon('building')} <strong>${esc(c.company)}</strong></div><div class="profile-line">${icon('user')} <strong>Owner: ${esc(c.owner)}</strong></div><div class="profile-line">${icon('clock')} Last contacted: ${fmtDay(c.lastContact)}</div><div class="profile-section"><div class="row-between"><h3>Customer notes</h3><button class="btn btn-small" data-action="add-note" data-id="${c.id}">${icon('plus')} Add note</button></div>${c.notes.length ? c.notes.map(note => `<div class="selected-detail">${esc(note)}</div>`).join('') : '<p class="muted tiny">No notes yet.</p>'}</div>`, deals: () => `<div class="profile-section" style="border:0;margin:0">${cd.map(d => `<div class="selected-detail"><b>${esc(d.title)}</b><br>${money(d.value)} · ${badge(d.stage)}</div>`).join('') || '<p class="muted">No deals recorded.</p>'}</div>`, tasks: () => `<div class="profile-section" style="border:0;margin:0">${ct.map(t => `<div class="selected-detail"><b>${esc(t.title)}</b><br>${badge(t.status)} · ${fmtDay(t.due)}</div>`).join('') || '<p class="muted">No tasks recorded.</p>'}</div>`, invoices: () => `<div class="profile-section" style="border:0;margin:0">${ci.map(i => `<div class="selected-detail"><b>${esc(i.number)}</b><br>${money(i.amount)} · ${badge(i.status)}</div>`).join('') || '<p class="muted">No invoices recorded.</p>'}</div>` }[tab];
    $('#overlayRoot').innerHTML = `<div class="drawer-backdrop" data-action="close-overlay"><aside class="drawer" role="dialog" aria-modal="true" aria-label="Customer profile for ${esc(c.name)}"><div class="drawer-top"><b>Customer 360° Profile</b><button class="icon-button" data-action="close-overlay" aria-label="Close">${icon('x')}</button></div><div class="drawer-body"><div class="profile-heading">${avatar(c.name, 'lg')}<div><h2>${esc(c.name)}</h2><p>${esc(c.company)} · ${badge(c.status)}</p></div></div><div class="row" style="flex-wrap:wrap"><button class="btn btn-small btn-primary" data-action="edit-customer" data-id="${c.id}">${icon('edit')} Edit customer</button><a class="btn btn-small" href="mailto:${encodeURIComponent(c.email)}">${icon('mail')} Email</a><a class="btn btn-small" href="tel:${esc((c.phone || '').replace(/[^+\d]/g, ''))}">${icon('phone')} Call</a></div><div class="drawer-tabs">${[['overview', 'Overview'], ['deals', 'Deals'], ['tasks', 'Tasks'], ['invoices', 'Invoices']].map(([k, v]) => `<button class="${k === tab ? 'active' : ''}" data-action="profile-tab" data-id="${c.id}" data-tab="${k}">${v}</button>`).join('')}</div>${content()}<div class="profile-section"><h3>Quick Actions</h3><div class="row" style="flex-wrap:wrap"><button class="btn btn-small" data-action="new-related-task" data-id="${c.id}">+ Task</button><button class="btn btn-small" data-action="new-related-deal" data-id="${c.id}">+ Deal</button><button class="btn btn-small" data-action="add-note" data-id="${c.id}">+ Note</button></div></div></div></aside></div>`;
}
function addNote(customerId) { modal('Add Customer Note', 'Save a private note for this demo contact.', `<form id="noteForm" data-customer="${esc(customerId)}"><div class="form-field"><label for="noteText">Note</label><textarea id="noteText" name="note" required maxlength="1500" placeholder="Meeting notes, preferences, next steps..."></textarea></div></form>`, footer('noteForm')); }
function showGuide() { modal('Welcome to Nexora CRM', 'Your interactive interview demo.', `<div class="help-list"><div><strong>Customer Management</strong>Add, edit, filter, bulk-update and delete contacts. Open any customer for a 360° profile.</div><div><strong>Sales & Operations</strong>Move deals through the pipeline, create tasks and events, manage quotes, invoices and support requests.</div><div><strong>Search & Export</strong>Press Ctrl + K to search the workspace. Export customers as CSV. All edits are saved in localStorage.</div><div><strong>Demo limitations</strong>No backend, no real user authentication, no secure access control, no email sending, and no payment processing. Graph history is illustrative.</div></div>`, `<div class="modal-footer"><button class="btn btn-primary" data-action="close-overlay">Start exploring ${icon('arrow')}</button></div>`); }
function confirmBox(message, action, id = '') { modal('Confirm action', 'Please review before proceeding.', `<p style="font-size:13px;color:#576183">${esc(message)}</p>`, `<div class="modal-footer"><button class="btn" data-action="close-overlay">Cancel</button><button class="btn btn-danger" data-action="${esc(action)}" data-id="${esc(id)}">Confirm</button></div>`); }
function exportCSV() { let header = ['Name', 'Email', 'Company', 'Phone', 'Status', 'Source', 'Owner', 'Last Contact'], lines = db.customers.map(c => [c.name, c.email, c.company, c.phone, c.status, c.source, c.owner, c.lastContact]); let csv = '\ufeff' + [header, ...lines].map(row => row.map(v => { let text = String(v ?? ''); if (/^[\s]*[=+@-]/.test(text))
    text = "'" + text; return '"' + text.replaceAll('"', '""') + '"'; }).join(',')).join('\r\n'); let url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); let link = document.createElement('a'); link.href = url; link.download = 'nexora-customers.csv'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('Customer CSV exported'); }
const entityCollections = { customer: 'customers', deal: 'deals', task: 'tasks', invoice: 'invoices', quote: 'quotes', ticket: 'tickets', event: 'events' };
function commitForm(form) {
    const kind = form.dataset.formKind;
    const collection = entityCollections[kind];
    if (!collection || !form.reportValidity())
        return;
    const old = db[collection].find(record => record.id === form.dataset.id);
    const values = Object.fromEntries(new FormData(form).entries());
    for (const [key, value] of Object.entries(values)) {
        if (typeof value === 'string')
            values[key] = value.trim();
    }
    if (kind === 'customer') {
        values.email = values.email.toLowerCase();
        const duplicate = db.customers.some(c => c.id !== old?.id && c.email.toLowerCase() === values.email);
        if (duplicate) {
            toast('A customer with this email already exists');
            form.elements.email.focus();
            return;
        }
        values.notes = old?.notes || [];
        values.createdAt = old?.createdAt || stamp();
        values.lastContact = values.lastContact || day();
    }
    for (const key of ['value', 'amount']) {
        if (!(key in values))
            continue;
        const amount = Number(values[key]);
        if (!Number.isFinite(amount) || amount < 0) {
            toast('Enter a valid amount of zero or more');
            form.elements[key].focus();
            return;
        }
        values[key] = amount;
    }
    if ((kind === 'invoice' || kind === 'quote') && db[collection].some(doc => doc.id !== old?.id && doc.number.toLowerCase() === values.number.toLowerCase())) {
        toast('This document number is already in use');
        form.elements.number.focus();
        return;
    }
    if (values.customerId) {
        const related = findCustomer(values.customerId);
        if (!related) {
            toast('Select an existing customer');
            return;
        }
        if (['deal', 'invoice', 'quote', 'ticket'].includes(kind))
            values.company = related.company;
    }
    if (kind === 'deal' || kind === 'ticket')
        values.createdAt = old?.createdAt || stamp();
    const item = { ...(old || {}), ...values, id: old?.id || fresh() };
    if (old)
        Object.assign(old, item);
    else
        db[collection].unshift(item);
    track(`Alex Carter ${old ? 'updated' : 'created'} a ${kind}`, values.name || values.title || values.subject || values.number || values.company || '');
    closeOverlay();
    render();
    toast(`${toTitle(kind)} ${old ? 'updated' : 'created'} successfully`);
}
function actualDelete(kind, id) { let plural = entityCollections[kind]; if (!plural)
    return; let item = db[plural].find(x => x.id === id); if (!item)
    return; db[plural] = db[plural].filter(x => x.id !== id); if (kind === 'customer')
    for (const p of ['deals', 'tasks', 'invoices', 'quotes', 'tickets', 'events'])
        db[p].forEach(record => { if (record.customerId === id)
            record.customerId = ''; }); ui.selected.delete(id); track(`Alex Carter deleted a ${kind}`, item.name || item.title || item.number || item.subject || ''); closeOverlay(); render(); toast(`${toTitle(kind)} deleted`); }
function handleClick(e) {
    const page = e.target.closest('[data-page]');
    if (page) {
        go(page.dataset.page);
        return;
    }
    const a = e.target.closest('[data-action]');
    if (!a)
        return;
    const action = a.dataset.action, id = a.dataset.id;
    if (action === 'close-overlay') {
        if ((a.classList.contains('overlay-backdrop') || a.classList.contains('drawer-backdrop')) && e.target !== a)
            return;
        closeOverlay();
        return;
    }
    if (action === 'quick-menu') {
        const menu = $('#quickDropdown');
        menu.hidden = !menu.hidden;
        menu.innerHTML = [['customer', 'New Customer'], ['deal', 'New Deal'], ['task', 'New Task'], ['event', 'New Meeting'], ['invoice', 'New Invoice'], ['quote', 'New Quotation'], ['ticket', 'Support Ticket']].map(([k, label]) => `<button data-action="add-${k}">${icon({ customer: 'users', deal: 'chart', task: 'checks', event: 'calendar', invoice: 'file', quote: 'file', ticket: 'message' }[k])}${label}</button>`).join('');
        return;
    }
    if (action === 'profile') {
        profile(id);
        return;
    }
    if (action === 'profile-tab') {
        profile(id, a.dataset.tab);
        return;
    }
    if (action === 'dash-tab') {
        ui.dashboardTab = id;
        render();
        return;
    }
    if (action === 'select-day') {
        ui.selectedDay = a.dataset.date;
        const d = new Date(ui.selectedDay + 'T12:00:00');
        ui.calendarMonth = d.getMonth();
        ui.calendarYear = d.getFullYear();
        render();
        return;
    }
    if (action === 'cal-prev' || action === 'cal-next') {
        const d = new Date(ui.calendarYear, ui.calendarMonth + (action === 'cal-next' ? 1 : -1), 1);
        ui.calendarMonth = d.getMonth();
        ui.calendarYear = d.getFullYear();
        render();
        return;
    }
    if (action === 'cal-today') {
        ui.selectedDay = day();
        let d = new Date();
        ui.calendarMonth = d.getMonth();
        ui.calendarYear = d.getFullYear();
        render();
        return;
    }
    if (action === 'customize') {
        toast('Use the sidebar to customize your daily workflow.');
        return;
    }
    if (action === 'notifications') {
        modal('Notifications', 'Your workspace updates.', `<div class="help-list"><div><strong>${db.tasks.filter(t => t.due <= day() && t.status !== 'Done').length} tasks need attention</strong>Review your tasks due today or earlier.</div><div><strong>${db.invoices.filter(i => i.status === 'Overdue').length} overdue invoices</strong>Follow up with clients and update payment statuses.</div><div><strong>${db.deals.filter(d => !['Won', 'Lost'].includes(d.stage)).length} active opportunities</strong>Continue moving deals through the pipeline.</div></div>`, `<div class="modal-footer"><button class="btn btn-primary" data-page="tasks">Go to Tasks</button></div>`);
        return;
    }
    if (action === 'open-guide') {
        showGuide();
        return;
    }
    if (action === 'clear-filters') {
        ui.query = '';
        ui.status = 'All Status';
        ui.source = 'All Sources';
        ui.owner = 'All Owners';
        ui.sort = 'newest';
        render();
        return;
    }
    if (action === 'export') {
        exportCSV();
        return;
    }
    if (action === 'toggle-task') {
        const t = db.tasks.find(x => x.id === id);
        if (!t)
            return;
        t.status = t.status === 'Done' ? 'Open' : 'Done';
        track('Alex Carter changed task status', t.title + ' → ' + t.status);
        render();
        toast('Task status updated');
        return;
    }
    if (action === 'add-note') {
        addNote(id);
        return;
    }
    if (action === 'filter-owner') {
        ui.page = 'customers';
        ui.owner = id;
        render();
        return;
    }
    if (action === 'new-related-task' || action === 'new-related-deal') {
        const c = findCustomer(id);
        let kind = action.includes('task') ? 'task' : 'deal';
        formOpen(kind);
        const sel = $('#f-customerId');
        if (sel)
            sel.value = id;
        const company = $('#f-company');
        if (company && c)
            company.value = c.company;
        return;
    }
    if (action === 'quote-to-invoice') {
        let q = db.quotes.find(x => x.id === id);
        if (!q)
            return;
        const inv = { id: fresh(), number: nextNumber('INV', db.invoices), customerId: q.customerId, company: q.company, amount: q.amount, status: 'Pending', due: day(14) };
        db.invoices.unshift(inv);
        track('Alex Carter converted a quote to an invoice', q.number + ' → ' + inv.number);
        go('invoices');
        toast('Invoice created from approved quote');
        return;
    }
    if (action === 'reset') {
        confirmBox('This will discard every change saved in this browser and restore all sample records.', 'confirm-reset');
        return;
    }
    if (action === 'confirm-reset') {
        db = makeSeed();
        save();
        ui.selected.clear();
        closeOverlay();
        go('dashboard');
        toast('Sample data restored');
        return;
    }
    if (action === 'bulk-active') {
        let count = 0;
        db.customers.forEach(c => { if (ui.selected.has(c.id)) {
            c.status = 'Active';
            count++;
        } });
        ui.selected.clear();
        track('Alex Carter updated customer statuses', count + ' marked Active');
        render();
        toast(`${count} customers updated`);
        return;
    }
    if (action === 'bulk-delete') {
        confirmBox(`Delete ${ui.selected.size} selected contacts? Their related records will be detached, not deleted.`, 'confirm-bulk-delete');
        return;
    }
    if (action === 'confirm-bulk-delete') {
        const ids = new Set(ui.selected);
        db.customers = db.customers.filter(c => !ids.has(c.id));
        for (const p of ['deals', 'tasks', 'invoices', 'quotes', 'tickets', 'events'])
            db[p].forEach(r => { if (ids.has(r.customerId))
                r.customerId = ''; });
        let count = ids.size;
        ui.selected.clear();
        track('Alex Carter deleted multiple customers', `${count} contacts`);
        closeOverlay();
        render();
        toast(`${count} contacts deleted`);
        return;
    }
    if (action === 'select-all') {
        ui.selected.clear();
        if (a.checked)
            customersFiltered(ui.page === 'leads').forEach(c => ui.selected.add(c.id));
        render();
        return;
    }
    if (action === 'select-customer') {
        a.checked ? ui.selected.add(id) : ui.selected.delete(id);
        const toolbar = $('.bulk-bar');
        if (ui.page !== 'dashboard') {
            const active = document.activeElement;
            render();
            if (active?.dataset?.id)
                $(`[data-action="select-customer"][data-id="${active.dataset.id}"]`)?.focus();
        }
        return;
    }
    if (action === 'setting-notify') {
        db.settings.notifications = a.checked;
        save();
        toast('Notification preference saved');
        return;
    }
    if (action.startsWith('add-') || action.startsWith('edit-')) {
        const kind = action.split('-')[1];
        if (['customer', 'deal', 'task', 'invoice', 'quote', 'ticket', 'event'].includes(kind)) {
            closeOverlay();
            formOpen(kind, action.startsWith('edit-') ? id : undefined);
            return;
        }
    }
    if (action.startsWith('delete-')) {
        let kind = action.slice(7);
        confirmBox(`Delete this ${kind}? The action cannot be undone.`, 'confirm-delete-' + kind, id);
        return;
    }
    if (action.startsWith('confirm-delete-')) {
        actualDelete(action.slice(15), id);
        return;
    }
}
document.addEventListener('click', handleClick);
document.addEventListener('submit', e => { if (e.target.matches('#entityForm')) {
    e.preventDefault();
    commitForm(e.target);
}
else if (e.target.matches('#noteForm')) {
    e.preventDefault();
    let id = e.target.dataset.customer, c = findCustomer(id), note = new FormData(e.target).get('note')?.trim();
    if (!c || !note)
        return;
    c.notes.unshift(note);
    track('Alex Carter added a customer note', c.name);
    profile(id);
    toast('Note added to customer');
} });
document.addEventListener('change', e => { const a = e.target; if (a.dataset.filter) {
    ui[{ search: 'query', status: 'status', source: 'source', owner: 'owner', sort: 'sort' }[a.dataset.filter]] = a.value;
    setTimeout(render, 0);
    return;
} if (a.dataset.stageId) {
    let d = db.deals.find(x => x.id === a.dataset.stageId);
    if (!d)
        return;
    d.stage = a.value;
    track('Alex Carter moved a deal', d.title + ' → ' + d.stage);
    render();
    toast('Deal stage updated');
    return;
} if (a.dataset.docStatus) {
    let doc = db[a.dataset.docStatus].find(x => x.id === a.dataset.id);
    if (doc) {
        doc.status = a.value;
        track('Alex Carter updated a document', doc.number + ' → ' + doc.status);
        render();
        toast('Document status updated');
    }
    return;
} if (a.dataset.ticketStatus) {
    let t = db.tickets.find(x => x.id === a.dataset.ticketStatus);
    if (t) {
        t.status = a.value;
        track('Alex Carter updated a support ticket', t.subject + ' → ' + t.status);
        render();
        toast('Ticket updated');
    }
    return;
} });
document.addEventListener('input', e => { const inp = e.target; if (inp.matches('[data-filter="search"]')) {
    ui.query = inp.value;
    const results = $('.customer-results');
    if (results) {
        const leadMode = ui.page === 'leads' || (ui.page === 'dashboard' && ui.dashboardTab === 'leads');
        let list = customersFiltered(leadMode);
        if (ui.page === 'dashboard')
            list = list.slice(0, 6);
        results.innerHTML = customerTable(list, true);
    }
    else
        setTimeout(render, 0);
}
else if (inp.id === 'globalSearch')
    globalResults(inp.value); });
const searchNode = document.createElement('div');
searchNode.className = 'global-results';
searchNode.hidden = true;
$('.global-search').append(searchNode);
function globalResults(query) { let q = query.trim().toLowerCase(); if (!q) {
    searchNode.hidden = true;
    return;
} let matchingCustomers = db.customers.filter(c => (c.name + ' ' + c.company + ' ' + c.email).toLowerCase().includes(q)).slice(0, 4); let matchingDeals = db.deals.filter(d => (d.title + ' ' + d.company).toLowerCase().includes(q)).slice(0, 3); let matchingTasks = db.tasks.filter(t => t.title.toLowerCase().includes(q)).slice(0, 3); searchNode.hidden = false; searchNode.innerHTML = `<div class="global-results-title">SEARCH RESULTS</div>${matchingCustomers.map(c => `<button data-action="global-profile" data-id="${c.id}">${icon('user')}<span><strong>${esc(c.name)}</strong><small>Customer · ${esc(c.company)}</small></span></button>`).join('')}${matchingDeals.map(d => `<button data-page="deals">${icon('chart')}<span><strong>${esc(d.title)}</strong><small>Deal · ${esc(d.company)}</small></span></button>`).join('')}${matchingTasks.map(t => `<button data-page="tasks">${icon('checks')}<span><strong>${esc(t.title)}</strong><small>Task · ${esc(t.owner)}</small></span></button>`).join('')}${!matchingCustomers.length && !matchingDeals.length && !matchingTasks.length ? '<div class="empty" style="padding:20px">No matching records</div>' : ''}`; }
document.addEventListener('click', e => { const el = e.target.closest('[data-action="global-profile"]'); if (el) {
    searchNode.hidden = true;
    $('#globalSearch').value = '';
    profile(el.dataset.id);
} if (!e.target.closest('.global-search'))
    searchNode.hidden = true; });
document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    $('#globalSearch').focus();
    $('#globalSearch').select();
} if (e.key === 'Escape') {
    closeOverlay();
    searchNode.hidden = true;
    $('#quickDropdown').hidden = true;
} });
let draggingDeal = null;
document.addEventListener('dragstart', e => { const c = e.target.closest('[data-deal]'); if (c) {
    draggingDeal = c.dataset.deal;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggingDeal);
} });
document.addEventListener('dragover', e => { const col = e.target.closest('[data-drop-stage]'); if (col) {
    e.preventDefault();
    col.classList.add('drop-over');
} });
document.addEventListener('dragleave', e => { const col = e.target.closest('[data-drop-stage]'); if (col && !col.contains(e.relatedTarget))
    col.classList.remove('drop-over'); });
document.addEventListener('drop', e => { const col = e.target.closest('[data-drop-stage]'); if (!col)
    return; e.preventDefault(); let id = e.dataTransfer.getData('text/plain') || draggingDeal, d = db.deals.find(x => x.id === id); if (d && d.stage !== col.dataset.dropStage) {
    d.stage = col.dataset.dropStage;
    track('Alex Carter moved a deal', d.title + ' → ' + d.stage);
    render();
    toast('Deal moved to ' + d.stage);
}
else
    col.classList.remove('drop-over'); draggingDeal = null; });
$('#menuToggle').addEventListener('click', () => { $('#sidebar').classList.add('open'); $('#mobileShade').classList.add('open'); });
$('#mobileShade').addEventListener('click', () => { $('#sidebar').classList.remove('open'); $('#mobileShade').classList.remove('open'); });
$('#collapseSidebar').addEventListener('click', () => { $('#appShell').classList.toggle('collapsed'); });
window.addEventListener('storage', e => { if (e.key === KEY && e.newValue) {
    try {
        const incoming = JSON.parse(e.newValue);
        if (validStore(incoming)) {
            db = incoming;
            render();
        }
    }
    catch (err) { }
} });
save();
render();
