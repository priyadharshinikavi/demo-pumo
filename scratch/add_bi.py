import os

link_tag = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">'

count = 0
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root: continue
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            if 'bootstrap-icons.min.css' not in content:
                # Find </head> and insert before it
                new_content = content.replace('</head>', f'  {link_tag}\n</head>')
                
                # Fallback if </head> is missing but there is <body
                if new_content == content and '<body' in content:
                    new_content = content.replace('<body', f'{link_tag}\n<body')

                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    count += 1
                    print(f'Added BI to {path}')

print(f'Total files updated: {count}')
