"use client";

import {categories, sortOptions, statusTags, GOAL_AMOUNT} from "@/lib/filterConfig";
import { useRouter, useSearchParams } from "next/navigation";

export default function ExploreSidebar() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const maxGoal = parseInt(searchParams.get("maxGoal") || GOAL_AMOUNT.max.toString());

  const updateFilter = (key:string, value:string)=>{
    const params = new URLSearchParams(searchParams);

    if(value === "all" || value === ""){
      params.delete(key);
    }else{
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  const updateGoalAmount = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("maxGoal", value.toString());
    router.push(`?${params.toString()}`);
  };

  const clearFilters = ()=>{
    router.push("?");
  };

  const isActive = (key:string, value:string)=>{
    return searchParams.get(key) === value;
  };

  return (
    <aside style={{
      width: "260px",
      flexShrink: 0,
      borderRight: "1px solid #E2D9CC",
      padding: "32px 24px",
      position: "sticky",
      top: "65px",
      height: "calc(100vh - 65px)",
      overflowY: "auto",
      background: "#FDFAF6",
    }}>

      {/* Category */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7B6E", marginBottom: "14px" }}>
          Category
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              onClick={()=>updateFilter("category", cat.value)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "9px 12px", borderRadius: "8px", cursor: "pointer",
                background: isActive("category", cat.value) ? "#FEF0DC" : "transparent",
                fontWeight: isActive("category", cat.value) ? 600 : 400,
                color: isActive("category", cat.value) ? "#E8820C" : "#1A1410",
                fontSize: "0.875rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span>{cat.emoji}</span>
                {cat.label}
              </div>
              <span style={{
                fontSize: "0.7rem",
                fontFamily: "monospace",
                background: isActive("category", cat.value) ? "rgba(232,130,12,0.15)" : "#F7F3ED",
                color: isActive("category", cat.value) ? "#E8820C" : "#8A7B6E",
                padding: "2px 7px", borderRadius: "100px",
              }}>
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7B6E", marginBottom: "14px" }}>
          Sort By
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {sortOptions.map((option) => (
            <div
              key={option.value}
              onClick={()=>updateFilter("sort", option.value)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "8px", cursor: "pointer",
                background: isActive("sort", option.value) ? "#FEF0DC" : "transparent",
                color: isActive("sort", option.value) ? "#E8820C" : "#3D322A",
                fontWeight: isActive("sort", option.value) ? 600 : 400,
                fontSize: "0.875rem",
              }}
            >
              <div style={{
                width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0,
                border: isActive("sort", option.value) ? "none" : "1.5px solid #E2D9CC",
                background: isActive("sort", option.value) ? "#E8820C" : "transparent",
                boxShadow: isActive("sort", option.value) ? "0 0 0 3px rgba(232,130,12,0.2)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {isActive("sort", option.value) && <div style={{ width: "5px", height: "5px", background: "white", borderRadius: "50%" }} />}
              </div>
              {option.label}
            </div>
          ))}
        </div>
      </div>

      {/* Goal Amount */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7B6E", marginBottom: "14px" }}>
          Goal Amount
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#8A7B6E", fontFamily: "monospace", marginBottom: "10px" }}>
          <span>${GOAL_AMOUNT.min.toLocaleString()}</span><span>${GOAL_AMOUNT.max.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={GOAL_AMOUNT.min}
          max={GOAL_AMOUNT.max}
          value={maxGoal}
          onChange={(e) => updateGoalAmount(parseInt(e.target.value))}
          style={{
            width: "100%", height: "4px", borderRadius: "10px",
            appearance: "none",
            background: "#E2D9CC",
            outline: "none",
            WebkitAppearance: "none",
          } as any}
        />
        <style>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 2px solid #E8820C;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(232,130,12,0.3);
          }
          input[type='range']::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 2px solid #E8820C;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(232,130,12,0.3);
          }
          input[type='range']::-webkit-slider-runnable-track {
            background: linear-gradient(to right, #E8820C 0%, #E8820C ${(maxGoal / GOAL_AMOUNT.max) * 100}%, #E2D9CC ${(maxGoal / GOAL_AMOUNT.max) * 100}%, #E2D9CC 100%);
            height: 4px;
            border-radius: 10px;
          }
          input[type='range']::-moz-range-track {
            background: transparent;
          }
        `}</style>
        <div style={{ marginTop: "10px", fontSize: "0.75rem", color: "#1A1410", fontWeight: 500, fontFamily: "monospace" }}>
          Up to ${maxGoal.toLocaleString()}
        </div>
      </div>

      {/* Status */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7B6E", marginBottom: "14px" }}>
          Campaign Status
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {statusTags.map((tag) => (
            <div
              key={tag.value}
              onClick={()=>updateFilter("status", tag.value)}
              style={{
                padding: "5px 12px", borderRadius: "100px",
                fontSize: "0.75rem", fontWeight: isActive("status", tag.value) ? 600 : 500,
                cursor: "pointer",
                border: `1.5px solid ${isActive("status", tag.value) ? "#E8820C" : "#E2D9CC"}`,
                background: isActive("status", tag.value) ? "#E8820C" : "transparent",
                color: isActive("status", tag.value) ? "#1A1410" : "#3D322A",
              }}
            >
              {tag.label}
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={clearFilters}
        style={{
        width: "100%", padding: "10px", borderRadius: "8px",
        border: "1.5px solid #E2D9CC", background: "transparent",
        fontFamily: "inherit", fontSize: "0.82rem",
        color: "#8A7B6E", cursor: "pointer",
      }}>
        Clear All Filters
      </button>
    </aside>
  );
}