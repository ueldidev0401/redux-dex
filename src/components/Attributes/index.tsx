import * as React from 'react';
import "./index.scss";

const Attributes = (props:any) => {
  const { onChange, attributes, onRoll } = props;

  // update attribute from numerical input
  const updateAttribute = (e) => {
    e.preventDefault();
    let val = e.target.value;
    if (val) {
      val = parseInt(val);
    }
    const attr = e.target.id.replace("attrib-", "");

    const newState = { ...attributes };
    newState[attr].total = val;
    onChange(newState);
  };

  // roll dice on button click
  const rollDice = (e) => {
    e.preventDefault();
    const attr = e.currentTarget.id.replace("roll-", "");
    if (attr === "all") {
      return onRoll(["3d6", "3d6", "3d6", "3d6", "3d6", "3d6"], attr);
    }
    onRoll("3d6", attr);
  };

  return (
    <div className="attributes">
      <button
        id="roll-all"
        className="button"
        aria-label="Roll Attributes Points"
        onClick={rollDice}
      >
        Roll All
      </button>
      {Object.entries(attributes).map(([key, values ]) => {
        return (
          <div className="attrib-group" key={key}>
            <div className="attrib-name">
              <button
                className="button button--secondary"
                id={`roll-${key}`}
                onClick={rollDice}
              >
                {values ? values["name"] : ''}
              </button>
            </div>
            <div className="attrib-val">
              <input
                id={`attrib-${key}`}
                className="attrib-input"
                type="number"
                inputMode="numeric"
                min={3}
                max={18}
                value={values["total"]}
                onChange={updateAttribute}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Attributes;
