import { Table } from "@/shared/ui/table/table";
import { QuantityComponent } from "@/shared/ui/table/quantity";
import { TableModel } from "@/shared/ui/table/model/table-model";
import { store } from "@/app/store";
import { mapProductsToTableRows } from "./map-products-to-table-rows";

export function Cart({
  container,
  columns = [],
  footer = {},
  showHeader = true,
  fakeData = [],
}) {
  const cartContainer = document.createElement("div");
  cartContainer.classList.add("cart");

  const initialEmptyRows = [];
  const tableModel = new TableModel(initialEmptyRows);

  const initialData = {
    columns,
    rows: tableModel.getRows(),
    totalAmount: tableModel.calculateTotalAmount(),
    footer,
    showHeader,
  };

  const table = new Table(cartContainer, initialData);

  container.appendChild(cartContainer);

  cartContainer.addEventListener("dataUpdateRequest", (event) => {
    const { action, itemId, newQuantity } = event.detail;

    if (action === "updateQuantity") {
      store.dispatch({
        type: "cart/setQuantity",
        payload: {
          productId: String(itemId),
          quantity: newQuantity,
        },
      });
    }
  });

  store.subscribe("cart", async (newState) => {
    const cartItems = newState.items;
    const cartProducts = newState.products;

    if (fakeData) {
    }

    const newRows = mapProductsToTableRows(cartProducts, cartItems);

    tableModel.setRows(newRows);

    const newTotalAmount = tableModel.calculateTotalAmount();

    table.update({
      rows: newRows,
      totalAmount: newTotalAmount,
    });
  });
}

