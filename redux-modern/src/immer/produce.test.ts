import { configureStore } from "@reduxjs/toolkit";
import { immerSlice, ImmerRootState } from "./immerSlice";
import { produce } from "immer";
import { type Draft } from "immer";

type PizzaToppingType = "🍄" | "🧀" | "🌶️" | "🥓" | "🍤"; // | "🍍" (taken off the menu because we're not monsters)

interface PizzaTopping {
  type: PizzaToppingType;
  doubleIt: boolean;
}

interface PizzaOrders {
  [pizzaId: string]: {
    crust: "🍞" | "🧀";
    slices: "🍕" | "🍕🍕" | "🍕🍕🍕";
    toppings: PizzaTopping[];
  };
}

interface PizzaState {
  orders: PizzaOrders;
}

const ourPizzas: PizzaState = {
  orders: {
    "🐟": {
      crust: "🍞",
      slices: "🍕",
      toppings: [
        { type: "🍤", doubleIt: false },
        { type: "🧀", doubleIt: false },
      ],
    },
    "🥩": {
      crust: "🧀",
      slices: "🍕🍕🍕",
      toppings: [
        { type: "🥓", doubleIt: true },
        { type: "🌶️", doubleIt: false },
      ],
    },
  },
};




interface UpdatePizzaTopping {
  pizza: string;
  type: PizzaToppingType;
  doubleIt: boolean;
}


const reducerPizzaHell = (state: PizzaState, action: UpdatePizzaTopping): PizzaState => {
  // Aargh! We need these guards or we might be returning an entirely new state
  // without anything having actually changed!
  if (!state.orders[action.pizza]) {
    return state;
  }

  if (state.orders[action.pizza].toppings.every(topping => topping.type !== action.type)) {
    return state;
  }

  // You'd be needing 2 Phds (or a lot of time) to understand this 👻🎃💀
  return {
    ...state,
    orders: {
      ...state.orders,
      [action.pizza]: {
        ...state.orders[action.pizza],
        toppings: state.orders[action.pizza].toppings.map(topping =>
          topping.type === action.type
            ? {...topping, doubleIt: action.doubleIt}
            : topping
        ),
      },
    },
  };
};





describe("Pizza Reducing Hell", () => {
  it("should have double 🌶️ on our 🥩 pizza!", () => {
    const action: UpdatePizzaTopping = {
      pizza: "🥩",
      type: "🌶️",
      doubleIt: true,
    };

    const newState = reducerPizzaHell(ourPizzas, action);

    expect(newState.orders["🥩"].toppings).toEqual([
      { type: "🥓", doubleIt: true },
      { type: "🌶️", doubleIt: true },
    ]);
  });
});





// The Immer Way
// Let's produce this with Immer, making our pizzas even tastier:
const reducerTastyPizza = (baseState: PizzaState, action: UpdatePizzaTopping) => {
  const recipe = (draft: Draft<PizzaState>) => {
    const pizza = draft.orders[action.pizza];
    if (!pizza)
      return;

    const topping = pizza.toppings.find(topping => topping.type === action.type);
    if (!topping)
      return;

    topping.doubleIt = action.doubleIt;
  }

  // NEXT: Show immer-flow.png
  const newState: PizzaState = produce(baseState, recipe);
  return newState;
}

// Final form:
// const reducerTastyPizza = (state: PizzaState, action: UpdatePizzaTopping) => {
//   return produce(state, draft => { /* do stuff here! */ });
// }



describe("Immer Pizza", () => {
  it("should have double 🌶️ on our 🥩 pizza!", () => {
    const action: UpdatePizzaTopping = {pizza: "🥩", type: "🌶️", doubleIt: true};
    const newState = reducerTastyPizza(ourPizzas, action);
    expect(newState.orders["🥩"].toppings).toEqual([
      { type: "🥓", doubleIt: true },
      { type: "🌶️", doubleIt: true },
    ]);

    // Double-check:
    // Make sure that all objects that have been mutated by the recipe
    // all have new references (and their parents!)
    expect(newState.orders["🥩"]).not.toBe(ourPizzas.orders["🥩"]);
    expect(newState.orders["🥩"].toppings).not.toBe(ourPizzas.orders["🥩"].toppings);
    expect(newState.orders["🥩"].toppings[1].type).toBe("🌶️");
    expect(newState.orders["🥩"].toppings[1]).not.toBe(ourPizzas.orders["🥩"].toppings[1]);

    expect(newState.orders["🥩"].toppings[0].type).toBe("🥓");
    expect(newState.orders["🥩"].toppings[0]).toBe(ourPizzas.orders["🥩"].toppings[0]);

    expect(newState.orders["🐟"]).toBe(ourPizzas.orders["🐟"]);
    expect(newState.orders["🐟"].toppings).toBe(ourPizzas.orders["🐟"].toppings);
  });
});

// NEXT: Immer and setState -- see src/todos/TodoAdd.tsx















describe("immerSlice reducer", () => {
  it("should increment newMessagesCount when addMessage is called", () => {
    const initialState = { newMessagesCount: 0 };
    const newState = immerSlice.reducer(initialState, immerSlice.actions.addMessage({}));

    // ATTN: We do a second newMessagesCount++ on a primitive
    // --> This does not work, so the newState is still one.
    expect(newState.newMessagesCount).toBe(1);
  });
});

// Immer can also be used with:
// Map, Set by calling enableMapSet() at startup
// Classes by import {immerable} from "immer" and setting class { [immerable] = true; }



describe("Pizza Reducing Hell -- additional checks", () => {
  it("needs more 🍤🍤🍤 -- but keep same references for our 🥩", () => {
    const action: UpdatePizzaTopping = {pizza: "🐟", type: "🍤", doubleIt: true};
    const newState = reducerPizzaHell(ourPizzas, action);

    expect(newState.orders["🥩"]).toBe(ourPizzas.orders["🥩"]);
    expect(newState.orders["🥩"].toppings).toBe(ourPizzas.orders["🥩"].toppings);
  });

  it("should do nothing when updating 🥓 on our 🐟 pizza", () => {
    const action: UpdatePizzaTopping = {pizza: "🐟", type: "🥓", doubleIt: true};
    const newState = reducerPizzaHell(ourPizzas, action);
    expect(newState).toEqual(ourPizzas);
    expect(newState).toBe(ourPizzas);
  });

  it("should handle actions for non-existing pizza IDs gracefully", () => {
    const action: UpdatePizzaTopping = {pizza: "🥦", type: "🍄", doubleIt: true};
    const newState = reducerPizzaHell(ourPizzas, action);
    expect(newState).toBe(ourPizzas);
  });
});


// describe("immer store", () => {
//   let store: ReturnType<typeof configureStore<ImmerRootState>>;

//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         immer: immerSlice.reducer,
//       },
//     });
//   });

//   it("should increment newMessagesCount when addMessage is dispatched", () => {
//     expect(store.getState().immer.newMessagesCount).toBe(0);
//     store.dispatch(immerSlice.actions.addMessage({}));
//     expect(store.getState().immer.newMessagesCount).toBe(1);
//   });
// });
