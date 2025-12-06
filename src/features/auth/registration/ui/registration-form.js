import { initUploadPhoto } from "@/shared/ui/upload-photo/upload-photo.js";
import { initDropdown } from "@/shared/ui/dropdown/dropdown";
import {
  REG_FORM_SELECTORS,
  initRegistrationFormValidation,
} from "@/features/auth/registration/model/validation/registration";
import { groupRegistrationData } from "@/features/auth/registration/lib/registration-data-mapper";
import { registerUser, logoutUser } from "@/entities/auth/model/auth-slice";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { store } from "@/app/store";
import { AUTH_STATUS } from "@/entities/auth/model/auth-slice";
import { redirect } from "@/shared/helpers/redirect";
import { REQUIRED_RULE } from "../../../../shared/lib/just-validate/rules";

const mode = import.meta.env.MODE;
let baseUrl = mode === "production" ? "/nuts/" : import.meta.env.BASE_URL;

const countries = [
  { id: 1, value: "UA", label: "Украина" },
  { id: 5, value: "BE", label: "Бельгия" },
  { id: 9, value: "CZ", label: "Чехия" },
  { id: 31, value: "PL", label: "Польша" },
  { id: 10, value: "ES", label: "Испания" },
  { id: 11, value: "IT", label: "Италия" },
  { id: 12, value: "DE", label: "Германия" },
  { id: 13, value: "NL", label: "Нидерланды" },
  { id: 14, value: "PT", label: "Португалия" },
  { id: 15, value: "SE", label: "Швеция" },
];

