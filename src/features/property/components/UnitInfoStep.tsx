import TextInput from "@/components/ui/text-input";

type Props = {
  unitCount: number;
  unitNames: string[];
  onUnitChange: (index: number, value: string) => void;
};

const UnitInfoStep = ({ unitCount, unitNames, onUnitChange }: Props) => {
  const rows: number[][] = [];
  for (let i = 0; i < unitCount; i += 3) {
    rows.push([i, i + 1, i + 2].filter((j) => j < unitCount));
  }

  return (
    <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-y-auto custom-scrollbar max-h-[680px]">
      <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
        Unit Information ({unitCount} Units)
      </h2>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex items-start gap-6">
          {row.map((i) => (
            <TextInput
              key={i}
              label="Unit Name"
              value={unitNames[i] ?? ""}
              setValue={(v) => onUnitChange(i, v)}
              placeholder={`Unit ${i + 1}`}
              containerClassName="flex-1"
            />
          ))}
          {/* Fill empty slots to maintain 3-col layout */}
          {row.length < 3 &&
            Array.from({ length: 3 - row.length }).map((_, k) => (
              <div key={k} className="flex-1" />
            ))}
        </div>
      ))}
    </div>
  );
};

export default UnitInfoStep;
