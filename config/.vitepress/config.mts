import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "../md",

  title: "Fabric Docs",
  description: "Documentation for the discord bot Fabric",
  themeConfig: {
    siteTitle: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/guide/getting-started" },
      { text: "Commands", link: "/commands/" },
      { text: "Invite", link: "https://discord.com/oauth2/authorize?client_id=1226510987407130624" },
      { text: "Support", link: "https://discord.gg/BKuQvPrUQR" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
