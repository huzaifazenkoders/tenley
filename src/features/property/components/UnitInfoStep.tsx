import TextInput from "@/components/ui/text-input";

export type UnitEntry = {
  unit_name: string;
  unit_number: string;
};

type Props = {
  floors: number;
  unitsPerFloor: number;
  units: UnitEntry[];
  onUnitChange: (index: number, patch: Partial<UnitEntry>) => void;
};

const UnitInfoStep = ({ floors, unitsPerFloor, units, onUnitChange }: Props) => {
  const totalUnits = floors * unitsPerFloor;

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-y-auto custom-scrollbar max-h-170">
      <div className="flex flex-col gap-1">
        <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
          Unit Information
        </h2>
        <p className="text-brand-Text-500 text-sm font-normal leading-5">
          {floors} floor{floors !== 1 ? "s" : ""} &times; {unitsPerFloor} unit
          {unitsPerFloor !== 1 ? "s" : ""} per floor ={" "}
          <span className="text-brand-Text-950-d font-semibold">
            {totalUnits} total units
          </span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Column headers — units */}
          <div className="flex">
            <div className="w-28 shrink-0" />
            {Array.from({ length: unitsPerFloor }, (_, u) => (
              <div
                key={u}
                className="flex-1 min-w-[130px] px-2 pb-2 text-center text-brand-Text-500 text-xs font-semibold uppercase tracking-wide"
              >
                Unit {u + 1}
              </div>
            ))}
          </div>

          {/* Rows — floors */}
          {Array.from({ length: floors }, (_, f) => (
            <div
              key={f}
              className="flex items-center border-t border-brand-Text-100 first:border-t-0"
            >
              {/* Floor label */}
              <div className="w-28 shrink-0 pr-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-brand-Text-700 text-sm font-semibold whitespace-nowrap">
                    Floor {f + 1}
                  </span>
                </div>
              </div>

              {/* Unit inputs */}
              {Array.from({ length: unitsPerFloor }, (_, u) => {
                const index = f * unitsPerFloor + u;
                const unit = units[index];
                return (
                  <div key={u} className="flex-1 min-w-[130px] px-2 py-3">
                    <TextInput
                      label=""
                      value={unit?.unit_name ?? ""}
                      setValue={(v) => onUnitChange(index, { unit_name: v })}
                      placeholder={unit?.unit_number ?? ""}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitInfoStep;
