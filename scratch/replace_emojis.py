import os

mapping = {
    '💼': '<i class="bi bi-briefcase-fill"></i>',
    '🎥': '<i class="bi bi-camera-video-fill"></i>',
    '🏆': '<i class="bi bi-trophy-fill"></i>',
    '🤖': '<i class="bi bi-robot"></i>',
    '💻': '<i class="bi bi-laptop"></i>',
    '🧠': '<i class="bi bi-lightbulb-fill"></i>',
    '🏢': '<i class="bi bi-building"></i>',
    '🎨': '<i class="bi bi-palette-fill"></i>',
    '📸': '<i class="bi bi-camera-fill"></i>',
    '🎓': '<i class="bi bi-mortarboard-fill"></i>',
    '⚙️': '<i class="bi bi-gear-fill"></i>',
    '⚙': '<i class="bi bi-gear-fill"></i>',
    '🛠️': '<i class="bi bi-tools"></i>',
    '🛠': '<i class="bi bi-tools"></i>',
    '🎬': '<i class="bi bi-film"></i>',
    '⚡': '<i class="bi bi-lightning-fill"></i>',
    '📖': '<i class="bi bi-book-half"></i>',
    '💬': '<i class="bi bi-chat-dots-fill"></i>',
    '🚀': '<i class="bi bi-rocket-takeoff-fill"></i>',
    '✨': '<i class="bi bi-stars"></i>',
    '✅': '<i class="bi bi-check-circle-fill"></i>',
    '📱': '<i class="bi bi-phone"></i>',
    '🔧': '<i class="bi bi-wrench"></i>',
    '🚗': '<i class="bi bi-car-front-fill"></i>',
    '📊': '<i class="bi bi-bar-chart-fill"></i>',
    '🔍': '<i class="bi bi-search"></i>',
    '🌐': '<i class="bi bi-globe"></i>',
    '🛡️': '<i class="bi bi-shield-lock-fill"></i>',
    '🛡': '<i class="bi bi-shield-lock-fill"></i>',
    '🌟': '<i class="bi bi-star-fill"></i>',
    '💡': '<i class="bi bi-lightbulb"></i>',
    '🎯': '<i class="bi bi-bullseye"></i>',
    '📈': '<i class="bi bi-graph-up-arrow"></i>',
    '🤝': '<i class="bi bi-people-fill"></i>',
    '📝': '<i class="bi bi-journal-text"></i>'
}

count = 0
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root: continue
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            original_content = content
            for emoji, icon in mapping.items():
                content = content.replace(emoji, icon)
            if content != original_content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
                count += 1
                print(f'Updated {path}')
print(f'Total files updated: {count}')
