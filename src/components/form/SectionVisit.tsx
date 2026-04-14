import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/schemas/formSchema";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Info } from "lucide-react";

interface SectionVisitProps {
  form: UseFormReturn<FormValues>;
  watchTujuanVisit: string | undefined;
}

export const SectionVisit: React.FC<SectionVisitProps> = ({
  form,
  watchTujuanVisit,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  const tujuanOptions = [
    { label: "Benchmark", value: "Benchmark" },
    { label: "Study Tour", value: "Study Tour" },
    { label: "Audiensi", value: "Audiensi" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="flex items-center space-x-2 border-b pb-2">
        <Info className="h-5 w-5 text-red-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Detail Kunjungan (Visit)
        </h2>
      </div>

      <div className="space-y-4">
        <Input
          label="Institusi"
          placeholder="Nama institusi"
          {...register("institusi")}
          error={errors.institusi?.message}
        />

        <Select
          label="Tujuan Visit"
          options={tujuanOptions}
          {...register("tujuanVisit")}
          error={errors.tujuanVisit?.message}
        />

        {watchTujuanVisit === "Lainnya" && (
          <Input
            label="Sebutkan Tujuan Lainnya"
            placeholder="Masukkan tujuan lainnya"
            {...register("tujuanVisitLainnya")}
            error={errors.tujuanVisitLainnya?.message}
          />
        )}

        <Textarea
          label="Kebutuhan Tujuan Visit"
          placeholder="Jelaskan kebutuhan atau agenda kunjungan Anda"
          {...register("kebutuhanVisit")}
          error={errors.kebutuhanVisit?.message}
        />

        <Input
          label="Jumlah Peserta"
          type="number"
          placeholder="10"
          {...register("jumlahPeserta")}
          error={errors.jumlahPeserta?.message}
        />
      </div>
    </div>
  );
};
