import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/schemas/formSchema";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Briefcase } from "lucide-react";

interface SectionBusinessProps {
  form: UseFormReturn<FormValues>;
}

export const SectionBusiness: React.FC<SectionBusinessProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  const tujuanBisnisOptions = [
    { label: "Business Matching", value: "Business Matching" },
    { label: "Piloting Usecase", value: "Piloting Usecase" },
    { label: "Ketemu AM", value: "Ketemu AM" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  const industryOptions = [
    { label: "Government (Gov)", value: "Gov" },
    { label: "Education (Edu)", value: "Edu" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Finance", value: "Finance" },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center space-x-2 border-b pb-2">
        <Briefcase className="h-5 w-5 text-red-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Detail Kunjungan (Business)
        </h2>
      </div>

      <Input
        label="Institusi"
        placeholder="Nama institusi"
        {...register("institusi")}
        error={errors.institusi?.message}
      />

      <div className="space-y-4">
        <Checkbox
          label="Apakah kamu AM Telkom?"
          {...register("isAmTelkom")}
          error={errors.isAmTelkom?.message}
        />

        <Input
          label="Nama AM Telkom"
          placeholder="Nama"
          {...register("namaAmTelkom")}
          error={errors.namaAmTelkom?.message}
        />

        <Input
          label="Jumlah Peserta"
          type="number"
          placeholder="10"
          {...register("jumlahPeserta")}
          error={errors.jumlahPeserta?.message}
        />

        <Select
          label="Industry"
          options={industryOptions}
          {...register("industry")}
          error={errors.industry?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Tujuan Bisnis"
            options={tujuanBisnisOptions}
            {...register("tujuanBisnis")}
            error={errors.tujuanBisnis?.message}
          />
        </div>
      </div>
    </div>
  );
};
