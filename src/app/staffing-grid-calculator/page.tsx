"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Download } from "lucide-react";
import * as XLSX from "xlsx";

const TIME_SLOTS = ["7am", "11am", "3pm", "7pm", "11pm", "3am"];

type Role = { id: number; name: string; minDay: string; minNight: string; maxDay: string; maxNight: string };
type IndirectRole = { id: number; name: string; hoursPerWeek: string };
const STEPS = ["Unit Info", "Staff Roles", "RN Ratios", "Staffing Grid"];

export default function StaffingGridCalculatorPage() {
  const [step, setStep] = useState(0);
  const [unitName, setUnitName] = useState("");
  const [beds, setBeds] = useState("");
  const [adc, setAdc] = useState("");
  const [whpuos, setWhpuos] = useState("");
  const [roles, setRoles] = useState<Role[]>([{ id: 1, name: "", minDay: "", minNight: "", maxDay: "", maxNight: "" }]);
  const [indirectRoles, setIndirectRoles] = useState<IndirectRole[]>([]);
  const [rnMin, setRnMin] = useState("");
  const [rnMax, setRnMax] = useState("");
  const [overrides, setOverrides] = useState<Record<string, number>>({});
  const nextId = () => Date.now();

  const addRole = () => setRoles((r) => [...r, { id: nextId(), name: "", minDay: "", minNight: "", maxDay: "", maxNight: "" }]);
  const removeRole = (id: number) => setRoles((r) => r.filter((role) => role.id !== id));
  const updateRole = (id: number, field: keyof Role, value: string) =>
    setRoles((r) => r.map((role) => (role.id === id ? { ...role, [field]: value } : role)));

  const addIndirectRole = () => setIndirectRoles((r) => [...r, { id: nextId(), name: "", hoursPerWeek: "" }]);
  const removeIndirectRole = (id: number) => setIndirectRoles((r) => r.filter((role) => role.id !== id));
  const updateIndirectRole = (id: number, field: "name" | "hoursPerWeek", value: string) =>
    setIndirectRoles((r) => r.map((role) => (role.id === id ? { ...role, [field]: value } : role)));


  const canAdvance = () => {
    if (step === 0) return unitName.trim() !== "" && beds.trim() !== "" && adc.trim() !== "" && whpuos.trim() !== "";
    if (step === 1) return roles.length > 0 && roles.every((r) => r.name.trim() !== "" && r.minDay.trim() !== "" && r.minNight.trim() !== "" && r.maxDay.trim() !== "" && r.maxNight.trim() !== "") && indirectRoles.every((r) => r.name.trim() !== "" && r.hoursPerWeek.trim() !== "");
    if (step === 2) return rnMin.trim() !== "" && rnMax.trim() !== "";
    return true;
  };

  // For a given census, calculate headcount per slot for each direct role.
  // - The RN role (name matches "RN") is staffed using the rnMax ratio: ceil(census / rnMax).
  // - Remaining WHPUOS budget after RN is distributed equally across other direct roles.
  // - Per-role minimums are always respected.
  const calcDirectStaffForRole = (census: number, role: Role, slotIndex: number): number => {
    const w = parseFloat(whpuos);
    const maxR = parseFloat(rnMax);
    const isDay = slotIndex < 3;
    const min = parseInt(isDay ? role.minDay : role.minNight) || 0;
    const max = parseInt(isDay ? role.maxDay : role.maxNight) || Infinity;
    if (!census || !w) return min;

    const totalBudget = Math.round((census * w) / 24);
    const isRN = role.name.trim().toUpperCase() === "RN";

    if (isRN && maxR) {
      return Math.min(max, Math.max(min, Math.ceil(census / maxR)));
    }

    // Non-RN: use remainder of WHPUOS budget after RN allocation
    const rnRole = roles.find((r) => r.name.trim().toUpperCase() === "RN");
    const rnMin2 = parseInt(isDay ? rnRole?.minDay ?? "0" : rnRole?.minNight ?? "0") || 0;
    const rnMax2 = parseInt(isDay ? rnRole?.maxDay ?? "0" : rnRole?.maxNight ?? "0") || Infinity;
    const rnCount =
      rnRole && maxR
        ? Math.min(rnMax2, Math.max(rnMin2, Math.ceil(census / maxR)))
        : 0;
    const otherRoles = roles.filter((r) => r.name.trim().toUpperCase() !== "RN");
    const remaining = Math.max(0, totalBudget - rnCount);
    const perOther =
      otherRoles.length > 0 ? Math.round(remaining / otherRoles.length) : totalBudget;

    return Math.min(max, Math.max(min, perOther));
  };

  // Indirect roles cover a fixed number of slots per day based on hours/week.
  // 40 hrs/week ÷ 5 days ÷ 4 hrs/slot = 2 slots → show 1 at 7am and 11am, 0 elsewhere.
  const indirectSlotsPerDay = (hoursPerWeek: string): number =>
    Math.round(parseFloat(hoursPerWeek) / 5 / 4);

  const calcIndirectStaff = (hoursPerWeek: string, slotIndex: number): number =>
    slotIndex < indirectSlotsPerDay(hoursPerWeek) ? 1 : 0;

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = {};

    // Only direct roles appear in the sheet; indirect hours are embedded as a constant
    const directPerSlot = roles.length;
    const INFO_ROWS = 3;
    const HDR1 = INFO_ROWS;
    const HDR2 = INFO_ROWS + 1;
    const DATA_START = INFO_ROWS + 2;

    const PROD_COL = 0;
    const WHPUOS_COL = 1;
    const CENSUS_COL = 2;
    const STAFF_START_COL = 3;
    const lastStaffCol = STAFF_START_COL + 6 * directPerSlot - 1;

    // Indirect hours per day is census-independent — embed as a constant in WHPUOS formula
    const indirectHoursPerDay = indirectRoles.reduce(
      (sum, r) => sum + indirectSlotsPerDay(r.hoursPerWeek) * 4, 0
    );

    // ── Metadata block ──────────────────────────────────────────────
    ws[XLSX.utils.encode_cell({ r: 0, c: 0 })] = { t: "s", v: "Unit:" };
    ws[XLSX.utils.encode_cell({ r: 0, c: 1 })] = { t: "s", v: unitName };
    ws[XLSX.utils.encode_cell({ r: 0, c: 2 })] = { t: "s", v: "Beds:" };
    ws[XLSX.utils.encode_cell({ r: 0, c: 3 })] = { t: "n", v: parseInt(beds) };
    ws[XLSX.utils.encode_cell({ r: 0, c: 4 })] = { t: "s", v: "ADC:" };
    ws[XLSX.utils.encode_cell({ r: 0, c: 5 })] = { t: "n", v: parseFloat(adc) };
    ws[XLSX.utils.encode_cell({ r: 1, c: 0 })] = { t: "s", v: "Target WHPUOS:" };
    ws[XLSX.utils.encode_cell({ r: 1, c: 1 })] = { t: "n", v: parseFloat(whpuos) };
    ws[XLSX.utils.encode_cell({ r: 1, c: 2 })] = { t: "s", v: "RN Max Ratio:" };
    ws[XLSX.utils.encode_cell({ r: 1, c: 3 })] = { t: "n", v: parseFloat(rnMax) };
    ws[XLSX.utils.encode_cell({ r: 1, c: 4 })] = { t: "s", v: "Indirect Hrs/Day:" };
    ws[XLSX.utils.encode_cell({ r: 1, c: 5 })] = { t: "n", v: indirectHoursPerDay };

    const targetRef = "$B$2"; // absolute ref to target WHPUOS

    // ── Header row 1: shift labels ───────────────────────────────────
    ws[XLSX.utils.encode_cell({ r: HDR1, c: PROD_COL })]   = { t: "s", v: "Productivity %" };
    ws[XLSX.utils.encode_cell({ r: HDR1, c: WHPUOS_COL })] = { t: "s", v: "WHPUOS" };
    ws[XLSX.utils.encode_cell({ r: HDR1, c: CENSUS_COL })] = { t: "s", v: "Census" };
    TIME_SLOTS.forEach((slot, si) => {
      ws[XLSX.utils.encode_cell({ r: HDR1, c: STAFF_START_COL + si * directPerSlot })] = { t: "s", v: slot };
    });

    // ── Header row 2: direct role names only ─────────────────────────
    TIME_SLOTS.forEach((_slot, si) => {
      const base = STAFF_START_COL + si * directPerSlot;
      roles.forEach((role, ri) => {
        ws[XLSX.utils.encode_cell({ r: HDR2, c: base + ri })] = { t: "s", v: role.name };
      });
    });

    // ── Data rows ────────────────────────────────────────────────────
    const bedCount = parseInt(beds) || 0;
    for (let i = 0; i < bedCount; i++) {
      const census = i + 1;
      const r = DATA_START + i;

      ws[XLSX.utils.encode_cell({ r, c: CENSUS_COL })] = { t: "n", v: census };

      TIME_SLOTS.forEach((_slot, si) => {
        const base = STAFF_START_COL + si * directPerSlot;
        roles.forEach((role, ri) => {
          ws[XLSX.utils.encode_cell({ r, c: base + ri })] = {
            t: "n", v: getDirectStaff(census, role, si),
          };
        });
      });

      // WHPUOS formula: (direct staff hours + indirect hours constant) ÷ census
      // direct hours = SUM(visible staff cells) * 4
      // indirect hours = embedded constant (indirectHoursPerDay)
      const firstRef = XLSX.utils.encode_cell({ r, c: STAFF_START_COL });
      const lastRef  = XLSX.utils.encode_cell({ r, c: lastStaffCol });
      const censusRef = XLSX.utils.encode_cell({ r, c: CENSUS_COL });
      const whpuosFormula = `(SUM(${firstRef}:${lastRef})*4+${indirectHoursPerDay})/${censusRef}`;
      ws[XLSX.utils.encode_cell({ r, c: WHPUOS_COL })] = {
        t: "n", f: whpuosFormula, v: parseFloat(calcRowWhpuos(census)), z: "0.00",
      };

      // Productivity formula: Target WHPUOS ÷ Calculated WHPUOS × 100
      const whpuosRef = XLSX.utils.encode_cell({ r, c: WHPUOS_COL });
      ws[XLSX.utils.encode_cell({ r, c: PROD_COL })] = {
        t: "n",
        f: `${targetRef}/${whpuosRef}*100`,
        v: parseFloat(calcRowProductivity(census)) || 0,
        z: "0.00",
      };
    }

    // ── Sheet range, merges, column widths ───────────────────────────
    ws["!ref"] = XLSX.utils.encode_range({ r: 0, c: 0 }, { r: DATA_START + bedCount - 1, c: lastStaffCol });

    const merges: XLSX.Range[] = [
      { s: { r: HDR1, c: PROD_COL },   e: { r: HDR2, c: PROD_COL } },
      { s: { r: HDR1, c: WHPUOS_COL }, e: { r: HDR2, c: WHPUOS_COL } },
      { s: { r: HDR1, c: CENSUS_COL }, e: { r: HDR2, c: CENSUS_COL } },
    ];
    TIME_SLOTS.forEach((_slot, si) => {
      const startCol = STAFF_START_COL + si * directPerSlot;
      const endCol   = startCol + directPerSlot - 1;
      if (endCol > startCol) merges.push({ s: { r: HDR1, c: startCol }, e: { r: HDR1, c: endCol } });
    });
    ws["!merges"] = merges;

    const cols: XLSX.ColInfo[] = [
      { wch: 14 }, { wch: 10 }, { wch: 10 },
      ...Array(lastStaffCol - STAFF_START_COL + 1).fill({ wch: 8 }),
    ];
    ws["!cols"] = cols;

    XLSX.utils.book_append_sheet(wb, ws, unitName || "Staffing Grid");
    XLSX.writeFile(wb, `${unitName || "staffing-grid"}.xlsx`);
  };

  // Productivity % = (Target WHPUOS ÷ Calculated WHPUOS) × 100
  const calcRowProductivity = (census: number): string => {
    if (!census) return "—";
    const target = parseFloat(whpuos);
    const calculated = parseFloat(calcRowWhpuos(census));
    if (!target || !calculated) return "—";
    return ((target / calculated) * 100).toFixed(2) + "%";
  };

  const getDirectStaff = (census: number, role: Role, slotIndex: number): number => {
    const key = `${census}-${slotIndex}-${role.id}`;
    return overrides[key] ?? calcDirectStaffForRole(census, role, slotIndex);
  };

  const setOverride = (census: number, slotIndex: number, role: Role, value: number) => {
    const key = `${census}-${slotIndex}-${role.id}`;
    const calculated = calcDirectStaffForRole(census, role, slotIndex);
    setOverrides((prev) => {
      const next = { ...prev };
      if (value === calculated) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  };

  // Calculated WHPUOS for a census row based on actual staff counts shown.
  const calcRowWhpuos = (census: number): string => {
    if (!census) return "—";
    const directHoursPerDay = TIME_SLOTS.reduce((total, _, si) =>
      total + roles.reduce((sum, r) => sum + getDirectStaff(census, r, si), 0) * 4, 0);
    const indirectHoursPerDay = indirectRoles.reduce(
      (sum, r) => sum + indirectSlotsPerDay(r.hoursPerWeek) * 4,
      0
    );
    return ((directHoursPerDay + indirectHoursPerDay) / census).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Staffing Grid Calculator</h1>
        <p className="text-muted-foreground">Answer a few questions to generate your staffing grid.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors ${
                i === step
                  ? "border-primary bg-primary text-primary-foreground"
                  : i < step
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${i === step ? "font-medium" : "text-muted-foreground"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="w-6 h-px bg-border mx-1" />}
          </div>
        ))}
      </div>

      {/* Step 0: Unit Info */}
      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Unit Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unit-name">Unit / Department Name</Label>
              <Input
                id="unit-name"
                placeholder="e.g. 3 West Med/Surg"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beds">Number of Beds</Label>
              <Input
                id="beds"
                type="number"
                placeholder="e.g. 30"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adc">Average Daily Census (ADC)</Label>
              <Input
                id="adc"
                type="number"
                placeholder="e.g. 24"
                value={adc}
                onChange={(e) => setAdc(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whpuos">Worked Hours Per Unit of Service Target (WHPUOS)</Label>
              <Input
                id="whpuos"
                type="number"
                step="0.01"
                placeholder="e.g. 8.50"
                value={whpuos}
                onChange={(e) => setWhpuos(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Staff Roles */}
      {step === 1 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Staff Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add each direct care staff role (e.g. RN, LPN, CNA, Secretary).
              </p>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div key={role.id} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-1">
                      <Label>Role Name</Label>
                      <Input
                        placeholder="e.g. RN"
                        value={role.name}
                        onChange={(e) => updateRole(role.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="w-32 space-y-1">
                      <Label>Min Day</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 2"
                        value={role.minDay}
                        onChange={(e) => updateRole(role.id, "minDay", e.target.value)}
                      />
                    </div>
                    <div className="w-32 space-y-1">
                      <Label>Max Day</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 5"
                        value={role.maxDay}
                        onChange={(e) => updateRole(role.id, "maxDay", e.target.value)}
                      />
                    </div>
                    <div className="w-32 space-y-1">
                      <Label>Min Night</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 1"
                        value={role.minNight}
                        onChange={(e) => updateRole(role.id, "minNight", e.target.value)}
                      />
                    </div>
                    <div className="w-32 space-y-1">
                      <Label>Max Night</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 4"
                        value={role.maxNight}
                        onChange={(e) => updateRole(role.id, "maxNight", e.target.value)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeRole(role.id)}
                      disabled={roles.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addRole} className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Role
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Indirect Staff Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add roles that support the unit but are not directly tied to patient ratios (e.g. Manager, Asst. Unit Manager, Educator).
              </p>
              <div className="space-y-3">
                {indirectRoles.map((role) => (
                  <div key={role.id} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-1">
                      <Label>Role Name</Label>
                      <Input
                        placeholder="e.g. Manager"
                        value={role.name}
                        onChange={(e) => updateIndirectRole(role.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="w-44 space-y-1">
                      <Label>Hours per Week</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 40"
                        value={role.hoursPerWeek}
                        onChange={(e) => updateIndirectRole(role.id, "hoursPerWeek", e.target.value)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeIndirectRole(role.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addIndirectRole} className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Indirect Role
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Step 2: RN Ratios */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>RN Ratios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the minimum and maximum number of patients expected per RN on this unit.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rn-min">Minimum Patients per RN</Label>
                <Input
                  id="rn-min"
                  type="number"
                  placeholder="e.g. 3"
                  value={rnMin}
                  onChange={(e) => setRnMin(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rn-max">Maximum Patients per RN</Label>
                <Input
                  id="rn-max"
                  type="number"
                  placeholder="e.g. 6"
                  value={rnMax}
                  onChange={(e) => setRnMax(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Staffing Grid */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{unitName}</h2>
            <p className="text-sm text-muted-foreground">{beds} beds &middot; ADC: {adc} &middot; WHPUOS Target: {whpuos} &middot; RN Ratio: {rnMin}–{rnMax}</p>
          </div>
          <div className="overflow-x-auto rounded-md border">
            <table className="text-sm border-collapse">
              <thead>
                {/* Row 1: shift headers */}
                <tr className="bg-muted">
                  <th className="px-3 py-2 text-center font-semibold border border-border whitespace-nowrap" rowSpan={2}>
                    Productivity
                  </th>
                  <th className="px-3 py-2 text-center font-semibold border border-border whitespace-nowrap" rowSpan={2}>
                    WHPUOS
                  </th>
                  <th className="px-3 py-2 text-center font-semibold border border-border" rowSpan={2}>
                    Census
                  </th>
                  {TIME_SLOTS.map((slot) => (
                    <th
                      key={slot}
                      className="px-3 py-2 text-center font-semibold border border-border"
                      colSpan={roles.length + indirectRoles.length}
                    >
                      {slot}
                    </th>
                  ))}
                </tr>
                {/* Row 2: role sub-headers */}
                <tr className="bg-muted/60">
                  {TIME_SLOTS.map((slot) => (
                    <>
                      {roles.map((role) => (
                        <th key={`${slot}-${role.id}`} className="px-3 py-2 text-center font-medium border border-border whitespace-nowrap text-xs">
                          {role.name}
                        </th>
                      ))}
                      {indirectRoles.map((role) => (
                        <th key={`${slot}-indirect-${role.id}`} className="px-3 py-2 text-center font-medium border border-border whitespace-nowrap text-xs text-muted-foreground">
                          {role.name}
                        </th>
                      ))}
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: parseInt(beds) || 0 }, (_, i) => i + 1).map((patientCount) => (
                  <tr key={patientCount} className="hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-2 text-center border border-border bg-muted/10 text-muted-foreground text-xs font-mono">
                      {calcRowProductivity(patientCount)}
                    </td>
                    <td className="px-3 py-2 text-center border border-border bg-muted/10 text-muted-foreground text-xs font-mono">
                      {calcRowWhpuos(patientCount)}
                    </td>
                    <td className="px-3 py-2 font-semibold text-center border border-border bg-muted/20">
                      {patientCount}
                    </td>
                    {TIME_SLOTS.map((slot, slotIndex) => (
                      <>
                        {roles.map((role) => {
                          const key = `${patientCount}-${slotIndex}-${role.id}`;
                          const isOverridden = overrides[key] !== undefined;
                          return (
                            <td key={`${slot}-${role.id}`} className="px-1 py-1 text-center border border-border">
                              <input
                                type="number"
                                min="0"
                                value={getDirectStaff(patientCount, role, slotIndex)}
                                onChange={(e) => setOverride(patientCount, slotIndex, role, parseInt(e.target.value) || 0)}
                                className={`w-12 text-center text-sm bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                                  isOverridden ? "text-red-500 font-medium" : ""
                                }`}
                              />
                            </td>
                          );
                        })}
                        {indirectRoles.map((role) => (
                          <td key={`${slot}-indirect-${role.id}`} className="px-3 py-2 text-center border border-border text-muted-foreground">
                            {calcIndirectStaff(role.hoursPerWeek, slotIndex) || "—"}
                          </td>
                        ))}
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <div className="flex gap-2">
              <Button onClick={exportToExcel} className="gap-2">
                <Download className="w-4 h-4" />
                Export to Excel
              </Button>
              <Button variant="outline" onClick={() => setStep(0)}>
                Start Over
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      {step < 3 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
            Back
          </Button>
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()}>
            {step === 2 ? "Generate Grid" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}
