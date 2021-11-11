import React from "react";
import S from "sanctuary";
const R = require("ramda");

const asArray = (x) => (Array.isArray(x) ? x : Array.of(x));

export const View = R.pipe(
  (x) => R.compose(asArray, x),
  (computation) => ({
    computation,
    fold: (props) => {
      const result = computation(props).filter((x) => x !== null);

      // e.g. View.of(<div/>).fold() is just <div/>
      if (result.length === 1) {
        return result[0];
      } else {
        return React.createElement("div", { children: result });
      }
    },

    map: (f) => View((x) => computation(x).map(f)),

    ap: (other) =>
      View((props) => R.ap(computation(props), other.computation(props))),

    contramap: (g) => View((x) => computation(g(x))),

    concat: (other) =>
      View((props) => computation(props).concat(other.computation(props))),

    chain: (g) =>
      View((x) => computation(x).concat((y) => g(y).computation(x))),

    promap: (g, f) => View((x) => computation(g(x)).map(f))
  })
);

View.of = (x) => View(() => x);
View.empty = View.of(null);
//View.reduce = (acc, x) =>{acc.concat(x)} => (View.empty);

export const intercalate = (separator, foldable) => {
  var result = R.reduce(function (acc, x) {
    return {
      empty: false,
      value: acc.value.concat(acc.empty ? x : separator.concat(x))
    };
  })({ empty: true, value: View.empty })(foldable);
  return result.value;
};
