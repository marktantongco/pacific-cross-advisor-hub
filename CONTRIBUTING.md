# Contributing to Pacific Cross Advisor Hub

First off, thank you for considering contributing to this project! 🎉

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🤔 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots or animated GIFs if helpful**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain the desired behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the TypeScript style guidelines
- Document new code
- End all files with a newline

## 🛠 Development Setup

### Prerequisites

- Node.js 18+ or Bun
- Git
- A code editor (VS Code recommended)

### Setting Up Your Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/pacific-cross-advisor-hub.git
   cd pacific-cross-advisor-hub
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Setup Database**
   ```bash
   bun run db:push
   bun run db:seed
   ```

4. **Start Development Server**
   ```bash
   bun run dev
   ```

5. **Run Tests**
   ```bash
   bun run lint
   ```

## 📝 Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Style Guide

- Use TypeScript for all new code
- Use meaningful variable names
- Add JSDoc comments for public functions
- Follow ESLint rules

### Component Guidelines

- Use functional components with hooks
- Use named exports for components
- Keep components small and focused
- Use shadcn/ui components when possible

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages and APIs
│   ├── api/         # API routes
│   └── page.tsx     # Main page component
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
└── lib/             # Utilities and database
```

## 🧪 Testing

Before submitting a pull request:

1. Run linting: `bun run lint`
2. Build the project: `bun run build`
3. Test on different screen sizes

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Prisma Documentation](https://www.prisma.io/docs)

## ❓ Questions?

Feel free to open an issue with the "question" label, or reach out to the maintainers.

---

Thank you for your contributions! 💪
