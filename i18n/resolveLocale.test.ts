import assert from "node:assert/strict";
import test from "node:test";
import { resolveLocale } from "./resolveLocale";
import { replaceLocaleInPathname } from "./pathLocale";

test("saved locale wins over country and browser", () => {
  assert.equal(
    resolveLocale({ savedLocale: "en", country: "BR", browserLocale: "pt-BR" }),
    "en",
  );
});

test("country BR wins over English browser language", () => {
  assert.equal(
    resolveLocale({ savedLocale: undefined, country: "BR", browserLocale: "en-US" }),
    "pt-BR",
  );
});

test("country RU wins over English browser language", () => {
  assert.equal(
    resolveLocale({ savedLocale: undefined, country: "RU", browserLocale: "en-US" }),
    "ru",
  );
});

test("browser es-MX maps to es when country is missing", () => {
  assert.equal(
    resolveLocale({ savedLocale: undefined, country: undefined, browserLocale: "es-MX" }),
    "es",
  );
});

test("unknown browser language falls back to English", () => {
  assert.equal(
    resolveLocale({ savedLocale: undefined, country: undefined, browserLocale: "ja-JP" }),
    "en",
  );
});

test("invalid saved locale is ignored and country is used", () => {
  assert.equal(
    resolveLocale({ savedLocale: "idioma-invalido", country: "BR", browserLocale: "en-US" }),
    "pt-BR",
  );
});

test("replaceLocaleInPathname keeps the rest of the route", () => {
  assert.equal(replaceLocaleInPathname("/pt-br/sobre", "ru"), "/ru/sobre");
  assert.equal(replaceLocaleInPathname("/en", "es"), "/es");
  assert.equal(replaceLocaleInPathname("/pt-br/sobre", "th"), "/th/sobre");
  assert.equal(replaceLocaleInPathname("/th/about", "vi"), "/vi/about");
});

test("country TH maps to Thai", () => {
  assert.equal(
    resolveLocale({ savedLocale: undefined, country: "TH", browserLocale: "en-US" }),
    "th",
  );
});

test("country VN maps to Vietnamese", () => {
  assert.equal(
    resolveLocale({ savedLocale: undefined, country: "VN", browserLocale: "en-US" }),
    "vi",
  );
});

test("browser th-TH and vi-VN normalize to th and vi", () => {
  assert.equal(
    resolveLocale({ savedLocale: undefined, country: undefined, browserLocale: "th-TH" }),
    "th",
  );
  assert.equal(
    resolveLocale({ savedLocale: undefined, country: undefined, browserLocale: "vi-VN" }),
    "vi",
  );
});
