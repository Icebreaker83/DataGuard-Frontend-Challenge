# DataGuard frontend challenge

This is the project that was created as a part of the technical interview. Because of the deadline certain features, such as testing, are not implemented fully.  
Better test code coverage is needed. Current tests are implemented as a PoC.

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Vuetify development.

## ✨ Features

- 🖼️ **Optimized Front-End Stack**: Leverage the latest Vue 3 and Vuetify 3 for a modern, reactive UI development experience. [Vue 3](https://v3.vuejs.org/) | [Vuetify 3](https://vuetifyjs.com/en/)
- 🗃️ **State Management**: Integrated with [Pinia](https://pinia.vuejs.org/), the intuitive, modular state management solution for Vue.
- 🚦 **Routing and Layouts**: Utilizes Vue Router for SPA navigation and vite-plugin-vue-layouts for organizing Vue file layouts. [Vue Router](https://router.vuejs.org/) | [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- 💻 **Enhanced Development Experience**: Benefit from TypeScript's static type checking and the ESLint plugin suite for Vue, ensuring code quality and consistency. [TypeScript](https://www.typescriptlang.org/) | [ESLint Plugin Vue](https://eslint.vuejs.org/)
- ⚡ **Next-Gen Tooling**: Powered by Vite, experience fast cold starts and instant HMR (Hot Module Replacement). [Vite](https://vitejs.dev/)
- 🧩 **Automated Component Importing**: Streamline your workflow with unplugin-vue-components, automatically importing components as you use them. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- 🛠️ **Strongly-Typed Vue**: Use vue-tsc for type-checking your Vue components, and enjoy a robust development experience. [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc)

These features are curated to provide a seamless development experience from setup to deployment, ensuring that your Vuetify application is both powerful and maintainable.

## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```npm
npm run dev
```
### Testing

Tests are implemented with [Vitest](https://vitest.dev/).
To execute tests, run the following command: 

```npm
npm run test
```

To check test code coverage, run the following command:

```npm
npm run coverage
```

(Repeat for yarn, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.

### Building for Production

To build your project for production, use:

```bash
npm run build
```

(Repeat for yarn, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.

## ❗️ Important Links

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

## 📑 License
[MIT](http://opensource.org/licenses/MIT)
