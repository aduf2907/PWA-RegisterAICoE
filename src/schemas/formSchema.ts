import * as z from "zod";

export const formSchema = z.object({
  // Section 1: Data Pengunjung
  nama: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  nomorHp: z.string().regex(/^\d+$/, { message: "Nomor HP hanya boleh berisi angka." }).min(10, { message: "Nomor HP minimal 10 digit." }),
  jumlahPeserta: z.string().min(1, { message: "Jumlah peserta harus diisi." }),
  institusi: z.string().min(2, { message: "Nama institusi minimal 2 karakter." }),

  // Section 2: Jadwal Kunjungan
  tanggalKunjungan: z.string().min(1, { message: "Tanggal kunjungan harus dipilih." }),
  jamKunjungan: z.string().min(1, { message: "Jam kunjungan harus dipilih." }),

  // Section 3: Jenis Kunjungan
  visitType: z.enum(["Visit", "Business"]),

  // Conditional: Visit
  tujuanVisit: z.string().optional(),
  tujuanVisitLainnya: z.string().optional(),
  kebutuhanVisit: z.string().optional(),

  // Conditional: Business
  isAmTelkom: z.boolean(),
  namaAmTelkom: z.string().optional(),
  tujuanBisnis: z.string().optional(),
  industry: z.string().optional(),
  
  // Dynamic Fields (Business)
  deskripsiKebutuhan: z.string().optional(),

  // Final
  consent: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui syarat dan ketentuan.",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
