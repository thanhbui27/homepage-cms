export default {
  config: {
    locales: ["vn"],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Homepage CTS Dashboard",
        "Auth.form.welcome.title": "Chào mừng đến với CTS",
        "Auth.form.welcome.subtitle":
          "Đăng nhập với tài khoản Homepage CTS admin",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  bootstrap() {},
};
