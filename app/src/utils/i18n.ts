import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const backendOptions = {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
};

let ready: boolean;
let readyCallback;

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: backendOptions,
        fallbackLng: "fr",
        debug: process.env.isDebug,

        ns: [
            "dashboard",
            "menu",
            "settings",
            "common"
        ],
        defaultNS: "dashboard",

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        react: {
            useSuspense: false,
        },
    })
    .then(() => {
        ready = true;
        if (readyCallback) {
            readyCallback();
        }
    });

export const setCallback = (callback: () => void) => {
    readyCallback = callback;
    if (ready) {
        readyCallback();
    }
};

export default i18n;
