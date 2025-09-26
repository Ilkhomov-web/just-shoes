import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      brand: "Just Shoes",
      callNumber: "+99890 311 22 11",
      allProducts: "All Products",
      heroTitle: "Advertise in the most visible places of Jizzakh.",
      heroSubtitle: "Placement, design, and monitoring — we handle everything!",
      language: {
        english: "English",
        russian: "Russian",
        uzbek: "Uzbek",
      },
    },
  },
  ru: {
    translation: {
      brand: "Just Shoes",
      callNumber: "+99890 311 22 11",
      allProducts: "Все товары",
      heroTitle: "Рекламируйтесь в самых заметных местах Джизака.",
      heroSubtitle: "Размещение, дизайн и мониторинг — всё возьмём на себя!",
      language: {
        english: "Английский",
        russian: "Русский",
        uzbek: "Узбекский",
      },
    },
  },
  uz: {
    translation: {
      brand: "Just Shoes",
      callNumber: "+99890 311 22 11",
      allProducts: "Barcha Mahsulotlar",
      heroTitle: "Jizzaxning eng ko‘rinadigan joylarida reklama qiling.",
      heroSubtitle: "Joylashuv, dizayn va monitoring — barchasini biz bajaramiz!",
      language: {
        english: "Inglizcha",
        russian: "Ruscha",
        uzbek: "O‘zbekcha",
      },
    },
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "uz",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18next;


