import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/schemas/formSchema";
import { Input } from "@/components/ui/Input";
import { User, Phone, Users, Building2 } from "lucide-react";

interface SectionVisitorProps {
  form: UseFormReturn<FormValues>;
}

export const SectionVisitor: React.FC<SectionVisitorProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = form;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue("nomorHp", value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 border-b pb-2">
        <User className="h-5 w-5 text-red-600" />
        <h2 className="text-lg font-semibold text-gray-900">Data Pengunjung</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nama"
          placeholder="Nama Lengkap"
          {...register("nama")}
          error={errors.nama?.message}
        />
        <Input
          label="Nomor HP"
          placeholder="Nomor HP"
          {...register("nomorHp")}
          onChange={handlePhoneChange}
          error={errors.nomorHp?.message}
        />
      </div>
    </div>
  );
};
