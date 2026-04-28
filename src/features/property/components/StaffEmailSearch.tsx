"use client";
import TextInput from "@/components/ui/text-input";
import { Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { getCompanyIdFromUser } from "@/features/staff-and-roles/utils/company";
import {
  searchStaffByEmail,
  type SearchStaffItem
} from "../services/staffService";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onSelect: (item: SearchStaffItem) => void;
  error?: string;
  containerClassName?: string;
};

const StaffEmailSearch = ({
  value,
  onChange,
  onBlur,
  onSelect,
  error,
  containerClassName
}: Props) => {
  const user = useUserStore((s) => s.user);
  const company = useUserStore((s) => s.company);
  const companyId =
    company?.id ?? company?.company_id ?? getCompanyIdFromUser(user) ?? "";
  const [results, setResults] = useState<SearchStaffItem[]>([]);
  const [defaultResults, setDefaultResults] = useState<SearchStaffItem[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!companyId) return;
    searchStaffByEmail("", companyId).then(({ data }) => {
      if (data) setDefaultResults(data);
    });
  }, [companyId]);

  useEffect(() => {
    if (!value.trim() || !companyId) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const { data } = await searchStaffByEmail(value.trim(), companyId);
      setResults(data ?? []);
    }, 500);
    return () => clearTimeout(timer);
  }, [value, companyId]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (item: SearchStaffItem) => {
    onSelect(item);
    setOpen(false);
  };

  const displayed = value.trim() ? results : defaultResults;

  return (
    <div
      ref={containerRef}
      className={`relative ${containerClassName ?? ""}`}
    >
      <TextInput
        label="Email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={onBlur}
        placeholder="alexander@example.com"
        type="email"
        error={error}
        autoComplete="off"
      />

      {open && displayed.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-brand-base-white rounded-xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] outline outline-1 -outline-offset-1 outline-brand-Text-100 overflow-hidden max-h-60 overflow-y-auto">
          {displayed.map((item) => (
            <button
              key={item.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(item)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-Text-50 transition-colors text-left"
            >
              {item.profile_image_url ? (
                <Image
                  src={item.profile_image_url}
                  alt={item.full_name}
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover flex-shrink-0"
                  unoptimized
                />
              ) : (
                <div className="size-9 rounded-full bg-brand-Text-100 flex items-center justify-center flex-shrink-0">
                  <Users className="size-4 text-brand-Text-400" />
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-brand-Text-950-d text-sm font-semibold leading-5 truncate">
                  {item.full_name}
                </span>
                <span className="text-brand-Text-500 text-xs font-normal leading-4 truncate">
                  {item.email}
                </span>
              </div>
            </button>
          ))}
        </div>

      )}
    </div>
  );
};

export default StaffEmailSearch;
