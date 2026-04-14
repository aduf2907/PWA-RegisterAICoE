import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/schemas/formSchema";
import { Textarea } from "@/components/ui/Textarea";

interface DynamicFieldsProps {
  form: UseFormReturn<FormValues>;
  watchTujuanBisnis: string | undefined;
}

export const DynamicFields: React.FC<DynamicFieldsProps> = ({ form, watchTujuanBisnis }) => {
  const {
    register,
    formState: { errors },
  } = form;

  if (!watchTujuanBisnis) return null;

  let label = "Deskripsi Kebutuhan";
  let placeholder = "Jelaskan lebih detail mengenai tujuan kunjungan Anda";

  switch (watchTujuanBisnis) {
    case "Piloting Usecase":
      label = "Deskripsi Kebutuhan Usecase";
      placeholder = "Jelaskan usecase yang ingin di-pilot";
      break;
    case "Business Matching":
      label = "Deskripsi Tujuan Business Matching";
      placeholder = "Jelaskan target atau tujuan business matching";
      break;
    case "Ketemu AM":
      label = "Deskripsi Tujuan Bertemu AM";
      placeholder = "Jelaskan agenda pertemuan dengan AM";
      break;
    case "Lainnya":
      label = "Deskripsi Kebutuhan Lainnya";
      placeholder = "Jelaskan tujuan kunjungan bisnis lainnya";
      break;
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-200">
      <Textarea
        label={label}
        placeholder={placeholder}
        {...register("deskripsiKebutuhan")}
        error={errors.deskripsiKebutuhan?.message}
      />
    </div>
  );
};