// const fakeData = [
//   {
//     id: 2,
//     title: "Кешью Отборный Жареный",
//     sku: "0002",
//     subtitle: "Хрустящий кешью, слегка обжаренный без масла.",
//     composition: "Кешью 100%",
//     energy_value: 574,
//     energy_unit: "ккал",
//     shelf_life_days: 240,
//     storage_conditions: "Хранить в герметичной упаковке",
//     weight: 500,
//     weight_unit: "г",
//     price: 990,
//     discount_price: 890,
//     packaging_type_id: 2,
//     status_id: 2,
//     created_at: "2025-10-25T15:45:39.894215+00:00",
//     updated_at: "2025-10-25T15:45:39.894215+00:00",
//     price_unit: "грн",
//     description:
//       '<div class="product-description__text">\r\n    <p class="product-description__paragraph-1">Уже 4000 лет люди питаются ценными <strong class="product-description__accent">грецкими орехами</strong>. Они\r\n        особенно полезны послеоперационным больным,\r\n        детям, кормящим, беременным женщинам. Чтобы вернуть силы, укрепить иммунитет, одолеть туберкулез,\r\n        кашель;\r\n        грецкий орех очищенный, отборный нужно истолочь, смешать с медом (2:1) и чайную ложку целебной смеси\r\n        употреблять перед едой.\r\n    </p>\r\n    <p class="product-description__paragraph-2">В белке грецких орехов много (15 %) аргинина. Он особенно нужен\r\n        детям, больным, пожилым людям,\r\n        в организме\r\n        которых аминокислота плохо синтезируется. Аргинин помогает сосудам регенерировать,\r\n        а всему организму –\r\n        победить воспаления.\r\n    </p>\r\n    <p class="product-description__paragraph-3">\r\n    </p>\r\n    <div class="product-description__title">Другие полезные вещества грецких орехов:</div>\r\n    <ul class="product-description__list">\r\n        <li>Антиоксиданты защищают печень от повреждений</li>\r\n        <li>Полифенолы не дают образоваться сосудистым тромбам</li>\r\n        <li>Нейропротекторы улучшают работу мозга, отодвигают старость</li>\r\n    </ul>\r\n    <div class="product-description__title">Нужно систематически есть грецкие орехи, чтобы:</div>\r\n    <ul class="product-description__list">\r\n        <li>На 30–40 % снизить риск заболевания раком простаты</li>\r\n        <li>На 50 % – раком молочной железы</li>\r\n        <li>Предотвратить дегенерацию глазной макулы, а значит, улучшить зрение</li>\r\n        <li>Отрегулировать обмен веществ, выработку инсулина; понизить количество сахара в крови</li>\r\n    </ul>\r\n    <p></p>\r\n</div>',
//     product_images: [
//       {
//         id: 25,
//         is_main: false,
//         product_id: 2,
//         sort_order: 1,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
//       },
//       {
//         id: 26,
//         is_main: true,
//         product_id: 2,
//         sort_order: 0,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
//       },
//       {
//         id: 27,
//         is_main: false,
//         product_id: 2,
//         sort_order: 2,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
//       },
//       {
//         id: 28,
//         is_main: false,
//         product_id: 2,
//         sort_order: 3,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
//       },
//       {
//         id: 29,
//         is_main: false,
//         product_id: 2,
//         sort_order: 4,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
//       },
//       {
//         id: 30,
//         is_main: false,
//         product_id: 2,
//         sort_order: 5,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
//       },
//     ],
//     product_flavors: [
//       {
//         flavors: {
//           id: 2,
//           name: "Жареный",
//           value: "fried",
//         },
//         flavor_id: 2,
//       },
//       {
//         flavors: {
//           id: 6,
//           name: "Без добавок",
//           value: "without-additives",
//         },
//         flavor_id: 6,
//       },
//     ],
//     packaging_types: {
//       id: 2,
//       name: "вакуумная",
//     },
//     product_statuses: {
//       id: 2,
//       name: "sale",
//     },
//   },
//   {
//     id: 3,
//     title: "Грецкий Орех Аляска",
//     sku: "0003",
//     subtitle: "Крупный грецкий орех в скорлупе, новый урожай.",
//     composition: "Грецкий орех 100%",
//     energy_value: 654,
//     energy_unit: "ккал",
//     shelf_life_days: 450,
//     storage_conditions: "Хранить в скорлупе при t от 0 до 25°C",
//     weight: 1000,
//     weight_unit: "г",
//     price: 750,
//     discount_price: null,
//     packaging_type_id: 3,
//     status_id: 3,
//     created_at: "2025-10-25T15:45:39.894215+00:00",
//     updated_at: "2025-10-25T15:45:39.894215+00:00",
//     price_unit: "грн",
//     description:
//       '<div class="product-description__text">\r\n    <p class="product-description__paragraph-1">Уже 4000 лет люди питаются ценными <strong class="product-description__accent">грецкими орехами</strong>. Они\r\n        особенно полезны послеоперационным больным,\r\n        детям, кормящим, беременным женщинам. Чтобы вернуть силы, укрепить иммунитет, одолеть туберкулез,\r\n        кашель;\r\n        грецкий орех очищенный, отборный нужно истолочь, смешать с медом (2:1) и чайную ложку целебной смеси\r\n        употреблять перед едой.\r\n    </p>\r\n    <p class="product-description__paragraph-2">В белке грецких орехов много (15 %) аргинина. Он особенно нужен\r\n        детям, больным, пожилым людям,\r\n        в организме\r\n        которых аминокислота плохо синтезируется. Аргинин помогает сосудам регенерировать,\r\n        а всему организму –\r\n        победить воспаления.\r\n    </p>\r\n    <p class="product-description__paragraph-3">\r\n    </p>\r\n    <div class="product-description__title">Другие полезные вещества грецких орехов:</div>\r\n    <ul class="product-description__list">\r\n        <li>Антиоксиданты защищают печень от повреждений</li>\r\n        <li>Полифенолы не дают образоваться сосудистым тромбам</li>\r\n        <li>Нейропротекторы улучшают работу мозга, отодвигают старость</li>\r\n    </ul>\r\n    <div class="product-description__title">Нужно систематически есть грецкие орехи, чтобы:</div>\r\n    <ul class="product-description__list">\r\n        <li>На 30–40 % снизить риск заболевания раком простаты</li>\r\n        <li>На 50 % – раком молочной железы</li>\r\n        <li>Предотвратить дегенерацию глазной макулы, а значит, улучшить зрение</li>\r\n        <li>Отрегулировать обмен веществ, выработку инсулина; понизить количество сахара в крови</li>\r\n    </ul>\r\n    <p></p>\r\n</div>',
//     product_images: [
//       {
//         id: 31,
//         is_main: false,
//         product_id: 3,
//         sort_order: 0,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
//       },
//       {
//         id: 33,
//         is_main: true,
//         product_id: 3,
//         sort_order: 2,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
//       },
//       {
//         id: 32,
//         is_main: false,
//         product_id: 3,
//         sort_order: 1,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
//       },
//       {
//         id: 34,
//         is_main: false,
//         product_id: 3,
//         sort_order: 3,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
//       },
//       {
//         id: 35,
//         is_main: false,
//         product_id: 3,
//         sort_order: 4,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
//       },
//       {
//         id: 36,
//         is_main: false,
//         product_id: 3,
//         sort_order: 5,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
//       },
//     ],
//     product_flavors: [
//       {
//         flavors: {
//           id: 1,
//           name: "Сырой",
//           value: "raw",
//         },
//         flavor_id: 1,
//       },
//       {
//         flavors: {
//           id: 5,
//           name: "В скорлупе",
//           value: "shell",
//         },
//         flavor_id: 5,
//       },
//     ],
//     packaging_types: {
//       id: 3,
//       name: "мешочек",
//     },
//     product_statuses: {
//       id: 3,
//       name: "new",
//     },
//   },
//   {
//     id: 4,
//     title: "Арахис Жареный Соленый",
//     sku: "0004",
//     subtitle: "Классический пивной арахис, обжаренный с морской солью.",
//     composition: "Арахис, соль морская",
//     energy_value: 567,
//     energy_unit: "ккал",
//     shelf_life_days: 180,
//     storage_conditions: "Хранить вдали от прямых солнечных лучей",
//     weight: 200,
//     weight_unit: "г",
//     price: 180,
//     discount_price: null,
//     packaging_type_id: 4,
//     status_id: 1,
//     created_at: "2025-10-25T15:45:39.894215+00:00",
//     updated_at: "2025-10-25T15:45:39.894215+00:00",
//     price_unit: "грн",
//     description:
//       '<div class="product-description__text">\r\n    <p class="product-description__paragraph-1">Уже 4000 лет люди питаются ценными <strong class="product-description__accent">грецкими орехами</strong>. Они\r\n        особенно полезны послеоперационным больным,\r\n        детям, кормящим, беременным женщинам. Чтобы вернуть силы, укрепить иммунитет, одолеть туберкулез,\r\n        кашель;\r\n        грецкий орех очищенный, отборный нужно истолочь, смешать с медом (2:1) и чайную ложку целебной смеси\r\n        употреблять перед едой.\r\n    </p>\r\n    <p class="product-description__paragraph-2">В белке грецких орехов много (15 %) аргинина. Он особенно нужен\r\n        детям, больным, пожилым людям,\r\n        в организме\r\n        которых аминокислота плохо синтезируется. Аргинин помогает сосудам регенерировать,\r\n        а всему организму –\r\n        победить воспаления.\r\n    </p>\r\n    <p class="product-description__paragraph-3">\r\n    </p>\r\n    <div class="product-description__title">Другие полезные вещества грецких орехов:</div>\r\n    <ul class="product-description__list">\r\n        <li>Антиоксиданты защищают печень от повреждений</li>\r\n        <li>Полифенолы не дают образоваться сосудистым тромбам</li>\r\n        <li>Нейропротекторы улучшают работу мозга, отодвигают старость</li>\r\n    </ul>\r\n    <div class="product-description__title">Нужно систематически есть грецкие орехи, чтобы:</div>\r\n    <ul class="product-description__list">\r\n        <li>На 30–40 % снизить риск заболевания раком простаты</li>\r\n        <li>На 50 % – раком молочной железы</li>\r\n        <li>Предотвратить дегенерацию глазной макулы, а значит, улучшить зрение</li>\r\n        <li>Отрегулировать обмен веществ, выработку инсулина; понизить количество сахара в крови</li>\r\n    </ul>\r\n    <p></p>\r\n</div>',
//     product_images: [
//       {
//         id: 38,
//         is_main: false,
//         product_id: 4,
//         sort_order: 1,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
//       },
//       {
//         id: 39,
//         is_main: false,
//         product_id: 4,
//         sort_order: 2,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
//       },
//       {
//         id: 41,
//         is_main: false,
//         product_id: 4,
//         sort_order: 4,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
//       },
//       {
//         id: 42,
//         is_main: false,
//         product_id: 4,
//         sort_order: 5,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
//       },
//       {
//         id: 40,
//         is_main: true,
//         product_id: 4,
//         sort_order: 0,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
//       },
//       {
//         id: 37,
//         is_main: false,
//         product_id: 4,
//         sort_order: 3,
//         image_path_png:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
//         image_path_webp:
//           "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
//       },
//     ],
//     product_flavors: [
//       {
//         flavors: {
//           id: 2,
//           name: "Жареный",
//           value: "fried",
//         },
//         flavor_id: 2,
//       },
//       {
//         flavors: {
//           id: 3,
//           name: "Соленый",
//           value: "salted",
//         },
//         flavor_id: 3,
//       },
//     ],
//     packaging_types: {
//       id: 4,
//       name: "контейнер",
//     },
//     product_statuses: {
//       id: 1,
//       name: "regular",
//     },
//   },
// ];
