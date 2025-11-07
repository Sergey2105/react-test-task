import { useState } from "react";
import { InputDropDownProps } from "../../types";

export function InputDropDown(props: InputDropDownProps) {
  const { value, selected, onChange, id } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [tempSelected, setTempSelected] = useState<string[]>(selected);

  const toggleSelect = (key: string) => {
    setTempSelected((prev) =>
      prev.includes(key) ? prev.filter((el) => el !== key) : [...prev, key]
    );
  };

  const filtered = Object.entries(value).filter(
    ([key, label]) =>
      label.toLowerCase().includes(search.toLowerCase()) ||
      key.toLowerCase().includes(search.toLowerCase())
  );

  const applySelection = () => {
    onChange(tempSelected);
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <label htmlFor={id} style={{ width: "fit-content" }}>
          Фильтр
        </label>
        <input
          id={id}
          type="text"
          onFocus={() => setIsOpen(true)}
          onBlur={() => applySelection()}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Фильтр"
          style={{ width: "320px" }}
        />
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "320px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            background: "white",
            zIndex: 10,
            marginTop: "4px",
          }}
        >
          {filtered.map(([key, label]) => {
            const isSelected = tempSelected.includes(key);
            return (
              <div
                key={key}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => toggleSelect(key)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  background: isSelected ? "#e6f7ff" : "white",
                  borderBottom: "1px solid #eee",
                }}
              >
                {label}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ padding: "8px", color: "#777" }}>
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
}
