import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/schemas/formSchema";
import { Input } from "@/components/ui/Input";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

interface SectionScheduleProps {
  form: UseFormReturn<FormValues>;
}

export const SectionSchedule: React.FC<SectionScheduleProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  const dateRef = React.useRef<HTMLInputElement | null>(null);
  const timeRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 border-b pb-2">
        <CalendarIcon className="h-5 w-5 text-red-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Jadwal Kunjungan
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DATE */}
        <div
          className="relative cursor-pointer"
          onClick={() => dateRef.current?.showPicker()}
        >
          <Input
            label="Tanggal Kunjungan"
            type="date"
            className="pr-10 cursor-pointer"
            {...register("tanggalKunjungan")}
            ref={(e) => {
              register("tanggalKunjungan").ref(e);
              dateRef.current = e;
            }}
            error={errors.tanggalKunjungan?.message}
          />
          <CalendarIcon className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* TIME */}
        <div
          className="relative cursor-pointer"
          onClick={() => timeRef.current?.showPicker()}
        >
          <Input
            label="Jam Kunjungan"
            type="time"
            className="pr-10 cursor-pointer"
            {...register("jamKunjungan")}
            ref={(e) => {
              register("jamKunjungan").ref(e);
              timeRef.current = e;
            }}
            error={errors.jamKunjungan?.message}
          />
          <Clock className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
