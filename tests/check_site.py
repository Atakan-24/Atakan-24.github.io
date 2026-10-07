"""Check the bilingual static site's navigation, downloads and active surface."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = set()
        self.links = []
        self.projects = 0
        self.scripts = 0
        self.lang = None
        self.h1 = 0

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate ID in {self.path}'
            self.ids.add(attrs['id'])
        if tag == 'html':
            self.lang = attrs.get('lang')
        if tag == 'h1':
            self.h1 += 1
        if tag == 'script':
            self.scripts += 1
        if tag == 'article' and attrs.get('class') == 'project':
            self.projects += 1
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])


pages = {}
for path in ROOT.rglob('*.html'):
    page = Page(path)
    page.feed(path.read_text(encoding='utf-8'))
    assert page.h1 == 1 and page.scripts == 0, path
    pages[path.resolve()] = page

for path, page in pages.items():
    for link in page.links:
        url = urlsplit(link)
        assert url.scheme in ('', 'https', 'mailto'), f'Unsafe link: {link}'
        if url.scheme or url.netloc:
            continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        if target.is_dir():
            target = target / 'index.html'
        assert target.is_relative_to(ROOT), f'Link leaves site: {link}'
        assert target.is_file(), f'Missing local target: {link} in {path.name}'
        if url.fragment:
            assert url.fragment in pages[target].ids, f'Missing anchor: {link}'

for file, lang in [('index.html', 'en'), ('de/index.html', 'de')]:
    page = pages[(ROOT / file).resolve()]
    assert page.lang == lang and page.projects == 4
    assert {'projects', 'experience', 'cv', 'contact'} <= page.ids

print(f'{len(pages)} HTML pages: local links, anchors, languages, four selected projects and script-free surface passed.')