const regionsByCountry = {
  UA: [
    { id: 1, value: "vinnytsia", label: "Винницкая область" },
    { id: 2, value: "volyn", label: "Волынская область" },
    { id: 3, value: "dnipropetrovsk", label: "Днепропетровская область" },
    { id: 4, value: "donetsk", label: "Донецкая область" },
    { id: 5, value: "zhytomyr", label: "Житомирская область" },
    { id: 6, value: "zakarpattia", label: "Закарпатская область" },
    { id: 7, value: "zaporizhzhia", label: "Запорожская область" },
    { id: 8, value: "ivano-frankivsk", label: "Ивано-Франковская область" },
    { id: 9, value: "kyiv-oblast", label: "Киевская область" },
    { id: 10, value: "kirovohrad", label: "Кировоградская область" },
    { id: 11, value: "luhansk", label: "Луганская область" },
    { id: 12, value: "lviv", label: "Львовская область" },
    { id: 13, value: "mykolaiv", label: "Николаевская область" },
    { id: 14, value: "odesa", label: "Одесская область" },
    { id: 15, value: "poltava", label: "Полтавская область" },
    { id: 16, value: "rivne", label: "Ровненская область" },
    { id: 17, value: "sumy", label: "Сумская область" },
    { id: 18, value: "ternopil", label: "Тернопольская область" },
    { id: 19, value: "kharkiv", label: "Харьковская область" },
    { id: 20, value: "kherson", label: "Херсонская область" },
    { id: 21, value: "khmelnytskyi", label: "Хмельницкая область" },
    { id: 22, value: "cherkasy", label: "Черкасская область" },
    { id: 23, value: "chernivtsi", label: "Черновицкая область" },
    { id: 24, value: "chernihiv", label: "Черниговская область" },
  ],
  BE: [
    { id: 1, value: "antwerpen", label: "Антверпен" },
    { id: 2, value: "limburg", label: "Лимбург" },
    { id: 3, value: "oost-vlaanderen", label: "Восточная Фландрия" },
    { id: 4, value: "vlaams-brabant", label: "Фламандский Брабант" },
    { id: 5, value: "west-vlaanderen", label: "Западная Фландрия" },

    { id: 6, value: "waals-brabant", label: "Валлонский Брабант" },
    { id: 7, value: "henegouwen", label: "Эно" },
    { id: 8, value: "luik", label: "Льеж" },
    { id: 9, value: "luxemburg", label: "Люксембург" },
    { id: 10, value: "namen", label: "Намюр" },
  ],
  CZ: [
    { id: 1, value: "hlavni-mesto-praha", label: "Прага" },
    { id: 2, value: "stredocesky-kraj", label: "Среднечешский край" },
    { id: 3, value: "jihocesky-kraj", label: "Южночешский край" },
    { id: 4, value: "plzensky-kraj", label: "Пльзеньский край" },
    { id: 5, value: "karlovarsky-kraj", label: "Карловарский край" },
    { id: 6, value: "ustecky-kraj", label: "Устецкий край" },
    { id: 7, value: "liberecky-kraj", label: "Либерецкий край" },
    { id: 8, value: "kralovehradecky-kraj", label: "Краловеградецкий край" },
    { id: 9, value: "pardubicky-kraj", label: "Пардубицкий край" },
    { id: 10, value: "vysocina", label: "Край Высочина" },
    { id: 11, value: "jihomoravsky-kraj", label: "Южноморавский край" },
    { id: 12, value: "olomoucky-kraj", label: "Оломоуцкий край" },
    { id: 13, value: "zlinsky-kraj", label: "Злинский край" },
    { id: 14, value: "moravskoslezsky-kraj", label: "Моравскосилезский край" },
  ],
  PL: [
    { id: 1, value: "dolnoslaskie", label: "Нижнесилезское воеводство" },
    {
      id: 2,
      value: "kujawsko-pomorskie",
      label: "Куявско-Поморское воеводство",
    },
    { id: 3, value: "lubelskie", label: "Люблинское воеводство" },
    { id: 4, value: "lubuskie", label: "Любушское воеводство" },
    { id: 5, value: "lodzkie", label: "Лодзинское воеводство" },
    { id: 6, value: "malopolskie", label: "Малопольское воеводство" },
    { id: 7, value: "mazowieckie", label: "Мазовецкое воеводство" },
    { id: 8, value: "opolskie", label: "Опольское воеводство" },
    { id: 9, value: "podkarpackie", label: "Подкарпатское воеводство" },
    { id: 10, value: "podlaskie", label: "Подляское воеводство" },
    { id: 11, value: "pomorskie", label: "Поморское воеводство" },
    { id: 12, value: "slaskie", label: "Силезское воеводство" },
    { id: 13, value: "swietokrzyskie", label: "Свентокшиское воеводство" },
    {
      id: 14,
      value: "warminsko-mazurskie",
      label: "Варминьско-Мазурское воеводство",
    },
    { id: 15, value: "wielkopolskie", label: "Великопольское воеводство" },
    {
      id: 16,
      value: "zachodniopomorskie",
      label: "Западнопоморское воеводство",
    },
  ],
  ES: [
    { id: 1, value: "andalucia", label: "Андалусия" },
    { id: 2, value: "aragon", label: "Арагон" },
    { id: 3, value: "asturias", label: "Астурия" },
    { id: 4, value: "baleares", label: "Балеарские острова" },
    { id: 5, value: "canarias", label: "Канарские острова" },
    { id: 6, value: "cantabria", label: "Кантабрия" },
    { id: 7, value: "castilla-la-mancha", label: "Кастилия-Ла-Манча" },
    { id: 8, value: "castilla-y-leon", label: "Кастилия и Леон" },
    { id: 9, value: "catalunya", label: "Каталония" },
    { id: 10, value: "extremadura", label: "Эстремадура" },
    { id: 11, value: "galicia", label: "Галисия" },
    { id: 12, value: "madrid", label: "Мадрид" },
    { id: 13, value: "murcia", label: "Мурсия" },
    { id: 14, value: "navarra", label: "Наварра" },
    { id: 15, value: "pais-vasco", label: "Страна Басков" },
    { id: 16, value: "la-rioja", label: "Ла-Риоха" },
    { id: 17, value: "ceuta-melilla", label: "Сеута и Мелилья" },
  ],
  IT: [
    { id: 1, value: "abruzzo", label: "Абруццо" },
    { id: 2, value: "basilicata", label: "Базиликата" },
    { id: 3, value: "calabria", label: "Калабрия" },
    { id: 4, value: "campania", label: "Кампания" },
    { id: 5, value: "emilia-romagna", label: "Эмилия-Романья" },
    { id: 6, value: "friuli-venezia-giulia", label: "Фриули-Венеция-Джулия" },
    { id: 7, value: "lazio", label: "Лацио" },
    { id: 8, value: "liguria", label: "Лигурия" },
    { id: 9, value: "lombardia", label: "Ломбардия" },
    { id: 10, value: "marche", label: "Марке" },
    { id: 11, value: "molise", label: "Молизе" },
    { id: 12, value: "piemonte", label: "Пьемонт" },
    { id: 13, value: "puglia", label: "Апулия" },
    { id: 14, value: "sardegna", label: "Сардиния" },
    { id: 15, value: "sicilia", label: "Сицилия" },
    { id: 16, value: "toscana", label: "Тоскана" },
    { id: 17, value: "trentino-alto-adige", label: "Трентино-Альто-Адидже" },
    { id: 18, value: "umbria", label: "Умбрия" },
    { id: 19, value: "valle-d-aosta", label: "Валле-д’Аоста" },
    { id: 20, value: "veneto", label: "Венето" },
  ],
  DE: [
    { id: 1, value: "baden-wurttemberg", label: "Баден-Вюртемберг" },
    { id: 2, value: "bayern", label: "Бавария" },
    { id: 3, value: "berlin", label: "Берлин" },
    { id: 4, value: "brandenburg", label: "Бранденбург" },
    { id: 5, value: "bremen", label: "Бремен" },
    { id: 6, value: "hamburg", label: "Гамбург" },
    { id: 7, value: "hessen", label: "Гессен" },
    {
      id: 8,
      value: "mecklenburg-vorpommern",
      label: "Мекленбург-Передняя Померания",
    },
    { id: 9, value: "niedersachsen", label: "Нижняя Саксония" },
    { id: 10, value: "nordrhein-westfalen", label: "Северный Рейн-Вестфалия" },
    { id: 11, value: "rheinland-pfalz", label: "Рейнланд-Пфальц" },
    { id: 12, value: "saarland", label: "Саар" },
    { id: 13, value: "sachsen", label: "Саксония" },
    { id: 14, value: "sachsen-anhalt", label: "Саксония-Анхальт" },
    { id: 15, value: "schleswig-holstein", label: "Шлезвиг-Гольштейн" },
    { id: 16, value: "thuringen", label: "Тюрингия" },
  ],
  NL: [
    { id: 1, value: "drenthe", label: "Дренте" },
    { id: 2, value: "flevoland", label: "Флеволанд" },
    { id: 3, value: "friesland", label: "Фрисландия" },
    { id: 4, value: "gelderland", label: "Гелдерланд" },
    { id: 5, value: "groningen", label: "Гронинген" },
    { id: 6, value: "limburg", label: "Лимбург" },
    { id: 7, value: "noord-brabant", label: "Северный Брабант" },
    { id: 8, value: "noord-holland", label: "Северная Голландия" },
    { id: 9, value: "overijssel", label: "Оверэйссел" },
    { id: 10, value: "utrecht", label: "Утрехт" },
    { id: 11, value: "zeeland", label: "Зеландия" },
    { id: 12, value: "zuid-holland", label: "Южная Голландия" },
  ],
  PT: [
    { id: 1, value: "aveiro", label: "Авейру" },
    { id: 2, value: "beja", label: "Бежа" },
    { id: 3, value: "braga", label: "Брага" },
    { id: 4, value: "braganca", label: "Браганса" },
    { id: 5, value: "castelo-branco", label: "Каштелу-Бранку" },
    { id: 6, value: "coimbra", label: "Коимбра" },
    { id: 7, value: "faro", label: "Фару" },
  ],
  SE: [
    { id: 1, value: "blekinge", label: "Блекинге" },
    { id: 2, value: "dalarnas", label: "Даларна" },
    { id: 3, value: "gotland", label: "Готланд" },
    { id: 4, value: "gavleborgs", label: "Гевлеборг" },
    { id: 5, value: "halland", label: "Халланд" },
    { id: 6, value: "jamtland", label: "Йемтланд" },
    { id: 7, value: "jonkoping", label: "Юнчёпинг" },
    { id: 8, value: "kalmar", label: "Кальмар" },
    { id: 9, value: "kronoberg", label: "Кроноберг" },
    { id: 10, value: "norrbotten", label: "Норрботтен" },
    { id: 11, value: "ostergotland", label: "Эстергётланд" },
    { id: 12, value: "skane", label: "Сконе" },
    { id: 13, value: "sodermanland", label: "Сёдерманланд" },
    { id: 14, value: "stockholm", label: "Стокгольм" },
    { id: 15, value: "uppsala", label: "Уппсала" },
    { id: 16, value: "varmland", label: "Вермланд" },
    { id: 17, value: "vasternorrland", label: "Вестерноррланд" },
    { id: 18, value: "vastmanland", label: "Вестманланд" },
    { id: 19, value: "vastra-gotaland", label: "Вестра-Гёталанд" },
    { id: 20, value: "orebro", label: "Эребру" },
  ],
};

