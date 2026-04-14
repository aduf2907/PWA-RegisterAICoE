import * as React from "react";
import { useFormLogic } from "@/hooks/useFormLogic";
import { SectionVisitor } from "@/components/form/SectionVisitor";
import { SectionSchedule } from "@/components/form/SectionSchedule";
import { SectionVisit } from "@/components/form/SectionVisit";
import { SectionBusiness } from "@/components/form/SectionBusiness";
import { DynamicFields } from "@/components/form/DynamicFields";
import { SubmitSection } from "@/components/form/SubmitSection";
import { Select } from "@/components/ui/Select";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Home: React.FC = () => {
  const {
    form,
    isSubmitted,
    isLoading,
    onSubmit,
    watchVisitType,
    watchTujuanVisit,
    watchTujuanBisnis,
    setIsSubmitted,
  } = useFormLogic();

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 border border-gray-100"
        >
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Registrasi Berhasil!
            </h2>
            <p className="text-gray-600">
              Terima kasih,{" "}
              <span className="font-semibold text-gray-900">
                {form.getValues("nama")}
              </span>
              . Data kunjungan Anda telah kami terima dan akan segera diproses
              oleh tim AI CoE.
            </p>
          </div>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              form.reset();
            }}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Form
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-bold tracking-wider uppercase mb-2">
            AI Center of Excellence
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Visitor Registration
          </h1>
          <p className="text-lg text-gray-600">
            Silakan lengkapi data di bawah untuk menjadwalkan kunjungan Anda ke
            AI CoE.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-2 bg-red-600 w-full" />

          <form onSubmit={onSubmit} className="p-8 space-y-10">
            <SectionVisitor form={form} />

            <SectionSchedule form={form} />

            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b pb-2">
                <Target className="h-5 w-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Tujuan Kunjungan
                </h2>
              </div>

              <Select
                label="Pilih Jenis Kunjungan"
                options={[
                  { label: "Visit", value: "Visit" },
                  { label: "Business", value: "Business" },
                ]}
                {...form.register("visitType")}
                error={form.formState.errors.visitType?.message}
              />
            </div>

            <AnimatePresence mode="wait">
              {watchVisitType === "Visit" ? (
                <motion.div
                  key="visit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <SectionVisit
                    form={form}
                    watchTujuanVisit={watchTujuanVisit}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <SectionBusiness form={form} />
                  <DynamicFields
                    form={form}
                    watchTujuanBisnis={watchTujuanBisnis}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <SubmitSection form={form} isLoading={isLoading} />
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI CoE - Telkom Indonesia. All
          rights reserved.
        </div>
      </div>
    </div>
  );
};
