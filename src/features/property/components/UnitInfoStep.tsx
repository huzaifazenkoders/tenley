import TextInput from "@/components/ui/text-input";

export type UnitEntry = {
  unit_name: string;
  unit_number: string;
};

type Props = {
  unitCount: number;
  units: UnitEntry[];
  onUnitChange: (index: number, patch: Partial<UnitEntry>) => void;
};

const UnitInfoStep = ({ unitCount, units, onUnitChange }: Props) => (
  <div className="p-6 bg-brand-base-white rounded-[20px] shadow-[0px_1px_10px_0px_rgba(0,0,0,0.08)] outline-1 -outline-offset-1 outline-brand-Text-100 flex flex-col gap-6 overflow-y-auto custom-scrollbar max-h-170">
    <h2 className="text-brand-Text-800 text-xl font-bold leading-6">
      Unit Information ({unitCount} Units)
    </h2>
    <div className="grid grid-cols-3 gap-5">
      {units.map((unit, i) => (
        <TextInput
          key={i}
          label="Unit Name"
          value={unit.unit_name}
          setValue={(v) => onUnitChange(i, { unit_name: v })}
          placeholder={unit.unit_number}
        />
      ))}
    </div>
  </div>
);

export default UnitInfoStep;
