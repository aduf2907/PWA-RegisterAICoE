import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/schemas/formSchema";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";

interface SubmitSectionProps {
  form: UseFormReturn<FormValues>;
  isLoading: boolean;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({
  form,
  isLoading,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6 pt-4 border-t">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <Checkbox
          label="Saya menyetujui bahwa data yang saya berikan adalah benar dan dapat digunakan untuk keperluan koordinasi kunjungan di AI CoE."
          {...register("consent")}
          error={errors.consent?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-all duration-200 shadow-lg hover:shadow-red-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <ShieldCheck className="mr-2 h-5 w-5" />
            Kirim Registrasi
          </>
        )}
      </Button>
    </div>
  );
};