export const initRegistrationForm = () => {
  const registrationValidator = initRegistrationFormValidation().onSuccess(
    async (event) => {
      event.preventDefault();

      const form = document.querySelector(REG_FORM_SELECTORS.FORM);
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const finalPayload = groupRegistrationData(payload);

      const overlay = createOverlaySpinner({successText:"Регистрация прошла успешно!"});

      store.subscribe("auth", async (newState) => {
        if (newState.status === AUTH_STATUS.LOADING) {
          overlay.show();
        }
        if (newState.status === AUTH_STATUS.SUCCEEDED) {
          overlay.success();
          redirect(baseUrl, 2000);
          //TODO: clearForm
        }
      });

      const signUpData = await registerUser(finalPayload);
    }
  );

  initUploadPhoto();

  const regionDropdown = initDropdown({
    selector: ".registration-form__region-dropdown",
    disabled: true,
  });

  initDropdown({
    selector: ".registration-form__country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(
        value,
        regionDropdown,
        regionsByCountry,
        registrationValidator,
        REG_FORM_SELECTORS.REGION
      );
    },
  });

  const fopRegionDropdown = initDropdown({
    selector: ".registration-form__fop-region-dropdown",
    disabled: true,
  });

  initDropdown({
    selector: ".registration-form__fop-country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(
        value,
        fopRegionDropdown,
        regionsByCountry,
        registrationValidator,
        REG_FORM_SELECTORS.FOP_REGION
      );
    },
  });

  const legalEntityRegionDropdown = initDropdown({
    selector: ".registration-form__legal-entity-region-dropdown",
    disabled: true,
  });

  initDropdown({
    selector: ".registration-form__legal-entity-country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(
        value,
        legalEntityRegionDropdown,
        regionsByCountry,
        REG_FORM_SELECTORS.LEGAL_REGION
      );
    },
  });

  initPersonTypeSwitcher(registrationValidator);
};

