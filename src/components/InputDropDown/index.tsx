import { useState } from "react";
import { InputDropDownProps, WeatherVariableKeySelected } from "../../types";
import styles from "./index.module.scss";

export function InputDropDown(props: InputDropDownProps) {
  const { value, selected, onChange, id } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [tempSelected, setTempSelected] =
    useState<WeatherVariableKeySelected[]>(selected);

  const toggleSelect = (key: WeatherVariableKeySelected) => {
    setTempSelected((prev) =>
      prev.includes(key) ? prev.filter((el) => el !== key) : [...prev, key]
    );
  };

  const filtered = Object.entries(value).filter(
    ([key, label]) =>
      key.toLowerCase().includes(search.toLowerCase()) ||
      label.toLowerCase().includes(search.toLowerCase())
  );

  const applySelection = () => {
    onChange(tempSelected);
    setIsOpen(false);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        <label htmlFor={id} className={styles["label"]}>
          Фильтр
        </label>
        <input
          id={id}
          type="text"
          onFocus={() => setIsOpen(true)}
          onBlur={() => applySelection()}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Поиск"
          className={styles["input"]}
        />
      </div>
      {isOpen && (
        <div
          className={styles["dropdown"]}
          onMouseDown={(e) => e.preventDefault()}
        >
          {filtered.map(([key, label]) => {
            const variableKey = key as WeatherVariableKeySelected;
            const isSelected = tempSelected.includes(variableKey);
            return (
              <div
                key={key}
                onClick={() => toggleSelect(variableKey)}
                style={{
                  background: isSelected ? "#e6f7ff" : "white",
                }}
                className={styles["dropdown-item"]}
              >
                {label}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className={styles["dropdown-empty"]}>Ничего не найдено</div>
          )}
        </div>
      )}
    </div>
  );
}
