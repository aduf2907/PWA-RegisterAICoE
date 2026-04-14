export interface VisitorData {
  nama: string;
  nomorHp: string;
  tanggalKunjungan: string;
  jamKunjungan: string;
  visitType: "Visit" | "Bisnis";
  institusi: string;
  jumlahPeserta: string;
  // Visit specific
  tujuanVisit?: string;
  kebutuhanVisit?: string;
  // Bisnis specific
  isAmTelkom?: boolean;
  namaAmTelkom?: string;
  segmen?: string;
  tujuanBisnis?: string;
  industry?: string;
  kebutuhanBisnis?: string;
  consent: boolean;
  timestamp: string;
}