function initPersonTypeSwitcher(validator) {
  const radios = document.querySelectorAll('input[name="person_type"]');
  const fop = document.querySelector(".fop-entity");
  const legal = document.querySelector(".legal-entity");

  const toggleFieldsDisabled = (container, isDisabled) => {
    if (!container) {
      return;
    }

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      field.disabled = isDisabled;
    });
  };

  const clearCustomDropdownFormFields = (container) => {
    if (!container) {
      return;
    }
    const dropdownFields = container.querySelectorAll(".dropdown_select");

    dropdownFields.forEach((dropdown) => {
      const selected = dropdown.querySelector(".dropdown__selected");
      const selectedOption = dropdown.querySelector(
        '.dropdown__option[aria-selected="true"]'
      );

      selected.innerHTML = selected.dataset.placeholder;

      if (selectedOption) {
        selectedOption.removeAttribute("aria-selected");
      }
    });
  };
  const clearFormFields = (container) => {
    if (!container) {
      return;
    }

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      } else {
        field.value = "";
      }
    });

    clearCustomDropdownFormFields(container);
  };

  let prevValue = "";

  const updateVisibility = (value) => {
    clearFormFields(fop);
    clearFormFields(legal);

    if (prevValue === "fop") {
      removeFopValidationFields(validator);
    }

    if (prevValue === "legal") {
      removeLegalValidationFields(validator);
    }

    toggleFieldsDisabled(fop, true);
    toggleFieldsDisabled(legal, true);

    fop.classList.add("hidden");
    legal.classList.add("hidden");

    if (value === "fop") {
      fop.classList.remove("hidden");
      toggleFieldsDisabled(fop, false);
      addFopValidationFields(validator);
    }
    if (value === "legal") {
      legal.classList.remove("hidden");
      toggleFieldsDisabled(legal, false);
      addLegalValidationFields(validator);
    }

    prevValue = value;
  };

  radios.forEach((radio) => {
    radio.addEventListener("change", () => updateVisibility(radio.value));
  });

  const checked = document.querySelector('input[name="person_type"]:checked');
  if (checked) {
    updateVisibility(checked.value);
  }
}

function updateDependentDropdown(
  value,
  targetDropdown,
  dataMap,
  validator,
  validateField
) {
  const options = dataMap[value] || [];

  targetDropdown.updateOptions(options);

  if (options.length > 0) {
    targetDropdown.setDisabled(false);
  } else {
    targetDropdown.setDisabled(true);
  }
}

function addFopValidationFields(validator) {
  const fields = [
    [REG_FORM_SELECTORS.FOP_COUNTRY, [REQUIRED_RULE]],
    [REG_FORM_SELECTORS.FOP_REGION, [REQUIRED_RULE]],
    [REG_FORM_SELECTORS.FOP_CITY, [REQUIRED_RULE]],
  ];

  fields.forEach((field) => {
    validator.addField(field[0], field[1]);
  });
}

function removeFopValidationFields(validator) {
  const fields = [
    REG_FORM_SELECTORS.FOP_COUNTRY,
    REG_FORM_SELECTORS.FOP_REGION,
    REG_FORM_SELECTORS.FOP_CITY,
  ];

  fields.forEach((field) => {
    validator.removeField(field);
  });
}

function addLegalValidationFields(validator) {
  const fields = [
    [REG_FORM_SELECTORS.LEGAL_COUNTRY, [REQUIRED_RULE]],
    [REG_FORM_SELECTORS.LEGAL_REGION, [REQUIRED_RULE]],
    [REG_FORM_SELECTORS.LEGAL_CITY, [REQUIRED_RULE]],
  ];

  fields.forEach((field) => {
    validator.addField(field[0], field[1]);
  });
}

function removeLegalValidationFields(validator) {
  const fields = [
    REG_FORM_SELECTORS.LEGAL_COUNTRY,
    REG_FORM_SELECTORS.LEGAL_REGION,
    REG_FORM_SELECTORS.LEGAL_CITY,
  ];

  fields.forEach((field) => {
    validator.removeField(field);
  });
}
