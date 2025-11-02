import { productsSlice } from "@/entities/product/model/products-slice";
import { productFiltersSlice } from "@/features/product-filters/model/product-filters-slice.js";
import equal from "fast-deep-equal";

class Store {
  constructor() {
    this.state = {};
    this.reducers = {};
    this.listeners = new Map();
  }

  registerSlice(slice) {
    this.state[slice.name] = slice.initialState;
    this.reducers[slice.name] = slice.reducers;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    const [sliceName, reducerName] = action.type.split("/");

    if (!sliceName || !reducerName) {
      console.error(
        `Некорректный action.type: ${action.type}. Ожидается 'slice/reducer'.`
      );
      return;
    }
    const sliceReducers = this.reducers[sliceName];
    if (!sliceReducers || !sliceReducers[reducerName]) {
      console.warn(`Не найден редьюсер ${reducerName} в слайсе ${sliceName}.`);
      return;
    }

    const reducer = sliceReducers[reducerName];
    const prevState = this.state[sliceName];
    const newState = reducer(prevState, action);

    const isEqual = equal(prevState, newState);

    if (isEqual) {
      return;
    }

    this.state[sliceName] = newState;

    console.log("from dispatch. state:", this.state);

    this.notify(sliceName, newState);
  }

  subscribe(sliceName, listener) {
    if (!this.listeners.has(sliceName)) {
      this.listeners.set(sliceName, new Set());
    }

    this.listeners.get(sliceName).add(listener);
    console.log(`Подписана функция на событие: ${sliceName}`);

    const currentState = this.state[sliceName];
    if (currentState !== undefined) {
      listener(currentState);
    }
  }

  unsubscribe(sliceName, listener) {
    if (!this.listeners.has(sliceName)) {
      return;
    }

    this.listeners.get(sliceName).delete(listener);

    if (this.listeners.get(sliceName).size === 0) {
      this.listeners.delete(sliceName);
    }
    console.log(`Отписана функция от события: ${sliceName}`);
  }

  notify(sliceName, data) {
    if (!this.listeners.has(sliceName)) {
      console.log(`Нет подписчиков на событие: ${sliceName}`);
      return;
    }

    console.log(
      `\n=== Оповещение события: ${sliceName} с данными: ${JSON.stringify(
        data
      )} ===`
    );

    this.listeners.get(sliceName).forEach((listener) => {
      listener(data);
    });
  }
}

export const store = new Store();

store.registerSlice(productsSlice);
store.registerSlice(productFiltersSlice);
