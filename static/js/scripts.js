const sectionNames = ['home', 'projects', 'reading', 'experiments', 'awards'];

async function getText(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Unable to load ' + path);
    return response.text();
}

function openHashTarget() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    if (target.matches('details')) target.open = true;
    target.scrollIntoView({ block: 'start' });
}

async function loadSection(name) {
    const container = document.getElementById(name + '-md');
    try {
        container.innerHTML = marked.parse(await getText('contents/' + name + '.md'));
        container.querySelectorAll('table').forEach(table => {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-scroll';
            wrapper.tabIndex = 0;
            wrapper.setAttribute('role', 'region');
            wrapper.setAttribute('aria-label', '实验指标表，可横向滚动');
            table.before(wrapper);
            wrapper.append(table);
        });
    } catch (error) {
        container.replaceChildren();
        const message = document.createElement('p');
        message.textContent = '这部分内容暂时无法加载，请刷新页面重试，或直接查看 ';
        const link = document.createElement('a');
        link.href = 'contents/' + name + '.md';
        link.textContent = 'Markdown 原文';
        message.append(link);
        container.append(message);
        console.error(error);
    }
}

async function loadCatalog() {
    const status = document.getElementById('paper-count');
    const list = document.getElementById('paper-list');
    const search = document.getElementById('paper-search');
    const topic = document.getElementById('paper-topic');
    try {
        const papers = JSON.parse(await getText('contents/papers.json'));
        const render = () => {
            const term = search.value.trim().toLocaleLowerCase();
            const filtered = papers.filter(p =>
                (!topic.value || p.tags.includes(topic.value)) &&
                (p.title + ' ' + p.tags.join(' ')).toLocaleLowerCase().includes(term));
            status.textContent = filtered.length
                ? '显示 ' + filtered.length + ' / ' + papers.length + ' 篇论文'
                : '没有匹配的论文，请更换关键词或选择全部主题。';
            const fragment = document.createDocumentFragment();
            filtered.forEach(p => {
                const row = document.createElement('li');
                const title = document.createElement(p.note ? 'a' : 'span');
                title.textContent = p.title;
                if (p.note) {
                    title.href = p.note;
                    title.addEventListener('click', () => {
                        const target = document.querySelector(p.note);
                        if (target) target.open = true;
                    });
                }
                const tags = document.createElement('small');
                tags.textContent = p.tags.join(' · ') + (p.note ? ' · 有导读' : '');
                row.append(title, tags);
                fragment.append(row);
            });
            list.replaceChildren(fragment);
        };
        search.addEventListener('input', render);
        topic.addEventListener('change', render);
        render();
    } catch (error) {
        status.textContent = '论文清单暂时无法加载，请刷新页面重试。';
        search.disabled = true;
        topic.disabled = true;
        console.error(error);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('navbarResponsive');
            if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
        });
    });
    // The legacy academic-homepage anchor now points to reading.
    if (location.hash === '#publications') history.replaceState(null, '', '#reading');
    const configPromise = getText('contents/config.yml').then(text => {
        const config = jsyaml.load(text);
        Object.entries(config).forEach(([key, value]) => {
            const target = document.getElementById(key);
            if (target) target.innerHTML = value;
        });
    }).catch(console.error);
    marked.use({ mangle: false, headerIds: false });
    await Promise.all([...sectionNames.map(loadSection), loadCatalog(), configPromise]);
    if (window.MathJax && MathJax.startup) {
        try {
            await MathJax.startup.promise;
            await MathJax.typesetPromise();
        } catch (error) {
            console.error('Math rendering unavailable:', error);
        }
    }
    document.documentElement.dataset.loaded = 'true';
    openHashTarget();
    window.addEventListener('hashchange', openHashTarget);
});
