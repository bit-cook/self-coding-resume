# Code Myself Resume 🚀

An interactive code-style resume template built with **Vue 3 + Vite + TypeScript**.

[Live Demo](https://yourusername.github.io/code-myself-resume)

![preview](https://via.placeholder.com/800x400/0a192f/64ffda?text=Code+Myself+Preview)

## ✨ Features

- 🎬 **Typing Animation** - Code appears character by character
- 🎨 **3D Effects** - Perspective transform on the code editor
- 📱 **Responsive** - Works on desktop and mobile devices
- 🌙 **Dark Theme** - Beautiful dark code editor with syntax highlighting
- ⚡ **Fast** - Built with Vite for lightning-fast development

## 🛠️ Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Marked (Markdown parser)
- PrismJS (Syntax highlighting)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/code-myself-resume.git
cd code-myself

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Customize Your Resume

Edit `src/App.vue` and modify the `fullMarkdown` variable:

```typescript
const fullMarkdown = `Your Name
====

Contact
====
* Email: your@email.com
* Phone: +1 234 567 8900

... and so on
`
```

Also update the `CONFIG` object at the top:

```typescript
const CONFIG = {
  name: 'Your Name',
  interval: 40, // Typing speed
}
```

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── StyleEditor.vue    # Code display component
│   │   └── ResumeEditor.vue   # Resume display component
│   ├── assets/
│   │   └── reset.css          # CSS reset
│   ├── App.vue                # Main application
│   └── main.ts                # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🌐 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to Settings > Pages
3. Select source as "GitHub Actions"
4. Use the following workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📄 License

MIT License - feel free to use this for your own resume!

## 🙏 Credits

Inspired by [strml.net](http://strml.net/) by Samuel Reed
