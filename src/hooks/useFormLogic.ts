import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/schemas/formSchema";
import { toast } from "sonner";

export const useFormLogic = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      nomorHp: "",
      jumlahPeserta: "",
      institusi: "",
      tanggalKunjungan: "",
      jamKunjungan: "",
      visitType: "Visit",
      tujuanVisit: "",
      tujuanVisitLainnya: "",
      kebutuhanVisit: "",
      isAmTelkom: false,
      namaAmTelkom: "",
      tujuanBisnis: "",
      industry: "",
      deskripsiKebutuhan: "",
      consent: false,
    },
  });

  const { watch, setValue } = form;

  const watchNama = watch("nama");
  const watchIsAmTelkom = watch("isAmTelkom");
  const watchVisitType = watch("visitType");
  const watchTujuanVisit = watch("tujuanVisit");
  const watchTujuanBisnis = watch("tujuanBisnis");

  // Auto-fill AM Telkom name from Nama Lengkap
  useEffect(() => {
    if (watchIsAmTelkom) {
      setValue("namaAmTelkom", watchNama);
    }
  }, [watchIsAmTelkom, watchNama, setValue]);

  const formatTanggal = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const formattedPhone = data.nomorHp.startsWith("0")
        ? "62" + data.nomorHp.slice(1)
        : data.nomorHp;

      const formattedTanggal = formatTanggal(data.tanggalKunjungan);
      const formData = new FormData();

      Object.entries({
        ...data,
        nomorHp: formattedPhone,
        tanggalKunjungan: formattedTanggal,
      }).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      await fetch(
        "https://script.google.com/macros/s/AKfycbxvgK2aGbD1EppqaoLXbrOJsJJuHYgufkCwoUIzhesFvQFFoWUeuHwdQpJMBnvLnZHF0A/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        },
      );

      setIsSubmitted(true);
      toast.success("Registrasi berhasil!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isSubmitted,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
    watchVisitType,
    watchTujuanVisit,
    watchTujuanBisnis,
    setIsSubmitted,
  };
};
